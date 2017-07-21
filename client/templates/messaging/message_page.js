Template.messgaePage.events({
  'submit form': function(e) {
    e.preventDefault();
    var message = {
      message: $(e.target).find('[name=message]').val(),
    };

    Meteor.call('messageInsert', post, function(error, result) {
      // display the error to the user and abort
      if (error)
        return throwError(error.reason);
      
      // show this result but route anyway
      if (result.postExists)
        throwError('This link has already been posted');
      
      Router.go('messagePage', {_id: result._id});  
    });
  }
});