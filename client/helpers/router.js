// Configure Iron:Router
Router.configure({
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  layoutTemplate: 'layout'
});


Router.map(function() {
    this.route('postsList',{path:'/'});
    //this.route('postItem',{path:'/posts/:_id'}, function(id) { Session.set('currentPostId', id); });
    this.route('/post/:_id', function () {
      var item = Posts.findOne({_id: this.params._id});
      //var item = Posts.findOne('xHufBgLcAZJmNnoRf');
      this.render('postPage', {data: item});
    });
});