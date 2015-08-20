self.port.on("dealListShow", function(dealList) {
	for (var i = 0; i < dealList.length; i++) {
		console.log("Showing Title - " + dealList[i].title);
		console.log("Showing URL - " + dealList[i].url);
	}
});