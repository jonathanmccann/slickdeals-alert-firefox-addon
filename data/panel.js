var dealTable = document.getElementById("myTable");

// When showing the deal list, erase the previous table and construct a new one. Deals are sepearated by horizonatal rules.
self.port.on("dealListShow", function(dealList) {
	dealTable.innerHTML = "";

	var dealListLength = dealList.length;

	if (dealListLength == 0) {
		dealTable.insertRow(0).insertCell(0).innerHTML = "There are no new deals.";
	}
	else {
		dealTable.insertRow(0).insertCell(0).innerHTML = '<button id="clearDealList">Mark All As Read</button>';
		dealTable.insertRow(0).insertCell(0).innerHTML = '<hr>';

		var clearDealList = document.getElementById("clearDealList");

		// Listen for button clicks and emit for index.js to clear the deal list
		clearDealList.addEventListener('click', function() {
			self.port.emit("clearDealList");
		});

		for (var i = 0; i < dealListLength; i++) {
			dealTable.insertRow(0).insertCell(0).innerHTML = '<a href=' + dealList[i].url + 'target="_blank">' + dealList[i].title + '</a>';

			if ((i + 1) < dealListLength) {
				dealTable.insertRow(0).insertCell(0).innerHTML = '<hr>';
			}
		}
	}

	resizePanelHeight();
});

// Resize the panel height according to the newly created HTML document
function resizePanelHeight() {
	self.port.emit("resizePanelHeight", document.body.offsetHeight);
}

// Listen for clicks on links, stop the event, and allow index.js to handle opening the link
window.addEventListener('click', function(event) {
	var clickTarget = event.target;

	if (clickTarget.nodeName == 'A') {
		event.stopPropagation();
		event.preventDefault();

		self.port.emit('clickDealLink', clickTarget.toString());
	}
}, false);