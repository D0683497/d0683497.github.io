---
layout: Slide
title: Flask 社課 - 介紹
description: 逢甲大學 黑客社 第六屆 Flask - 介紹 教學簡報
original: true
time: 2019-03-18
category: HackerSir
tags:
    - Flask
backToTop: false
---

@slidestart

# 介紹

---

## Flask 介紹

---

首先 Flask 是什麼呢?

---

引用 Flask 官網的話

> Flask is a microframework for Python.

---

他是一個**微**型的 web 框架

到這裡你應該要產生問題了

甚麼是**微**型?

甚麼是框架?

甚至甚麼是 web?

---

但因為我很懶

所以我只解釋 **微**型 的部分

---

首先大家覺得寫一個網頁需要幾行程式碼呢?

---

```python
from flask import Flask
app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello World!"

if __name__ == '__main__':
    app.run()
```

---

有沒有很**微**型?

不相信的話這邊給大家示範幾個其他框架該怎麼開始

---

[Flask官網](http://flask.pocoo.org/)

---

## 社課簡介

---

這學期你會學到完整的開發一個網頁

從一開始的寫程式

到後來放到伺服器上

然後有一個自己的域名

最後把程式碼分享給大家看

---

### 環境

---

#### Flask的部分

+ [Flask](http://flask.pocoo.org/)
+ [Flask-WTF](https://flask-wtf.readthedocs.io/en/stable/)
+ [Flask_Login](https://flask-login.readthedocs.io/en/latest/)
+ [Flask-SQLAlchemy](http://flask-sqlalchemy.pocoo.org/2.3/)

---

#### 開發環境的部分

+ Python
+ windows bash on ubuntu
+ Visual Studio Code
+ Git

---

當你今天都完成了

我們會教你如何申請一個屬於自己的域名

再來就是丟上伺服器了

---

伺服器的部分我們使用

[Google Cloud Platform](https://cloud.google.com)

---

**注意**

申請 Google Cloud Platform 是需要綁一張信用卡的

但是它基本上不會扣到你的錢 (假設你正常使用)

@slideend
