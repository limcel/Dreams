Messages = new Mongo.Collection('messages');

Messages.allow({
  update: function(userId, doc, fieldNames) {
    return ownsDocument(userId, doc) && 
      fieldNames.length === 1 && fieldNames[0] === 'read';
  }
});

Messages.allow({
 update: function(userId, post) { return ownsDocument(userId, post); },
 remove: function(userId, post) { return ownsDocument(userId, post); }
});

Messages.allow({
 insert: function(userId, doc) {
 // only allow posting if you are logged in
 return !! userId;
 }
});

Messages.deny({
 update: function(userId, post, fieldNames) {
 // may only edit the following two fields:
 return (_.without(fieldNames, 'message').length > 0);
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


Meteor.methods({
 messageInsert: function(messageAttributes) {
 check(this.userId, String);
 check(messageAttributes, {
      message: String,
      sender: String,
      postID: String
    });
 //if (errors.messagebody)
 //throw new Meteor.Error('invalid', "Please fill in your message");
 var user = Meteor.user();
 var message = _.extend(messageAttributes, {
 userId: user._id,
 submitted: new Date()
 });
 var messageId = Messages.insert(message);
 return {
 _id: messageId
 };
 }
});