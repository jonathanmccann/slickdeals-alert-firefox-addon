var latestDealTitle;
var previousDealTitle;

// Query Slickdeals for its Frontpage RSS feed and determine if there is a new deal to notify the user of
setInterval(function() {
	$.ajax({
		url: "http://slickdeals.net/newsearch.php?mode=frontpage&searcharea=deals&searchin=first&rss=1",
		cache: false,
		success: function (data) {
			$(data).find("item").each(function(index) {
				var dealTitle = truncateTitle($(this).find("title").text());

				if (previousDealTitle == undefined | previousDealTitle == null) {
					previousDealTitle = dealTitle;

					return false;
				}

				if (previousDealTitle == dealTitle) {
					return false;
				}

				if (index == 0) {
					latestDealTitle = dealTitle;
				}

				self.port.emit("newDeal", dealTitle, $(this).find("link").text());
			});

			previousDealTitle = latestDealTitle;
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