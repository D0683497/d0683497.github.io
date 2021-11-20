---
layout: Slide
title: Python 社課 - 範例
description: 逢甲大學 黑客社 第六屆 Python - 範例 教學簡報
original: true
time: 2018-10-10
category: HackerSir
tags:
    - Python
backToTop: false
---

@slidestart

# 範例

---

## 變數

--

基本賦值

```python
a = 666
```

如果多個變數有相同的值，你可以同時賦予變數值

```python
a = b = c = 20
```

也可以在同一行指定多個變數

```python
a = 87; b = 24.87; c = '血小板'
a, b, c = 87, 24.87, '血小板'
```

--

沒用到的變數記得刪除

```python
del a
```

也可以一次刪除多個

```python
del b, c
```

---

## 多條語句

```python
a = 1; b = 2; c = 3
```

---

## 多行語句

```python
a = '1' +\
    '2' +\
    '3'

b = [1, 2, 3,
    4, 5, 6]
```

---

## 註解

```python
a = 1

#我的第一個Python程式

'''
學術單身
'''

"""
我沒有在暗示什麼
"""
```

---

## 型態

--

### 數字

```python
#int
a = 100
print(a)
print('型態:', type(a))

#float
b = 123.456
print(b)
print('型態:', type(b))

#complex
c = 2+4j
d = complex(5,6)
print(c)
print('型態:', type(c))
print(d)
print('型態:', type(d))
```

--

### 字串

```python
s = 'asdfghjkl'
a = "qwe"

print('型態:', type(s))
print('型態:', type(a))
print(s[3])
print(s[-3])
print(s[0:5])
print(s[-4:-1])
print(s+a)
print(a*3)
```

--

### 布林

```python
f = True
print(f)
print('型態:', type(f))

g = False
print(g)
print('型態:', type(g))
```

--

### 列表

--

```python
a = [1, '2', True, 8.93, 9, 33, 'asd']
b = [5, 6, 7]

print('型態:', type(a))
print(a[2])
print(type(a[3]))
print(a[-4])
print(a[0:3])
print(a[-3:-1])
print(a+b)
print(b * 2)
```

--

```python
c = [1, 3, 7, 9, 4]

print(c)
c.append(999)
print(c)

c.extend([3,4,5])
print(c)

c.insert(3, 123)
print(c)

c.insert(-2, 789)
print(c)
```

--

```python
c = [1, 3, 7, 9, 4, 2, 5, 6]

print(c)

del c[1]
print(c)

c.pop()
print(c)

c.pop(3)
print(c)

c.pop(-3)
print(c)

c.remove(7)
print(c)

del c
```

--

```python
c = [1, 3, 7, 9, 4, 2, 5, 6]

print(c)

c.sort()
print(c)

c.sort(reverse = True)
print(c)
```

--

```python
c = [1, 3, 7, 9, 4, 2, 5, 6]

print(c)

c.reverse()
print(c)

print(c.index(5))

print(c.count(7))
```

--

### 元組

--

```python
a = (50)
tup = (50,)
t = (50, 95, 67)

print('型態:', type(a))
print('型態:', type(tup))
print('型態:', type(t))
```

--

```python
a = (1, '2', True, 8.93, 9, 33, 'asd')
b = (5, 6, 7)

print('型態:', type(a))
print(a[2])
print(type(a[3]))
print(a[-4])
print(a[0:3])
print(a[-3:-1])
print(a+b)
print(b * 2)
```

--

### 字典

--

```python
d = {1:'345', 2:56.487, '98':'345', 3:345, 3:567}

print('型態:', type(d))
print(d)
print(d[3])
del d['98']
print(d)

del d
```

--

```python
d = {1:'345', 2:56.487, '98':'345', 3:345, 3:567}

print(d.pop(1))
print(d)

print(d.popitem())
print(d)

d.clear()
print(d)
```

---

## print

```python
print(666, '血小板我老婆', '有人要玩崩壞3嗎')
print('血小板', '血小板', '血小板', sep="老婆", end="\n\n\n")

a = '崩壞'
b = 3
print("%s %d" % (a, b))
```

---

## 特殊字串

```python
#如果字串裡要使用到引號，外面包住他的引號要不同
s = '紅血球:"血小板好可愛!!!"'
print(s)

#或是用反斜線
a = '白血球: \'血小板好可愛\''
print(a)
```

---

## 型態轉換

```python
# 宣告一個整數
a=100
print(a)
print(type(a))

# 將整數轉為浮點數
b = float(a) 
print(b)
print(type(b))

# 宣告一個浮點數
c=123.56
print(c)
print(type(c))

# 將浮點數轉為整數
e=int(c)
print(e)
print(type(e))

# 將整數轉為字串
f=str(a)
print(f)
print(type(f))

# 將浮點數轉為字串
g=str(c)
print(g)
print(type(g))

# 將字串轉為整數
h = '123'
i=int(h)
print(i)
print(type(i))
```

---

## 運算式

--

### 算數運算子

```python
a = 1+2
b = 3-1
c = 3*2
d = 5/3
e = 10%3
f = 7//2
g = 2**3

h = 'hello'
i = 'hackersir'

print(a, b, c, d, e, f, g, sep=' ^_^ ')

print(h+i)
print(h*10)
```

--

### 關係運算子

```python
a = 1 == 2
b = 1 == 1

c = 1 != 2
d = 1 != 1

e = 1 > 2
f = 2 > 3

g = 1 < 2
h = 3 < 2

print(a, b, c, d, e, f, g, h)
```

--

### 邏輯運算子

```python
a = 1 == 1
print(a)
print(not(a))

b = 1 == 2
print(b)
print(a and b)
print(a and a)

print(a or b)
print(b or b)
print(a or a)
```

--

### 複合指定運算子

```python
a = b = 3

a = a + 3
b += 3
print(a,b)

a = a - 2
b -= 2
print(a,b)

a = a * 3
b *= 3
print(a,b)

a = a / 4
b /= 4
print(a,b)

a = a % 2
b %= 2
print(a,b)

a = b = 10

a = a // 5
b //= 5
print(a,b)

a = a ** 2
b **= 2
print(a,b)
```

--

### 成員運算子

```python
s = [1, 2, 3, 4, 5]

print(2 in s)
print(6 in s)

print(1 not in s)
print(7 not in s)

for x in s:
    print(x)
```

--

### 身分運算子

```python
x = 1
y = '1'

print(1 is x)
print(1 is y)

print(1 is not x)
print(1 is not y)
```

--

### 位運算子

```python
a = 60 
# 60 = 0011 1100 
b = 13
# 13 = 0000 1101 
c = 0
 
c = a & b
print('a & b =', c)
# 12 = 0000 1100

c = a | b 
print('a | b =', c)
# 61 = 0011 1101

c = a ^ b
print('a ^ b =', c)
# 49 = 0011 0001

c = ~a
print('~ a =', c)
# -61 = 1100 0011

c = a << 2
print('a << 2 =', c)
# 240 = 1111 0000

c = a >> 2
print('a >> 2 =', c)
# 15 = 0000 1111
```

---

## input

```python
x = input('輸入:')

print(x)
print(type(x))
```

---

## 判斷式

```python
x = 99
y = 9

if x > y:
    print('x > y')
elif x < y:
    print('x < y')
else:
    print('x = y')
```

---

## 迴圈

--

### for迴圈

```python
x = [11, 22, 38]

for y in x:
    print(y)
```

--

for-else 這邊不舉例

但要注意

for 迴圈整個執行完才會執行 else

--

### range

```python
for x in range(6):
    print(x)

for y in range(1, 5):
    print(y)

for z in range(25, 0, -5):
    print(z)
```

--

### while 迴圈

```python
x = 10

while(x > 5):
    print(x)
    x = x - 1
```

--

while-else 這邊不舉例

但要注意

while 迴圈整個執行完才會執行 else

---

## 函數

```python
a = 100
b = 200

def cal(a, b):
    x = a + b
    return x

print(cal(7, 6))

print(a)
print(b)
```

@slideend
