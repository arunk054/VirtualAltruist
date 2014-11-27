TweetWords =  new Mongo.Collection("twitter_words");



var searchTweet = function(twitterId, query) {
	console.log("Searching Tweet for word: "+query);
	
//            Twit.get('statuses/user_timeline', { screen_name:'jeffbigham', count: 3 }, function(err, result) {
	// Twit.get('search/tweets', {q:query, from:twitterId, count: 3 }, function(err, result) {
// 		if (err) {
// 			console.log("Error", err);
// 			errOut = err;
// 			wrappedInsert(err);
// 		} else {
// 			wrappedInsert(result);
// 			console.log(result);
// 			resultOut = result;
// 		
// 		}
// 	});
}


var addTweets =  function(twitterId) {
	resultOut = null;
	errOut = null;
	console.log("Adding Tweets for TwitterID: "+twitterId);
	
	//For each word in TweetWords
	var words = TweetWords.find();
	words.forEach(
		function(element, index, array) {
			console.log(element.word);
			searchTweet(twitterId,element.word);
		}
	);
	Session.set('loadingTweets',false);
	
}



Template.shareInfo.events({

	"click #addTwitter" : function () {
      	Session.set("isAddingTwitter", true);
    },
    
    "click #TwitIdButton" : function() {
    	var twitterId = $("#TwitterId").val(); 
    	if (twitterId == undefined || twitterId == "") {
    		alert ("Please enter a valid Twitter ID");
    		return;
    	}
    	addTwitterId(twitterId);
    	Session.set("isAddingTwitter", false);	
    },
    "click #RefreshTweets": function() {
    	if (Session.get('loadingTweets') == true) {
    		alert("Mining Twitter in Progress. Please wait... ");
    		return;
    	}
    	Session.set('loadingTweets',true);
    	//add tweets
		addTweets(Meteor.user().profile.twitterId);
    }
});

Template.shareInfo.helpers({

	isAddingTwitterId : function () {
      	return Session.get("isAddingTwitter");
    },
    myTwitterId: function() {
    	return '@'+Meteor.user().profile.twitterId;
    },
	hastwitterAccount: function () {
      return Meteor.user().profile.twitterId != "";
    }

});


