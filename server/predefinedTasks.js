Predefined_tasks = new Mongo.Collection("predefined_tasks");

Meteor.startup(function () {
    // code to run on server at startup
    //
    Predefined_tasks.remove({});
    Predefined_tasks.insert({
        task_id: 1,
        share_text: "Check out this article on UNICEF's humanitarian aid in South Sudan.",
        challenge_text: "Share this news article from UNICEF: \"A taste of hope in South Sudan\"",
        points: 5,
        organization: "UNICEF",
        link: "http://www.unicef.org/infobycountry/southsudan_77901.html" 
    });
    Predefined_tasks.insert({
        task_id: 2,
        share_text: "Check out UNICEF's efforts to prevent Ebola in Mali.",
        challenge_text: "Share this news article from UNICEF: \"In Mali, united against Ebola – a transporter’s pledge\"",
        points: 10,
        organization: "UNICEF",
        link: "http://www.unicef.org/infobycountry/mali_77891.html"
    });
    Predefined_tasks.insert({
        task_id: 3,
        share_text: "Help save lives this holiday season by giving blood through the American Red Cross.",
        challenge_text: "Share this call for blood donations from the American Red Cross: \"Celebrate the Holidays by Helping Save Lives\"",
        points: 10,
        organization: "American Red Cross",
        link: "http://www.redcross.org/news/article/Celebrate-the-Holidays-by-Helping-Save-Lives"
    });
    Predefined_tasks.insert({
        task_id: 4,
        share_text: "Join the ALS Association in its Walk to Defeat ALS by registering for a Walk Event near you.",
        challenge_text: "Spread the word on the ALS Association's Walk to Defeat ALS.",
        points: 10,
        organization: "ALS Association",
        link: "http://web.alsa.org/site/PageServer?pagename=WLK_landing#.VHT321fF83Z"
    });
    Predefined_tasks.insert({
        task_id: 5,
        share_text: "Check out this other link!",
        challenge_text: "Test link #2",
        points: 10,
        organization: "The Nature Conservancy",
        link: "http://www.nature.org"
    });
});
