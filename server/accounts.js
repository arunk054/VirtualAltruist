
	Meteor.startup(function () {
    // code to run on server at startup

		Accounts.loginServiceConfiguration.remove({
		  service: "facebook"
		});
		Accounts.loginServiceConfiguration.insert({
		  service: "facebook",
		  appId: "360701540757544",
		  secret: "52d044bf3f0645976f4d88770c6e66f6"
		});

  	});

	Accounts.onCreateUser(function(options, user) {
	    if (options.profile) {
	        options.profile.picture = "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?width=300&height=300";
	        options.profile.score = 0;
	        options.profile.twitterId = "";
	        options.profile.first_name = user.services.facebook.first_name;
	        options.profile.last_name = user.services.facebook.last_name;
	        user.profile = options.profile;
	    }
	    return user;
	});



