$(function(){
  
  // let reloadMessages = function() {
  //   //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
  //   let last_message_id = $('.Chat-main__message-list__contents:last').data("message-id");
  //   $.ajax({
  //     //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
  //     url: "api/comments",
  //     //ルーティングで設定した通りhttpメソッドをgetに指定
  //     type: 'get',
  //     dataType: 'json',
  //     //dataオプションでリクエストに値を含める
  //     data: {id: last_message_id}
  //   })
  //   .done(function(messages) {
  //     // 更新するメッセージがなかった場合は.doneの後の処理が動かないようにする
  //     if (messages.length !== 0) {
  //       //追加するHTMLの入れ物を作る
  //       let insertHTML = '';
  //       //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
  //       $.each(messages, function(i, message) {
  //         insertHTML += buildHTML(message)
  //       });
  //       //メッセージが入ったHTMLに、入れ物ごと追加
  //       $(".Chat-main__message-list").append(insertHTML);
  //       $('.Chat-main__message-list').animate({ scrollTop: $('.Chat-main__message-list')[0].scrollHeight});
  //     }
  //   })
  //   .fail(function() {
  //     alert('error');
  //   });
  // };

  function buildHTML(message){
    if (message.image){
      let html = `<div class="Chat-main__message-list__contents" data-message-id=${message.id}>
      <div class="Chat-main__message-list__contents__top">
      <div class="Chat-main__message-list__contents__top__left">
      ${message.user_name}
      </div>
      <div class="Chat-main__message-list__contents__top__right">
      ${message.created_at}
      </div>
      </div>
      <div class="Chat-main__message-list__contents__btn">
      <p class="Message__content">
      ${message.message}
      </p>
      <img class="Message__image" src="${message.image}">
      </div>
      </div>`
      return html;
    } else {
      let html = `<div class="Chat-main__message-list__contents" data-message-id=${message.id}>
      <div class="Chat-main__message-list__contents__top">
      <div class="Chat-main__message-list__contents__top__left">
      ${message.user_name}
      </div>
      <div class="Chat-main__message-list__contents__top__right">
      ${message.created_at}
      </div>
      </div>
      <div class="Chat-main__message-list__contents__btn">
      <p class="Message__content">
      ${message.message}
      </p>
      </div>
      </div>`
      return html;
    };
  }

  $('.Form').on('submit', function(e){
    e.preventDefault()
    let url = $(this).attr('action');
    let formdata = new FormData(this);
    $.ajax({
      url: url,
      type: 'POST',
      data: formdata,
      dataType: 'json',
      processData:false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data)
      $(".Chat-main__message-list").append(html);
      $('.Chat-main__message-list').animate({ scrollTop: $('.Chat-main__message-list')[0].scrollHeight});
      $('form')[0].reset();
      $("input[type = 'submit']").prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  });
  // setInterval(reloadMessages, 7000);
});