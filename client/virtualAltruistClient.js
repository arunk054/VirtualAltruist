Tasks = new Mongo.Collection("tasks");

this.homePage = true;


Meteor.subscribe("tasks")
Template.body.helpers({
  tasks: function () {
      if (Session.get("hideCompleted")) {
        // If hide completed is checked, filter tasks
        return Tasks.find({checked: {$ne: true}}, {sort: {createdAt: -1}});
      } else {
        // Otherwise, return all of the tasks
        return Tasks.find({}, {sort: {createdAt: -1}});
      }
    },
    hideCompleted: function () {
      return Session.get("hideCompleted");
    },
    //Count number of incompleted tasks
    incompleteCount: function () {
      return Tasks.find({checked: {$ne: true}}).count();    
    },
    //Total tasks saved
    totalCount: function () {
      return Tasks.find().count();    
    },
    //Percentage of tasks done
    percentageDone: function () {
      return Math.floor((Tasks.find({checked: {$ne: false}}).count()/Tasks.find().count())*100);    
    },
    homePage: function() {
      if(Session.get("curPage") == undefined || Session.get("curPage") == "home" ){
        return true;
      }
      return undefined;
    },
    aboutPage: function() {
      if(Session.get("curPage") == undefined || Session.get("curPage") == "about" ){
        return true;
      }
      return undefined;
    }

});
Template.task.helpers({
  isOwner: function () {
    return this.owner === Meteor.userId();
  }
});

Template.expProgressBar.helpers({
    //Percentage of tasks done
    percentageDone: function () {
      return Math.floor((Tasks.find({checked: {$ne: false}}).count()/Tasks.find().count())*100);    
    },
    //Total tasks saved
    totalCount: function () {
      return Tasks.find().count();    
    }
});
Template.shareInfo.helpers({
    //Get current username
    hastwitterAccount: function () {
      return Meteor.user().profile.twitterId != "";
    }
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
    }
});


Template.profilePicture.helpers({
    //Get current username
    getProfilePicture: function () {
      return Meteor.user().profile.picture;
    }
});


Template.navigationBar.helpers({
    homePage: function() {
      if(Session.get("curPage") == undefined || Session.get("curPage") == "home" ){
        return true;
      }
      return undefined;
    },
    aboutPage: function() {
      if(Session.get("curPage") == undefined || Session.get("curPage") == "about" ){
        return true;
      }
      return undefined;
    }
});

Template.navigationBar.events({
  "click .my-home": function(event){
    Session.set("curPage","home");
  },
  "click .my-about": function(event){
    Session.set("curPage","about");
  }
});

Template.body.events({
  "submit .new-task": function(event){
    var text = event.target.text.value;
    Meteor.call("addTask", text);
    event.target.text.value = "";

    return false;
  },
  "change .hide-completed input": function (event){
    Session.set("hideCompleted", event.target.checked);
  }
});
Template.task.events({
  "click .toggle-checked": function () {
    // Set the checked property to the opposite of its current value
    Meteor.call("setChecked", this._id, ! this.checked);
  },
  "click .delete": function () {
    Meteor.call("deleteTask", this._id);
  },
  "click .toggle-private": function () {
    Meteor.call("setPrivate", this._id, ! this.private);
  }
});

Template.taskDone.events({
  "click .toggle-checked": function () {
    // Set the checked property to the opposite of its current value
    Meteor.call("setChecked", this._id, ! this.checked);
  },
  "click .delete": function () {
    Meteor.call("deleteTask", this._id);
  },
  "click .toggle-private": function () {
    Meteor.call("setPrivate", this._id, ! this.private);
  }
});

