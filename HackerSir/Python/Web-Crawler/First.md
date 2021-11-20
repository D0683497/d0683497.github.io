---
layout: Slide
title: Python 社課 - 爬蟲一
description: 逢甲大學 黑客社 第六屆 Python - 爬蟲一 教學簡報
original: true
time: 2018-11-27
category: HackerSir
tags:
    - Python
backToTop: false
---

@slidestart

# 爬蟲一

---

![](1.png)

<!--
```mermaid
Client -> Server: Requests
Server -> Client: Resopnse
```
-->

---

| HTTP 請求方法 | 描述 |
| --- | --- |
| GET | 跟伺服器拿一個東西 |
| POST | 向伺服器丟東西 |

---

[Requests 官方文件](http://docs.python-requests.org/en/master/user/quickstart/)

[Beautiful Soup 官方文件](https://www.crummy.com/software/BeautifulSoup/bs4/doc/)

---

先來爬

`https://www.ptt.cc/bbs/index.html`

---

```python
import requests

page = requests.get('https://www.ptt.cc/bbs/index.html')

print(page)
```

---

他會出現 `<Response [200]>`

---

| 狀態碼 | 描述 |
| --- | --- |
| 200 | 成功 |
| 3xx | 重新導向 |
| 404 | 找不到頁面 |
| 403 | 權限不足 |
| 500 | 伺服器掛了 |

[詳情](https://zh.wikipedia.org/wiki/HTTP状态码)

---

但是我們要的是內容，不是他的狀態碼

所以在後面加上 `.text` 他就可以印出內容了

---

```python
import requests

page = requests.get('https://www.ptt.cc/bbs/index.html')

print(page.text)
```

--

後面也可以加上 `.url` 看網址

加上 `.encoding` 看編碼

---

假設今天我們想要拿到它的標題

打開開發者工具 (F12)

我們可以看到標題都在 `<div class="board-title"></div>` 裡面

---

所以標題在

`div` 標籤裡

然後 class 是 `board-title`

---

我們先安裝 Beautiful Soup

`pip install beautifulsoup4`

---

然後先把剛剛拿掉的資料丟給 Beautiful Soup 分析

讓他轉成我們可以用的格式

`BeautifulSoup(拿到的資料.text, "html.parser")`

---

記得要先引入 Beautiful Soup

`from bs4 import BeautifulSoup`

---

```python
from bs4 import BeautifulSoup
import requests

page = requests.get('https://www.ptt.cc/bbs/index.html')

pageData = BeautifulSoup(page.text, "html.parser")

print(pageData)
```

---

大家可以看到

現在印出來的跟剛才的差不多

但其實他的格式已經被轉換了

可以用 `type` 看一下他的型態

---

接下來我們要拿 div 標籤

要用 `資料.select(要選的東西)`

---

至於要選的東西是甚麼呢?

| 要選的東西 | 選法 |
| --- | --- |
| 標籤 | 直接寫標籤 |
| id | # |
| class | . |

---

所以現在我們要選 div 標籤

要寫成

`資料.select("div")`

---

```python
from bs4 import BeautifulSoup
import requests

page = requests.get('https://www.ptt.cc/bbs/index.html')

pageData = BeautifulSoup(page.text, "html.parser")

title = pageData.select("div")

print(title)
```

---

大家可以看到全部的 div 標籤都被我們拿到了

但我們的目標是標題

標題在 `class="board-title"` 裡面

---

所以應該要改成

資料.select("div.class的名稱")

---

```python
from bs4 import BeautifulSoup
import requests

page = requests.get('https://www.ptt.cc/bbs/index.html')

pageData = BeautifulSoup(page.text, "html.parser")

title = pageData.select("div.board-title")

print(title)
```

---

現在我們拿到了全部的標題了

但是我們只需要它的內容

不需要它的標籤

---

```python
from bs4 import BeautifulSoup
import requests

page = requests.get('https://www.ptt.cc/bbs/index.html')

pageData = BeautifulSoup(page.text, "html.parser")

title = pageData.select("div.board-title")

for content in title:
    print(content.text)
```

---

## 更多的 CSS Selector

--

| 要選的東西 | 選法 |
| --- | --- |
| 標籤 A 裡面的標籤 B | `標籤A 標籤B` |
| 標籤 A (父) 裡面的標籤 B (子) | `A > B` |
| 在標籤 A 之後的標籤 B | `A + B` |
| 多個標籤 | `標籤A,標籤B,標籤C...` |

--

| 要選的東西 | 選法 |
| --- | --- |
| 有屬性的標籤 | `標籤[屬性]` |
| 指定屬性值的標籤 | `標籤[屬性='屬性值']` |
| 指定屬性值**開頭**的標籤 | `標籤[屬性^='屬性值']` |
| 指定屬性值**結尾**的標籤 | `標籤[屬性$='屬性值']` |
| **存在**屬性值的標籤 | `標籤[屬性*='屬性值']` |

---

除了用上面的方法

也可以用 `find_all()` 跟 `find()`

`find()` 只找一筆資料

`find_all()` 是找全部的

---

如果要找標籤的話

`find_all('標籤名稱')`

---

要找屬性的話可以用

`find_all(屬性='屬性值')`

例如: `find_all(class_='board-title')`

> class 是 python 的保留字，所以要在後面加底線 (`_`)

---

也可以找內容

`find_all(text="要找的字")`

---

也可以限制找到的資料數量

`find_all(limit=數量)`

---

大家來練習看看用 `find_all()` 來改剛才的 code

---

```python
from bs4 import BeautifulSoup
import requests

page = requests.get('https://www.ptt.cc/bbs/index.html')

pageData = BeautifulSoup(page.text, "html.parser")

title = pageData.find_all('div', class_='board-title')

for data in title:
    print(data.text)
```

---

現在我們來爬

`https://www.ptt.cc/bbs/TaichungBun/index.html`

---

```python
from bs4 import BeautifulSoup
import requests

page = requests.get('https://www.ptt.cc/bbs/TaichungBun/index.html')

pageData = BeautifulSoup(page.text, "html.parser")

title = pageData.find_all('div', class_='title')

for data in title:
    try:
        print(data.find('a').text)
    except:
        pass
```

---

```python
from bs4 import BeautifulSoup
import requests

page = requests.get('https://www.ptt.cc/bbs/TaichungBun/index.html')

pageData = BeautifulSoup(page.text, "html.parser")

title = pageData.select("div.title > a")

for data in title:
    print(data.text)
```

@slideend
