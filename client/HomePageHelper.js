
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
    challengeTab: function() {
      if(Session.get("infoTab") == "challenge"){
        return true;
      }
      return undefined;
    },
    contributionTab: function() {
      if(Session.get("infoTab") == "contribution" || Session.get("infoTab") == undefined ){
        return true;
      }
      return undefined;
    },
    twitterTab: function() {
      if(Session.get("infoTab") == "twitter" ){
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
    getContTaskPoints: function(){
      var tasks = completed_task.find({completed_by: Meteor.userId(), type_task: "contribution"}).fetch();
      var totalPointsTask = 0;
      for( var i=0; i < tasks.length; i++){
        totalPointsTask = totalPointsTask + tasks[i].points_task;
      }
      return totalPointsTask;
    },
    getShareTasksByUser: function(){
      var tasks_completed_user = completed_task.find({completed_by: Meteor.userId(), type_task: "share"}, {sort: {createdAt: -1}}).fetch();
      var list_completed = [];
      for (var i=0; i< tasks_completed_user.length; i++){
        var info_task = pred_task.findOne({task_id:tasks_completed_user[i].completed_task_id});
        list_completed[i] = {data_task: info_task, type_task: tasks_completed_user[i].type_task};
      }
      return list_completed;
    },
    getContTasksByUser: function(){
      var tasks_completed_user = completed_task.find({completed_by: Meteor.userId(), type_task: "contribution"}, {sort: {createdAt: -1}}).fetch();
      var list_completed = [];
      for (var i=0; i< tasks_completed_user.length; i++){
        var info_task = pred_cont_task.findOne({task_id:tasks_completed_user[i].completed_task_id});
        list_completed[i] = {data_task: info_task, type_task: tasks_completed_user[i].type_task};
      }
      return list_completed;
    },
    getAutoTweetsByUser : function(){
    	var autoTweets = AutoTweets.find({completed_by:Meteor.userId()}, {sort: {createdAt: -1}});
    	var returnArr = [];
    	var twitterId = Meteor.user().profile.twitterId;
		autoTweets.forEach(
			function(element, index, array) {
				var obj = element;
				obj.link = "http://twitter.com/"+twitterId+"/status/"+element.task_id;
				obj.word = obj.word.toUpperCase();
				returnArr = returnArr.concat(obj);
			}
		);
		console.log(returnArr);
		return returnArr;
    },
    getAutoTweetsPoints: function() {
    	var autoTweets = AutoTweets.find({completed_by:Meteor.userId()});
    	score = 0;
    	if (Meteor.user().profile.twitterId != null && Meteor.user().profile.twitterId != undefined){
    		score += PointsForTwitter;
    	}
		autoTweets.forEach(
			function(element, index, array) {
				score += element.points_task;
			}
		);
		return score;
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
  },
  "click .challenge-tab": function(event){
    Session.set("infoTab","challenge");
  },
  "click .contribution-tab": function(event){
    Session.set("infoTab","contribution");
  },
  "click .twitter-tab": function(event){
    Session.set("infoTab","twitter");
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