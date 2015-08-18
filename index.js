var panels = require("sdk/panel");
var self = require("sdk/self");

var panel = panels.Panel({
	contentURL: self.data.url("panel.html"),
	contentScriptFile: [self.data.url("jquery-1.11.3.min.js"), self.data.url("rss.js")],
	onHide: handleHide,
	width: 210,
	height: 55
});

function handleHide() {
	console.log('hide');
}