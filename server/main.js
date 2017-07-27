import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup

});

S3.config = {
	key: 'AKIAJPFPYMTKOKIH7O6Q',
	secret: '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',
	bucket: 'dreamslimcel',
  region: 'us-east-2'
};
