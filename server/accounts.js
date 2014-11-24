
  Meteor.startup(function () {
    // code to run on server at startup
    
		Accounts.loginServiceConfiguration.remove({
		  service: "facebook"
		});
		Accounts.loginServiceConfiguration.insert({
		  service: "facebook",
		  appId: "287242084819085",
		  secret: "f51147ca417db876d3900da4037f4675"
		});


  });



