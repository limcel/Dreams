Template.financial.helpers({
 posts: function() {
 	return Posts.find({category: "Financial"});
 }
});