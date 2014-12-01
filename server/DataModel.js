AutoTweets =  new Mongo.Collection("auto_tweets");


Meteor.users.allow({
	update: function(userId, doc) {
		return true;
	}
});