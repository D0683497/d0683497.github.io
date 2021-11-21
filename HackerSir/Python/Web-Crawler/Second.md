---
layout: Slide
title: Python 社課 - 爬蟲二
description: 逢甲大學 黑客社 第五屆 Python - 爬蟲二 教學簡報
original: true
time: 2018-12-03
category: HackerSir
tags:
    - Python
backToTop: false
---

@slidestart

# 爬蟲二

---

我們今天來爬

`https://www.dcard.tw/f`

---

首先先像上節課一樣去爬吧

--

```python
from bs4 import BeautifulSoup
import requests

url = 'https://www.dcard.tw/f'

page = requests.get(url)

print(page)
```

---

發現問題了嗎?

---

他回你 `<Response [503]>`

---

其實瀏覽器在跟伺服器拿網頁的時候還會加上一個東西

`header`

我們可以打 開開發者工具 (F12)

看 header 長甚麼樣子

---

<img src="1.png" width="60%" height="">

---

所以現在我們要加上 header 然後再去 GET

但只需要加 user-agent 那欄就好

因為我們的目的是要讓伺服器把我們當成瀏覽器

--

```python
from bs4 import BeautifulSoup
import requests

url = 'https://www.dcard.tw/f'

header = {
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36'
}

page = requests.get(url, headers=header)

print(page)
```

---

現在可以正常的拿資料了

那大家練習一下印出標題吧

--

```python
from bs4 import BeautifulSoup
import requests

url = 'https://www.dcard.tw/f'

header = {
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36'
}

page = requests.get(url, headers=header)

pageData = BeautifulSoup(page.text, "html.parser")
title = pageData.select("h3")

for content in title:
    print(content.text)
```

---

現在我們嘗試從首頁拿到第一個文章的網址

然後爬一下文章吧

---

首先我們要先找網址

大家練習一下吧

--

```python
from bs4 import BeautifulSoup
import requests

url = 'https://www.dcard.tw/f'

header = {
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36'
}

page = requests.get(url, headers=header)

pageData = BeautifulSoup(page.text, "html.parser")

link = []

for tmp in pageData.select("div.PostList_wrapper_2BLUM > a"):
    link.append(tmp.get('href'))

for content in link:
    print(content)
```

---

現在網址跟標題都拿到了

我們就開始看文章吧

大家先嘗試拿第一篇文章就好

Hits: 把網址跟前面的 url 合起來，可能會用到正則

--

```python
from bs4 import BeautifulSoup
import requests
import re

url = 'https://www.dcard.tw/f'

header = {
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36'
}

page = requests.get(url, headers=header)

pageData = BeautifulSoup(page.text, "html.parser")

title = pageData.select("h3")

link = []

for tmp in pageData.select("div.PostList_wrapper_2BLUM > a"):
    link.append(tmp.get('href'))

#print(title[0].text + link[0])

url = re.findall("https://www.dcard.tw", url)[0] + link[0]

#print(url)

post = requests.get(url, headers=header)

#print(post.text)

postData = BeautifulSoup(post.text, "html.parser")

postContent = postData.select("div.Post_content_NKEl9")

for content in postContent:
    print(content.text)
```

@slideend
