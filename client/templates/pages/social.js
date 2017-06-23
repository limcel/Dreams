Template.social.helpers({
 posts: function() {
 	return Posts.find({category: "Social"});
 }
});