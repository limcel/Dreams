Meteor.subscribe("blogs");

Template.listBlogs.helpers({
  Blogs: function(){
    return Blogs.find({},{ sort: { timestamp:-1}, limit: 99});
  }
})
