Template.blog.events({
  'submit #blogForm':function(e){
    e.preventDefault();
    var title = $('#blogTitle').val();
    var body = $('#blogBody').val();
    Meteor.call('submitPost', title, body);
  }
})

Template.listBlogs.blogs = function (){
  return Blogs.find();
}
