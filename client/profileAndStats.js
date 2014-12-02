Template.expProgressBar.helpers({
    //Percentage of tasks done
    percentageDone: function () {
//      return Math.floor((Tasks.find({checked: {$ne: false}}).count()/Tasks.find().count())*100);    
    var curScore = Meteor.user().profile.score;
    return curScore%100;
    },    
    getInitProgressBar: function () {
//      return Math.floor((Tasks.find({checked: {$ne: false}}).count()/Tasks.find().count())*100);    
    var curScore = Meteor.user().profile.score;
    return Math.floor( curScore / 100);
    },    
    getEndProgressBar: function () {
//      return Math.floor((Tasks.find({checked: {$ne: false}}).count()/Tasks.find().count())*100);    
    var curScore = Meteor.user().profile.score;
    return Math.floor( curScore / 100)+1;
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
    }, 
    isFullStar: function (numberStar) {
      var curScore = Meteor.user().profile.score; 
      var numberStars = (Math.floor( curScore / 50))/2;
      var level = Math.floor(numberStars/5);
      numberStars = numberStars-level*5
      if(numberStars == 0){
        numberStars = level*5;
      }
      if(numberStar <= numberStars){
        return "fa fa-star";
      }else if(numberStar <= numberStars+0.5){
        return "fa fa-star-half-o";
      }else{
        return "fa fa-star-o";
      }
    }, 
    getLevelColor: function () {
      var curScore = Meteor.user().profile.score;
      var level = curScore / 100;
      if(level < 5.5){
        return "text-bronze";
      }else if(level < 10.5){
        return "text-silver";
      }else{
        return "text-gold";
      }
      return "text-bronze";
    },
    showProgressBar: function(){
      return Session.get("showProgressBar");
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

Template.profileInformationAndStats.events({
  "click .do-some-challenge": function(event){
    Session.set("curPage","challenge");
  },
  "click .do-contribution": function(event){
    Session.set("curPage","contribution");
  }
});

Template.nameAndStats.events({
  "click .star-button": function(event){
    if(Session.get("showProgressBar")== false || Session.get("showProgressBar") == undefined){
      Session.set("showProgressBar",true);
    }
    else{
      Session.set("showProgressBar",false);
    }
  }
});

