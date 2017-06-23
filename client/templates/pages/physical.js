Template.physical.helpers({
 posts: function() {
 	return Posts.find({category: "Physical"});
 }
});