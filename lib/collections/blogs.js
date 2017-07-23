Blogs = new Mongo.Collection('blogs');

Blogs.allow({
 insert: function(userId, doc) {
 // only allow posting if you are logged in
 return !! userId;
 }
});

Meteor.methods({
  'submitPost': function(title, body){
    check(body, Match.Any);
    check(title, Match.Any);
    console.log(title);
    console.log(body);
    Blogs.insert({
      'title': title,
      'body': body,
      'timestamp': new Date()
    })
  }
})
