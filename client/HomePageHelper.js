
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
    },
    getShareTaskPoints: function(){
    	var tasks = completed_task.find({completed_by: Meteor.userId(), type_task: "share"}).fetch();
    	var totalPointsTask = 0;
    	for( var i=0; i < tasks.length; i++){
    		totalPointsTask = totalPointsTask + tasks[i].points_task;
    	}
    	return totalPointsTask;
    },
    getShareTasksByUse: function(){
    	var tasks_completed_user = completed_task.find({completed_by: Meteor.userId(), type_task: "share"}).fetch();
    	var list_completed = [];
    	for (var i=0; i< tasks_completed_user.length; i++){
    		var info_task = pred_task.findOne({task_id:tasks_completed_user[i].completed_task_id});
    		list_completed[i] = {data_task: info_task, type_task: tasks_completed_user[i].type_task};
    	}
    	return list_completed;
    }
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
  },
  "click .do-some-challenge": function(event){
  	Session.set("curPage","challenge");
  }
});


/*TO BE DELETED!*/

Template.homePageTemplate.events({
  "submit .new-task": function(event){
    var text = event.target.text.value;
    Meteor.call("addTask", text);
    event.target.text.value = "";

    return false;
  }
});