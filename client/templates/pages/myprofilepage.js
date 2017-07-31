
Template.myProfile.helpers({

  profiles: function() {
 	  return Profiles.find({userId:this.userId});
  }
});

var imageURL;

Template.myProfile.events({

  'submit form': function(e) {

    e.preventDefault();
    var profile = {
      firstname: $(e.target).find('[name=firstname]').val(),
      lastname: $(e.target).find('[name=lastname]').val(),
      company: $(e.target).find('[name=company]').val(),
      email: $(e.target).find('[name=email]').val(),
      imageurl: imageURL
      //shortdescription: $(e.target).find('[name=shortdescription]').val()
    };
/*
    var errors = validatePost(profile);
    if (errors.firstname || errors.lastname || errors.email || errors.shortdescription || errors.username || errors.password) {
      return Session.set('myProfileErrors', errors);
    }
    */

    Meteor.call('checkUserProfile', Meteor.userId(), function(error,result) {
      if (result == false) {

     Meteor.call('profileInsert', profile, function(error, result) {
       // display the error to the user and abort
        if (error) {
       // console.log(profile.firstname);
       //console.log(profile.lastname);
       //console.log(profile.company);
       //console.log(profile.email);
        return throwError(error.reason);
       }

       // show this result but route anyway
       if (result.profileExists)
         throwError('This link has already been posted'); //change this to update profile

        });
      }
      if (result === true) {
        Meteor.call('updateProfile', profile, function(error,result){
          // display the error to the user and abort

        if (error) {
        //console.log(profile.firstname);
       //console.log(profile.lastname);
       //console.log(profile.company);
       //console.log(profile.email);
        //console.log(error.reason);
         return throwError(error.reason);
       }

       // show this result but route anyway

          });
      }
   });
 }
});

Template.myProfile.events({
	"click button.upload": function(){
		var files = $("input.file_bag")[0].files

		S3.upload({
				files:files,
				path:"subfolder"
			},function(e,r){
        imageURL = r.url;
				console.log(r);
		});
	}
})

Template.myProfile.helpers({
	"files": function(){
		return S3.collection.find();
	}
})
