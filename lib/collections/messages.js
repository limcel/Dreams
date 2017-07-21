Messages = new Mongo.Collection('messages');

Messages.allow({
  update: function(userId, doc, fieldNames) {
    return ownsDocument(userId, doc) && 
      fieldNames.length === 1 && fieldNames[0] === 'read';
  }
});

createMessageNotification = function(message) {
  var post = Posts.findOne(messages.postId);
  if (message.userId !== post.userId) {
    Messages.insert({
      userId: post.userId,
      postId: post._id,
      messageId: message._id,
      messengerName: message.author,
      read: false
    });
  }
};