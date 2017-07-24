Template.postSubmit.onCreated(function() {
  Session.set('postSubmitErrors', {});
});

Template.postSubmit.helpers({
  errorMessage: function(field) {
    return Session.get('postSubmitErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('postSubmitErrors')[field] ? 'has-error' : '';
  }
});


Template.postSubmit.events({
  'submit form': function(e) {
    e.preventDefault();
    var post = {
      category: $("#category").val(),
      title: $(e.target).find('[name=title]').val(),
      summary: $(e.target).find('[name=summary]').val(),
      introduction: $(e.target).find('[name=introduction]').val(),
      list: $(e.target).find('[name=list]').val(),
      tags: $(e.target).find('[name=tags]').val()
    };
/*find userID & put condition: if (userID.findOne == 1),route back to the url and dont allow postings */
    
    var errors = validatePost(post);
    if (errors.category || errors.title || errors.summary || errors.introduction || errors.list) {
      return Session.set('postSubmitErrors', errors);
    }

    Meteor.call('postInsert', post, function(error, result) {
      // display the error to the user and abort
      if (error)
        return throwError(error.reason);
      
      // show this result but route anyway
      if (result.postExists)
        throwError('This link has already been posted');

      
      Router.go('postPage', {_id: result._id});  
    });
  }
});
