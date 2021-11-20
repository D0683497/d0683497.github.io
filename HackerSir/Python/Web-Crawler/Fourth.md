---
layout: Slide
title: Python 社課 - 爬蟲四
description: 逢甲大學 黑客社 第六屆 Python - 爬蟲四 教學簡報
original: true
time: 2018-12-03
category: HackerSir
tags:
    - Python
backToTop: false
---

@slidestart

# 爬蟲四

---

今天我們的目標是爬 MyFCU

`https://myfcu.fcu.edu.tw/main/InfoMyFcuLogin.aspx`

---

依照慣例

先打開 開發者工具 (F12)

---

![](1.png)

---

然後登入一次

觀察一下

然後你會發現

你什麼都沒發現

---

先不要灰心

我們先假裝登入錯試試看

---

![](2.png)

---

有東西了

然後照著上次的簡報

先登入看看吧

--

```python
import requests
from bs4 import BeautifulSoup
import getpass

url = 'https://myfcu.fcu.edu.tw/main/InfoMyFcuLogin.aspx'

username = input('請輸入學號:')
password = getpass.getpass('請輸入密碼:')

login = requests.get(url)

loginData = BeautifulSoup(login.text, "html.parser")

header = {
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7',
    'Cache-Control': 'max-age=0',
    'Connection': 'keep-alive',
    'DNT': '1',
    'Host': 'myfcu.fcu.edu.tw',
    'Upgrade-Insecure-Requests': '1',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36'
}

data = {
    'ScriptManager1': 'UpdatePanel1|OKButton',
    '__LASTFOCUS': '',
    '__EVENTTARGET': '',
    '__EVENTARGUMENT': '',
    '__VIEWSTATE': loginData.select("#__VIEWSTATE")[0]["value"],
    '__VIEWSTATEGENERATOR': loginData.select("#__VIEWSTATEGENERATOR")[0]["value"],
    '__SCROLLPOSITIONX': '0',
    '__SCROLLPOSITIONY': '0',
    '__EVENTVALIDATION': loginData.select("#__EVENTVALIDATION")[0]["value"],
    'txtUserName': username,
    'txtPassword': password,
    '__ASYNCPOST': 'true',
    'OKButton': 'login'
}

page = requests.post(url, headers=header, data=data)

print(page.text)
```

---

然後你應該會看到

```
47|pageRedirect||/main/S9901/S990107_login_guide.aspx?myfcu=true|
```

---

Redirect 是轉址的意思

簡單來講

就是他換網址了

---

所以我們用正則把它選出來

在跟原本的網址接上

在 POST 一次

--

```python
import requests
from bs4 import BeautifulSoup
import getpass
import re

url = 'https://myfcu.fcu.edu.tw/main/InfoMyFcuLogin.aspx'

username = input('請輸入學號:')
password = getpass.getpass('請輸入密碼:')

login = requests.get(url)

loginData = BeautifulSoup(login.text, "html.parser")

header = {
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7',
    'Cache-Control': 'max-age=0',
    'Connection': 'keep-alive',
    'DNT': '1',
    'Host': 'myfcu.fcu.edu.tw',
    'Upgrade-Insecure-Requests': '1',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36'
}

data = {
    'ScriptManager1': 'UpdatePanel1|OKButton',
    '__LASTFOCUS': '',
    '__EVENTTARGET': '',
    '__EVENTARGUMENT': '',
    '__VIEWSTATE': loginData.select("#__VIEWSTATE")[0]["value"],
    '__VIEWSTATEGENERATOR': loginData.select("#__VIEWSTATEGENERATOR")[0]["value"],
    '__SCROLLPOSITIONX': '0',
    '__SCROLLPOSITIONY': '0',
    '__EVENTVALIDATION': loginData.select("#__EVENTVALIDATION")[0]["value"],
    'txtUserName': username,
    'txtPassword': password,
    '__ASYNCPOST': 'true',
    'OKButton': 'login'
}

page = requests.post(url, headers=header, data=data)

url = re.findall("http.*tw", url)[0] + re.findall("/.*true", page.text)[0]

page = requests.post(url, headers=header, data=data)

print(page.text)
```

---

你應該又會拿到奇怪的網頁

我們再來回頭研究一下

---

回想一下剛剛轉址的網址

```
https://myfcu.fcu.edu.tw/main/S9901/S990107_login_guide.aspx?myfcu=true
```

如果你剛剛試著用 開發者工具 (F12) 看登入的過程有仔細看的話

你會發現其實第一個 POST 的就是這個網址

---

![](3.png)

---

有發現他的 header 變了嗎?

所以我們把新的 header 加上去在試一次

--

```python
import requests
from bs4 import BeautifulSoup
import getpass
import re

url = 'https://myfcu.fcu.edu.tw/main/InfoMyFcuLogin.aspx'

username = input('請輸入學號:')
password = getpass.getpass('請輸入密碼:')

login = requests.get(url)

loginData = BeautifulSoup(login.text, "html.parser")

header = {
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7',
    'Cache-Control': 'max-age=0',
    'Connection': 'keep-alive',
    'DNT': '1',
    'Host': 'myfcu.fcu.edu.tw',
    'Upgrade-Insecure-Requests': '1',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36'
}

data = {
    'ScriptManager1': 'UpdatePanel1|OKButton',
    '__LASTFOCUS': '',
    '__EVENTTARGET': '',
    '__EVENTARGUMENT': '',
    '__VIEWSTATE': loginData.select("#__VIEWSTATE")[0]["value"],
    '__VIEWSTATEGENERATOR': loginData.select("#__VIEWSTATEGENERATOR")[0]["value"],
    '__SCROLLPOSITIONX': '0',
    '__SCROLLPOSITIONY': '0',
    '__EVENTVALIDATION': loginData.select("#__EVENTVALIDATION")[0]["value"],
    'txtUserName': username,
    'txtPassword': password,
    '__ASYNCPOST': 'true',
    'OKButton': 'login'
}

page = requests.post(url, headers=header, data=data)

header = {
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7',
    'Connection': 'keep-alive',
    'Content-Type': 'application/json; charset=UTF-8',
    'DNT': '1',
    'Host': 'myfcu.fcu.edu.tw',
    'Origin': 'https://myfcu.fcu.edu.tw',
    'Referer': 'https://myfcu.fcu.edu.tw/main/InfoMyFcuLogin.aspx',
    'Upgrade-Insecure-Requests': '1',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36'
}

url = re.findall("http.*tw", url)[0] + re.findall("/.*true", page.text)[0]

page = requests.post(url, headers=header, data=data)

print(page.text)
```

---

照剛剛的慣例

你應該又會達到奇怪的網頁

這是為什麼呢?

---

這是因為你該才做的動作

對伺服器來說

其實是不同的人

所以我們要用 session

---

講簡單點就是類似身分證的東西

| session  | cookie |
| --- | --- |
| 讓伺服器認得你 | 讓瀏覽器認得你  |

---

所以我們改一下剛剛的程式碼

加上

```python
s = requests.Session()
```

這樣你所有的 GET 跟 POST 都會用 session

所以把剛剛程式碼的 `get` 跟 `post` 都用 `s` 取代

--

```python
import requests
from bs4 import BeautifulSoup
import getpass
import re

url = 'https://myfcu.fcu.edu.tw/main/InfoMyFcuLogin.aspx'

s = requests.Session()

username = input('請輸入學號:')
password = getpass.getpass('請輸入密碼:')

login = s.get(url)

loginData = BeautifulSoup(login.text, "html.parser")

header = {
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7',
    'Cache-Control': 'max-age=0',
    'Connection': 'keep-alive',
    'DNT': '1',
    'Host': 'myfcu.fcu.edu.tw',
    'Upgrade-Insecure-Requests': '1',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36'
}

data = {
    'ScriptManager1': 'UpdatePanel1|OKButton',
    '__LASTFOCUS': '',
    '__EVENTTARGET': '',
    '__EVENTARGUMENT': '',
    '__VIEWSTATE': loginData.select("#__VIEWSTATE")[0]["value"],
    '__VIEWSTATEGENERATOR': loginData.select("#__VIEWSTATEGENERATOR")[0]["value"],
    '__SCROLLPOSITIONX': '0',
    '__SCROLLPOSITIONY': '0',
    '__EVENTVALIDATION': loginData.select("#__EVENTVALIDATION")[0]["value"],
    'txtUserName': username,
    'txtPassword': password,
    '__ASYNCPOST': 'true',
    'OKButton': 'login'
}

page = s.post(url, headers=header, data=data)

header = {
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7',
    'Connection': 'keep-alive',
    'Content-Type': 'application/json; charset=UTF-8',
    'DNT': '1',
    'Host': 'myfcu.fcu.edu.tw',
    'Origin': 'https://myfcu.fcu.edu.tw',
    'Referer': 'https://myfcu.fcu.edu.tw/main/InfoMyFcuLogin.aspx',
    'Upgrade-Insecure-Requests': '1',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36'
}

url = re.findall("http.*tw", url)[0] + re.findall("/.*true", page.text)[0]

page = s.post(url, headers=header, data=data)

print(page.text)
```

@slideend
