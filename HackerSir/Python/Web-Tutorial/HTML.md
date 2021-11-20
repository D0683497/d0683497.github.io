---
layout: Slide
title: Python 社課 - HTML
description: 逢甲大學 黑客社 第六屆 Python - HTML 教學簡報
original: true
time: 2018-10-30
category: HackerSir
tags:
    - Python
backToTop: false
---

@slidestart

# HTML

---

HTML 是什麼呢?

--

他是一種

超文本標記語言

<mark>H</mark>yper<mark>T</mark>ext <mark>M</mark>arkup <mark>L</mark>anguage

他不是程式語言

他是用類似標籤的東西去呈現畫面

--

最簡單的 HTML 範例

```html
<!DOCTYPE html>

<html>
    <head>
        <title>Page Title</title>
    </head>
    <body>
        <h1>This is a Heading</h1>
        <p>This is a paragraph.</p>
    </body>
</html>
```

--

+ `<!DOCTYPE html>`
    + 類似 C 語言的標頭檔
    + 標明他是 HTML
+ `<html>`
    + 最基本的 HTML元素
+ `<head>`
    + 裡面放一些跟整份 HTML 有關的東西
    + 例如: CSS、javascript

--

+ `<title>`
    + 網頁的標題
    + 要放在`<head>`裡
+ `<body>`
    + 整個網頁看的到的內容都在這裡
+ `<h1>`
    + 文字的標題
+ `<p>`
    + 放文字

--

每個HTML標籤都長這樣

```html
<起始標籤>內容</結束標籤>
```

> 有些標籤不用結束標籤

---

## HTML Tag

---

### The HTML `<head>` Element

+ `<head>` 裡面放跟整份 HTML 相關的東西
+ 他裡面可以放 `<title>` `<style>` `<meta>` `<link>` `<script>` `<base>`
+ 以下會一一介紹

---

### The HTML `<title>` Element

+ 用來表示整個網頁的標題
+ 當你把網頁加到我的最愛或書籤的時候，顯示的就是 `<title>` 裡面的字
+ 用 Google 搜尋時，顯示的也是 `<title>` 裡面的字

---

### The HTML `<style>` Element

+ 用來放 CSS 的程式碼
+ 裡面放的 CSS 只影響這份 HTML

---

### The HTML `<link>` Element

+ 用來導入外部的 CSS 程式碼
+ 範例: `<link rel="stylesheet" type="text/css href="要引入的CSS檔案">`

---

### The HTML `<meta>` Element

+ 用來定義文字編碼
    + `<meta charset="UTF-8">`
    + [詳細請看這](https://zh.wikipedia.org/wiki/字符编码)
+ 用來描述這個網頁
    + 用 Google 搜尋時，下面簡介顯示的就是這個
    + `<meta name="description" content="描述">`

--

+ 定義關鍵字
    + `<meta name="keywords" content="關鍵字1, 關鍵字2">`
    + 每個關鍵字都要用逗號(,)隔開
+ 定義作者
    + `<meta name="author" content="作者">`
+ 讓網頁自動更新
    + `<meta http-equiv="refresh" content="秒數">`

---

### The HTML `<script>` Element

用來放 JavaScript 的程式碼

---

### The HTML `<base>` Element

用來改變路徑

--

假設我現在的檔案路徑

+ index.html
+ /image
    + 123.jpg

--

+ 如果沒有用 `<base>`，當我要用 123.jpg 的時候，要寫成 `<img src="image/123.jpg">`
+ 如果用 `<base href="image/">`，當我要用 123.jpg 的時候，只要寫 123.jpg `<img src="123.jpg">`

---

### HTML Headings

--

標題的標籤從大到小分別是 

`<h1>` 到 `<h6>`

--

```html
<h1>標題(最大)</h1>
<h2>標題</h2>
<h3>標題</h3>
<h4>標題</h4>
<h5>標題</h5>
<h6>標題(最小)</h6>
```

---

### HTML Horizontal Rules

+ `<hr>` 用來表示水平線
+ 通常一個段落結束後會用他，或單純想要區分內容
+ **`<hr>` 不用結束標籤**

--

```html
<!DOCTYPE html>
<html>
<body>

<h1>標題一</h1>
<p>標題一，內容</p>
<hr>

<h2>標題二</h2>
<p>標題二，內容</p>

</body>
</html>
```

---

### HTML Paragraphs

--

文字要放在 `<p>` 裡面

+ `<p>` 跟 `<p>` 之間會自動換行
+ 在 `<p>` 裡面換行他不會理你
+ 要用 `<br>` 才會換行

> `<br>` 沒有結束標籤

--

```html
<p>這裡放文字</p>

<p>這樣他不會
換行</p>

<p>這樣才會<br>換行</p>
```

--

剛剛講過，在 `<p>` 裡面的換行是沒有作用的

那要如何讓他有作用呢?

那就要用 `<pre>`

--

```html
<pre>
    使用這個標籤
    
    這樣文字的格式
    
    就會跟你打得一模一樣
</pre>
```

--

如果想要表示這段文字是程式碼的話

就要用 `<code>`

--

```html
<code>
x = 5;<br>
y = 6;<br>
z = x + y;
</code>
```

---

### HTML Text Formatting

---

#### 強調

+ `<b>` 元素可以把文字加粗
    + 想用的時候就用，沒有特殊意義
    + 範例: `<b>這是一段加粗的文字</b>`
+ `<strong>` 元素可以把文字加粗，用來強調
    + 通常用來增強語調的重要性
    + 範例: `<strong>這段文字是加粗的而且很重要</strong>`

---

#### 斜體

+ `<i>` 元素可以把文字變成斜體
    + 想用的時候就用，沒有特殊意義
    + 範例: `<i>這是一段斜體的文字</i>`
+ `<em>` 元素可以把文字變成斜體，用來強調
    + 通常用來增強語調的重要性
    + 範例: `<em>這段文字是斜體而且很重要</em>`

--

> 瀏覽器在呈現 `<b>` 跟 `<strong>` 或是 `<i>` 跟 `<em>` 他們看起來是一樣的

---

#### 變小

+ 用 `<small>` 可以讓文字變小
+ 範例: `<p>這是一段<small>變小</small>的文字</p>`

---

#### 標記

+ 用 `<mark>` 可以像螢光筆一樣標記文字
+ 範例: `<p>這是一段<mark>被標記</mark>的文字</p>`

---

#### 刪除線

+ 用 `<del>` 可以讓文字上有刪除線
+ 範例: `<p>這是一段<del>有刪除線</del>的文字</p>`

---

#### 底線

+ 用 `<ins>` 可以幫文字加上底線
+ 範例: `<p>這是一段<ins>有底線</ins>的文字</p>`

---

#### 下標

+ `<sub>` 標籤，用來表示下標
+ 範例: `<p>這是一段<sub>有下標</sub>的文字</p>`

---

#### 上標

+ `<sup>` 標籤，用來表示上標
+ 範例: `<p>這是一段<sup>有上標</sup>的文字</p>`

---

### HTML Comments

+ HTML的註解用 `<!--` 跟 `-->` 包起來
+ 註解並不會顯示在瀏覽器上

--

```html
<!-- 這是註解 -->
```

```html
<!-- 
這是
很多行
的註解
-->
```

---

### HTML Links

--

網址要放在 `<a>` 裡面

但是還要加上 `href` 他才會作用

--

```html
<a href="這裡放網址">這裡放文字</a>
```

---

#### The target Attribute

+ target屬性，可以定義點開連結的時候瀏覽器會怎麼打開

--

| value | 描述 |
| --- | --- |
| `_blank` | 在新的頁面開啟 |
| `_self` | 在當前頁面開啟 (預設) |
| `_parent` | 在上一個框架中打開 |
| `_top` | 若原本在`<iframe>`裡面，則會另外開出一個新頁面(預設是開在裡面) |
| framename | 在指定的框架中打開 |

---

#### The title Attribute

title 屬性，可以讓滑鼠移到連結上時出現字

--

```html
<a href="網址" title="滑鼠移到連結上想出現的字">內容</a>
```

---

### HTML Images

--

圖片要放在 `<img>` 裡

但要用 `src` 告訴網頁圖片路徑

也可加上 `alt` 萬一圖片顯示不出來時，會顯示裡面的字

也可加上 `width`、`height` 指定圖片寬跟高

--

```html
<img src="檔案路徑">
```

> 除了放圖片 (`jpg`、`png`) 也可以放 `gif`

--

長、寬除了直接用屬性指定以外

也可用CSS的 `<style>` 標籤指定

```html
<img src="img_girl.jpg" alt="Girl in a jacket" style="width:500px;height:600px;">
```

---

### HTML Buttons

--

按鈕用 `<button>`

```html
<button>文字</button>
```

---

### HTML Lists

--

清單的話分成兩種

+ `<ul>`
    + 顯示符號
+ `<ol>`
    + 顯示數字

不管是哪種裡面的項目都用 `<li>`

--

```html
<ul>
    <li>第一項</li>
    <li>第二項</li>
    <li>第三項</li>
</ul>
```

```html
<ol>
    <li>第一項</li>
    <li>第二項</li>
    <li>第三項</li>
</ol>
```

---

#### Unordered HTML List

+ 顯示符號的清單
+ 用 `<ul>` 與 `<li>`
+ 預設的符號是**黑色實心圓形**，可以用 style 屬性去改變

--

| 值 | 描述 |
| --- | --- |
| list-style-type:disc | 黑色實心圓形 (預設) |
| list-style-type:circle | 黑色空心圓形 |
| list-style-type:square | 黑色實心正方形 |
| list-style-type:none | 沒有符號 |

--

```html
<ul style="list-style-type:square">
    <li>第一項</li>
    <li>第二項</li>
    <li>第三項</li>
</ul>
```

---

#### Ordered HTML List

+ 顯示數字的清單
+ 用 `<ol> `與 `<li>`
+ 預設的數字 1,2,3...，可以用 type 屬性去改變
+ 數字的一開始可以用 start 屬性去改變

--

| Type | Description |
| --- | --- |
| type="1" | 1,2,3... (預設) |
| type="A" | A,B,C... |
| type="a" | a,b,c... |
| type="I" | I,II,III,IV... |
| type="i" | i,ii,iii,iv... |

--

```html
<ol type="i">
    <li>第一項</li>
    <li>第二項</li>
    <li>第三項</li>
    <li>第四項</li>
</ol>
```

```html
<ol type="i" start="10">
    <li>第一項</li>
    <li>第二項</li>
    <li>第三項</li>
    <li>第四項</li>
</ol>
```

---

#### HTML Description Lists

+ 描述清單的項目
+ 用 `<dl>` 開頭，`<dt>` 定義項目，`<dd>` 定義項目的描述

--

```html
<dl>
    <dt>第一項</dt>
    <dd>第一項的描述</dd>
    <dt>第二項</dt>
    <dd>第二項的描述1</dd>
    <dd>第二項的描述2</dd>
</dl>
```

---

#### Nested HTML Lists

清單裡面還有清單

--

```html
<ul>
    <li>第一項</li>
    <li>第二項
        <ul>
            <li>第二項裡面的第一項</li>
            <li>第二項裡面的第二項</li>
        </ul>
    </li>
    <li>第三項</li>
</ul>
```

> 用巢狀的無序清單，裡面的符號他會自己變化

--

```html
<ol type="A">
    <li>第一項</li>
    <li>第二項
        <ol type="a">
            <li>第二項裡面的第一項</li>
            <li>第二項裡面的第二項</li>
        </ol>
    </li>
    <li>第三項</li>
</ol>
```

---

### HTML Tables

--

+ 外面用 `<table>` 標籤包起來
+ 每一行的字用 `<tr>`
+ 表格首用 `<th>`
+ 表格內容用 `<td>`
+ 標格標題用 `<caption>`

--

橫的表格

```html
<table>
    <caption>表格標題</caption>
    <tr>
        <th>表格首一</th>
        <th>表格首二</th>
    </tr>
    <tr>
        <td>表格內容1-1</td>
        <td>表個內容2-1</td>
    </tr>
    <tr>
        <td>表格內容1-2</td>
        <td>表格內容2-2</td>
    </tr>
</table>
```

--

直的表格

```html
<table>
    <caption>表格標題</caption>
    <tr>
        <th>表格首一</th>
        <td>表格內容1-1</td>
        <td>表格內容1-2</td>
    </tr>
    <tr>
        <th>表格首二</th>
        <td>表個內容2-1</td>
        <td>表格內容2-2</td>
    </tr>
</table>
```

---

#### Cells that Span Many Columns snd Rows

+ colspan 屬性，可以讓一個格子跨越多**列**
+ rowspan 屬性，可以讓一個格子跨越多**行**

--

橫的表格

```html
<table>
    <tr>
        <th>表格首一</th>
        <th colspan="2">表格首二</th>
    </tr>
    <tr>
        <td>表格內容1</td>
        <td>表格內容2-1</td>
        <td>表格內容2-2</td>
    </tr>
</table>
```

--

直的表格

```html
<table>
    <tr>
        <th>表格首一</th>
        <td>表格內容1</td>
    </tr>
    <tr>
        <th rowspan="2">表格首二</th>
        <td>表格內容2-1</td>
    </tr>
    <tr>
        <td>表格內容2-2</td>
    </tr>
</table>
```

---

### HTML Form Elements

+ 表單用來讓使用者填入資料，並送入後端
+ 表單最外面用 `<form>` 包住

--

```html
<form>
    帳號:<br>
    <input type="text" name="username" value="預設框框內的字">
    <br>
    密碼:<br>
    <input type="password" name="password">
    <br><br>
    <input type="submit" value="登入">
</form>
```

---

### The input Element

+ `<input>` 用來輸入各種東西
+ 可以用 type 屬性來表示各種輸入的東西

--

| Type | 描述 |
| --- | --- |
| `<input type="text">` | 輸入文字 |
| `<input type="password">` | 輸入密碼 |
| `<input type="submit">` | 表示提交的按鈕 |
| `<input type="button">` | 按鈕 |
| `<input type="reset">` | 重設表單裡面的值 |
| `<input type="file">` | 上傳檔案 |

--

| Type | 描述 |
| --- | --- |
| `<input type="hidden">` | 把整個標籤隱藏起來 |
| `<input type="radio">` | 表示單選 |
| `<input type="checkbox">` | 表示複選 |
| `<input type="reset">` | 重設表單裡面的值 |
| `<input type="image">` | 讓按鈕變成圖片 |

--

<a href="https://www.w3schools.com/tags/att_input_type.asp" target="_blank" data-preview-link="false">了解更多</a>

---

#### The value Attribute

value 屬性，可以讓輸入框裡面有預設的值

---

#### The readonly Attribute

readonly 屬性，可以把輸入框裡面的字設為不能修改

---

#### The disabled Attribute

disabled 屬性，可以把輸入框設為失效

---

#### The size Attribute

size 屬性，可以改變輸入框的大小

---

#### The maxlength Attribute

maxlength 屬性，可以限制輸入的字數

---

#### The method Attribute

method 屬性，可以定義如何送資料

--

| value | 描述 |
| --- | --- |
| GET | 送資料時，會顯示在 URL 上 |
| POST | 送資料時，不會顯示在 URL 上 |

---

### HTML Iframes

+ 他可以在網頁中再開一個網頁
+ 範例: `<iframe src="網址"></iframe>`

---

## HTML Attributes

--

+ 全部的HTML標籤都可以有**屬性**
+ **屬性**可以擴充元素的功能
+ **屬性**只放在起始標籤
+ **屬性**通常表示成 `屬性名稱="他的值"`

---

### HTML The class Attribute

+ 一個元素裡面可以有多個 class 屬性，用空白隔開
+ class 是用來幫助 CSS 跟 JavaScript 選取
+ 在 CSS 裡面選 class 要用點 (.)
+ 範例: `<p class="class名稱1 class名稱2">內容</p>`

---

### HTML The id Attribute

+ id 屬性是唯一的，也就是整個 HTML 裡面只能有一個 id
+ id 是用來幫助 CSS 跟 JavaScript 選取
+ 在 CSS 裡面選 id 要用井字號 (#)
+ 範例: `<p id="id名稱">內容</p>`

--

> 一個 class 可以用在很多標籤身上，一個 id 只能用在一個標籤身上

---

### The href Attribute

+ 只被使用在 `<a>` 裡面，用來表示超連結的網址
+ 範例: `<a href="網址">內容</a>`

---

### The src Attribute

+ 只被使用在 `<img>` 裡面，用來表示圖片的路徑
+ 範例: `<img src="圖片路徑">`

---

### The width and height Attributes

+ 用來設置圖片的寬跟高
+ 範例: `<img src="圖片路徑" width="寬度" height="高度">`

> 長度跟寬度使用的單位是 pixels (象素)

---

### The alt Attribute

+ 萬一圖片顯示不出來的時候，如果有 alt 屬性，瀏覽器會自動轉成裡面的字
+ 範例: `<img src="圖片路徑" alt="替代文字">`

---

### The style Attribute

在標籤裡面可以加入 `style` 屬性

他可以指定字體、字的顏色、字的大小...

但通常這種東西會用 CSS 來寫

---

#### Background Color

+ 用來定義整個網頁的背景顏色
+ 範例: `style="background-color:顏色;"`

--

```html
<!DOCTYPE html>
<html>
<body style="background-color:powderblue;">

<h1>我是標題</h1>
<p>我是內容</p>

</body>
</html>
```

---

#### Text Color

+ 用來定義字的顏色
+ 範例: `style="color:顏色;"`

--

```html
<!DOCTYPE html>
<html>
<body>

<h1>我是標題</h1>
<p style="color:red";>我是紅的</p>
<p style="color:blue";>我是藍的</P>

</body>
</html>
```

---

##### HTML Colors

+ 顏色除了用直接描述的以外，也可用以下幾種方法表達
  + RGB values
  + HEX values
  + HSL values
  + RGBA values
  + HSLA values

--

```html
<!DOCTYPE html>
<html>
<body>

<h1 style="background-color:rgb(255, 99, 71);">用RGB來表達</h1>
<h1 style="background-color:#ff6347;">用十六進位來表達</h1>
<h1 style="background-color:hsl(9, 100%, 64%);">用HSL來表達</h1>

<h1 style="background-color:rgba(255, 99, 71, 0.5);">用RGB加透明度來表達</h1>
<h1 style="background-color:hsla(9, 100%, 64%, 0.5);">用HSL加透明度來表達</h1>

</body>
</html>
```

--

<a href="https://www.w3schools.com/colors/colors_names.asp" target="_blank" data-preview-link="false">更多顏色請點這</a>

---

#### Fonts

用來定義字型

> 字型還要看你的電腦有沒有安裝
> 沒有的話瀏覽器會自動換成已安裝的

--

```html
<!DOCTYPE html>
<html>
<body>

<h1>我是標題</h1>
<p style="font-family:courier;">attention to my font</p>
<p style="font-family:verdana;">attention to my font</p>

</body>
</html>
```

---

#### Text Size

用來改變字的大小

--

```html
<!DOCTYPE html>
<html>
<body>

<h1>我是標題</h1>
<p style="font-size:160%;">我比較小</p>
<p style="font-size:300%;">我比較大</p>

</body>
</html>
```

---

#### Text Alignment

用來改變字的位置

--

```html
<!DOCTYPE html>
<html>
<body>

<h1>我是標題</h1>
<p style="text-align:center;">我在中間</p>
<p style="text-align:right;">我在右邊</p>

</body>
</html>
```

---

### The lang Attribute

+ 只能用在 `<html>`
+ lang 屬性，可以指定整份HTML的**語言**
+ 跟 `<meta>` 標籤裡面的 charset 屬性的**編碼**不一樣
+ 範例: `<html lang="en-US">`

--

<a href="https://www.w3schools.com/tags/ref_language_codes.asp" target="_blank" data-preview-link="false">更多語言</a>

<a href="https://www.w3schools.com/tags/ref_country_codes.asp" target="_blank" data-preview-link="false">更多國家</a>

---

### The title Attribute

+ title 屬性，可以讓滑鼠移到文字上面時，顯示出指定的內容
+ 範例: `<p title="指定的內容">原本的文字</p>`

---

## HTML Layout Elements

![](1.png)

@slideend
