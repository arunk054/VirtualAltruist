var refreshInterval;

addTweetsClient = function() {
		clearInterval(refreshInterval);
    	if (Session.get('loadingTweets') == true) {
    		$('#RefreshTweets').addClass('fa-spin');
    		alert("Mining Twitter in Progress... Please wait... ");
			$('#RefreshTweets').removeClass('fa-spin');
    		return;
    	}
    	Session.set('loadingTweets',true);
		$('#RefreshTweets').addClass('fa-spin');
		Meteor.call('addTweets',Meteor.user().profile.twitterId, Meteor.user().profile.timeStamp, Meteor.user().profile.sinceId, Meteor.user()._id, function(err,result) {
			if (err != undefined) {
				alert("Error: "+err.reason);
			}			
			Session.set('loadingTweets',false);
			refreshInterval = setInterval(function(){isMiningTweets();}, 3000)
		});					
}

isMiningTweets = function() {
		var isLoading = false;
    	Meteor.call('isWaiting', function(err,result) {
			if (err != undefined) {
				isLoading == false;
			}
			if (result == true) {
				isLoading = true;
			}
			if ( isLoading == false) {
				$('#RefreshTweets').removeClass('fa-spin');
			}
		});


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
    	addTweetsClient();
    	Session.set("isAddingTwitter", false);	
    },
    "click #RefreshTweets": function() {
    	//Set Spin icon
		addTweetsClient();
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


