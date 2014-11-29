TwitterPosts =  new Mongo.Collection("twitter_posts");


Meteor.users.allow({
	update: function(userId, doc) {
		return true;
	}
});