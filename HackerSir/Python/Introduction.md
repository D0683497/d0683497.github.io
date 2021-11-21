---
layout: Slide
title: Python 社課 - 簡介
description: 逢甲大學 黑客社 第五屆 Python - 簡介 教學簡報
original: true
time: 2018-09-25
category: HackerSir
tags:
    - Python
backToTop: false
---

@slidestart

# 簡介

---

## Outline

+ 環境架設
+ Python 簡介
+ HTML、CSS、JavaScript 簡介
+ Regular Expression
+ 爬蟲實作
+ (Git)

---

### 環境架設

--

+ 裝 Python3.6
+ pip
+ jupyter notebook
+ (VS Code)
+ (~~Anaconda~~)

---

### Python 簡介

--

說是簡介

其實不簡單

這堂課你會拿到的簡報有兩份

--

+ Python 基礎
+ Python 基礎-範例

--

第一份是純內容的部分

第二份是範例的部分

光第一份純內容的部分就超過 100 頁

<!-- .element: class="fragment" data-fragment-index="1" -->

第二份也將近 50 頁

<!-- .element: class="fragment" data-fragment-index="2" -->

---

### HTML、CSS、JavaScript 簡介

--

就是教你不小心按到 F12 的時候

跑出來的那些東西是甚麼

--

像是你現在在簡報按右鍵

點檢視網頁原始碼

![](1.webp)

---

### Regular Expression

--

他是用像亂碼一樣的語法來選東西

這個學起來很屌

因為你會看起來像在亂打

然後東西就被選出來了

--

```python
import re

s = '登記人數 / 剩餘名額 / 開放名額：10/ 10/ 20'

people = re.findall(r'登記人數 / 剩餘名額 / 開放名額：([0-9]{1,3}) {0,}/ {0,}([0-9]{1,3}) {0,}/ {0,}([0-9]{1,3})', s)

enroll_people = people[0][0]
remain_people = people[0][1]
max_people = people[0][2]
print('登記人數:%s' %enroll_people)
print('剩餘名額:%s' %remain_people)
print('開放名額:%s' %max_people)
```

---

### 爬蟲實作

--

這個部分還在規劃

不過大致上大家會學到

+ GET
+ POST
+ Session
+ Cookie

--

GET 就是如何拿網頁資料

POST 就是如何送給網頁資料

--

Session 就是伺服器認得你要用的東西

Cookie 就是暫存在你這邊的資料

---

### Git

--

簡單來講他就是專門用來放程式碼的雲端

但是為什麼要學呢?

~~因為工程師最喜歡做讓人看不懂的事~~

因為這個雲端可以用指令去控制它

--

社課簡介大概就這樣啦

有人有問題嗎?

--

![](2.webp)

---

**金融科技與資料科學系列講座**

https://act.hackersir.org/

@slideend
