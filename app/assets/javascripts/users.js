$(document).on('turbolinks:load', function() {
  function addUser(user) {
    let html = `
      <div class="chat-group-user clearfix">
        <p class="chat-group-user__name">${user.name}</p>
        <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
      </div>`;
    $("#user-search-result").append(html);
  }
  function addNoUser() {
    let html = `
      <div class="chat-group-user clearfix">
        <p class="chat-group-user__name">ユーザーが見つかりません</p>
      </div>`;
    $("#user-search-result").append(html);
  }
  function addDeleteUser(name, id) {
    let html = `
      <div class="chat-group-user clearfix" id="${id}">
        <p class="chat-group-user__name">${name}</p>
        <div class="chat-group-user__btn chat-group-user__btn--remove" data-user-id="${id}" data-user-name="${name}">削除</div>
      </div>`;
    $("#chat-group-users").append(html);
  }
  function addMember(userId) {
    let html = `<input value="${userId}" name="group[user_ids][]" type="hidden" id="group_user_ids_${userId}" />`;
    $(`#${userId}`).append(html);
  }

  $("#user-search-field").on('keyup', function() {
    var input = $("#user-search-field").val();
    $.ajax({
      url: '/users',
      type: 'GET',
      data: {keyword: input},
      dataType: 'json'
    })
    .done(function(users) {
      $("#user-search-result").empty();
      var member = $(".chat-group-user").map(function(){
        return $(this).data('id');
      }).toArray();
      if (users.length !== 0) {
        users.forEach(function(user) {
          if( member.indexOf(user.id) !== 0 ) {
            addUser(user);
          }
        });
      } else if (input.length == 0) {
        return false;
      } else {
        addNoUser();
      }
    })
    .fail(function() {
      alert('ユーザーを表示できません')
    })
  })

  $('#user-search-result').on('click', '.chat-group-user__btn--add', function(){    
    const userName = $(this).attr("data-user-name");
    const userId = $(this).attr("data-user-id");
    $(this).parent().remove();
    addDeleteUser(userName, userId);
    addMember(userId);
  })

  $('#chat-group-users').on("click", ".chat-group-user__btn--remove", function() {
    $(this).parent().remove();
  })
});