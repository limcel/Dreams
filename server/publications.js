Meteor.publish("blogs", function(){
  return Blogs.find({},{ sort: { timestamp:-1}, limit: 99});
});

Meteor.publish('posts', function(options) {
  check(options, {
    sort: Object,
    limit: Number
  });
  return Posts.find({}, options);
});

Meteor.publish('category', function(category) {
  return Posts.find();
});

Meteor.publish('userId', function(userId) {
  return Posts.find();
});

Meteor.publish('singlePost', function(id) {
  check(id, String);
  return Posts.find(id);
});

Meteor.publish('comments', function(postId) {
  check(postId, String);
  return Comments.find({postId: postId});
});

Meteor.publish('messages', function() {
  return Messages.find();
});

Meteor.publish('profiles', function(userId) {
  return Profiles.find({userId: this.userId});
});

Meteor.publish('notifications', function() {
  return Notifications.find({userId: this.userId, read: false});
});