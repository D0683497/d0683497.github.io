---
layout: Slide
title: Flask 社課 - 基礎
description: 逢甲大學 黑客社 第五屆 Flask - 基礎 教學簡報
original: true
time: 2019-03-26
category: HackerSir
tags:
    - Flask
backToTop: false
---

@slidestart

# 基礎

---

## Outline

+ 介紹及使用 Python 虛擬環境
+ 介紹 Python 的套件要如何引用
+ 介紹 Flask 如何定義網址、傳遞 HTML、CSS、Javascript
+ 介紹 GitHub 上常見的兩個檔案以及如何產生即使用他
    + requirements.txt
    + .gitignore

---

## Python 虛擬環境

---

虛擬環境就是一個完全獨立的開發環境

當你今天安裝的套件一多的時候

他們很有可能會衝突

所以我們就需要創建一個完全獨立的虛擬環境

只安裝必要的套件

---

虛擬環境還有一個好處就是

當你今天匯出 requirements.txt

裡面所顯示的套件都是會用到的

---

### 使用 虛擬環境 (Linux 版)

+ 建立虛擬環境
    + `python3 -m venv 虛擬環境名稱`
+ 啟用虛擬環境
    + `source 虛擬環境名稱/bin/activate`
+ 關閉虛擬環境
    + `deactivate`

---

### 使用 虛擬環境 (Windows 版)

+ 建立虛擬環境
    + `python -m venv 虛擬環境名稱`
+ 啟用虛擬環境
    + `虛擬環境名稱\Scripts\activate.bat`
+ 關閉虛擬環境
    + `deactivate`

---

建立完虛擬環境後

記得在裝一次 Flask

`pip3 install Flask`

---

## Flask is Fun

還記得之前講過的最小的 Flask 嗎?

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

```python
from flask import Flask
```

從 flask 這個套件裡面 引入 Flask 這個類別

+ from 通常後面接**套件 (資料夾)**名稱或者是**檔案**名稱
+ import 通常後面接**函式**名稱或是**類別**名稱

> import 後面也可以接**套件 (資料夾)**名稱或者是**檔案**名稱，在他單獨使用的時候

---

```python
@app.route("/")
```

+ 這個是用來定義 URL(網址) 的地方
    + `/` 代表網址會長成 `http://你的域名/`
    + `/home` 代表網址會長成 `http://你的域名/home`
+ 每一個 `@app.route` 會對應到一個函式(一個函式可以對應多個`@app.route`)

---

```python
if __name__ == '__main__':
```

這邊就像是主程式的部分，當你今天主要執行的是這個檔案而不是其他檔案在執行而你被引用的時候，這邊就會執行

---

```python
app.run()
```

就是讓整個網頁跑起來

+ 如果你在開發環境的話，你可以把 debug 模式打開
    + `app.run(debug=True)`
+ 你也可以指定 port (預設5000)
    + `app.run(port=你要的port號)`

---

然後在你的終端機上輸入

`python3 你的檔案.py`

他就會順利跑起來

---

如果 debug 模式跑不起來的話

在檔案一開始加入

`#! /usr/bin/env python`

---

## Templates

---

先建立 templates 資料夾

你可以使用 Linux 的指令來建資料夾

```shell
mkdir templates
```

---

這個資料夾是用來放所有的 html 檔

要使用的時候要先引入 render_template

`from flask import render_template`

然後用 `render_template('檔案名稱.html')`

---

### 範例

```python
from flask import Flask, render_template
app = Flask(__name__)

@app.route("/")
def index():
    return render_template('index.html')

@app.route("/login")
def login():
    return render_template('auth/login.html')

if __name__ == '__main__':
    app.run()
```

---

## Static Files

---

當你今天想要在網頁裡引入 CSS 或 JavaScript

你要先創建 static 資料夾

然後再你想要引入的路徑裡寫上 `{{ url_for('static', filename='style.css') }}`

---

> 兩個大括號的用法其實是一個叫 Jinja2 的模板語法，之後的課程會介紹到

---

### 範例

```html
<link rel="stylesheet" href="{{ url_for('static', filename='main.css') }}">
<script src="{{ url_for('static', filename='main.js') }}"></script>
<img src="{{ url_for('static', filename='img/file.jpg') }}"/>
```

---

## 補充

---

### requirements.txt

簡單來講都就是一個紀錄你裝了哪個**版本**的哪個**套件**

方便別人想要看或者執行你寫的程式的時候

可以快速安裝你所使用的套件

---

+ 產生 requirements.txt
    + `pip freeze > requirements.txt`
+ 安裝 requirements.txt 裡的套件
    + `pip install -r requirements.txt`

---

### .gitignore

.gitignore 裡面紀錄的是

那些檔案或資料夾你不想推到 GitHub 上

---

你可以用 https://www.gitignore.io/ 快速產生模板出來

或是 https://github.com/github/gitignore 找到你想要的模板

---

大家可以先回去練習把你想要的網站前端部分先做出來

@slideend
