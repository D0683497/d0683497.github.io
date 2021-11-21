---
layout: Slide 
title: Python 社課 - CSS
description: 逢甲大學 黑客社 第五屆 Python - CSS 教學簡報
original: true
time: 2018-11-13
category: HackerSir
tags:
    - Python
backToTop: false
---

@slidestart

# CSS

---

他是

層疊樣式表

<mark>C</mark>ascading <mark>S</mark>tyle <mark>S</mark>heets

他決定了 HTML 要如何顯示

---

有兩種使用 CSS 的方式

+ 直接寫在 HTML 裡
    + 用 `<style>` 包起來
    + 寫在屬性 `style` 裡面
+ 寫在 `.css` 檔案裡，然後引入 HTML
    + `<link rel="stylesheet" type="text/css" href="檔案路徑">`

---

## CSS Syntax

![](1.png)

---

+ selector
    + 選擇你想要更改的 HTML 元素
+ declaration
    + 用來寫想要怎麼改，記得要用分號 (;) 隔開
+ property
    + 寫要改的東西，跟 value 要用冒號 (:) 隔開
+ value
    + 寫要怎麼改，跟 property 要用冒號 (:) 隔開

---

### CSS Selectors

+ element
    + 直接寫那個元素，不用加任何符號
+ id
    + 前面加上井字號 (#)
+ class
    + 前面加上點 (.)

---

## CSS Comments

CSS 的註解用 `/*` 跟 `*/` 包起來

---

## CSS Colors

顏色可以用以下幾種形式來表達

+ color names
+ RGB
+ HEX
+ HSL
+ RGBA
+ HSLA

---

範例

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

---

<a href="https://www.w3schools.com/colors/colors_names.asp" target="_blank" data-preview-link="false">詳情請看這</a>

---

### Background Color

`background-color:顏色;`

```html
<!DOCTYPE html>
<html>

<body>
    <h1 style="background-color:DodgerBlue;">背景是藍的</h1>
    <p style="background-color:Tomato;">背景是橘的</p>
</body>

</html>
```

---

### Text Color

`color:顏色;`

```html
<!DOCTYPE html>
<html>

<body>
    <h3 style="color:Tomato;">這個字是橘色的</h3>
    <p style="color:DodgerBlue;">這個字是藍色的</p>
</body>

</html>
```

---

### Border Color

`border:顏色;`

```html
<!DOCTYPE html>
<html>

<body>
    <h1 style="border: 2px solid Tomato;">他的邊框是橘色的</h1>
    <h1 style="border: 2px solid DodgerBlue;">他的邊框是藍色的</h1>
</body>

</html>
```

---

## CSS Backgrounds

---

### Background Color

`background-color: 顏色;`

```html
<!DOCTYPE html>
<html>

<head>
    <style>
        body {
            background-color: lightblue;
        }
    </style>
</head>

<body>
    <h1>背景是藍色的</h1>
    <p>這邊用另一種方法寫CSS</p>
</body>

</html>
```

---

### Background Image

+ `background-image: url(圖片);`
    + 它會自動重複，填滿整個畫面
+ `background-attachment: fixed;`
    + 讓圖片固定住，不會跟著頁面滾動

--

+ `background-repeat: repeat-x;`
    + 水平重複
+ `background-repeat: repeat-y;`
    + 垂直重複
+ `background-repeat: no-repeat;`
    + 不重複

---

範例

```html
<!DOCTYPE html>
<html>

<head>
    <style>
        body {
            background-image: url("test.png");
            /*background-repeat: repeat-x;*/
            /*background-repeat: repeat-y;*/
            /*background-repeat: no-repeat;*/
            /*background-attachment: fixed;*/

        }
    </style>
</head>

<body>
    <h1>我是標題</h1>
    <p>我是文字</p>
</body>

</html>
```

---

`background-position: 位置;`

位置參數

+ left
+ right
+ top
+ bottom
+ center

---

## CSS Box Model

![](2.png)

---

### CSS Borders

`border-style: 想要的邊框;`

---

| value | 描述 |
| --- | --- |
| dotted | 虛線 (點較密集) |
| dashed | 虛線 (點較稀疏) |
| solid | 實線 |
| double | 雙邊框 |
| none | 無邊框 |
| hidden | 隱藏的邊框 |

--

| value | 描述 |
| --- | --- |
| groove | 我不會描述，請看範例 |
| ridge | 我不會描述，請看範例 |
| inset | 我不會描述，請看範例 |
| outset | 我不會描述，請看範例 |
| 混和式 | 順序是 上、右、下、左 |

--

```html
<!DOCTYPE html>
<html>

<head>
    <style>
        p.dotted {
            border-style: dotted;
        }

        p.dashed {
            border-style: dashed;
        }

        p.solid {
            border-style: solid;
        }

        p.double {
            border-style: double;
        }

        p.groove {
            border-style: groove;
        }

        p.ridge {
            border-style: ridge;
        }

        p.inset {
            border-style: inset;
        }

        p.outset {
            border-style: outset;
        }

        p.none {
            border-style: none;
        }

        p.hidden {
            border-style: hidden;
        }

        p.mix {
            border-style: dotted dashed solid double;
        }
    </style>
</head>

<body>
    <h2>我是標題</h2>
    <p>我是沒設置邊框的字</p>

    <p class="dotted">A dotted border.</p>
    <p class="dashed">A dashed border.</p>
    <p class="solid">A solid border.</p>
    <p class="double">A double border.</p>
    <p class="groove">A groove border.</p>
    <p class="ridge">A ridge border.</p>
    <p class="inset">An inset border.</p>
    <p class="outset">An outset border.</p>
    <p class="none">No border.</p>
    <p class="hidden">A hidden border.</p>
    <p class="mix">A mixed border.</p>
</body>

</html>
```

--

+ 指定邊框要在哪邊
    + `border-top-style: 想要的邊框;`
    + `border-right-style: 想要的邊框;`
    + `border-bottom-style: 想要的邊框;`
    + `border-left-style: 想要的邊框;`
+ 指定邊框的寬度(單位 px)
    + `border-width: px;`
+ 讓四周的角變圓(單位 px)
    + `border-radius: px;`

--

```html
<!DOCTYPE html>
<html>

<head>
    <style>
        p.normal {
            border: 2px solid red;
        }

        p.round1 {
            border: 2px solid red;
            border-radius: 5px;
        }

        p.round2 {
            border: 2px solid red;
            border-radius: 8px;
            border-width: 5px;
        }

        p.round3 {
            border: 2px solid red;
            border-radius: 12px;
        }

        p.round4 {
            border-top-style: dotted;
            border-right-style: solid;
            border-bottom-style: dotted;
            border-left-style: solid;
        }
    </style>
</head>

<body>
    <h2>我是標題</h2>
    <p>我是沒設置邊框的字</p>

    <p class="normal">正常的邊框</p>
    <p class="round1">5px</p>
    <p class="round2">8px且邊框比較粗</p>
    <p class="round3">12px</p>
    <p class="round4">指定四周的邊框</p>
</body>

</html>
```

---

### CSS Margins

邊框跟四周的距離 (單位 px)

+ `margin-top: px;`
+ `margin-right: px;`
+ `margin-bottom: px;`
+ `margin-left: px;`

---

```html
<!DOCTYPE html>
<html>

<head>
    <style>
        div {
            border: 1px solid black;
            margin-top: 100px;
            margin-bottom: 100px;
            margin-right: 150px;
            margin-left: 80px;
            background-color: lightblue;
        }
    </style>
</head>

<body>
    <h2>我是標題</h2>
    <div>我離上面 100px，距離右邊 150px，距離下面 100px，距離左邊 80px</div>
</body>

</html>
```

---

+ 簡寫
    + `margin: 上px 右px 下px 左px;`
    + `margin: 上px 右跟左px 下px;`
    + `margin: 上跟下px 左跟右px;`
    + `margin: 上下左右px;`
+ 自動
    + `margin: auto;`
    + 瀏覽器會自動分配，幫它置中

---

### CSS Padding

字跟邊框的距離 (單位 px)

+ `padding-top: px;`
+ `padding-right: px;`
+ `padding-bottom: px;`
+ `padding-left: px;`

---

```html
<!DOCTYPE html>
<html>

<head>
    <style>
        div {
            border: 1px solid black;
            background-color: lightblue;
            padding-top: 50px;
            padding-right: 30px;
            padding-bottom: 50px;
            padding-left: 80px;
        }
    </style>
</head>

<body>
    <h2>我是標題</h2>
    <div>字離邊框上面 50px，離邊框右邊 30px，離邊框下面 50px，離邊框左邊 80px</div>
</body>

</html>
```

---

簡寫

+ `padding: 上px 右px 下px 左px;`
+ `padding: 上px 右跟左px 下px;`
+ `padding: 上跟下px 左跟右px;`
+ `padding: 上下左右px;`

---

## CSS Text

`text-align: 位置;`

+ left
+ right
+ center

---

```html
<!DOCTYPE html>
<html>

<head>
    <style>
        h1 {
            text-align: center;
        }

        h2 {
            text-align: left;
        }

        h3 {
            text-align: right;
        }
    </style>
</head>

<body>
    <h1>我在中間</h1>
    <h2>我在左邊</h2>
    <h3>我在右邊</h3>

    <p>我是正常的字</p>
</body>

</html>
```

---

讓字等距離

`text-align: justify;`

```html
<!DOCTYPE html>
<html>

<head>
    <style>
        div {
            border: 1px solid black;
            padding: 10px;
            width: 200px;
            height: 200px;
            text-align: justify;
        }
    </style>
</head>

<body>
    <h1>我是標題</h1>
    <p>我是正常的字</p>
    <div>
        In my younger and more vulnerable years my father gave me some advice that I've been turning over in my mind
        ever since. 'Whenever you feel like criticizing anyone,' he told me, 'just remember that all the people in this
        world haven't had the advantages that you've had.'
    </div>
</body>

</html>
```

@slideend
