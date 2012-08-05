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
	var activity = activityQueue.shift()
	setTimeout(function(){
		activity();
		run();
	},800);
}


var prevPageHeight = 0;
var scrollAndWait = function() {
	if(state == EXPAND_SCROLL && document.body.scrollHeight != prevPageHeight) {
		prevPageHeight = document.body.scrollHeight;
		window.scrollTo(0, document.body.scrollHeight);
		activityQueue.push(scrollAndWait);
	} else state = EXPAND_CLICK;
}

function start() {
	console.log(scrollAndWait);
	activityQueue.push(scrollAndWait);
	run();
}
start();
