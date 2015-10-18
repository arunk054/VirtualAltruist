

//helper Functions for access functions in DataModel

    

	Template.body.helpers({
	
		createNewUser : function(){
			//Check if loggedin user exists
			var id = Meteor.user().services.facebook.id;
			if (id == undefined || id == null) {
				console.log("Error: No user found.");
			}
			
			Meteor.call("createNewUser",id, function (err,result){
				if (err == undefined ) {
					console.log(result);
					Session.set("curUser",result);
					
				} else {
					console.log("Error: "+err);
				}
			});
		}
	});