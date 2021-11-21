---
layout: Slide
title: Flask 社課 - 佈署
description: 逢甲大學 黑客社 第五屆 Flask - 佈署 教學簡報
original: true
time: 2019-05-09
category: HackerSir
tags:
    - Flask
backToTop: false
---

@slidestart

# 佈署

---

## Tmux

+ 安裝
    + `sudo apt-get install tmux`
+ 創建 session
    + `tmux`
+ 查看所有 session
    + `tmux ls`

---

+ 進入 session
    + `tmux at -t 編號或名稱`
+ 退出 session
    + `ctrl+b 加 ctrl+d`
+ 刪除當前 session
    + `ctrl+b 加 ctrl+x`

---

進入 session 後

先建立虛擬環境

然後建立資料庫

之後 run 你的網站

然後就可以退出 session 了

---

### 補充

`app.run()`

裡面可以加 `host='0.0.0.0'`

跟 `port=你的port號`

---

> 記得之前設的 `debug=True` 要改成 `False`

---

## Nginx

安裝

`sudo apt-get install nginx`

--

1. `cd /etc/nginx`

--

裡面有兩個資料夾是等等會改到的

+ sites-enabled
+ sites-available

--

2. 先進去 sites-enabled

--

3. 然後創建一個你的網站的代理

`sudo vim 文件名稱(通常是你的域名)`

```
server {
    listen 80;
    server_name 你的域名;
    location / {
            proxy_pass http://127.0.0.1:這邊放你的port(Flask 預設是 5000)/;
    }
}
```

--

4. 存檔後退出

--

5. 現在來改 sites-available

+ 剛剛已經在 裡面寫了一份
+ 所以現在把剛剛寫的複製過來就好
+ `cp k139.me ../sites-available/`

--

6. 然後現在啟動 `nginx`

`sudo service nginx start`

---

之後如果要改東西的話就直接進去 `tmux` 的 `session` 裡

先 `ctrl+c` 關掉

改完後在 run 一次就好

@slideend
