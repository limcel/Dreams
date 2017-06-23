Template.fun.helpers({
 posts: function() {
 	return Posts.find({category: "Fun"});
 }
});