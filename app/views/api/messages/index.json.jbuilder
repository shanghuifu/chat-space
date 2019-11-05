json.array! @messages do |message|
  json.content message.content
  json.image message.image
  json.name message.user.name
  json.date message.created_at.strftime("%Y/%m/%d %H:%M")
  json.id message.id
end