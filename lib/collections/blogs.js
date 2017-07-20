Blogs = new Mongo.Collection('blogs');

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
