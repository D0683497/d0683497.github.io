---
layout: Slide
title: Python 社課 - 環境建置 - Mac 版
description: 逢甲大學 黑客社 第五屆 Python - 環境建置 - Mac 版 教學簡報
original: true
time: 2018-10-16
category: HackerSir
tags:
    - Python
backToTop: false
---

@slidestart

# 環境建置 - Mac 版

---

## 下載 Python

--

首先 先去官網下載 Python 3.6.6 (64 位元版本)

![](1.png)

選取 macOS 64-bit installer

--

<a href="https://www.python.org/ftp/python/3.6.6/python-3.6.6-macosx10.9.pkg" target="_blank" data-preview-link="false">或點我直接下載</a>

---

## 開始安裝 Python

--

打開 載好的 "python-3.6.6-macosx10.9.pkg"

<img src="2.png" width="80%" height="">

--

點選 "繼續"

<img src="3.png" width="80%" height="">

--

點選 "繼續"

<img src="4.png" width="80%" height="">

--

點選 "同意"

<img src="5.png" width="80%" height="">

--

點選 "安裝"

<img src="6.png" width="80%" height="">

--

有 touchbar 的話 可以透過指紋

<img src="7.png" width="80%" height="">

--

或 輸入密碼安裝

<img src="8.png" width="80%" height="">

--

等待程序完成

<img src="9.png" width="80%" height="">

--

<img src="10.png" width="80%" height="">

安裝完整後 "關閉"

--

### **到目前有問題都可以舉手**

---

### pip 基本語法

--

按鍵盤上的 command 鍵 + 空白鍵 (space) 

打開 Spotlight 搜尋

參考: [使用 Mac 上的 Spotlight](https://support.apple.com/zh-tw/HT204014)

--

打開 terminal (終端機)

![](11.jpg)

--

然後輸入 `pip3 -V`

![](12.jpg)

--

pip 的基本語法是

`pip3 <command> [option]`

command 跟 option 要打什麼下面都有列出來

option 要不要打都可以

--

看 pip 的版本

`pip -V`

> 注意是大寫的 V

--

安裝插件

`pip install 插件名稱`

> 基本上社課只會用到安裝的功能而已

--

移除插件

`pip uninstall 插件名稱`

--

看你安裝的全部插件

+ `pip freeze`
+ `pip list`

---

## 安裝 jupyter notebook

--

### jupyter notebook 是什麼 ?

--

Jupyer Notebook（以前稱為 IPython notebook）

是一個介於 IDE (Pycharm, Spider) 以及 Editor (Sublime text, Atom, VScode, 記事本) 之間的一個讓你可以寫 code 的工具

**簡單來講可以用他寫 code 跟執行啦**

--

### 如何安裝 jupyter notebook

--

打開 terminal (終端機)

<img src="13.jpg" width="80%" height="">

--

terminal 打開長這樣

<img src="14.jpg" width="80%" height="">

--

對 terminal 下 升級 pip

```shell
pip3 install --upgrade pip
```

<img src="15.jpg" width="80%" height="">

--

對 terminal 下 安裝 jupyter notebook

```shell
pip install jupyter notebook
```

<img src="16.jpg" width="80%" height="">

--

中間會跑一堆長這樣的東西

<img src="17.jpg" width="80%" height="">

直到最後停止出現 Successfully......

--

### **到目前有問題都可以舉手**

---

## 開啟 jupyter notebook

--

好 那現在再開啟 terminal

(忘了怎麼開 自己去看前面)

--

對 terminal 下

``` shell
jupyter notebook
```

<img src="18.jpg" width="80%" height="">

--

然後就會在 terminal 看到這個畫面

<img src="19.jpg" width="80%" height="">

--

同時你的預設瀏覽器會打開到這個畫面

![](20.png)

--

如果沒有出現 回到 terminal 找到

<img src="21.jpg" width="80%" height="">

複製下方的網址貼到瀏覽器

(開頭是 `http://localhost:8888/` 的那串)

---

## Python 版 "Hello world"

--

把檔案建在你要的地方(舉例：Desktop 桌面)

![](22.png)

點進去~~~

--

點選 New 選擇 Python 3

![](23.png)

--

操作介面介紹

![](24.png)

--

檔名改成 Hello World 

程式碼：

```python
print("Hello World !!!")
```

--

然後 點 Run

或是按 `ctrl` + `enter`

![](25.png)

--

恭喜你(妳)學會了 Python

--

的萬分之一了

請繼續加油 社課記得都要來ㄛ

P.S. 還沒繳社費的 可以繳一下 謝謝!!!

--

![](26.png)

---

## 補充介紹

---

### VS Code

--

VS Code 全名 Visual Studio Code

由微軟開發的**文字編輯器**

但他可以安裝很多擴充的功能

讓他也可以編譯

內建了 Git (版本控制)、代碼補全...

很多功能

--

但社課不會用到他

因為社課要做的事還蠻簡單的

所以用不到他

不過還是介紹一下

--

![](27.png)

<a href="https://code.visualstudio.com/" target="_blank" data-preview-link="false">想下載的可以下載</a>

---

### Anaconda

--

![](28.png)

這是一個對新手很友善的 coding 環境

但 他很肥大

--

他把很多你可能用到的功能直接包進去

但

其實你用不到

--

剛剛上面課程講到的東西你只需要下載並安裝他就好了

<a href="https://www.anaconda.com/download/" target="_blank" data-preview-link="false">Anaconda 官網載點</a>

@slideend
