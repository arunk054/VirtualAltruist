// All code here is client code

	   
	   window.fbAsyncInit = function(){
		FB.init({
		  appId      : '287242084819085',
		  xfbml      : true,
		  version    : 'v2.0'
		});
	};
	(function(d, s, id){
         var js, fjs = d.getElementsByTagName(s)[0];
         if (d.getElementById(id)) {return;}
         js = d.createElement(s); js.id = id;
         js.src = "//connect.facebook.net/en_US/sdk.js";
         fjs.parentNode.insertBefore(js, fjs);
       }(document, 'script', 'facebook-jssdk'));

    
		Accounts.ui.config({
			requestPermissions: {
			facebook: ['email', 'public_profile', 'user_friends'],
			}
		});

	Template.body.events({
	  "submit .new-task": function (event) {
		FB.ui({
		  method: 'share',
		  //href: 'http://www.nytimes.com/2011/06/15/arts/people-argue-just-to-win-scholars-assert.html',
		  href: 'https://developers.facebook.com/docs/',
		}
		);
	  }
	  });
	  
	  Template.profile_pic.helpers({
	  	profilePic: function() {
  			id = Meteor.user().services.facebook.id;
			return "http://graph.facebook.com/"+id+"/picture";
			return id;
	  	}
	  });

