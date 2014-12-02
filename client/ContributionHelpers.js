get_cont_tasks_done_id = function(){
        var task_done = completed_task.find({completed_by: Meteor.userId(), type_task: "contribution"}).fetch();
        var id_tasks = [];
        for (var i = 0; i< task_done.length; i++){
            id_tasks[i] = task_done[i].completed_task_id;
        }
        return id_tasks;
    }


get_cont_tasks_incompleted_id = function(){
    var task_done_id = get_cont_tasks_done_id();
    var tasks_incompleted = pred_cont_task.find({task_id: {$nin: task_done_id}}).fetch();
    var id_tasks = [];
    for (var i = 0; i< tasks_incompleted.length; i++){
        id_tasks[i] = tasks_incompleted[i].task_id;
    }
    return id_tasks;
}

Template.contributionPageTemplate.helpers({
    getIncompletedTask: function(){
        return pred_cont_task.find({task_id: {$nin: get_cont_tasks_done_id()}}).fetch();
    }
});

Template.shareContTaskDiv.helpers({
    hastwitterAccount: function() { return Meteor.user().profile.twitterId != ""; }
});


Template.shareContTaskDiv.events({
    "click .facebook-share-cont-task": function (event) {
        var task_shared = pred_cont_task.findOne({task_id: parseInt(event.currentTarget.id)});
        FB.ui({
            method: 'feed',
            link: task_shared.link,
            caption: task_shared.share_text
          },
          function(response) {
            if (response && !response.error_code) {
                var newScore = Meteor.user().profile.score + task_shared.points;
                Meteor.users.update({_id:Meteor.userId()}, {$set:{"profile.score": newScore}} );
                Meteor.call("addCompletedTask", task_shared , "contribution");
                if(Session.get("challengeIndex")>0){
                    Session.set("challengeIndex", Session.get("challengeIndex")-1);
                }
            } else {
            }
          });
      }
});


