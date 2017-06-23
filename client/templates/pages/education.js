Template.education.helpers({
 posts: function() {
 	return Posts.find({category: "Education"});
 }
});