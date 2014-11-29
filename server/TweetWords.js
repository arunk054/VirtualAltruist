TweetWords =  new Mongo.Collection("twitter_words");

// ALS, Ferguson, Human Rights, GAY, unicef, lesbian, ebola, HRC, Red cross, obamacare, feministhackerbarbie, feminism

Meteor.startup(function () {

TweetWords.remove({});

TweetWords.insert({
//id: 0,
	word: "ALS"
});

TweetWords.insert({
	word: "Human Rights"
});

TweetWords.insert({
	word: "Ferguson"
});

TweetWords.insert({
	word: "ebola"
});

TweetWords.insert({
	word: "HRC"
});

TweetWords.insert({
	word: "unicef"
});


TweetWords.insert({
	word: "Red Cross"
});

TweetWords.insert({
	word: "obamacare"
});

TweetWords.insert({
	word: "feministhackerbarbie"
});

TweetWords.insert({
	word: "feminism"
});

TweetWords.insert({
	word: "gay"
});

TweetWords.insert({
	word: "lesbian"
});

TweetWords.insert({
	word: "@BlindAlive"
});



});

