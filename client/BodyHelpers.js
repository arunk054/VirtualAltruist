

	Template.body.helpers({
		curUser: function(){
			val = Session.get("curUser");
			if (val == undefined)
				return "Creating User...";
			return "Created User: "+JSON.stringify(val);
		},
		
		showTwitterIdInput: function() {
			val = Session.get("curUser");
			if (val == undefined)
				return undefined;

			if (val.TwitterId == undefined)
				return true;
			else {
				return undefined;
			}
		}
	});