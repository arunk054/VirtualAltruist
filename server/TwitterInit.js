
   
	Twit = new TwitMaker({
		consumer_key:         '1IvV7gUOvBbfEA2OsgNUX4SUp'
	  , consumer_secret:      'aWXKOh8Rt0t5Z5fcV2iFdXHEFDOBM0IZ2Y8HI2annixMitPPK0'
	  , access_token:         '234259524-QqzKtRJVMaoRndFnll6evPEu5NJ0uPsi25zj1whY'
	  , access_token_secret:  'M2KXVOvfXMPUhRnOGHCpbjr1vukdcx8WINxtZ6jd5RR7D'
	});

	var wrappedInsert = Meteor.bindEnvironment(function(tweet) {
   	 	TwitterPosts.insert(tweet);
  	}, "Failed to insert tweet into Posts collection.");
    
    var searchTweet = function(twitterId, query) {
    	console.log("Searching Tweet for word: "+query);
    	
		query=str; // ALS, Ferguson, Human Rights, GAY, unicef, lesbian, ebola, HRC, Red cross, obamacare, feministhackerbarbie, feminism
	//            Twit.get('statuses/user_timeline', { screen_name:'jeffbigham', count: 3 }, function(err, result) {
		Twit.get('search/tweets', {q:query, from:'jeffbigham', count: 3 }, function(err, result) {
			if (err) {
				console.log("Error", err);
				errOut = err;
				wrappedInsert(err);
			} else {
				wrappedInsert(result);
				console.log(result);
				resultOut = result;
			
			}
		});

    }
    
    Meteor.methods({
        getTweets: function (twitterId, str) {
			//Do nothing
        },
        
        addTweets: function(twitterId) {
			resultOut = null;
        	errOut = null;
        	console.log("Adding Tweets for TwitterID: "+TwitterId);
        	
        	//For each word in TweetWords
        	
        	
        }
    });
