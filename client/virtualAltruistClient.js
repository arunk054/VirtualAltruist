Tasks = new Mongo.Collection("tasks");
pred_task = new Mongo.Collection("predefined_tasks");
completed_task = new Mongo.Collection("completed_task");

Meteor.subscribe("tasks");
Meteor.subscribe("predefined_tasks");



Template.task.helpers({
  isOwner: function () {
    return this.owner === Meteor.userId();
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

