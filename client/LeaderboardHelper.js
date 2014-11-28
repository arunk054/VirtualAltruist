

Template.publicLeaderboard.helpers({
    leaderUser: function () {
    	var users = Meteor.users.find({},{sort :{'profile.score':-1}});
    	return users;

    }

});
