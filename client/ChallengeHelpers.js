get_tasks_done_id = function(){
        var task_done = completed_task.find({completed_by: Meteor.userId(), type_task: "share"}).fetch();
        var id_tasks = [];
        for (var i = 0; i< task_done.length; i++){
            id_tasks[i] = task_done[i].completed_task_id;
        }
        return id_tasks;
    }


get_tasks_incompleted_id = function(){
    var task_done_id = get_tasks_done_id();
    var tasks_incompleted = pred_task.find({task_id: {$nin: task_done_id}}).fetch();
    var id_tasks = [];
    for (var i = 0; i< tasks_incompleted.length; i++){
        id_tasks[i] = tasks_incompleted[i].task_id;
    }
    return id_tasks;
}

Template.challengePageTemplate.helpers({
    getIncompletedTask: function(){
        return pred_task.find({task_id: {$nin: get_tasks_done_id()}}).fetch();
    }
});

Template.shareTaskDiv.helpers({
    hastwitterAccount: function() { return Meteor.user().profile.twitterId != ""; }
});


Template.shareTask.helpers({
    hastwitterAccount: function() { return Meteor.user().profile.twitterId != ""; },
    getOrganization: function(){
        return pred_task.findOne({task_id: get_tasks_incompleted_id()[Session.get("challengeIndex")]}).organization;
    },    
    getOrganizationImage: function(){
        return pred_task.findOne({task_id: get_tasks_incompleted_id()[Session.get("challengeIndex")]}).organization_image;
    },
    getTask: function(){
        return pred_task.findOne({task_id: get_tasks_incompleted_id()[Session.get("challengeIndex")]}).challenge_text;
    },
    getURL: function(){
        return pred_task.findOne({task_id: get_tasks_incompleted_id()[Session.get("challengeIndex")]}).link;
    },
    getSharePoints: function(){
        return pred_task.findOne({task_id: get_tasks_incompleted_id()[Session.get("challengeIndex")]}).points;
    }
});

Template.challengePageTemplate.events({
  "click .past-challenge": function () {
    Session.set("challengeIndex",Session.get("challengeIndex")-1);
  },
  "click .next-challenge": function () {
    Session.set("challengeIndex",Session.get("challengeIndex")+1);
  }
});
Template.shareTask.events({
    "click #facebook-share-task": function (event) {
        var task_shared = pred_task.findOne({task_id: get_tasks_incompleted_id()[Session.get("challengeIndex")]});
        FB.ui({
            method: 'feed',
            link: task_shared.link,
            caption: task_shared.share_text
          },
          function(response) {
            if (response && !response.error_code) {
                var newScore = Meteor.user().profile.score + task_shared.points;
                Meteor.users.update({_id:Meteor.userId()}, {$set:{"profile.score": newScore}} );
                Meteor.call("addCompletedTask", task_shared , "share");
                if(Session.get("challengeIndex")>0){
                    Session.set("challengeIndex", Session.get("challengeIndex")-1);
                }
            } else {
            }
          });
      }
});

Template.shareTaskDiv.events({
    "click .facebook-share-task": function (event) {
        var task_shared = pred_task.findOne({task_id: parseInt(event.currentTarget.id)});
        FB.ui({
            method: 'feed',
            link: task_shared.link,
            caption: task_shared.share_text
          },
          function(response) {
            if (response && !response.error_code) {
                var newScore = Meteor.user().profile.score + task_shared.points;
                Meteor.users.update({_id:Meteor.userId()}, {$set:{"profile.score": newScore}} );
                Meteor.call("addCompletedTask", task_shared , "share");
                if(Session.get("challengeIndex")>0){
                    Session.set("challengeIndex", Session.get("challengeIndex")-1);
                }
            } else {
            }
          });
      }
});


