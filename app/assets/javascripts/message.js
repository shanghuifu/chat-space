$(function(){
  function buildMessage(message){
    var image = ""
    if(message.image.url ? image = `<img class="message__content" src="${message.image.url}">` : image = "");
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
    return html;
  }
  
  var reloadMessages = function() {
    if(document.URL.match(/messages/)) {
      last_message_id = $('.message').last().attr('data-id');
      $.ajax({
        url: 'api/messages',
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages) {
        if (messages.length !== 0) {
          messages.forEach(function(message) {
            var html = buildMessage(message);
            $(".messages").append(html);
            $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
          });
        } else {
          return false;
        }
      })
      .fail(function() {
        console.log('error');
      });
    }
  };
  

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

  setInterval(reloadMessages, 5000);
});