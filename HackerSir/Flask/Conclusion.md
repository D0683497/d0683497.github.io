---
layout: Slide
title: Flask 社課 - 總結
description: 逢甲大學 黑客社 第六屆 Flask - 總結 教學簡報
original: true
time: 2019-05-09
category: HackerSir
tags:
    - Flask
backToTop: false
---

@slidestart

# 總結

---

## 環境

+ Python3
+ Visual Studio Code

---

虛擬環境

+ 創建
    + `python -m venv 虛擬環境名稱`
+ 啟動
    + `source 虛擬環境名稱/bin/activate`
+ 退出
    + `deactivate`

---

+ `pip install Flask`
+ `pip install Flask-WTF`
+ `pip install Flask-SQLAlchemy`
+ `pip install bootstrap-flask`

---

+ 新增 `manange.py`
+ 新增 `forms.py`
+ 新增 `models.py`
+ 新增 `templates` 資料夾

---

+ 主要邏輯寫在 `manange.py`
+ 表單寫在 `forms.py`
    + 在 `manange.py` 裡要 `from forms import 你的表單`

---

+ 資料庫寫在 `models.py`
    + 在 `models.py` 裡要 `from manange import db`
    + 在 `manange.py` 裡要 `from models import 你的資料表`
+ `templates` 資料夾放 `html`

---

## 建立資料庫

+ `export FLASK_APP=manange.py`
+ `flask shell`
+ `from manange import db`
+ `db.create_all()`

---

<a href="https://github.com/D0683497/flask-hackersir" target="_blank" data-preview-link="false">所有程式碼</a>

@slideend
