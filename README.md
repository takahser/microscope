# microscope

meteor tutorial

## Collections

- special data structure, that is responsible for syncing real-time data between connected clients and mongoDb
    - Server: reading & writing changes to/from MongoDb
    - Client: secure copy of subset of real, canonical collection, stored in browser memory (cache), keeping up to date with server --> data already pre-loaded & can be accessed very quickly

### collections on mongoDb

    // clear db (delete everything)
    meteor reset

    // login
    meteor mongo

    // insert
    db.posts.insert({title: "new post"});

    // read
    db.posts.find(); // produces JSON: {title: "new post", _id: 'xxx'}

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

## Access from meteor.com

    // access mongoDB
    meteor mongo myApp

    // access logs
    meteor logs myApp:w

## Glossary

- MiniMongo -> Meteors client side MongoDB implementation, not all MongoDB features are available