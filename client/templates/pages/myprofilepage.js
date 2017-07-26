/* 
Template.myProfile.helpers({
 profiles: function() {
 	return Profiles.find({userId:this.userId});
 }
});


Template.myProfile.events({
  'submit form': function(e) {
    e.preventDefault();
    var profile = {
      firstname: $(e.target).find('[name=firstname]').val(),
      lastname: $(e.target).find('[name=lastname]').val(),
      company: $(e.target).find('[name=company]').val(),
      email: $(e.target).find('[name=email]').val(),
      shortdescription: $(e.target).find('[name=shortdescription]').val(),
      username: $(e.target).find('[name=username]').val(),
      password: $(e.target).find('[name=password]').val(),
      confirmpassword: $(e.target).find('[name=confirmpassword]').val()
    };
    
    var errors = validateProfile(profile);
    if (errors.firstname || errors.lastname || errors.email || errors.shortdescription || errors.username || errors.password) {
      return Session.set('myProfileErrors', errors);
    }
    


     Meteor.call('profileInsert', profile, function(error, result) {
      // display the error to the user and abort
       if (error)
      console.log(firstname);
      console.log(lastname);
      console.log(company);
      console.log(email);
      console.log(shortdescription);
      console.log(username);
      console.log(password);

        return throwError(error.reason); 
      
      // show this result but route anyway
      if (result.profileExists)
        throwError('This link has already been posted'); //change this to update profile

      
    });
  }
});

*/