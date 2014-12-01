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
        organization_image: "https://pbs.twimg.com/profile_images/446754462363684864/f3ZNeimB_400x400.png",
        link: "http://www.unicef.org/infobycountry/southsudan_77901.html" 
    });
    Predefined_tasks.insert({
        task_id: 2,
        share_text: "Check out UNICEF's efforts to prevent Ebola in Mali.",
        challenge_text: "Share this news article from UNICEF: \"In Mali, united against Ebola – a transporter’s pledge\"",
        points: 10,
        organization: "UNICEF",
        organization_image: "https://pbs.twimg.com/profile_images/446754462363684864/f3ZNeimB_400x400.png",
        link: "http://www.unicef.org/infobycountry/mali_77891.html"
    });
    Predefined_tasks.insert({
        task_id: 3,
        share_text: "Help save lives this holiday season by giving blood through the American Red Cross.",
        challenge_text: "Share this call for blood donations from the American Red Cross: \"Celebrate the Holidays by Helping Save Lives\"",
        points: 10,
        organization: "American Red Cross",
        organization_image: "http://lintvwjcl.files.wordpress.com/2014/02/redcross.jpg",
        link: "http://www.redcross.org/news/article/Celebrate-the-Holidays-by-Helping-Save-Lives"
    });
    Predefined_tasks.insert({
        task_id: 4,
        share_text: "Join the ALS Association in its Walk to Defeat ALS by registering for a Walk Event near you.",
        challenge_text: "Spread the word on the ALS Association's Walk to Defeat ALS.",
        points: 10,
        organization: "ALS Association",
        organization_image: "http://sites.psu.edu/alsunveiled/wp-content/uploads/sites/15117/2014/09/als.jpg",
        link: "http://web.alsa.org/site/PageServer?pagename=WLK_landing#.VHT321fF83Z"
    });
    Predefined_tasks.insert({
        task_id: 5,
        share_text: "Looking for a holiday gift that makes a difference? Adopt an Acre for your family or friends through The Nature Conservancy.",
        challenge_text: "Encourage your social network to Adopt an Acre through The Nature Conservancy.",
        points: 10,
        organization: "The Nature Conservancy",
        organization_image: "https://pbs.twimg.com/profile_images/344513261573624418/b0c52eb1e4c38017c77073a528fbd11a_400x400.png",
        link: "http://www.nature.org/membership-giving/adopt-an-acre/index.htm"
    });
    Predefined_tasks.insert({
        task_id: 6,
        share_text: "Help save children's lives by donating or volunteering for St. Jude Children's Research Hospital.",
        challenge_text: "Encourage your social network to donate or volunteer to St. Jude Children's Research Hospital.",
        points: 10,
        organization: "St. Jude Children's Research Hospital",
        organization_image: "http://s1.ticketm.net/tm/en-us/dbimages/128100a.jpg",
        link: "http://www.stjude.org/waystohelp"
    });
    Predefined_tasks.insert({
        task_id: 7,
        share_text: "Check out the Dana-Farber Cancer Institute's research on a new class of drugs for treating type 2 diabetes.",
        challenge_text: "Spread the word on the Dana-Farber Cancer Institute's research on a promising new class of diabetes drugs.",
        points: 10,
        organization: "Dana-Farber Cancer Institute",
        organization_image: "https://lh3.googleusercontent.com/-jrm0UtpEO9o/AAAAAAAAAAI/AAAAAAAAD6M/ZEKXa-REe2g/photo.jpg",
        link: "http://www.dana-farber.org/Newsroom/News-Releases/Unveiling-the-Effects-of-an-Important-Class-of-Diabetes-Drugs.aspx"
    });
    Predefined_tasks.insert({
        task_id: 8,
        share_text: "Check out this great story on firefighters volunteering for Habitat for Humanity in Mississippi.",
        challenge_text: "Share a story on Habitat for Humanity's Thrivent Build project in Mississippi.",
        points: 10,
        organization: "Habitat for Humanity",
        organization_image: "http://bbjtoday.com/wp-content/woo_custom/1692-habitat-for-humanity-web.jpg",
        link: "http://www.habitat.org/stories_multimedia/volunteer_stories/firefighters-thrivent-build-new-home-mississippi-family"
    });
    Predefined_tasks.insert({
        task_id: 9,
        share_text: "Read about Direct Relief's recovery efforts one year after Typhoon Haiyan hit the Philippines.",
        challenge_text: "Share a story on Direct Relief's typhoon recovery efforts in the Philippines.",
        points: 10,
        organization: "Direct Relief",
        organization_image: "https://gpfd.org/wp-content/uploads/2013/10/Direct-Relief-Member-image-440x440.jpg",
        link: "http://www.directrelief.org/2014/11/typhoon-haiyan-recovery-efforts-continue-one-year-later/"
    });
    Predefined_tasks.insert({
        task_id: 10,
        share_text: "NA",
        challenge_text: "View advertisements to generate donations to charity.",
        points: 30,
        organization: "ADVERTISER",
        organization_image: "/resources/altruist.png",
        link: "http://virtualaltruistdemo.meteor.com"
    });
});
