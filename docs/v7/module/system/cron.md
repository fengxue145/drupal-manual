# 定时任务（有歧义，需要重写）

> Cron 是一个以指定的时间间隔执行命令的守护程序。这些命令称为"cron 作业"。Cron可在Unix，Linux和Mac服务器上使用。Windows服务器使用计划任务来执行命令。 -- 引用官方描述





## 任务种类
`Drupal` 的定时任务分以下两种：
- `Short-running`

    短期任务、非资源密集型任务，可以直接在 [hook_cron](#hook-cron) 钩子中实现。

- `Long-running`

    长时间运行的任务、可能超时的任务（如检索远程数据、发送电子邮件和密集型文件任务），应使用队列 API 执行任务。为此，需要实现 [hook_cron_queue_info()](#hook-cron-queue-info) 钩子。



## 执行方式
`Drupal` 定时任务的执行方式分以下四种：
1. 手动运行

    进入 `Administration > Configuration > System > Cron (/admin/config/system/cron)`, 点击 `Run Cron` 可手动执行。

    <img :src="$withBase('/images/module/system/cron-1.png')" alt="foo">

2. 请求运行 <Badge type="error">不推荐</Badge>

    网站在每个请求的最后进行检查，查看 `cron` 上次运行的时间，如果运行时间超过 `Run cron every`，则将 `cron` 任务作为该请求的一部分进行处理。

    有两个缺点：
    - `cron` 任务仅在处理请求时运行(即没请求就不运行)。
    - 运行 `cron` 任务的"权重"(处理和内存)将被添加到任意的页面请求中，这可能会减慢这些请求的速度，并有可能超过复杂站点的内存限制。

    可以在 `/admin/config/system/cron` 页, 设置 `Run cron every` 页面设置 `Run cron every` 执行时间：

    <img :src="$withBase('/images/module/system/cron-2.png')" alt="foo">

3. 代码运行

    在代码中执行 `drupal_cron_run()` 函数即可。

4. URL运行

    每个Drupal版本都有不同的URL，必须请求URL才可以触发`cron`。对于`Drupal 7`及更高版本，URL包含一个"密钥"，以防止外部滥用。

    可以在以下页面找到URL:
    - `Reports Administration > Reports > Status (/admin/reports/status)`
    - `Administration > Configuration > System > Cron (/admin/config/system/cron)`

    |版本|网址格式|
    |-                   |-|
    |Drupal 8            |`http://www.example.com/cron/<key>`|
    |Drupal 7            |`http://www.example.com/cron.php?cron_key=<key>`|
    |Drupal 6 and earlier|`http://www.example.com/cron.php`|

    建议搭配 `Linux crontab` 命令使用，如：
    ```bash
    $ crontab -e
    $ 0 * * * * curl -s http://CRON_URL
    ```



## 深入了解
上面的执行方式都是针对 `{hook}_cron` 钩子函数(即 `Short-running` 任务)，究竟该如何运行 `Long-running` 任务呢？

要了解 `Long-running` 如何执行，需要查看 `drupal_cron_run()` 函数源码：
```php
function drupal_cron_run() {
    // 省略非重要的代码
    ...

    $return = FALSE;
    // 获取所有定义的任务队列信息
    $queues = module_invoke_all('cron_queue_info');
    drupal_alter('cron_queue_info', $queues);

    // Try to acquire cron lock.
    if (!lock_acquire('cron', 240.0)) {
        // Cron is still running normally.
        watchdog('cron', 'Attempting to re-run cron while it is already running.', array(), WATCHDOG_WARNING);
    } else {
        // 确保每个队列都存在
        foreach ($queues as $queue_name => $info) {
            DrupalQueue::get($queue_name)->createQueue();
        }

        // 执行所有实现 {hook}_cron() 钩子的函数
        foreach (module_implements('cron') as $module) {
            // 确保模块之间的错误互不影响.
            try {
                module_invoke($module, 'cron');
            } catch (Exception $e) {
                watchdog_exception('cron', $e);
            }
        }

        // Record cron time.
        variable_set('cron_last', REQUEST_TIME);
        watchdog('cron', 'Cron run completed.', array(), WATCHDOG_NOTICE);

        // Release cron lock.
        lock_release('cron');

        // Return TRUE so other functions can check if it did run successfully
        $return = TRUE;
    }

    // 遍历队列，查看是否满足条件可执行。
    foreach ($queues as $queue_name => $info) {
        if (!empty($info['skip on cron'])) {
            // Do not run if queue wants to skip.
            continue;
        }
        $callback = $info['worker callback'];
        $end = time() + (isset($info['time']) ? $info['time'] : 15);
        $queue = DrupalQueue::get($queue_name);
        // 注意：在指定的时间内，执行队列的任务。超过执行时间就等待下次执行。
        while (time() < $end && ($item = $queue->claimItem())) {
            try {
                call_user_func($callback, $item->data);
                $queue->deleteItem($item);
            }
            catch (Exception $e) {
                // In case of exception log it and leave the item in the queue
                // to be processed again later.
                watchdog_exception('cron', $e);
            }
        }
    }

    ...
    return $return;
}
```

整理一下执行流程:
1. 获取所有 `hook_cron_queue_info` 定义的任务队列。
2. 尝试加锁，确保 `cron` 不会交叉运行。
3. 检查定时任务队列，确保所有队列都已存在。
4. 执行 `{hook}_cron` 钩子函数。
5. 释放锁。
6. 执行 `hook_cron_queue_info` 中的任务。

可以发现 `Long-running` 任务是在每次运行 `cron` 任务后运行的，并且每次运行的时间不超过 `time` 指定的时间。



## 相关数据表
定时任务处理时的相关数据表如下：

- `semaphore`

    定时任务锁表，保证一次只能运行一个 `cron` 任务。锁有效期默认240秒。

    如果在运行定时任务期间中断执行，导致锁未被释放。此时想立刻重新执行定时任务，可等待240秒后，或清空 `semaphore` 表数据即可立即重新执行任务。

- `queue`

    任务队列表。每执行一次 `$queue->createItem()` 操作，就会往该表插入一条数据，任务执行完毕后会删除。



## 总结
`Drupal` 的 `cron` 有局限性，对于小型任务的支持很好，但对于大任务就不是特别好(容易发生超时、内存泄漏等现象)。最好使用外部的方式来触发 `cron`，比如使用 `PHP CLI`、`Swoole` 或 `MQ队列` 等等。

::: tip 注意
URL触发的 `cron` 有一个很大的缺点，就是容易超时。
:::

以上就是 `Drupal` 内置的定时任务讲解。感谢观看~



## {hook}_cron
执行定期操作。

```php
function hook_cron() {
    // 不使用队列的短时间运行操作示例:
    // 删除自上次cron运行以来所有过期的记录。
    $expires = variable_get('mymodule_cron_last_run', REQUEST_TIME);
    db_delete('mymodule_table')
        ->condition('expires', $expires, '>=')
        ->execute();
    variable_set('mymodule_cron_last_run', REQUEST_TIME);

    // 长时间运行的操作示例，利用队列:
    // 从其他站点获取提要。
    $result = db_query('SELECT * FROM {aggregator_feed} WHERE checked + refresh < :time AND refresh <> :never', array(
        ':time' => REQUEST_TIME,
        ':never' => AGGREGATOR_CLEAR_NEVER,
    ));
    $queue = DrupalQueue::get('aggregator_feeds');
    foreach ($result as $feed) {
        $queue->createItem($feed);
    }
}
```


## {hook}_cron_queue_info
声明包含需要定期运行的任务队列。

- 返回值:

    返回一个关联数组，其中键是队列名称，值也是关联数组。可能的键如下：

  - <span style="color: red;">*</span>`worker callback`: `mixed`

    工作队列的回调函数

  - `time`: `number`

    队列每次可执行的最大时间（单位：秒，默认：15）。

    例：队列目前有3个任务，每个任务需花费3秒，`time` 为5，即一次 `cron` 可处理该队列的2个任务。

  - `skip on cron`: `boolean`

    是否避免在 Cron 运行期间被处理。

```php
function hook_cron_queue_info() {
    $queues['aggregator_feeds'] = array(
        'worker callback' => 'aggregator_refresh',
        'time'            => 60,
    );
    return $queues;
}
```


## {hook}_cron_queue_info_alter
在处理定时任务之前，更改 `cron` 队列设置。

- 参数:
    - `&$queues`: `array`

      任务队列数组。参见 [hook_cron_queue_info()](#hook-cron-queue-info) 返回值。

```php
function hook_cron_queue_info_alter(&$queues) {
    $queues['aggregator_feeds']['time'] = 90;
}
```










