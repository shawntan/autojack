/*
   I Like Everything
   Author: Feross Aboukhadijeh
   Read more: http://www.feross.org/like-everything-on-facebook/
   */
function queryDocument(expression) {
	var resp;
	var results = [];
	resp = document.evaluate(expression, document, null, XPathResult.ANY_TYPE, null);
	while (val = resp.iterateNext()) {
		results.push(val);
	}
	return results;
}


var EXPAND_SCROLL = 0,
	EXPAND_CLICK  = 1,
	LIKEING = 2;
var state;

var activityQueue = []
function run() {
	var activity = activityQueue.shift();
	setTimeout(function(){
		if (activity) {
			activity();
		}
		run();
	},800);
}


var prevPageHeight = 0;
var scrollAndWait = function() {
	if(document.body.scrollHeight != prevPageHeight) {
		prevPageHeight = document.body.scrollHeight;
		window.scrollTo(0, document.body.scrollHeight);
		activityQueue.push(scrollAndWait);
		expandComments();
	}
}

var expandComments = function() {
	btnShowComments = queryDocument("//a[contains(concat(' ',@class,' '),' fbTimelineFeedbackCommentLoader ')]");
	console.log(btnShowComments);
	for(var i=0;i < btnShowComments.length; i++) {
		(function() {
			var b = btnShowComments[i];
			activityQueue.push(clickThing(b));
		})();
	}
}


var clickThing = function(thing) {
	var b = thing;
	return function() {
		var click = document.createEvent("MouseEvents");
		click.initMouseEvent("click", true, true, window,
		0, 0, 0, 0, 0, false, false, false, false, 0, null);
		button = document.getElementById("test");
		b.dispatchEvent(click);
		b.focus();
	}
};

function start() {
	activityQueue.push(scrollAndWait);
	run();
}
start();
