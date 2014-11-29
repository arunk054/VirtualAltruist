UI.registerHelper('addIndex', function (all) {
    return _.map(all, function(val, index) {
        return {index: index+1, data: val};
    });
});

Template.publicLeaderboard.helpers({
    leaderUser: function () {
    	var users = Meteor.users.find({},{sort :{'profile.score':-1}}).fetch();
    	var userLeader = [];
    	for (var i = 0; i < users.length && i<5; i++){
    		userLeader[i] = users[i];
    	}
    	return userLeader;

    }

});
