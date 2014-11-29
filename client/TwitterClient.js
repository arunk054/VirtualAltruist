
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
		Meteor.call('addTweets',Meteor.user().profile.twitterId, function(err,result) {
			if (err != undefined) {
				alert("Error: "+err.reason);
			}			
			Session.set('loadingTweets',false);
		});
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


