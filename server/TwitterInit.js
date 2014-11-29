
   
	Twit = new TwitMaker({
		consumer_key:         '1IvV7gUOvBbfEA2OsgNUX4SUp'
	  , consumer_secret:      'aWXKOh8Rt0t5Z5fcV2iFdXHEFDOBM0IZ2Y8HI2annixMitPPK0'
	  , access_token:         '234259524-QqzKtRJVMaoRndFnll6evPEu5NJ0uPsi25zj1whY'
	  , access_token_secret:  'M2KXVOvfXMPUhRnOGHCpbjr1vukdcx8WINxtZ6jd5RR7D'
	});

	var wrappedInsert = Meteor.bindEnvironment(function(tweet) {
   	 	TwitterPosts.insert(tweet);
  	}, "Failed to insert tweet into Posts collection.");
    

    var searchTweet = function(twitterId, query,sinceTime, timeStamp, index) {
    	console.log("Searching Tweet for word: "+query);

		Twit.get('search/tweets', {q:query, since:sinceTime, until:timeStamp, from:twitterId, count: 25 }, function(err, result) {
			if (err) {
				//We could throw error, but need to set all waitArray to true and throw error
				//For now just log the error			
				console.log("Error in search Tweets: ", err);
			} else {
//				wrappedInsert(result);
//				console.log(result);
				var statuses = result.statuses;
				var  len = statuses.length;
				var i = 0;
				console.log('Tweets for word: '+query);
				for (i = 0; i < len; ++i ) {
					console.log(statuses[i].text);
				}
				
//				console.log("Retrieved Tweet: "+ result.text);
			}
			
			//Set the array to false
			waitArray[index] = true;
			//no more waiting so update the timestamp
			if (checkArray() == false) {
				//update the timestamp, get cur time
				//timeStamp = getCurrentTimeStamp();
				//Meteor.users.updat;
			}
		}
		);
    }
    
var getCurrentTimeStamp = function() {
	var today = new Date();
	
	var month = today.getMonth()+1;
	var date = today.getDate();
	if (month < 10){
		month+='0'+month;
	}
	if (date < 10){
		date+='0'+date;
	}
	return today.getFullYear()+"-"+month+"-"+today.getDate();
	
}

    var waitArray = [];
    var checkArray = function() {
    	var isWait = false;
    		
    	waitArray.forEach(
        		function(element, index, array) {
        			//all elements have to be true
        			if (element == false) {
        				isWait = true;
        			}
        		});
        if (isWait == false) {
        	waitArray = [];
        }
        return isWait;
    }
    
    
    Meteor.methods({
        getTweets: function (twitterId, str) {
			//Do nothing, backward compatibility
        },
        
        addTweets: function(twitterId, timeStamp) {
			resultOut = null;
        	errOut = null;
        	if (checkArray() == true) {
        		throw new Meteor.Error(500,"Mining Twitter in Progress. Please wait...");
        	}
        	console.log("Adding Tweets for TwitterID: "+twitterId);
        	//initialize waitArray to false
        	waitArray = [];
        	count = TweetWords.find().count();
        	for (i = 0; i < count; ++i) {
        		waitArray = waitArray.concat(false);
        	}
        	//For each word in TweetWords
        	var words = TweetWords.find();
        	count = 0;
			var sinceTime = timeStamp;
        	if (timeStamp == undefined || timeStamp == '')
        	{
        		sinceTime = '2014-01-01';//Some default date
				console.log('Timestamp is not defined - setting Since : '+sinceTime);
				timeStamp = getCurrentTimeStamp()	;
        		console.log('Setting timestamp to current Date: '+ timeStamp);
        		
        	}
        	//If timestamp and since are same then subtract
        	
        	if (timeStamp == sinceTime) {
        		throw new Meteor.Error(500, "Already mined twitter feed for "+twitterId+", try again tommorrow..");
        	}
        	
        	words.forEach(
        		function(element, index, array) {
        			console.log('Twitter word: '+element);
        			searchTweet(twitterId, element.word, sinceTime, timeStamp, count);
        			count++;
        		}
        	);
        }
    });
    
    
	//Mine tweets    
    Meteor.startup(function () {
    	//Check if 
    
    });


