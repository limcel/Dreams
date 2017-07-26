Profiles = new Mongo.Collection('profiles');

Posts.deny({
  update: function(userId, profile, fieldNames) {
    // may only edit the following two fields:
    return (_.without(fieldNames, 'firstname', 'lastname','company','email','shortdescription','username','password','confirmpassword').length > 0);
  }
});

/* 
validateProfile = function (post) {
  var errors = {};
  if (!profile.firstname)
    errors.firstname = "Please fill in your firstname";

  if (!profile.lastname)
    errors.lastname = "Please fill in your headline";
  
  if (!profile.company)
    errors.company =  "Please fill in your company";

    if (!profile.email)
    errors.company =  "Please fill in your email";

   if (!profile.shortdescription)
    errors.company =  "Please fill your short description";

  if (!profile.username)
    errors.username =  "Please fill in your username";

  if (!profile.password)
    errors.password =  "Please fill in your password";

  if (!profile.confirmpassword)
    errors.confirmpassword =  "Confirming password is required";

  return errors;
}
*/


Meteor.methods({
  profileInsert: function(profileAttributes) {
    check(this.userId, String);
    check(profileAttributes, {
      firstname: String,
      lastname: String,
      company: String,
      email: String,
      shortdesciption: String,
      username: String,
      password: String,
      confirmpassword: String
    });
    
   /* var errors = validatePost(profileAttributes);
    if (errors.firstname || errors.lastname || errors.company || errors.email || errors.shortdescription || errors.username || errors.password || errors.confirmpassword)
      throw new Meteor.Error('invalid-update', "You must fill in the required above for your post");
    */
    
    var user = Meteor.user();
    var profile = _.extend(profileAttributes, {
      userId: user._id, 
      author: user.username, 
      submitted: new Date(),
    });
    console.log("HELLO im at profile page");
    var profileId = Profiles.insert(profile);
    
    return {
      _id: profileId
    };
  }
  });