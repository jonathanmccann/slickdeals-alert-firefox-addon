setInterval(function() {
	$.get('http://slickdeals.net/newsearch.php?mode=frontpage&searcharea=deals&searchin=first&rss=1', function (data) {
		var rssItem = $(data).find("item:first");
		console.log("title - " + rssItem.find("title").text());
		console.log("href - " + rssItem.find("link").text());

		self.port.emit("notify", rssItem.find("title").text(), rssItem.find("link").text());
});
}, 10000);