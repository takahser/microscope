# microscope

meteor tutorial

## Collections

- special data structure, that is responsible for syncing real-time data between connected clients and mongoDb
    - Server: reading & writing changes to/from MongoDb
    - Client: secure copy of subset of real, canonical collection, stored in browser memory (cache), keeping up to date with server --> data already pre-loaded & can be accessed very quickly

### collections on mongoDb (server)

    // clear db (delete everything)
    meteor reset

    // login
    meteor mongo

    // insert
    db.posts.insert({title: "new post"});

    // read
    db.posts.find(); // produces JSON: {title: "new post", _id: 'xxx'}

    // update
    db.posts.update({"_id": "xHufBgLcAZJmNnoRf"}, {"title": "changed"}, { upsert: true });

### collections on MiniMongo (client)

	// get cursor for posts collection (synchronous => if db chagnes, UI will be updated)
	Posts.find();
	
	// get records from cursor in an array => UI won't be updated when db changes
	Posts.find().fetch();

	// get number of posts
	Posts.find().count();
	
### Init new collection

    // new posts collection
    // if 'var' keyword is used, the objects scope will be limited to the file (meteor rule)
    Posts = new Meteor.Collection('posts');

### Syncronization

1. client inserts record using MiniMongo into client-side collection

    Posts.insert({title: "some title"});

2. server-side collection is being informed by new post
3. server-side collection inserts data into MongoDb
4. server-side collection updates all connected client with the current data

### Insert default data using Fixtures

Fixtures should be stored in the /server folder, because we need this code do be executed first, before sending any data to the client. Here is an example of a fixture containing 3 post collections.

    // file: /server/fixtures.js
    if (Posts.find().count() === 0) {
        Posts.insert({
            title: 'Introducing Telescope',
            author: 'Sacha Greif',
            url: 'http://sachagreif.com/introducing-telescope/'
        });
        Posts.insert({
            title: 'Meteor',
            author: 'Tom Coleman', 
            url: 'http://meteor.com'
        });
        Posts.insert({
            title: 'The Meteor Book', 
            author: 'Tom Coleman',
            url: 'http://themeteorbook.com'
    }); }

Next, we need the view to actually get the db data. We initialize the posts collection in the helpers function.

    // file: /client/views/post_list.js
    Template.postsList.helpers({
        posts: function() {
            return Posts.find();
        }
    });

In the view we can simply call the records using handlebars.

    // file: /client/views/post_list.html
    <template name="postsList">
        <div class="posts">
            {{#each posts}}
                {{> postItem}}
            {{/each}}
        </div>
    </template>

## Routes

For this project the routes are configured on the client side [iron:router](https://github.com/iron-meteor/iron-router).

	// Configure master templates
	Router.configure({
	  loadingTemplate: 'loading',
	  notFoundTemplate: 'notFound',
	  layoutTemplate: 'layout'
	});

	// Map routes
	Router.map(function() {
		
		// simple route
		// '/' => views/postsList.html
		this.route('postsList',{path:'/'});
		
		// route with url parameter route
		// '/post/1' to views/postItem, id=1
		this.route('/post/:_id', function () {
			var item = Posts.findOne({_id: this.params._id});
			this.render('postItem', {data: item});
		});
	});

## Access from meteor.com

    // access mongoDB
    meteor mongo myApp

    // access logs
    meteor logs myApp:w

## Authentication

install predefined packages by meteor

    meteor add accounts-ui
    meteor add accounts-password

## Glossary

- MiniMongo -> Meteors client side MongoDB implementation, not all MongoDB features are available