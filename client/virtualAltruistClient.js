Tasks = new Mongo.Collection("tasks");
pred_task = new Mongo.Collection("predefined_tasks");
pred_cont_task = new Mongo.Collection("predefined_contribution_tasks");
completed_task = new Mongo.Collection("completed_task");

Meteor.subscribe("tasks");
Meteor.subscribe("predefined_tasks");



