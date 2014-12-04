TweetWords =  new Mongo.Collection("twitter_words");

// ALS, Ferguson, Human Rights, GAY, unicef, lesbian, ebola, HRC, Red cross, obamacare, feministhackerbarbie, feminism

Meteor.startup(function () {

TweetWords.remove({});

//All characters should be in lowercase

TweetWords.insert({
//id: 0,
	word: "#als"
});

TweetWords.insert({
	word: "human rights"
});

TweetWords.insert({
	word: "ferguson"
});

TweetWords.insert({
	word: "ebola"
});

TweetWords.insert({
	word: "hrc"
});

TweetWords.insert({
	word: "unicef"
});


TweetWords.insert({
	word: "red cross"
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
	word: "blindalive"
});
TweetWords.insert({
	word: "#IceBucketChallenge"
});



});

