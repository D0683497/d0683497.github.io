---
layout: Slide
title: Flask 社課 - Form
description: 逢甲大學 黑客社 第六屆 Flask - Form 教學簡報
original: true
time: 2019-04-17
category: HackerSir
tags:
    - Flask
backToTop: false
---

@slidestart

# Form

---

一個網站中都會有許多表單

像是註冊、登入、修改密碼這些

都是屬於表單的一種

這堂課你會學到使用 `Flask-WTF` 來

建立各式各樣的表單

---

## Flask - WTF

---

+ 安裝
    + `pip install Flask-WTF`
+ [Flask - WTF 官網](https://flask-wtf.readthedocs.io/en/stable/)
+ [Fields](https://wtforms.readthedocs.io/en/latest/fields.html)
+ [Validators](https://wtforms.readthedocs.io/en/latest/validators.html)

---

## 欄位

---

+ 在表單裡面有著各種欄位
    + 帳號: 普通字串
    + 密碼: 加密後的字串
    + 保持登入: 單選 (boolean)
+ 欄位裡有各式各樣的驗證
    + 帳號: 6~12 字
    + 密碼: 6~12 字、至少一個大小字母

---

### Field

+ 在 `wtforms` 裡有許多已經定義好的欄位
+ 要使用的話要先引入
    + `from wtforms import 想要的欄位`

---

+ `StringField`
    + `變數 = StringField('名稱')`
    + `<input id="變數" name="變數" type="text">`
+ `PasswordField`
    + `變數 = PasswordField('名稱')`
    + `<input id="變數" name="變數" type="password">`

---

+ `BooleanField`
    + `變數 = BooleanField('名稱')`
    + `<input id="變數" name="變數" type="checkbox" value="y">`
+ `SubmitField`
    + `變數 = SubmitField('名稱')`
    + `<input id="變數" name="變數" type="submit" value="名稱">`

---

+ `IntegerField`
    + `變數 = IntegerField('名稱')`
    + `<input id="變數" name="變數" type="text">`
+ `FloatField`
    + `變數 = FloatField('名稱')`
    + `<input id="變數" name="變數" type="text">`

---

+ `DateField`
    + `變數 = FloatField('名稱')`
    + `<input id="變數" name="變數" type="text">`
+ `DateTimeField`
    + `變數 = FloatField('名稱')`
    + `<input id="變數" name="變數" type="text">`

---

`RadioField`

`變數 = RadioField('名稱', choices=[('值A','描述A'),('值B','描述B')])`

```html
<ul id="變數">
    <li>
        <input id="變數-0" name="變數" type="radio" value="值A">
    </li>
    <li>
        <input id="變數-1" name="變數" type="radio" value="值B">
    </li>
</ul>
```

---

`SelectMultipleField`

`變數 = SelectMultipleField('名稱', choices=[('值A', '描述A'), ('值B', '描述B')])`

```html
<select id="變數" name="變數" multiple>
    <option value="值A">描述A</option>
    <option value="值B">描述B</option>
</select>
```

---

每種不同的 `Field` 裡面還可以傳入一些指定的參數

+ 例如指定 `HTML` 的屬性
+ `render_kw={'class': 'form-control', 'rows': 20, 'placeholder': '請輸入'}`

---

+ 其實上面那些都很舊了
+ 你可以用最新的 `HTML5` 的欄位
    + `from wtforms.fields.html5 import 想要的欄位`

---

### FlaskForm

---

`from flask_wtf import FlaskForm`

```python
class 表單名稱(FlaskForm):
    變數 = 某個Field('名稱')
```

---

寫好後再你的 `view` 裡面傳入你的表單

```python
class ExampleForm(FlaskForm):
    username = StringField('帳號')
    password = PasswordField('密碼')
    submit = SubmitField('登入')

@app.route('/login')
def login():
    form = ExampleForm()
    return render_template('login.html', form=form)
```

---

### 驗證

[官方文件](https://wtforms.readthedocs.io/en/latest/validators.html)

```python
變數 = 某個Field('名稱', validators=[驗證函數])
```

使用 驗證函數 前記得要先引入

`from wtforms.validators import 驗證函數`

---

<a href="/HackerSir/Python/Regular-Expression/Current" target="_blank" data-preview-link="false">正則表達式</a>

---

## HTML

---

+ 在撰寫 HTML 前要先在程式裡加上這段
    + `app.config['SECRET_KEY'] = 'key'`
+ 這個是 CSRF 的 Token
    + 想知道這是什麼，請洽資安線
+ 然後一定要在表單裡加上
    + `{{ form.csrf_token }}`

---

```html
<form method="POST" enctype="multipart/form-data">
    {{ form.csrf_token }}
    
    {{ form.username.label() }}
    {{ form.username() }}

    {{ form.password.label() }}
    {{ form.password() }}
    
    {{ form.remember.label() }}
    {{ form.remember() }}
    
    {{ form.submit() }}
</form>
```

---

你可以在渲染他的時候加上 `class` 名稱

`{{ form.submit(class_="btn btn-secondary") }}`

---

### Flask - Bootstrap

---

上一節課有提到 Flask - Bootstrap 可以幫助你快速地完成表單

那他到底多快呢?

<a href="/HackerSir/Flask/Bootstrap" target="_blank" data-preview-link="false">忘記的可以點這</a>

---

+ 在 HTML 的上方加入
    + `{% from 'bootstrap/form.html' import render_form %}`
+ 然後在你想要擺表單的地方加入
    + `{{ render_form(form) }}`

---

## Get Data

---

有了表單後

再來就是要拿取使用者填在表單裡的資料了

---

首先你要先允許你的 view 可以接受 POST

你知需要使用 methods 參數

`methods=['GET', 'POST']`

---

```python
@app.route('/login', methods=['GET','POST'])
```

---

現在你的 view 可以接受 POST 這個方法了

再拿要如何拿資料呢?

---

你只需要使用

`form.欄位.data`

---

但是這樣會直接會有些小問題

使用者有可能會繞過你剛剛寫的驗證

所以必須要加強一下

---

FlaskForm 有提供一個函數

`validate_on_submit`

這個函數會驗證你的所有驗證器

---

## MVC

---

MVC (Model-View-Control)

是一種開發模式

它可以幫助你有系統的開發

甚至讓你的開發更快速

---

顧名思義他就是分成三層

+ M (Model)
    + 資料庫
+ V (View)
    + 你看的到的東西
+ C (Control)
    + 後端的處理

---

但是我們不是要用 MVC 來開發

只是講解一下分層的概念

剛剛的 Form 其實也可以另外分出來成為一層

@slideend
