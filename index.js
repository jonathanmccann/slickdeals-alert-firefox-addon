var panels = require("sdk/panel");
var { ToggleButton } = require('sdk/ui/button/toggle');
var self = require("sdk/self");

// Create toggle button for toolbar
var button = ToggleButton({
	id: "slickdeals-alert",
	label: "Slickdeals Alert",
	icon: {
		"16": "./slickdeals-icon-16.jpg",
		"32": "./slickdeals-icon-32.jpg",
		"64": "./slickdeals-icon-64.jpg"
	},
	badge: 0,
    badgeColor: "#00AAAA",
	onChange: handleChange
});

var panel = panels.Panel({
	contentURL: self.data.url("panel.html"),
	contentScriptFile: [self.data.url("jquery-1.11.3.min.js"), self.data.url("rss.js")],
	onHide: handleHide,
	width: 210,
	height: 55
});

function handleChange(state) {
	if (state.checked) {
		panel.show({
			position: button
		});
	}
}

function handleHide() {
	button.state('window', {checked: false});
}

// On notify from rss.js, increase the badge number and change it's color
panel.port.on("notify", function(title, url) {
	button.badge = button.badge + 1;
	button.badgeColor = "#ff0000";
});