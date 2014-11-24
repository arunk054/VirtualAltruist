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
		  "click #TwitIdButton": function (event) {
		  	twitterId = $("#TwitterId").val();
			//Get the Twitter Feeds
			alert(twitterId);
			Meteor.call('getBananaTweets',function(err,result) {
				console.log(err);
				console.log(result);
			});
	 
// 	 var T = new Twit({
//         consumer_key:         '1IvV7gUOvBbfEA2OsgNUX4SUp', // API key
//         consumer_secret:      'aWXKOh8Rt0t5Z5fcV2iFdXHEFDOBM0IZ2Y8HI2annixMitPPK0', // API secret
//         access_token:         '234259524-QqzKtRJVMaoRndFnll6evPEu5NJ0uPsi25zj1whY', 
//         access_token_secret:  'M2KXVOvfXMPUhRnOGHCpbjr1vukdcx8WINxtZ6jd5RR7D'
//     });
// 
// 			    T.get('search/tweets',
// 				{
// 					q: 'banana since:2011-11-11',
// 					count: 10
// 				},
// 				function(err, data, response) {
// 					consloe.log("here");
// 					console.log(data);
// 				}
// 			);
		  }
	  });
	  
	  Template.profile_pic.helpers({
	  	profilePic: function() {
  			id = Meteor.user().services.facebook.id;
			return "http://graph.facebook.com/"+id+"/picture";
			return id;
	  	}
	  });

