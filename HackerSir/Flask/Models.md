---
layout: Slide
title: Flask 社課 - Models
description: 逢甲大學 黑客社 第六屆 Flask - Models 教學簡報
original: true
time: 2019-05-01
category: HackerSir
tags:
    - Flask
backToTop: false
---

@slidestart

# Models

---

網站中的所有資料都會存在資料庫裡

甚麼是資料庫呢

他就像是 Excel

---

每張表都有表的**名稱**

跟**欄位**

但是資料庫不像 Excel

每個欄位要放甚麼都可以

他是**固定**的

---

資料庫有很多種

[詳情點這](https://zh.wikipedia.org/wiki/数据库)

我們這堂課使用的是 `SQLite`

---

當你今天要從資料庫裡取資料時

你要使用一種特殊的語法叫做 `SQL`

但是這個要教可以教一個學期

那我們要如何拿資料呢?

有個東西就做 `ORM`

---

因為很多的 `SQL` 是類似的甚至是重複的

所以可以把的包成函式

方便我們做操作

---

## Flask - SQLAlchemy

[官方文件(英文)](https://flask-sqlalchemy.palletsprojects.com/en/2.x/)

[快速入門(中文)](http://www.pythondoc.com/flask-sqlalchemy/quickstart.html)

---

### 安裝

`pip install Flask-SQLAlchemy`

---

### 實作

首先你要先告訴 Flask 你的資料庫在哪

然後初始化

之後就可以開始使用了

---

```python
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///資料庫名稱'

db = SQLAlchemy(app)
```

---

```shell
export FLASK_APP=你的啟動檔案.py

db.create_all()
```

---

```python
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True)
    password = db.Column(db.String(80), unique=True)
    email = db.Column(db.String(120))
```

---

每個資料表都要有一個唯一可以識別這個欄位的東西，而且他是不可以改變的

這叫做主鍵

可以看到剛剛的 User 表裡面的 id 後面有個 `primary_key=True`

這代表在這張表內 id 就是主鍵

---

現在大家來想像一下

我們的 iLearn 怎麼儲存你們的資料

---

這事後你會發現

不管怎麼存資料的重複率好像都很高

所以這時候就有了一個東西叫做**外鍵**

---

在講甚麼是外鍵之前

我們先來了解一下表的三種關聯

+ 一對一
+ 一對多
+ 多對多

---

<a href="https://github.com/D0683497/flask-hackersir/blob/d612a48161583213cf1fe98b76f4ed250677802a/app/models.py" target="_blank" data-preview-link="false">程式碼</a>

@slideend
