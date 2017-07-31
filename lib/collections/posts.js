Posts = new Mongo.Collection('posts');

Posts.allow({
  update: function(userId, post) { return ownsDocument(userId, post); },
  remove: function(userId, post) { return ownsDocument(userId, post); }
});

Posts.deny({
  update: function(userId, post, fieldNames) {
    // may only edit the following two fields:
    return (_.without(fieldNames, 'category', 'title','summary','introduction','list').length > 0);
  }
});

Posts.deny({
  update: function(userId, post, fieldNames, modifier) {
    var errors = validatePost(modifier.$set);
    return errors.title || errors.category || errors.summary || errors.introduction || errors.list;
  }
});

validatePost = function (post) {
  var errors = {};

  if (!post.category)
    errors.category = "Please fill in a headline";

  if (!post.title)
    errors.title = "Please fill in a headline";
  
  if (!post.summary)
    errors.summary =  "Please fill in your summary";

  if (!post.introduction)
    errors.introduction =  "Please fill in your introduction";

  if (!post.list)
    errors.list =  "Please fill in the items you need";

  return errors;
}

Meteor.methods({
  postInsert: function(postAttributes) {
    check(this.userId, String);
    check(postAttributes, {
      category: String,
      title: String,
      summary: String,
      introduction: String,
      list: String,
      tags: String
    });
    
    var errors = validatePost(postAttributes);
    if (errors.category || errors.title || errors.summary || errors.introduction || errors.list)
      throw new Meteor.Error('invalid-post', "You must fill in the required above for your post");
    
    
    var user = Meteor.user();
    var post = _.extend(postAttributes, {
      userId: user._id, 
      author: user.username, 
      submitted: new Date(),
      commentsCount: 0,
      upvoters: [], 
      votes: 0
    });
    console.log("here")
    var postId = Posts.insert(post);
    
    return {
      _id: postId
    };
  },
  
  upvote: function(postId) {
    check(this.userId, String);
    check(postId, String);
    
    var affected = Posts.update({
      _id: postId, 
      upvoters: {$ne: this.userId}
    }, {
      $addToSet: {upvoters: this.userId},
      $inc: {votes: 1}
    });
    
    if (! affected)
      throw new Meteor.Error('invalid', "You weren't able to upvote that post");
  },

  checkUserPosts: function(userId) {
    check(this.userId, String);
    check(postId, String);
    var postSubmittedPreviously = Posts.findOne({userId: Meteor.userId()});
    console.log(postSubmittedPreviously);
    if (postSubmittedPreviously > 0) {
      throw new Meteor.Error('invalid', "You have an ongoing dream. Delete that to post another.");
      return true;
    }
    return false;
  }

});
