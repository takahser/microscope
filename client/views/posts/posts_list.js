var postsData = [
    {
        title: 'Introducing Telescope',
        author: 'Sacha Greif',
        url: 'http://sachagreif.com/introducing-telescope/'
    },
    {
        title: 'Meteor',
        author: 'Tom Coleman',
        url: 'http://meteor.com/'
    },
    {
        title: 'The bible',
        author: 'various',
        url: 'http://www.bible.com/'
    }
];
Template.postsList.helpers({
    posts: postsData
});