// publish a collection := make it available on the client
// however, the client still needs to subscribe to them
Meteor.publish('posts', function() {
    return Posts.find();
});