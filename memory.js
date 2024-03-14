
// グローバル
// div要素を格納
let cards = [];
// 開始時間
let startTime;
// 経過秒数用 タイマーID
let timer;
// カードめくり用 タイマーID
let backTimer;
// 1枚目かどうかのフラグ   1枚目: true   2枚目: false
let flgFirst = true;
// 1枚目のカードを格納
let cardFirst;
// そろえた枚数
let countUnit = 0;

window.onload = function(){
    // 数字格納 一時配列
    let arr = [];
    
    for (let i = 0; i < 10; i++){
        // ペアの数字を10組
        arr.push(i);
        arr.push(i);
    }
    
    // シャッフル
    shuffle(arr);
    
    let panel = document.getElementById('panel');
    
    // div要素作成
    for (i = 0; i < 20; i++){
        let div = document.createElement('div');
        div.className = 'card back';
        div.index = i;
        div.number = arr[i];
        div.innerHTML = '';
        div.onclick = turn;
        panel.appendChild(div);
        cards.push(div);
    }
    // 開始時刻を取得
    startTime = new Date();
    // タイマー開始
    startTimer();
    
}

// シャッフル用関数
function shuffle(arr) {
    let n = arr.length;
    let temp, i;

    while (n) {
        i = Math.floor(Math.random() * n--);
        temp = arr[n];
        arr[n] = arr[i];
        arr[i] = temp;
    }
    return arr;
}

// クリック時の処理
function turn(e){
    
    let div = e.target;
    
    // カードのタイマー処理が動作中は return
    if (backTimer) return;

    // 裏向きのカードをクリックした場合は数字を表示する
    if (div.innerHTML == ''){
        div.className = 'card';
        div.innerHTML = '<img src = "img/' + div.number +'.jpg" />'; 
    }else{
        // 数字が表示されているカードは return
        return;
    }
    
    // 1枚目の処理
    if (flgFirst){
        // cardFirst は2枚目の処理のときに使う
        cardFirst = div;
        // フラグ変更
        flgFirst = false;
        
    // 2枚目の処理
    }else{
        
        // 数字が1枚目と一致する場合
        if (cardFirst.number == div.number){
            countUnit++;
            // 見えない状態にする
            backTimer = setTimeout(function(){
                div.className = 'card finish';
                cardFirst.className = 'card finish';
                backTimer = NaN;
                
                if (countUnit == 10){
                    clearInterval(timer);  // timer終了
                }
            }, 500)

        // 一致しない場合
        }else{  
            // カードを裏側に戻す
            backTimer = setTimeout(function(){
                div.className = 'card back';
                div.innerHTML = '';
                cardFirst.className = 'card back';
                cardFirst.innerHTML = '';
                cardFirst = null;
                backTimer = NaN;
            }, 500);
        }
        
        flgFirst = true;
    }  
}

// タイマー開始
function startTimer(){
    timer = setInterval(showSecond, 1000);
}

// 秒数表示
function showSecond(){

    let nowTime = new Date();
    let elapsedTime = Math.floor((nowTime - startTime) / 1000);
    let str = '経過秒数: ' + elapsedTime + '秒';

    let re = document.getElementById('result');
    re.innerHTML = str;
}
