var previousDealTitle;

// Query Slickdeals for its Frontpage RSS feed and determine if there is a new deal to notify the user of
setInterval(function() {
	$.get('http://slickdeals.net/newsearch.php?mode=frontpage&searcharea=deals&searchin=first&rss=1', function (data) {
		var rssItem = $(data).find("item:first");
		var dealTitle = truncateTitle(rssItem.find("title").text());

		if (previousDealTitle != dealTitle) {
			self.port.emit("newDeal", dealTitle, rssItem.find("link").text());

			previousDealTitle = dealTitle;
		}
});
}, 10000);

// Truncate the deal's title to have a uniform panel size
function truncateTitle(dealTitle){
	if (dealTitle.length > 75) {
		return dealTitle.substring(0, 75) + '...';
	}
	else {
		return dealTitle;
	}
};