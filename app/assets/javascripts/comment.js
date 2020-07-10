$(function(){

  function buildHTML(message){
    if (message.image){
      let html = `<div class="Chat-main__message-list__contents">
      <div class="Chat-main__message-list__contents__top">
      <div class="Chat-main__message-list__contents__top__left">
      ${message.user_name}
      </div>
      <div class="Chat-main__message-list__contents__top__right">
      ${massege.created_at}
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
      let html = `<div class="Chat-main__message-list__contents">
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
});