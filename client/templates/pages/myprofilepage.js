Template.myProfile.helpers({
 posts: function() {
 	return Posts.find({userId:this.userId});
 }
});
