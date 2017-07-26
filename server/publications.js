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

Meteor.publish('profiles', function() {
  return Profiles.find({userId: this.userId});
});

Meteor.publish('notifications', function() {
  return Notifications.find({userId: this.userId, read: false});
});

/*
Meteor.publish( 'channel', function( isDirect, channel ) {
  check( isDirect, Boolean );
  check( channel, String );

  if ( isDirect ) {
    let user = Meteor.users.findOne( { username: channel.replace( '@', '' ) } );
    return Messages.find({
      $or: [ { owner: this.userId, to: user._id }, { owner: user._id, to: this.userId } ]
    });;
  } else {
    let selectedChannel = Channels.findOne( { name: channel } );
    return Messages.find( { channel: selectedChannel._id } );
  }
});
*/