Template.career.helpers({
 posts: function() {
 	return Posts.find({category: "Career"});
 }
});