

Template.predefined_task.helpers({
    hastwitterAccount: function() { return Meteor.user().profile.twitterId != ""; }
});
