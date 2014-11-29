

Template.challengePageTemplate.helpers({
    isNotFirst: function(){
        if(Session.get("challengeIndex") == 0){
            return false;
        }
        return true;
    },
    isNotLast: function(){
        
        if(Session.get("challengeIndex") < pred_task.find({}).count()-1){
            return true;
        }
        return false;
    }
});

Template.shareTask.helpers({
    hastwitterAccount: function() { return Meteor.user().profile.twitterId != ""; },
    getOrganization: function(){
        var task = pred_task.find({}, {sort: {createdAt: -1}}).fetch();
        return task[Session.get("challengeIndex")].organization;
    },
    getTask: function(){
        var task = pred_task.find({}, {sort: {createdAt: -1}}).fetch();
        return task[Session.get("challengeIndex")].challenge_text;
    },
    getURL: function(){
        var task = pred_task.find({}, {sort: {createdAt: -1}}).fetch();
        return task[Session.get("challengeIndex")].link;
    },
    getSharePoints: function(){
        var task = pred_task.find({}, {sort: {createdAt: -1}}).fetch();
        return task[Session.get("challengeIndex")].points;
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
    "click #facebook-share-task": function () {
        var  task = pred_task.find({}, {sort: {createdAt: -1}}).fetch();
        FB.ui({
            method: 'feed',
            link: task[Session.get("challengeIndex")].link,
            caption: task[Session.get("challengeIndex")].share_text
          },
          function(response) {
            if (response && !response.error_code) {
                var  task = pred_task.find({}, {sort: {createdAt: -1}}).fetch();
                var newScore = Meteor.user().profile.score + task[Session.get("challengeIndex")].points;
                Meteor.users.update({_id:Meteor.userId()}, {$set:{"profile.score": newScore}} );
            } else {
              alert('Error while posting.');
            }
          });
      }
});


