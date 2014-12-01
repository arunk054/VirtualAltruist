completed_task = new Mongo.Collection("completed_task");


Meteor.methods({
    addCompletedTask: function (task,task_type){
        var id_task = completed_task.find({}).count()+1;
        completed_task.insert({
          id: id_task,
          completed_task_id: task.task_id,
          points_task: task.points,
          completed_by: Meteor.userId(),
          type_task: task_type,
          createdAt: new Date(),
        });

    }


});