// All code here is client code


	Accounts.ui.config({
		requestPermissions: {
		facebook: ['email', 'user_status'],
		}
	});

  Template.loginFacebook.events({
  	"click #login": function(e,tmpl){
  		Meteor.loginWithFacebook({ 
  			requestPermissions: ['email', 'user_status']

  		},
		function (error) {
		    if (error) {
		        return console.log(error);
		    }else{
          homePage = true;
        }
		});
  	}

  });

  Template.logoutFacebook.events({
  	"click #logout": function(e,tmpl){
  		Meteor.logout(function(err) {
			  if (err){
			  	//handle error
			  }else{
			  	//everything good
			  }
		});
  	}

  });
