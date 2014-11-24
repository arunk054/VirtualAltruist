
Meteor.startup(function () {
    // code to run on server at startup
//    	 var Twit = Meteor.npmRequire('twit');
// 	 
// 	 var T = new Twit({
//         consumer_key:         '1IvV7gUOvBbfEA2OsgNUX4SUp', // API key
//         consumer_secret:      'aWXKOh8Rt0t5Z5fcV2iFdXHEFDOBM0IZ2Y8HI2annixMitPPK0', // API secret
//         access_token:         '234259524-QqzKtRJVMaoRndFnll6evPEu5NJ0uPsi25zj1whY', 
//         access_token_secret:  'M2KXVOvfXMPUhRnOGHCpbjr1vukdcx8WINxtZ6jd5RR7D'
//     });
   	 Posts.insert("asda");
    
	Twit = new TwitMaker({
		consumer_key:         '1IvV7gUOvBbfEA2OsgNUX4SUp'
	  , consumer_secret:      'aWXKOh8Rt0t5Z5fcV2iFdXHEFDOBM0IZ2Y8HI2annixMitPPK0'
	  , access_token:         '234259524-QqzKtRJVMaoRndFnll6evPEu5NJ0uPsi25zj1whY'
	  , access_token_secret:  'M2KXVOvfXMPUhRnOGHCpbjr1vukdcx8WINxtZ6jd5RR7D'
	});

	var wrappedInsert = Meteor.bindEnvironment(function(tweet) {
   	 Posts.insert(tweet);
  	}, "Failed to insert tweet into Posts collection.");
    
       Meteor.methods({
        getBananaTweets: function () {
        	resultOut = null;
        	errOut = null;
        	console.log("asfsafas");
            Twit.get('search/tweets', { q: 'banana since:2011-11-11', count: 2 }, function(err, result) {
                if (err) {
                    console.log("Error", err);
					errOut = err;
					wrappedInsert(err);
                } else {
                	wrappedInsert(result);
                    console.log(result);
                    console.log("dasda");
					resultOut = result;
					
                }
            });
            
            
			
        }
    });
});