	Template.twitterIdForm.events({
		  "click #TwitIdButton": function (event) {
		  	twitterId = $("#TwitterId").val();
		  	console.log(twitterId);
			if (twitterId == "") {
				return;
			}
			Meteor.call('getTweets',function(err,result) {});
			//Keep querying the database
	 
		  }
	  });