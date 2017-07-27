Template.myProfile.helpers({

  posts: function() {
 	  return Posts.find({userId:this.userId});
  }
});

Template.myProfile.events({

  'submit form': function(e) {
    e.preventDefault();
    var post = {
      firstname: $(e.target).find('[name=firstname]').val(),
      lastname: $(e.target).find('[name=lastname]').val(),
      company: $(e.target).find('[name=company]').val(),
      email: $(e.target).find('[name=email]').val(),
      shortdescription: $(e.target).find('[name=shortdescription]').val(),
      email: $(e.target).find('[name=email]').val(),
      username: $(e.target).find('[name=username]').val(),
      password: $(e.target).find('[name=password]').val(),
      confirmpassword: $(e.target).find('[name=confirmpassword]').val(),
    };

    var errors = validatePost(post);
    if (errors.firstname || errors.lastname || errors.email || errors.shortdescription || errors.username || errors.password) {
      return Session.set('myProfileErrors', errors);
    }

  }
});
Template.myProfile.events({
	"click button.upload": function(){
		var files = $("input.file_bag")[0].files

		S3.upload({
				files:files,
				path:"subfolder"
			},function(e,r){
				console.log(r);
		});
	}
})

Template.myProfile.helpers({
	"files": function(){
		return S3.collection.find();
	}
})
