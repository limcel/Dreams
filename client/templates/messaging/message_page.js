Template.messagePage.events({
    'click #send': function() {
      var message = $('#newMessage').val();
      var username = $('#username').val();
      if (!message || !username) {
        alert('Fill out both fields!');
      }

      console.log(message);
      console.log(username);

      Meteor.saveMessage({
        message: message,
        username: username
      });
    }
});


Meteor.saveMessage = function(content) {
    var username = content.username;
    var message = content.message;
    if (!username || !message) {
      return;
    }
    Messages.insert({
      username: username,
      message: message,
      timestamp: Date.now()
    }, function(err, id) {
      if (err) {
        alert('Something definitely went wrong!');
      }
      if (id) {
        $('#newMessage').val('');
        $('#username').val('');
      }
    });
};

Messages.allow({
    'insert': function(userId, doc) {
      return true;
    },
    'remove': function(userId, doc) {
      return false;
    }
});
Messages.allow({
 update: function(userId, post) { return ownsDocument(userId, post); },
 remove: function(userId, post) { return ownsDocument(userId, post); }
});