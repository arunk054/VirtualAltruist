//MyUsers = new Meteor.Collection('users');

Meteor.users.allow({
	update: function(userId, doc) {
		return true;
	}
});