建伺服器的方法 Mac 跟 windows 不同。

不過相同的東西：都要先有 node.js 跟 ngrok 這兩個檔案
https://nodejs.org/en/?https://ngrok.com/download

Node.js 沒什麼要處理的，載完之後就可以用了
可以在 cmd 打上 “node -v” 測試一下有沒有東西，理論上會有 “v???.x.x” 之類的東西

ngrok 的話就小複雜了。要先辦帳密?https://dashboard.ngrok.com/user/signup
辦完之後，點開下方網址找 authtoken
https://dashboard.ngrok.com/get-started
長的像 “./ngrok authtoken ……………………………………”

這東西要在 cmd 裡面執行一次，執行完之後 ngrok 的部分也結束了

最後是開伺服器
首先：在目標資料夾裡面打開 cmd
然後用 node 先打開伺服器 (node server.js)

最後再開一個 cmd，用 ngrok 把自己的伺服器掛到一個網址上面
Mac:    “./ngrok http 2704”
Window:    “ngrok.exe http 2704”

然後會跳出一個黑屏幕，https://............. .ngrok.io 就是可以給大家連的網址了
(順帶一提，開伺服器的時候，nodejs 跟 ngrok 的 cmd 都不可以關掉哦)



from:great_pei