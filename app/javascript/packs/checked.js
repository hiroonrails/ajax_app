//全てのcheckの生みの親！
function check () {
  //どこのhtml.erbの情報持ってくるの？→class = postのとこ！
  const posts = document.querySelectorAll(".post")
  //どんな処理がしたいの？？とりあえずたくさんあるけど全部に適用させたいからforEach
  posts.forEach(function (post) {
    //↑(post)は引数！=4行目だと思え！どんな時に処理発動だっけ？clickしたときよね。
    //↓setIntervalで1秒に一回trueとfalseの返しの処理があってしんどいから
    //↓そうならないように条件分岐でdata-loadが空ではないor空を記載している
    if (post.getAttribute("data-load") != null){
      return null;
    }
    post.setAttribute("data-load", "true");
    post.addEventListener("click",() => {
      //↑ => {} ←いろんな処理の手順あるからとりまこんな感じで代入するぜマーク
      const postId = post.getAttribute("data-id");
      //↑ メモの情報取得するために！！（ここ重要）カスタムデータ属性を利用。ちなみにgetAttributeで要素の属性値を取得できる！
      const XHR = new XMLHttpRequest();
      //↑XHRはじめました。ってだけ。この後からXHR既存のメソッドが使えるんよ。ex)open
      XHR.open("GET", `/posts/${postId}`, true);
      //↑どのようなXHRリクエストをしますか？の設定HTTPメソッド, パスの指定, 非同期通信か否かをbooleanで記載。
      XHR.responseType = "json" ;
      //↑レスポンス返すときの形式の指定
      XHR.send();
      XHR.onload = () => {
        if (XHR.status != 200){
          alert(`Error ${XHR.status}: ${XHR.statusText}`);
          return null;
        }
        const item = XHR.response.post;
        if (item.checked === true){
          post.setAttribute("data-check", "true");
        } else if (item.checked === false) {
          post.removeAttribute("data-check");
        }
      };
    });
  });

}
setInterval(check, 1000);