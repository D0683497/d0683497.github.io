---
layout: Slide
title: Flask 社課 - Bootstrap
description: 逢甲大學 黑客社 第六屆 Flask - Bootstrap 教學簡報
original: true
time: 2019-03-26
category: HackerSir
tags:
    - Flask
backToTop: false
---

@slidestart

# Bootstrap

---

這堂課你會學到

如何套用 Bootstrap

如何使用 Jinja2 模板語言

---

+ [英文版的 Bootstrap 文件](https://getbootstrap.com/docs/4.3/getting-started/introduction/)
+ [中文版的 Bootstrap 文件](https://bootstrap.hexschool.com/docs/4.2/getting-started/introduction/)

---

## 目標

---

![](1.png)

---

## Quick start

---

https://getbootstrap.com/docs/4.3/getting-started/introduction/

---

```html
<!doctype html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

    <title>Hello, world!</title>
  </head>
  <body>
    <h1>Hello, world!</h1>

    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
  </body>
</html>
```

---

## Navbar

---

我們先來建上面 Navbar 的部分

![](2.png)

---

+ [Navbar 的詳細說明](https://getbootstrap.com/docs/4.3/components/navbar/)
+ [Navbar Example](https://getbootstrap.com/docs/4.3/examples/)

---

找一個你喜歡的風格

或自己用 CSS 改成你喜歡的風格

然後用 render_template 跑起來看看吧

---

## Jinja2

---

+ [官方文件](http://jinja.pocoo.org/docs/2.10/)
+ [大概會用到的](http://jinja.pocoo.org/docs/2.10/templates/#synopsis)

---

一個網站在不同的頁面上

其實很多內容是固定的

既然是固定的

我們就可以把它寫成一個額外的套件

要用的時候再去引用他

這樣就不用一直寫重複的程式碼

---

### delimiters

+ `{% ... %}`
    + for Statements
+ `{{ ... }}`
    + for Expressions to print to the template output

--

+ `{# ... #}` 
    + for Comments not included in the template output
+ `#  ... ##`
    + for Line Statements

---

### 頁面模塊

`{% extends "檔案名稱" %}`

---

### 區塊

`{% block 區塊名稱 %}`

`{% endblock %}`

---

那 Flask 要怎麼把東西傳到網頁上呢

這裡用的也是 Jinja2

[詳情點這](http://jinja.pocoo.org/docs/2.10/templates/#expressions)

---

### Variables

`{{ 變數 }}`

---

基本上 Python 的變數都能放

| 名稱 | 例子 |
| --- | --- |
| 字串 | `"Flask"` |
| 整數 | `1234` |
| 小數 | `123.456` |
| list | `['1', 2, 3.4]` |
| tuple | `('1', 2, 3.4)` |
| dict | `{key1: value1, key2: value2}` |
| bool | `true / false / none` |

note: 官方建議 bool 最好用小寫

---

這裡當然也可以做一些運算

例如 加減乘除、and or not

大致上跟 Python 都一樣

如果 Python 還不太會的

<a href="/HackerSir/Python" target="_blank" data-preview-link="false">請點這</a>

---

有了變數之後

當然要來點 if else 跟 for

[詳情點這](http://jinja.pocoo.org/docs/2.10/templates/#list-of-control-structures)

---

### if - else

```
{% if 判斷標準A %}
    執行這裡
{% elif 判斷標準B %}
    執行這裡
{% else %}
    執行這裡
{% endif %}
```

---

### For

```
{% for 變數A in 變數B %}
    {{ 變數A }}
{% endfor %}
```

---

## bootstrap-flask

---

[官方文件](https://bootstrap-flask.readthedocs.io/en/latest/index.html)

---

安裝

`pip install bootstrap-flask`

---

+ 引入套件
    + `from flask_bootstrap import Bootstrap`
+ 引入 bootstrap 的 CSS
    + `{{ bootstrap.load_css() }}`
+ 引入 bootstrap 的 JavaScript
    + `{{ bootstrap.load_js() }}`

---

初始化

`bootstrap = Bootstrap(app)`

@slideend
