---
layout: Slide
title: Python 社課 - 基礎
description: 逢甲大學 黑客社 第五屆 Python - 基礎 教學簡報
original: true
time: 2018-10-17
category: HackerSir
tags:
    - Python
backToTop: false
---

@slidestart

# 基礎

---

## Python 簡介

--

+ 程式碼簡潔
+ 不須編譯 (直譯)
+ 可以做很多事
    + 有很多套件
+ 目前大致分成兩個版本
    + Python 2.X
    + Python 3.X (社課主要用這個)

---

## Python 實作

---

### 變數

--

變數就像是一個箱子

你可以用他來裝 整數、浮點數、字串

這就是**型態**，等等會講

--

任何程式語言在命名變數時都會有一些**規則**跟一些你**不能用的字(保留字)**

--

Python 變數命名規則

+ 第一個字不能是數字
+ 只能有字母、數字、`_`、中文
    + 用 `_` 開頭的通常會有特殊意義
    + 例如: `__init__()`
+ 大小寫字母有差
    + a123 跟 A123 是不同的變數

--

Python 的保留字請自行 Google

~~我懶得列出來~~

幾本上用久了就會了

不用特別記

> 保留字都只有小寫

--

Python 的變數**不用宣告**

基本語法為

```python
變數名稱 = 變數值
```

--

剛剛說變數就像箱子一樣

他會佔有空間

他佔有的空間就叫記憶體

記憶體是有限的

所以變數如果不再使用，記得把它刪掉

--

刪除變數語法為

```python
del 變數名稱1, 變數名稱1, ...
```

---

### 多條語句

--

如果你想在一行做很多事的話

可以用分號 `;` 來把他隔開

---

### 多行語句

--

如果你的程式碼很長

你想要多分幾行來寫的話

可以用反斜線 `\` 來區隔

如果有被括號包住就不用

---

### 註解

--

Python 的單行註解使用 `#`

多行註解使用三個**單引號**或三個**雙引號**

---

### 型態

--

型態就像是 123 是整數 (int)

123.456 是浮點數 (float)

"hello" 是字串 (str)

--

Python 內建的型態

+ Numbers (數字)
    + int (整數)
    + float (浮點數)
    + complex (複數)

--

Python 內建的型態

+ str (字串)
+ List (列表)
+ Tuple (元组)
+ Dictionary (字典)
+ bool (布林值)
    + 只有 `True` 跟 `False`

--

Python 2.x 有 long (長整數) 這個型態

Python 3.x 去掉了，所以 int 就是 long

--

#### 數字

--

這裡沒什麼好講的，~~畢竟大家數學都很好~~

唯一要講的是複數

複數可以用 `a + bj` 或 `complex(a,b)` 表示

--

#### 字串

--

字串顧名思義就是一串字

在 Python 中宣告字串可以用單引號 (`'`) 或雙引號 (`"`)

--

Python 字串有兩種取值順序

+ 從左到右索引從0開始
+ 從右到左索引從-1開始

| 字串 | a | s | d | f |
| --- | --- | --- | --- | --- |
| 第一種索引  | 0 | 1 | 2 | 3 |
| 第二種索引  | -4 | -3 | -2 | -1 |

--

如果要從字串裡面拿一段字的話可以用

```python
變量[上標:下標]
```

--

Python 的字串可以用

+ `+` 來連接
+ `*` 來重複操作

--

#### 布林

--

布林就是只有 `True` 跟 `False`

--

#### 列表

--

會剛剛的字串就會現在的列表

剛剛說過字串是一串字

而列表就是一串東西

他可以包含

`數字`、`字串`、`布林`

--

列表基本語法

```python
變數 = [東西1, 東西2, ...]
```

--

操作跟剛剛的字串一樣

列表一樣有兩種取值順序
+ 從左到右索引從0開始
+ 從右到左索引從-1開始

--

如果要從列表裡面拿東西的話可以用

```python
變量[上標:下標]
```

列表一樣可以用
+ `+` 來連接
+ `*` 來重複操作

--

更新列表

+ `list.append(要加的元素)`
    + 加在尾巴
    + 只能加一個
+ `list.extend(要加的串列)`
    + 從最後面開始加
    + 可以加很多個
+ `list.insert(要插入的index, 插入的元素)`

--

刪除列表元素

+ `del`
    + `del list[index]`
        + 刪掉某一項
    + `del list`
        + 整個刪掉
+ `list.pop(index)`
    + 如果index不填的話會刪掉最後一項
+ `list.remove(要刪的元素)`

--

排序

+ `list.sort(key=None, reverse=False)`
+ `reverse = True`
    + 由大排到小
+ `reverse = False`
    + 由小排到大
+ `key`
    + 用來進行比較的元素

--

+ Python 2.x
    + `list.sort(cmp=None, key=None, reverse=False)`
+ Python 3.x
    + `list.sort(key=None, reverse=False)`

--

+ 反轉
    + `list.reverse()`
        + `()`裡不用填東西
+ 用元素找 index
    + `list.index(要找的元素)`
+ 計算元素出現幾次
    + `list.count(你要計算的元素)`

--

#### 元組

--

元組其實就跟列表一樣

唯一的差別就是

元組在**宣告完後就不能改**了

--

元組基本語法

```python
變數 = (東西1, 東西2, ...)
```

--

元組中只包含一個元素時，需要在元素後面加逗號(`,`)

```python
tup = (50,)
```

--

元組不能刪裡面的元素

要刪只能整個刪除

但可以宣告一個新的元組，內容是兩個舊的原組加起來

--

原組操作跟剛剛的列表一樣

原組一樣有兩種取值順序
+ 從左到右索引從 0 開始
+ 從右到左索引從 -1 開始

--

如果要從原組裡面拿東西的話可以用

```python
變量[上標:下標]
```

原組一樣可以用

+ `+` 來連接
+ `*` 來重複操作

操作後產生一個新的原組

--

#### 字典

--

字典其實也跟列表很像

列表是有序的

也就是可以用索引值取裡面的東西

字典是無序的

要取裡面的東西的話要用 key

每把 key 都是獨一無二的(不能重複)

--

字典基本語法

```python
變數 = {key1:value1, key2:value2, ...}
```

key 是唯一的，如果重複，最後一個 key 的 value 會代替前面的

value 可以重複沒關係

**key 可以是字串、數字、元組，但不能是列表**

--

拿字典裡的東西

```python
dict[key]
```

**只能用 key 去拿 value**

所以要修改 value 時，只能用 key 去找

--

刪除字典元素

+ `del dict[key]`
    + 刪掉某一組(key:value)
+ `del dict`
    + 整個刪掉

--

+ `dict.pop(key)`
    + 刪掉某一組(key:value)，回傳 value
+ `dict.clear()`
    + 清空字典，字典還在，但是是空的
+ `dict.popitem()`
    + 隨機刪掉字典裡的一組 key 跟 value，並回傳刪掉的 key 跟 value

--

一些字典的函數

--

| 函數 | 描述 |
| --- | --- |
| `dict.copy()` | 複製字典，`()` 裡不用放東西 |
| `dict.fromkeys(seq[ key, val])` | 創建一個新字典，以 seq 中的元素為 key，val 為字典的 value |

--

| 函數 | 描述 |
| --- | --- |
| `dict.get(key, default=None)` | 用key找value，如果找不到則回傳 `default` 的值 |
| `dict.setdefault(key, default=None)` | 用 key 找 value，如果找不到則把找的 key 加進去，value 則是 `default` 的值 |

--

| 函數 | 描述 |
| --- | --- |
| `dict.has_key(key)`、` dict.__contains__(key)` | 找key有沒有在字典裡，有的話回傳 `True`，沒有的話回傳 `False` |
| `dict.items()` | 印出字典裡的東西 |

--

| 函數 | 描述 |
| --- | --- |
| `dict.keys()` | 用列表的型態回傳字典的 key |
| `dict.update(dict2)` | 把字典 dict2 加到 dict 的後面 |
| `dict.values()` | 用列表的型態回傳字典的 value |

---

### print

--

print 是一個函式 (稍後會講到)

在 Python3 裡面一定要用 `print('something')`

在 Python2 裡面則是 `print "something"`

Python2 後面一點的版本則是通用

--

print 基本語法

```python
print(項目1[, 項目2, ..., sep=分隔字元, end=結束字元])
```

+ 中括號裡是不一定要的
+ 如果要印多個項目中間以 `,` 分隔
+ 項目跟項目間會用分隔字元分隔，預設是 `""`(空白)
+ 印完之後要加上結束字元，預設是 `\n`(換行)

--

print 參數格式化

```python
print(項目 % (參數列))
```

--

| 參數 | 說明 | 參數 | 說明 |
| --- | --- | --- | --- |
| `%d` | 整數 | `%f` | 浮點數 |
| `%s` | 字串 | `%c` | 字元 |
| `%u` | 無號整數 | `%o` | 八進位 |
| `%p` | 印記憶體 |  |  |

--

| 參數 | 說明 |
| --- | --- |
| `%e` | 科學記號 (英文是小寫的) |
| `%E` | 科學記號 (英文是大寫的) |
| `%x` | 十六進位 (英文是小寫的) |
| `%X` | 十六進位 (英文是大寫的) |
| `%g` | 就是 `%f` + `%e` |
| `%G` | 就是 `%f` + `%E` |

--

> `%o` `%x` `%X`只能是整數

---

### 特殊字串

--

如果字串裡面有包含特殊字元

要使用**脫逸字元** 反斜線

`\`

--

其他需要用到反斜線的

+ 換行 `\n`
+ 反斜線 `\\`
+ tab鍵 `\t`

---

### 型態轉換

--

Python 的型態轉換就是直接在變數前面加你要的型態

---

### 運算式

--

1+1 就是運算式

`+` 就是運算子

運算子就是用來指定資料要做哪種運算

`1` 就是運算元

--

#### 算數運算子

--

| 運算子 | 意義 | 運算子 | 意義 |
| --- | --- | --- | --- |
| `+` | 相加 | `-` | 相減 |
| `*` | 相乘 | `/` | 相除 |
| `%` | 取餘數 | `//` | 取商數 |
| `**` | 次方 |  |  |

--

> `+` 也可以用來連接

> `*` 也可以用在重複操作

> `/`、`%`、`//` 與除法有關，所以被除數不能為 0，經過除法整數都會變成浮點數

--

#### 關係運算子

--

| 運算子 | 意義 |
| --- | --- |
| `==` | 等於 |
| `!=` | 不等於 |
| `>` | 大於 |
| `<` | 小於 |
| `>=` | 大於或等於 |
| `<=` | 小於或等於 |

--

+ Python2 中不等於有兩種寫法
    + `!=`
    + `<>`
+ Python3 中沒有`<>`，只有`!=`

--

#### 邏輯運算子

--

| 運算子 | 意義 |
| --- | --- |
| `not` | 相反 |
| `and` | 兩者為真才為真 |
| `or` | 其中一者為真即為真 |

--

#### 複合指定運算子

--

| 運算子 | 意義 |
| --- | --- |
| `+=` | 相加後在丟給原變數 |
| `-=` | 相減後在丟給原變數 |
| `*=` | 相乘後在丟給原變數 |
| `/=` | 相除後在丟給原變數 |
| `%=` | 取餘數後在丟給原變數 |
| `//=` | 取商數後在丟給原變數 |
| `**=` | 取次方後在丟給原變數 |

--

#### 成員運算子

| 運算子 | 意義 |
| --- | --- |
| `in` | 在指定的序列中找到值返回 `True`，否則返回 `False` |
| `not in` | 指定的序列中**沒有**找到值返回 `True`，否則返回 `False` |

--

#### 身分運算子

| 運算子 | 意義 |
| --- | --- |
| `is` | 引用的是同一個對象則返回 `True`，否则返回 `False` |
| `is not` | 引用的**不是**同一個對象則返回 `True`，否则返回 `False` |

--

基本上 `is` 跟 `==` 很像

`is` 用來判斷兩個變量**引用對象**是否為同一個

`==` 用來判斷引用**變量的值**是否相等

--

#### 位運算子

| 運算子 | 名稱 | 意義 |
| --- | --- | --- |
| `&` | 按位與運算符 | 都是 1 才為 1，其餘都是 0 |
| `\|` | 按位或運算符 | 其中一個是 1 就是 1 |

--

| 運算子 | 名稱 | 意義 |
| --- | --- | --- |
| `^` | 按位異或運算符 | 兩者相異為 1 |
| `~` | 按位反或運算符 | 就是先 `&` 在全部相反 |

--

| 運算子 | 名稱 | 意義 |
| --- | --- | --- |
| `<<` | 左移動運算符 | 數字全部左移，由 `<<` 右邊的數字指定移動的位數，高位丟掉，低位補 0 |
| `>>` | 左移動運算符 | 把 `>>` 左邊的數字全部右移，`>>` 右邊的數字指定了移動的位數 |

--

#### 運算子優先順序

--

| 運算子 (由高到低排列) |
| --- |
| `**` |
| `~` |
| `*`、`/`、`%`、`//` |
| `+`、`-` |
| `>>`、`<<` |
| `&` |

--

| 運算子 (由高到低排列) |
| --- |
| `^`、`\|` |
| `<=`、`<`、`>`、`>=` |
| `==`、`!=` |
| `=`、`%=`、`/=`、`//=`、`-=`、`+=`、`*=`、`**=` |
| `is`、`is not` |
| `in`、`not in` |
| `not`、`or`、`and` |

---

### input

--

input基本語法

```python
變數名稱 = input('提示字')
```

--

+ Python 2.x
    + `raw_input()`
+ Python 3.x
    + `input()`

> input 丟給變數是丟字串型態的，如果要運算的話要轉換型態

---

### 判斷式

--

判斷式基本語法

```python
if (條件式一):
    條件式一成立，要做的事

elif (條件式二):
    條件式二成立，要做的事

else:
    上述條件式都不成立，要做的事
```

--

如果只有一行的話可以這樣寫

```python
if (條件):條件成立要做的事
```

--

條件要不要括號起來都可以

--

Python 沒有 switch

switch 是什麼

請去問計概助教

所以 switch 在 Python 裡只能用 if-elif-else 實現

--

### 縮排

--

為什麼要特別講縮排呢?

~~不是因為好看~~

因為 Python 不像其他程式語言使用大括號來區隔 `{}`

而是使用縮排

縮排最常見的是 `tab` 或是 4 格空白

**不要混著用**

---

### 迴圈

--

迴圈就是一直做重複的事情

+ Python 迴圈分兩種
    + for
    + while

那如果我中間想要他停下來呢，那就要用

+ `break`
+ `continue`
+ `pass`

--

#### for 迴圈

--

for 迴圈基本語法

```python
for 變數 in 串列:
    要做的事
```

--

也可以加入 else

```python
for 變數 in 串列:
    要做的事
else:
    上面條件不成立，要做的事
```

--

##### range

--

range 基本語法

```python
range(start, stop[, step])
```

--

+ start: 從這開始，預設為 0
    + `range(0, 5)` 跟 `range(5)` 是一樣的
+ stop: 到這結束，但不包括自己
    + `range(1, 5)` 就是 `[1, 2, 3, 4]`
+ step: 間隔，預設為 1
    + `range(0, 5)` 就是 `range(0, 5, 1)`

--

> 通常 `range()` 會配合 for 迴圈來使用

--

#### while 迴圈

while 迴圈基本語法

```python
while (條件):
    條件成立要做的事
```

--

如果只有一行也可以這樣寫

```python
while (條件):條件成立要做的事
```

條件要不要括號起來都可以

--

也可以加入 else

```python
while (條件):
    條件成立要做的事
else:
    上面條件不成立，要做的事
```

---

### 函數

--

基本語法

```python
def 函數名稱(要傳進去的東西):
    要做的事
    return 要吐出來的東西
```

--

+ 如果 return 後面沒接東西代表 return None
+ 函數裡面的變數跟外面的是不一樣的
    + 全域變數(在外面的)
    + 區域變數(在函數裡的)

@slideend
