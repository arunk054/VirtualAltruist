// All code here is client code


	window.fbAsyncInit = function(){
		FB.init({
		  appId      : '360701540757544',
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
        	}
		});
  	}

  });

  Template.logoutFacebook.events({
  	"click #logout": function(e,tmpl){
  		Meteor.logout(function(err) {
			  if (err){
			  }else{
			  	Session.set("curPage","home");
			  	//everything good
			  }
		});
  	}

  });
