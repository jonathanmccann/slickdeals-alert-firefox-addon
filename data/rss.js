var previousDealTitle;

setInterval(function() {
	$.get('http://slickdeals.net/newsearch.php?mode=frontpage&searcharea=deals&searchin=first&rss=1', function (data) {
		var rssItem = $(data).find("item:first");
		var dealTitle = truncateTitle(rssItem.find("title").text());

		if (previousDealTitle != dealTitle) {
			self.port.emit("notify", dealTitle, rssItem.find("link").text());

			previousDealTitle = dealTitle;
		}
});
}, 10000);

function truncateTitle(dealTitle){
	if (dealTitle.length > 75) {
		return dealTitle.substring(0, 75) + '...';
	}
	else {
		return dealTitle;
	}
};