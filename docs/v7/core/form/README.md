# 表单 API


## 默认值
每个元素都自动具有以下默认值。请参阅 [system_elelemt_info()]()


### Elements

#### actions





### Properties

#### \#access
- 类型：`Boolean`
- 范围：`All`

元素是否可访问；当为 `False` 时，不会呈现元素，并且不会考虑用户输入的值。

#### \#action
- 类型：`String`
- 范围：`form`
- 用法：
```php
$form['#action'] = url('comment/reply/'. $edit['nid']);
```
原生 from 标签的 action 属性值。


#### \#id
- 类型：`String`
- 使用范围：`All`
HTML id 属性。

#### \#validate
- 类型：`String[]`

    每个函数都将传入 `$form` 和 `$form_state` 参数，如果表单值未通过验证，则应使用 `form_set_error()`。
- 使用范围：`button`, `image_button`, `form`, `submit`
- 用法：
```php
function test_form_validate($form, &$form_state) {
    if ($form_state['values']['name'] == '') {
        form_set_error('name', t('You must select a name for this group of settings.'));
    }
}
```
需要传递的自定义验证函数的列表。这通常用于向表单添加其他验证函数，或使用备用函数而不是默认的表单验证函数，后者是附加_validate的表单ID。


#### \#submit
- 类型：`String[]`
- 使用范围：`button`, `image_button`, `submit`, `form`
- 用法：
```php
if (!empty($node->nid) && node_access('delete', $node)) {
    $form['actions']['delete'] = array(
        '#type' => 'submit',
        '#value' => t('Delete'),
        '#weight' => 15,
        '#submit' => array('node_form_delete_submit'),
    );
}
```
表单提交时将调用的自定义提交函数列表。这通常是向表单添加其他提交函数，或者使用备用函数而不是默认表单提交函数，默认表单提交函数是附加_submit的表单ID。

#### \#type
- 类型：`String`
- 使用范围：`All`
- 可选值：
  ```
  - button              <input type="button">
  - checkbox            <input type="checkbox">
  - checkboxes          复选框组
  - date                日期
  - fieldset            HTML fieldset
  - file                <input type="file">
  - form                <form>
  - hidden              <input type="hidden">
  - image_button        <input type="image">
  - item                <ul><li>...</li></ul>
  - machine_name
  - markup
  - password            <input type="password">
  - password_confirm
  - radio               <input type="radio">
  - radios
  - select              <select>...</select>
  - submit              <input type="submit">
  - tableselect
  - textarea            <textarea></textarea>
  - textfield
  - token
  - value
  - vertical_tabs
  - weight
  ```
- 用法：
```php
$form['submit'] = array('#type' => 'submit', '#value' => t('Import'));
```
用于确定表单元素的类型。


#### \#title
- 类型：`String`
- 使用范围：`checkbox`, `checkboxes`, `date`, `fieldset`, `file`, `item`, `password`, `password_confirm`, `radio`, `radios`, `select`, `text_format`, `textarea`, `textfield`, `weight`
- 用法：
```php
$form['description'] = array(
  '#type' => 'textarea',
  '#title' => t('Description'),
  '#default_value' => $edit['description'],
  '#cols' => 60,
  '#rows' => 5,
);
```
表单元素的标题。最好使用 `t()` 函数处理，方便使用多语言。


#### \#size
- 类型：`Number`
- 使用范围：`file`, `password`, `password_confirm`, `select`, `textfield`
- 用法：
```php
$form['admin']['homepage'] = array(
    '#type'=> 'textfield',
    '#title'=> t('Homepage'),
    '#maxlength'=> 255,
    '#size'=> 30,
    '#default_value'=> $edit['homepage'],
);
```
HTML `<input>` size 属性。


#### \#required
- 类型：`Boolean`
- 使用范围：`checkbox`, `checkboxes`, `date`, `file`, `password`, `password_confirm`, `radio`, `radios`, `select`, `text_format`, `textarea`, `textfield`, `weight`
- 用法：
```php
$form['title'] = array(
  '#type' => 'textfield',
  '#title' => t('Subject'),
  '#default_value' => $node->title,
  '#size' => 60,
  '#maxlength' => 128,
  '#required' => TRUE,
);
```
指示该元素是否是必需的。这会自动验证空字段，并根据需要标记输入。不允许使用文件字段作为必填字段。


#### \#value
- 类型：`String|Number`
- 使用范围：`button`, `hidden`, `image_button`, `submit`, `token`, `value`
- 用法：
```php
$form['submit'] = array('#type' => 'submit', '#value' => t('Import'));
```
用于设置用户无法编辑的值。不应与 `#default_value` 混淆，后者用于表单输入，用户可以覆盖默认值。


