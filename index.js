var dealList = [];
var panels = require("sdk/panel");
var tabs = require("sdk/tabs");
var { ToggleButton } = require('sdk/ui/button/toggle');
var self = require("sdk/self");

// Panel size constants
var PANEL_HEIGHT = 40;
var PANEL_HEIGHT_PADDING =  20;
var PANEL_WIDTH = 210;

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
	contentScriptFile: [self.data.url("jquery-1.11.3.min.js"), self.data.url("panel.js"), self.data.url("rss.js")],
	onHide: handleHide,
	width: PANEL_WIDTH,
	height: PANEL_HEIGHT
});

function handleChange(state) {
	if (state.checked) {
		panel.port.emit("dealListShow", dealList);

		panel.show({
			position: button
		});
	}
}

function handleHide() {
	button.state('window', {checked: false});
}

// On notification from rss.js, increase the badge number, change its color, and update the deal list
panel.port.on("newDeal", function(dealTitle, dealUrl) {
	button.badge = button.badge + 1;
	button.badgeColor = "#ff0000";

	dealList.unshift({
		title: dealTitle,
		url: dealUrl
	});
});

// Handle opening the deal in a new tab and remove the deal from the list
panel.port.on("clickDealLink", function(dealUrl) {
	tabs.open(dealUrl);

	dealList.splice(indexOfUrl(dealUrl), 1);

	button.badge = button.badge - 1;

	if (button.badge == 0) {
		button.badgeColor = "#00AAAA";
	}

	panel.hide();
});

panel.port.on("clearDealList", function() {
	dealList = [];

	button.badge = 0;
	button.badgeColor = "#00AAAA";

	panel.hide();
});

panel.port.on("resizePanelHeight", function(height) {
	panel.resize(PANEL_WIDTH, height + PANEL_HEIGHT_PADDING);
});

function indexOfUrl(dealUrl) {
	dealUrl = dealUrl.substring(0, dealUrl.indexOf("target"));

	for (var i = 0; i < dealList.length; i++) {
		var dealListUrl = dealList[i].url;

		if (dealListUrl === dealUrl) {
			return i;
		}
	}

	return -1;
}