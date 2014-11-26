

// Add insert, update operations to the collections.

addTwitterId = function(TwitterId){
	//TODO Add 100 points
	Meteor.users.update({_id:Meteor.userId()}, {$set:{"profile.twitterId": TwitterId}} );
}