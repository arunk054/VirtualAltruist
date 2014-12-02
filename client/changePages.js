
Template.navigationBar.helpers({
    homePage: function() {
      if(Session.get("curPage") == undefined || Session.get("curPage") == "home" ){
        return true;
      }
      return undefined;
    },
    challengePage: function() {
      if(Session.get("curPage") == "challenge" ){
        if(Session.get("challengeIndex") == undefined){
          Session.set("challengeIndex",0);
        }
        return true;
      }
      return undefined;
    },
    contributionPage: function() {
      if(Session.get("curPage") == "contribution" ){
        if(Session.get("challengeIndex") == undefined){
          Session.set("challengeIndex",0);
        }
        return true;
      }
      return undefined;
    },
    aboutPage: function() {
      if(Session.get("curPage") == "about" ){
        return true;
      }
      return undefined;
    }
});

Template.body.helpers({
    homePage: function() {
      if(Session.get("curPage") == undefined || Session.get("curPage") == "home" ){
        return true;
      }
      return undefined;
    },
    challengePage: function() {
      if(Session.get("curPage") == "challenge" ){
        return true;
      }
      return undefined;
    },
    contributionPage: function() {
      if(Session.get("curPage") == "contribution" ){
        return true;
      }
      return undefined;
    },
    aboutPage: function() {
      if(Session.get("curPage") == "about" ){
        return true;
      }
      return undefined;
    }

});


Template.navigationBar.events({
  "click .my-home": function(event){
    Session.set("curPage","home");
  },  
  "click .my-challenge": function(event){
    Session.set("curPage","challenge");
  },  
  "click .my-contribution": function(event){
    Session.set("curPage","contribution");
  },
  "click .my-about": function(event){
    Session.set("curPage","about");
  }
});