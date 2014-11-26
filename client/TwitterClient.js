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


