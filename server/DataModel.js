TwitterPosts =  new Mongo.Collection("twitter_posts");

MyUsers = new Mongo.Collection("my_users");

//My_Users : FbId, TwitId, TwitMiningStatus: 0 = comlete, 1 = inprogress, LastMined: TimeStamp, TwitPoints, TaskPoints




	var wrapperUserInsert = Meteor.bindEnvironment(function(userObj) {
   	 	MyUsers.insert(userObj);
  	}, "Failed to insert to MyUsers collection.");
    
    
	Meteor.methods({
		createNewUser: function(id) {
			console.log("Got FB Id:" +id);

			//Query the mongo DB
			c =  MyUsers.find({FbId:id});
																															console.log("#Records from MyUsers  = " +c.count());
			if (c.count() == 0) {
				//create new user
				var newUser = {FbId:id, TwitMiningStatus:0, TaskPoints: 0, TwitPoints: 0};
				wrapperUserInsert(newUser);
				return newUser;				
			}
			user = {};
			c.forEach(function(obj) {
				user = obj;
				console.log("Existing User: "+obj.FbId);
			});
			return user;
		}
	});	

