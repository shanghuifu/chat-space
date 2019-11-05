$(function(){

  function buildMessage(message){
    var image = ""
    if(message.image.url != null ? image = `<img class="message__content" src="${message.image.url}">` : image = "");
    var html = `
      <div class="message" data-id="${message.id}">
        <div class="message__info">
          <p class="message__info__talker">${message.name}</p>
          <p class="message__info__date">${message.date}</p>
        </div>
        <div class="message__content">
          ${message.content}
        </div>
        ${image}
      </div>`;
    return html
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildMessage(message);
      $(".messages").append(html);
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
      $('.new_message')[0].reset();
    })
    .fail(function(){
      alert("メッセージの送信に失敗しました");
    })
  })
});