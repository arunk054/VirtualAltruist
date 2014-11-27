

// Add insert, update operations to the collections.

addTwitterId = function(TwitterId){

	Meteor.users.update({_id:Meteor.userId()}, {$set:{"profile.twitterId": TwitterId}} );
	var newScore = Meteor.user().profile.score + 20;
	Meteor.users.update({_id:Meteor.userId()}, {$set:{"profile.score": newScore}} );
}