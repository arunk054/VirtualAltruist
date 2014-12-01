
   
	Twit = new TwitMaker({
		consumer_key:         '1IvV7gUOvBbfEA2OsgNUX4SUp'
	  , consumer_secret:      'aWXKOh8Rt0t5Z5fcV2iFdXHEFDOBM0IZ2Y8HI2annixMitPPK0'
	  , access_token:         '234259524-QqzKtRJVMaoRndFnll6evPEu5NJ0uPsi25zj1whY'
	  , access_token_secret:  'M2KXVOvfXMPUhRnOGHCpbjr1vukdcx8WINxtZ6jd5RR7D'
	});

	var wrappedInsert = Meteor.bindEnvironment(function(tweet) {
   	 	AutoTweets.insert(tweet);
  	}, "Failed to insert tweet into collection.");
  	 
  	 var wrappedUpdate = Meteor.bindEnvironment(function(userId, sinceId) {
  	 	console.log('Updating for userId:'+userId);
  	 	var curUsers = Meteor.users.find({_id:userId});
		if (curUsers == null || curUsers == undefined || curUsers.count()== 0){
  	 	 	return;
  	 	}
  	 	var curScore = undefined;
		curUsers.forEach(
			function(element, index, array) {
				if (curScore == undefined) {
					curScore = element.profile.score;
					//break does not work
				}
			}
		);
		console.log("Got curScore from DB: "+curScore);
		if (curScore == undefined)
			curScore = 0;
		curScore += newScore;
		console.log("new score:"+curScore);
		
  	 	Meteor.users.update({_id:userId},{$set:{"profile.sinceId":sinceId, "profile.score":curScore}});
  	 },"Error updating sinceid, score ");


  	   	   	 
    var checkAndUpdate = function (words, userId) {
			len = statuses.length;
			console.log('Check and Update: '+statuses.length);
			for (i = 0; i < len; ++i ) {
			//For each word
			var  num = words.length;
			for (j = 0; j < num; ++j) {
				//store - id, tweet, word, points, #retweets, #favorites
				if (statuses[i].text.toLowerCase().indexOf(words[j]) != -1) {
					//Check if RT
					var points = 10;
					if (statuses[i].text.indexOf('RT') == 0) {
						points=5;
					} else {
						points+= (2*statuses[i].retweet_count);
					}
					points+= (2*statuses[i].favorite_count);
					//console.log(Meteor.userId());
					//var record = {id:Meteor.user};
					console.log(statuses[i].text);
					console.log(points);
					newScore+=points;
					var tweet = {
     					task_id: statuses[i].id_str,
     					tweet: statuses[i].text,
     					word: words[j],
					  points_task: points,
					  completed_by: userId,
					  type_task: 'Twitter',
					  createdAt: new Date(),
					  retweets: statuses[i].retweet_count,
					  favorites: statuses[i].favorite_count
					};
					wrappedInsert(tweet);
					break;
				}
			}
		}
		
		if (curSinceId != undefined) {
			wrappedUpdate(userId, curSinceId);
		} 
		errorMessage = '';
		waitVar = false;
	}
    
    var curSinceId = undefined;
	var maxTwitterCalls = 5;
	var curTwitterCalls = 0;
	var statuses=[];
	var newScore = 0;
	var errorMessage = '';

    var getUserTimeline = function(twitterId, lastTwitterId, max_id, words, userId) {

		console.log('Calling get User Timeline:' + max_id+ " sinceId : "+ lastTwitterId);
		
		Twit.get('statuses/user_timeline', {max_id:max_id, since_id:lastTwitterId, screen_name:twitterId, exclude_replies:true, include_rts:true, count:200}, function(err, result) {
			curTwitterCalls++;
			var callingAgain = false;
			if (err) {
				//We could throw error, but need to set all waitArray to true and throw error
				//For now just log the error			
				console.log("Error in search Tweets: ", err);
			} else {				
				//console.log(result);
 				statuses = statuses.concat(result);

				console.log('Statuses Len: '+statuses.length);
				
				if (result.length > 0 ) {
				
					if (curSinceId == undefined ){
						curSinceId = result[0].id_str;
					}
					nextMaxId = Number(result[result.length - 1].id_str) - 1;
					
					callingAgain = true;
					if (curTwitterCalls < maxTwitterCalls) {
						getUserTimeline(twitterId,lastTwitterId, nextMaxId, words, userId);
					} else {
						checkAndUpdate(words, userId);
					}
				
				}
			}
			if (statuses.length == 0) {
				//cannot throw exception here.
				console.log( "No new tweets found for @"+twitterId+", try again tommorrow..");
				errorMessage = "No new tweets found for @"+twitterId+", try again tommorrow..";
				waitVar = false;
			}

		}
		);
    
    
    }

    var searchTweet = function(twitterId, query,sinceTime, timeStamp, index) {
    	console.log("Searching Tweet for word: "+query);

		
		Twit.get('search/tweets', {q:query, since:sinceTime, until:timeStamp, from:twitterId, include_rts:true, count: 25 }, function(err, result) {
			if (err) {
				//We could throw error, but need to set all waitArray to true and throw error
				//For now just log the error			
				console.log("Error in search Tweets: ", err);
			} else {
				//store - id, tweet, word, points, #retweets, #favorites
//				wrappedInsert(result);
//				console.log(result);
 				var statuses = result.statuses;
				var  len = statuses.length;
				var i = 0;
				console.log('Tweets for word: '+query);
				for (i = 0; i < len; ++i ) {
					console.log(statuses[i].text);
					console.log(statuses[i].retweet_count);
					console.log(statuses[i].favorite_count);					
				}
				

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

	var waitVar = false;
	
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
        addTweets: function(twitterId,timeStamp, lastTwitterId, userId) {
			console.log('Add tweets');
			console.log(userId);
			console.log(twitterId);
			console.log(lastTwitterId);
			console.log('end  params');
			resultOut = null;
        	errOut = null;
//         	if (checkArray() == true) {
        	console.log("Adding Tweets for TwitterID: "+twitterId +" since id: "+lastTwitterId );

         	if (waitVar == true) {
        		throw new Meteor.Error(500,"Mining Twitter in Progress. Please wait...");
        	}
			if (errorMessage != '') {
				newErrorMessage = errorMessage;
				errorMessage = '';
        		throw new Meteor.Error(500,newErrorMessage);
        	}		

        	//For each word in TweetWords
        	var words = TweetWords.find();
        	var count = 0;
// 			var curTime = getCurrentTimeStamp();
//         	//If timestamp and since are same then throw error, only if we dont have lastTwitterId
//         	if (timeStamp == curTime && lastTwitterId != undefined &&  lastTwitterId != null ) {
//         		throw new Meteor.Error(500, "Already mined twitter feed for @"+twitterId+", try again tommorrow..");
//         	}
        	
//         	waitArray = [];
//         	count = TweetWords.find().count();
//         	for (i = 0; i < count; ++i) {
//         		waitArray = waitArray.concat(false);
//         	}
			waitVar = true;
			
        	var wordValues = [];
        	words.forEach(
        		function(element, index, array) {
        			wordValues = wordValues.concat(element.word);
        		}
        	);
			 curSinceId = undefined;
			 curTwitterCalls = 0;
			 statuses=[];
			 newScore = 0;
			 errorMessage = '';
			if (lastTwitterId == null | lastTwitterId == '')
			{
				lastTwitterId = undefined;
			}
        	getUserTimeline(twitterId, lastTwitterId, undefined, wordValues, userId);
        	
//         	words.forEach(
//         		function(element, index, array) {
//         			console.log('Twitter word: '+element);
//         			searchTweet(twitterId, element.word, sinceTime, timeStamp, count);
//         			count++;
//         		}
//         	);
        }
    });
    
    
	//Mine tweets    
    Meteor.startup(function () {
    	//Check if 
    
    });


