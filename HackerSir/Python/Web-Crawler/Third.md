---
layout: Slide
title: Python 社課 - 爬蟲三
description: 逢甲大學 黑客社 第五屆 Python - 爬蟲三 教學簡報
original: true
time: 2018-12-03
category: HackerSir
tags:
    - Python
backToTop: false
---

@slidestart

# 爬蟲三

---

今天我們來練習

`https://signin.fcu.edu.tw/clockin/login.aspx`

---

那要如何登入呢?

我們一樣用 開發者工具 (F12)

然後我們實際登入一次

看他到底送什麼資料?

送到哪裡?

---

先把開發者工具 (F12) 切到 Network

![](1.png)

---

然後實際登入一次

會看到 Network 有很多東西再跑

等他跑完看第一個

---

<img src="2.png" width="60%" height="">

---

我們可以看到他的確是 POST

然後往下滑到 Form Data

> 這邊會看的到你的帳號密碼，請小心你的隔壁同學

---

<img src="3.png" width="60%" height="">

---

所以我們就把那些資料都複製起來

一起 POST 過去

應該就會登入了

但在這之前

我們先解決密碼的問題

---

請加上這段程式碼

然後等等要填帳密的地方

都用 `username` 跟 `password` 代替

```python
import getpass

username = input('請輸入學號:')
password = getpass.getpass('請輸入密碼:')
```

---

data 的值每個人都不一樣

```python
from bs4 import BeautifulSoup
import requests
import getpass

username = input('請輸入學號:')
password = getpass.getpass('請輸入密碼:')

url = 'https://signin.fcu.edu.tw/clockin/login.aspx'

data = {
    '__EVENTTARGET': '',
    '__EVENTARGUMENT': '', 
    '__VIEWSTATE': '4u/QljD0dXq6NcvHgHovWV2MX1DaC9ssFgWk1vG+Rh7F6TthxHg3GVT7rmeEXHoW2f9GZ2fjcK+JXjzsZKbvbi73ba2ZBZVJ4FO819eoC33yBc21SbOZXX6INUfZhBI4ELXtOC6exzrTefrMe4VbHu+i2OYMJNkx+af8B+V+BJA6RsWlwx/gEEBoVoW/gkuU0nv9FBG22+WX5cPoWV0sGxsTJSTxcrhoi+tkkviB6QE=',
    '__VIEWSTATEGENERATOR': '1C86B585',
    '__EVENTVALIDATION': 'woUofEgRt/VM3LzDRVPVrfQj4BPUpSytDU7Fcsm7CY+0nsDiMvfccSafp0QZLPt4bgIflf6g39SjbYp2xZ+Gk54FwHk8oGFChxg/kjgULkqbQ8flcCznZcZXLwBBpvnMR/KhRziCG7WWcv4u8fxjnhaZJF2XXE20MkqYkCjvAo8=',
    'LoginLdap$UserName': username,
    'LoginLdap$Password': password,
    'LoginLdap$LoginButton': '登入'
}

page = requests.post(url, data=data)

print(page.text)
```

---

執行完你應該會看到

請重新登入

~~如果不是拜託告訴我你怎麼辦到的~~

所以我們回到 開發者工具 (F12)

多登入幾次觀察一下

---

你可以看到每次登入的

`__VIEWSTATE`

`__VIEWSTATEGENERATOR`

`__EVENTVALIDATION`

都不一樣

---

那我們要怎麼拿到他裡面的值呢?

其實他藏在一開始的登入頁面裡面

你可以在空白處點右鍵，按檢視網頁原始碼

---

![](4.png)

---

所以我們要先 GET 登入頁面

拿到那些值後再 POST

---

```python
from bs4 import BeautifulSoup
import requests
import getpass

username = input('請輸入學號:')
password = getpass.getpass('請輸入密碼:')

url = 'https://signin.fcu.edu.tw/clockin/login.aspx'

login = requests.get(url)

loginData = BeautifulSoup(login.text, "html.parser")

data = {
    '__EVENTTARGET': '',
    '__EVENTARGUMENT': '', 
    '__VIEWSTATE': loginData.select("#__VIEWSTATE")[0]["value"],
    '__VIEWSTATEGENERATOR': loginData.select("#__VIEWSTATEGENERATOR")[0]["value"],
    '__EVENTVALIDATION': loginData.select("#__EVENTVALIDATION")[0]["value"],
    'LoginLdap$UserName': username,
    'LoginLdap$Password': password,
    'LoginLdap$LoginButton': '登入'
}

page = requests.post(url, data=data)

print(page.text)
```

---

然後你應該會看到

未使用校園無線網路

我們先假設你有用

這邊是因為你沒有加 header 的關係

所以把它加上吧

---

```python
from bs4 import BeautifulSoup
import requests
import getpass

username = input('請輸入學號:')
password = getpass.getpass('請輸入密碼:')

url = 'https://signin.fcu.edu.tw/clockin/login.aspx'

login = requests.get(url)

loginData = BeautifulSoup(login.text, "html.parser")

header = {
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7',
    'Cache-Control': 'max-age=0',
    'Connection': 'keep-alive',
    'Content-Type': 'application/x-www-form-urlencoded',
    'DNT': '1',
    'Host': 'signin.fcu.edu.tw',
    'Origin': 'https://signin.fcu.edu.tw',
    'Referer': 'https://signin.fcu.edu.tw/clockin/login.aspx',
    'Upgrade-Insecure-Requests': '1',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36'
}

data = {
    '__EVENTTARGET': '',
    '__EVENTARGUMENT': '', 
    '__VIEWSTATE': loginData.select("#__VIEWSTATE")[0]["value"],
    '__VIEWSTATEGENERATOR': loginData.select("#__VIEWSTATEGENERATOR")[0]["value"],
    '__EVENTVALIDATION': loginData.select("#__EVENTVALIDATION")[0]["value"],
    'LoginLdap$UserName': username,
    'LoginLdap$Password': password,
    'LoginLdap$LoginButton': '登入'
}

page = requests.post(url, headers=header, data=data)

print(page.text)
```

@slideend
