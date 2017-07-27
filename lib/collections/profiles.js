Profiles = new Mongo.Collection('profiles');

Posts.deny({
  update: function(userId, profile, fieldNames) {
    // may only edit the following fields:
    return (_.without(fieldNames, 'firstname', 'lastname','company','email').length > 0);
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
      email: String
     // shortdesciption: String
    });
    
   /* var errors = validatePost(profileAttributes);
    if (errors.firstname || errors.lastname || errors.company || errors.email || errors.shortdescription || errors.username || errors.password || errors.confirmpassword)
      throw new Meteor.Error('invalid-update', "You must fill in the required above for your post");
    */
    
    var user = Meteor.user();
    var profile = _.extend(profileAttributes, {
      userId: user._id, 
      username: user.username, 
      submitted: new Date(),
    });
    console.log("HELLO im at profile page");

    var profileId = Profiles.insert(profile);
    
    return {
      _id: profileId
    };
  },

  checkUserProfile: function(userId) {
    check(this.userId, String);
    console.log("NOTICE ME");
    console.log(Profiles.findOne({userId: Meteor.userId()}));

     var profileUpdatedPreviously = Profiles.findOne({userId: Meteor.userId()});

     
     console.log("hey im here");
    if (profileUpdatedPreviously == null) {
      return false;    
    }
    return true;

  },

  updateProfile: function(profileAttributes) {
       check(profileAttributes, {
      firstname: String,
      lastname: String,
      company: String,
      email: String
     // shortdesciption: String
    });
    console.log(profileAttributes);
    console.log(profileAttributes.firstname);
    console.log("HEYY");

    Profiles.update(
      {profile: profileAttributes},
        {$set:
          {firstname: profileAttributes.firstname,
          lastname: profileAttributes.lastname,
          company: profileAttributes.company,
          email: profileAttributes.email
        }
      }
      );
 console.log("HPOE");
     
     console.log("im at the updateProfile function");

  }


});