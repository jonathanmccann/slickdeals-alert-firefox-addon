var dealTable = document.getElementById("myTable");

self.port.on("dealListShow", function(dealList) {
	for (var i = 0; i < dealList.length; i++) {
		dealTable.insertRow(0).insertCell(0).innerHTML = '<a href=' + dealList[i].url + 'target="_blank">' + dealList[i].title + '</a>';
	}
});

window.addEventListener('click', function(event) {
	var clickTarget = event.target;
	
	if (clickTarget.nodeName == 'A') {
		event.stopPropagation();
		event.preventDefault();

		self.port.emit('clickDealLink', clickTarget.toString());
	}
}, false);