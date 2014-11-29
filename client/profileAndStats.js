Template.expProgressBar.helpers({
    //Percentage of tasks done
    percentageDone: function () {
//      return Math.floor((Tasks.find({checked: {$ne: false}}).count()/Tasks.find().count())*100);    
    var curScore = Meteor.user().profile.score;
    return curScore%100;
    },
    //Total tasks saved
    totalCount: function () {
//      return Tasks.find().count();    
    return Meteor.user().profile.score;
    },

});

Template.nameAndStats.helpers({
    //Get current username
    getUsername: function () {
      return Meteor.user().profile.name;
    },
    //Get points that a user has
    getPointsByUser: function () {
      return Tasks.find(
        { checked: {$ne: false} }).count();
    },
    getProfilePoints: function () {
      return Meteor.user().profile.score;
    }, 
    getLevel: function () {
      var curScore = Meteor.user().profile.score;
      return (Math.floor( curScore / 100) + 1)
    }
});

Template.miniNameAndStats.helpers({
    //Get current username
    getUsername: function () {
      return Meteor.user().profile.name;
    },
    //Get points that a user has
    getPointsByUser: function () {
      return Tasks.find(
        { checked: {$ne: false} }).count();
    },
    getProfilePoints: function () {
      return Meteor.user().profile.score;
    }, 
    getLevel: function () {
      var curScore = Meteor.user().profile.score;
      return (Math.floor( curScore / 100) + 1)
    }
});


Template.profilePicture.helpers({
    //Get current username
    getProfilePicture: function () {
      return Meteor.user().profile.picture;
    }
});

Template.miniProfilePicture.helpers({
    //Get current username
    getProfilePicture: function () {
      return Meteor.user().profile.picture;
    }
});

