Tasks = new Mongo.Collection("tasks");
pred_task = new Mongo.Collection("predefined_tasks");
completed_task = new Mongo.Collection("completed_task");

Meteor.subscribe("tasks");
Meteor.subscribe("predefined_tasks");



