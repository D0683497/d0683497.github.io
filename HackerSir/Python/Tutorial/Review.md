---
layout: Slide
title: Python 社課 - 複習
description: 逢甲大學 黑客社 第五屆 Python - 複習 教學簡報
original: true
time: 2018-10-17
category: HackerSir
tags:
    - Python
backToTop: false
---

@slidestart

# 複習

---

## 型態

+ int (整數)
+ float (浮點數)
+ bool (布林值)
+ str (字串)
+ List (列表)
+ Tuple (元组)
+ Dictionary (字典)

---

index 取值

+ 兩種取值順序
    + 從左到右索引從 0 開始
    + 從右到左索引從 -1 開始

| 字串 | a | s | d | f |
| --- | --- | --- | --- | --- |
| 第一種索引  | 0 | 1 | 2 | 3 |
| 第二種索引  | -4 | -3 | -2 | -1 |


---

### str

字串顧名思義就是一串字

在 Python 中宣告字串可以用單引號(`'`)或雙引號(`"`)

--

#### 特殊字串

如果字串裡面有包含特殊字元

要使用**脫逸字元**反斜線

`\`

---

### List

列表基本語法

```python
變數 = [東西1, 東西2, ...]
```

---

### Tuple

元組基本語法

```python
變數 = (東西1, 東西2, ...)
```

--

元組中只包含一個元素時，需要在元素後面加逗號(`,`)

```python
tup = (50,)
```

---

### Dictionary

字典基本語法

```python
變數 = {key1:value1, key2:value2, ...}
```

key 是唯一的，如果重複，最後一個 key 的 value 會代替前面的

value 可以重複沒關係

--

拿字典裡的東西

```python
dict[key]
```

**只能用 key 去拿 value**

所以要修改 value 時，只能用 key 去找

---

## 型態轉換

Python 的型態轉換就是直接在變數前面加你要的型態

---

## print

print 基本語法

```python
print(項目1[, 項目2, ..., sep=分隔字元, end=結束字元])
```

--

print 參數格式化

```python
print(項目 % (參數列))
```

--

| 參數 | 說明 |
| --- | --- |
| `%d` | 整數 |
| `%f` | 浮點數 |
| `%s` | 字串 |
| `%c` | 字元 |

---

## input

input 基本語法

```python
變數名稱 = input('提示字')
```

> input 丟給變數是丟字串型態的，如果要運算的話要轉換型態

---

## 算數運算子

--

| 運算子 | 意義 |
| --- | --- |
| `+` | 相加 |
| `-` | 相減 |
| `*` | 相乘 |
| `/` | 相除 |
| `%` | 取餘數 |
| `//` | 取商數 |
| `**` | 次方 |

--

> `/`、`%`、`//` 與除法有關，所以被除數不能為 0，經過除法整數都會變成浮點數

---

## 關係運算子

--

| 運算子 | 意義 |
| --- | --- |
| `==` | 等於 |
| `!=` | 不等於 |
| `>` | 大於 |
| `<` | 小於 |
| `>=` | 大於或等於 |
| `<=` | 小於或等於 |

---

## 邏輯運算子

--

| 運算子 | 意義 |
| --- | --- |
| `not` | 相反 |
| `and` | 兩者為真才為真 |
| `or` | 其中一者為真即為真 |

---

## 成員運算子

| 運算子 | 意義 |
| --- | --- |
| `in` | 在指定的序列中找到值返回 `True`，否則返回 `False` |
| `not in` | 指定的序列中**沒有**找到值返回 `True`，否則返回 `False` |

---

## 縮排

因為 Python 不像其他程式語言使用大括號來區隔 `{}`

而是使用縮排

縮排最常見的是 `tab` 或是 4 格空白

**不要混著用**

---

## 判斷式

```python
if (條件式一):
    條件式一成立，要做的事

elif (條件式二):
    條件式二成立，要做的事

else:
    上述條件式都不成立，要做的事
```

---

## 迴圈

--

迴圈就是一直做重複的事情

+ Python 迴圈分兩種
    + for
    + while

那如果我中間想要他停下來呢，那就要用

+ `break`
+ `continue`
+ `pass`

---

### range

range基本語法

```python
range(start, stop[, step])
```

> 通常 `range()` 會配合 for 迴圈來使用

---

### for 迴圈

for 迴圈基本語法

```python
for 變數 in 串列:
    要做的事
```

---

### while 迴圈

while 迴圈基本語法

```python
while (條件):
    條件成立要做的事
```

---

## 函數

基本語法

```python
def 函數名稱(要傳進去的東西):
    要做的事
    return 要吐出來的東西
```

---

## 練習一

印出九九乘法表

--

![](1.webp)

--

解答

```python
for i in range(1,10):
    for j in range(1,10):
        print("%d * %d = %-4d" %(i, j, (i*j)), end="")
    print()
```

---

## 練習二

假設今天你是一位老師

請實作一支程式用來計算班級平均成績

當輸入為 -1 時停止輸入，並輸出平均成績

--

![](2.webp)

--

解答

```python
total = person = score = 0
while(score != -1):
    person += 1
    score = int(input("請輸入第 %d 位學生的成績:" %person))
    if(score != -1):
        total += score

person -= 1
average = total / person
print("平均成績:%5.2f 分" %average)
```

--

呈上題，輸入完成績後，提供選單讓使用者選擇印出共有幾位學生還是印出平均成績

--

![](3.webp)

--

解答

```python
score = []
inscore = person = total = 0
while(inscore != -1):
    person += 1
    inscore = int(input("請輸入第 %d 位學生的成績:" %person))
    if(inscore != -1):
        score.append(inscore)

while(1):
    print("0. 結束程式")
    print("1. 輸出共有幾位學生")
    print("2. 輸出平均成績")

    option = int(input("選項:"))
    
    if(option == 0):
        break
    elif(option == 1):
        print("共有 %d 位學生" %len(score))
    elif(option == 2):
        for i in score:
            total += i
        print("平均成績:%5.2f 分" %(total/len(score)))
```

@slideend
