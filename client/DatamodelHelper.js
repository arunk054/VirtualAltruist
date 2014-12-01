
AutoTweets = new Mongo.Collection("auto_tweets");

// Add insert, update operations to the collections.

PointsForTwitter = 20;

addTwitterId = function(TwitterId){

	Meteor.users.update({_id:Meteor.userId()}, {$set:{"profile.twitterId": TwitterId}} );
	var newScore = Meteor.user().profile.score + PointsForTwitter;
	Meteor.users.update({_id:Meteor.userId()}, {$set:{"profile.score": newScore}} );
}