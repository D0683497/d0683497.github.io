---
layout: Slide
title: Python 社課 - 總結
description: 逢甲大學 黑客社 第五屆 Python - 總結 教學簡報
original: true
time: 2018-11-13
category: HackerSir
tags:
    - Python
backToTop: false
---

@slidestart

# 總結

---

我們來大致總複習一下吧

---

首先我們花了兩星期建了環境

+ Python 3.6
+ (pip)
+ jupyter notebook

---

還記得 pip 要怎麼用嗎?

`pip install 要裝的東西`

---

然後我們大致的介紹網頁

花了三個星期

+ HTML
+ CSS
+ JavaScript

---

## HTML

是由許多的標籤總合而成

`<起始標籤>內容</結束標籤>`

他是用來顯示網頁的內容跟大致排一下版

---

## CSS

主要就是 CSS Selector

把你想要美化的元素選出來

在進行美化

![](1.png)

---

## JavaScript

其實這個東西很深奧

這節課還稍微帶到了前端後端的概念

---

## 正則表達式

大致上用了一星期

大家都學會像亂碼一樣的語法了嗎?

---

| 正則 | 功能 |
| --- | --- |
| `.` | 任意字元 |
| `*` | 任意次數 |
| `+` | 至少一次 |
| `?` | 零或一次 |
| `{ }` | 次數 |

> `+` 跟 `*` 是看前面的字

---

| 正則 | 功能 |
| --- | --- |
| `[ ]` | 集合 |
| `^` 在 `[ ]` 裡 | 補集 |
| `^` | 開頭 |
| `$` | 結尾 |
| `\|` | 或 |

> `\|` 如果開頭是相同的，長的要放前面

---

貪婪匹配

`*` `+` `?` `{次數}`

取消貪婪匹配

加 `?`

---

Python 正則

`import re`

`re.findall(正則表達式, 字, (flags))`

---

最後就是爬蟲

---

`import requests`

`from bs4 import BeautifulSoup`

---

## 爬蟲一

介紹了 GET、POST

然後實際的去 GET

再用 `select` `find_all`

去選元素

---

## 爬蟲二

主要介紹了 haeder

讓伺服器以為我們是瀏覽器

拿後拿到想要去的網址，跟原本的結合起來

---

## 爬蟲三

介紹了用 POST 加上 Data 去登入

也介紹了 `getpass` 讓輸入密碼的時候隱藏起來

然後網頁可能有一些隱藏的 input

必須再送資料的時候附上

---

## 爬蟲四

介紹了如果找不到資訊的時候

失敗一下也是可以的

然後也介紹了轉址

最後就是 session

--

```python
s = requests.Session()

s.get(url)
s.post(url)
```

---

其實在用爬蟲的時候

第一步就是用 開發者工具 (F12) 觀察

第二步就是把 header 附上

第三部就是 看要送什麼資料就送

---

其實伺服器在驗證的時候有時候不會全部都驗證

所以一開始我們先求成功

該給的都給他

然後再來慢慢的嘗試

看那些可以刪，那些不能刪

---

最後介紹一個小工具

```python
import time

time.sleep(秒數)
```

有時候爬蟲爬太快會被伺服器擋掉

所以需要適當的休息

把 `time.sleep(秒數)` 加在你想休息的地方

他就會暫停了

---

## 人數分析

<a href="/HackerSir/General-Meeting-of-Club-Members/Report" target="_blank" data-preview-link="false">點我</a>

---

## 下學期社課

--

### 架站 前端 -> 後端

---

之前有介紹過網頁的前端後端

---

### web框架?

---

什麼是框架?

--

為什麽要使用web框架呢？

+ 增強擴展性和穩定性
+ 比如建造一棟大樓，如果你從燒磚頭開始做起
+ 你燒出來的磚可能會很爛，導致大樓不穩和無法增加樓層
+ 可以降低開發難度，提高開發效率
    + 因為磚頭水泥等一切材料都不用自己造，直接買回來就可以用

---

WEB 是怎麼工作的?

+ web servers 發送 瀏覽器請求的內容
+ HTTP 方法
    + 不同的方法對應了客戶端能發起的不同請求，對應了客戶端不同的意圖
+ HTTP GET
    + 從 web server 獲取 (get) 數據，web 應用只需要返回請求的數據，無需其他操作

---

WEB 是怎麼工作的?

+ HTTP POST
    + POST 請求通常會導致web應用狀態的改變，明顯不只是查看網頁的 (例如:註冊)
+ HTTP response code
    + HTTP 狀態碼表明一個 HTTP 要求是否已經被完成。 (例如:404)
+ 與 DB 溝通

---

所以透過框架來達成這些目的

---

主要是講 Flask

---

### 淺談Flask?

--

#### 簡介

一個使用 Python 編寫的輕量級 Web 應用框架

--

#### 優點

+ 大家基本上已經學過 Python 所以可能比較好接觸他
+ 如果要做小網站的話很快

--

#### 缺點

要坐大網站的話會比較麻煩 (甚麼都要自己建)

---

### 與其他的比較?

---

- Ruby Ruby on Rails
- Javascript Express 基於Node.js
- php Laravel
- C# ASP.net
- Python Django Flask

---

最後的最後

---

感謝大家來參與

黑客社 Python 社課

希望大家都有學到東西

@slideend
