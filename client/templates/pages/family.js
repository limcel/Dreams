Template.family.helpers({
 posts: function() {
 	return Posts.find({category: "Family"});
 }
});