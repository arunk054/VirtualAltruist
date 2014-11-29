Tasks = new Mongo.Collection("tasks");
pred_task = new Mongo.Collection("predefined_tasks");


Meteor.subscribe("tasks");
Meteor.subscribe("predefined_tasks");



Template.homePageTemplate.helpers({
  tasks: function () {
      if (Session.get("hideCompleted")) {
        // If hide completed is checked, filter tasks
        return Tasks.find({checked: {$ne: true}}, {sort: {createdAt: -1}});
      } else {
        // Otherwise, return all of the tasks
        return Tasks.find({}, {sort: {createdAt: -1}});
      }
    },
    predefined_tasks: function () {
      return pred_task.find({}, {sort: {createdAt: -1}});
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
    showShareDone: function() {
      if(Session.get("showShareDone") == "show" ){
        return true;
      }
      return undefined;
    },
    showTwitterDone: function() {
      if(Session.get("showTwitterTask") == "show" ){
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


Template.predefined_task.helpers({
    hastwitterAccount: function() { return Meteor.user().profile.twitterId != ""; }
});




Template.homePageTemplate.events({
  "click .challenges-share-done": function(event){
    if(Session.get("showShareDone") == undefined){
      Session.set("showShareDone","show");
    }else{
      Session.set("showShareDone",undefined);
    }

  },
  "click .twitter-task-done": function(event){
    if(Session.get("showTwitterTask") == undefined){
      Session.set("showTwitterTask","show");
    }else{
      Session.set("showTwitterTask",undefined);
    }
  }
});


Template.homePageTemplate.events({
  "submit .new-task": function(event){
    var text = event.target.text.value;
    Meteor.call("addTask", text);
    event.target.text.value = "";

    return false;
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

