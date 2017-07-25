Template.messagePage.events({
    'click #send': function(template) {
      var message = $('#newMessage').val();
      var sender = $('#sender').val();
      if (!message || !sender) {
        alert('Fill out both fields!');
      }

      console.log(message);
      console.log(sender);
      console.log(Meteor.user()._id);

      Meteor.saveMessage({
        message: message,
        sender: sender,
        postID: Router.current().params._id
      });
    }
});

Meteor.saveMessage = function(content) {
    var sender = content.sender;
    var message = content.message;
    var postID = content.postID;
    if (!sender || !message || !postID) {
      return;
    }

    var message = {
      message: message,
      sender: sender,
      postID: postID
      /*receiver: $(e.target).find('[name=receiver]').val(), */
    };

   Meteor.call('messageInsert', message, function(error, result) {
      // display the error to the user and abort
      if (error)
        return throwError(error.reason);
      
      // show this result but route anyway
      if (result.postExists)
        throwError('This link has already been posted');

      
      //Router.go('postPage', {_id: result._id});  
    });
 };

 Template.messagePage.helpers({
  ownPost: function() { //if-else case 

      var findMessagers = Messages.find({postID: Router.current().params._id}).userId;

  return this.userId === Meteor.userId();
  },

  messages: function() {
    return Messages.find({postID: Router.current().params._id, userId: Meteor.user()._id});
  }
});