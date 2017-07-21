Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() { 
    return [Meteor.subscribe('notifications')]
  }
});

PostsListController = RouteController.extend({
  template: 'postsList',
  increment: 5, 
  postsLimit: function() { 
    return parseInt(this.params.postsLimit) || this.increment; 
  },
  findOptions: function() {
    return {sort: this.sort, limit: this.postsLimit()};
  },
  subscriptions: function() {
    this.postsSub = Meteor.subscribe('posts', this.findOptions());
  },
  posts: function() {
    return Posts.find({}, this.findOptions());
  },
  data: function() {
    var self = this;
    return {
      posts: self.posts(),
      ready: self.postsSub.ready,
      nextPath: function() {
        if (self.posts().count() === self.postsLimit())
          return self.nextPath();
      }
    };
  }
});

NewPostsController = PostsListController.extend({
  sort: {submitted: -1, _id: -1},
  nextPath: function() {
    return Router.routes.newPosts.path({postsLimit: this.postsLimit() + this.increment})
  }
});

BestPostsController = PostsListController.extend({
  sort: {votes: -1, submitted: -1, _id: -1},
  nextPath: function() {
    return Router.routes.bestPosts.path({postsLimit: this.postsLimit() + this.increment})
  }
});

Router.route('/', {
  name: 'home',
  controller: NewPostsController
});

Router.route('/new/:postsLimit?', {name: 'newPosts'});

Router.route('/best/:postsLimit?', {name: 'bestPosts'});


Router.route('/posts/:_id', {
  name: 'postPage',
  waitOn: function() {
    return [
      Meteor.subscribe('singlePost', this.params._id),
      Meteor.subscribe('comments', this.params._id)
    ];
  },
  data: function() { return Posts.findOne(this.params._id); }
});

Router.route('/posts/:_id/edit', {
  name: 'postEdit',
  waitOn: function() { 
    return Meteor.subscribe('singlePost', this.params._id);
  },
  data: function() { return Posts.findOne(this.params._id); }
});

Router.route('/categories', {name: 'categories'});

Router.route('/career', {
  name: 'career',
  waitOn: function() {
    return Meteor.subscribe('category');
  }
});
Router.route('/education', {
  name: 'education',
   waitOn: function() {
    return Meteor.subscribe('category');
  }
});
Router.route('/family', {
  name: 'family',
   waitOn: function() {
    return Meteor.subscribe('category');
  }
});
Router.route('/financial', {
  name: 'financial',
   waitOn: function() {
    return Meteor.subscribe('category');
  }
});
Router.route('/fun', {
  name: 'fun',
   waitOn: function() {
    return Meteor.subscribe('category');
  }
});
Router.route('/physical', {
  name: 'physical',
   waitOn: function() {
    return Meteor.subscribe('category');
  }
});
Router.route('/social', {
  name: 'social',
   waitOn: function() {
    return Meteor.subscribe('category');
  }
});
Router.route('/spiritual', {
  name: 'spiritual',
   waitOn: function() {
    return Meteor.subscribe('category');
  }
});


Router.route('/submit', {name: 'postSubmit'});

var requireLogin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.render('accessDenied');
    }
  } else {
    this.next();
  }
}
Router.route('/signup', {name: 'signup'});


Router.route('/myProfile', {name: 'myProfile'});
Router.route('/messagePage', {name: 'messagePage'});


Router.onBeforeAction('dataNotFound', {only: 'postPage'});
Router.onBeforeAction(requireLogin, {only: 'postSubmit'});
