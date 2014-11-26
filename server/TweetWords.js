TwitterWords =  new Mongo.Collection("twitter_words");

// ALS, Ferguson, Human Rights, GAY, unicef, lesbian, ebola, HRC, Red cross, obamacare, feministhackerbarbie, feminism

Meteor.startup(function () {

TwitterWords.remove({});

TwitterWords.insert({
//id: 0,
	word: "ALS"
});

TwitterWords.insert({
	word: "Human Rights"
});

TwitterWords.insert({
	word: "Ferguson"
});

TwitterWords.insert({
	word: "ebola"
});

TwitterWords.insert({
	word: "HRC"
});

TwitterWords.insert({
	word: "unicef"
});


TwitterWords.insert({
	word: "Red Cross"
});

TwitterWords.insert({
	word: "obamacare"
});

TwitterWords.insert({
	word: "feministhackerbarbie"
});

TwitterWords.insert({
	word: "feminism"
});

TwitterWords.insert({
	word: "gay"
});

TwitterWords.insert({
	word: "lesbian"
});



});

