Slickdeals Frontpage Alert Firefox Addon
========

This Firefox addon will provide a Firefox alert message when there is a new frontpage deal or a new deal from a custom search, which can be set in the preferences. To make a custom search URL, perform a search on [Slickdeals](http://www.slickdeals.net) and you should receive a URL similar to the following:

```
http://slickdeals.net/newsearch.php?forumchoice[]=4&forumchoice[]=9&forumchoice[]=10&forumchoice[]=13&forumchoice[]=25&forumchoice[]=30&forumchoice[]=38&forumchoice[]=39&forumchoice[]=53&forumchoice[]=54&q=mozilla&firstonly=1
```

To make the search query into an RSS feed that this addon can consume, simply add "&rss=1" to the end of the URL. The resulting URL should look like:

```
http://slickdeals.net/newsearch.php?forumchoice[]=4&forumchoice[]=9&forumchoice[]=10&forumchoice[]=13&forumchoice[]=25&forumchoice[]=30&forumchoice[]=38&forumchoice[]=39&forumchoice[]=53&forumchoice[]=54&q=mozilla&firstonly=1&rss=1
```

If an invalid URL is used then no alerts will be displayed.

The alerts will be displayed as a colored badge on the toolbar button. If there is a new result, then the badge will change colors and its text. Clicking on the toolbar button when there are results will display the deal's title as a hyperlink. Clicking this hyperlink will open a new tab and be directed toward that deal's page and it will also remove that particular deal from the deal list. Underneath all of the deals, there is a button that can be used to mark all of the deals as read, so that you do not have to click each individual link if it is not a deal you are interested in.

Installation
========

To build and install this extension from source, you will first need to install [Mozzila's Add-On SDK](https://developer.mozilla.org/en-US/Add-ons/SDK/Tools/jpm#Installation). Once that is installed, run the following command in the root directory (where the package.json is stored):

```
jpm xpi
```

This will then create an .xpi file (IE @slickdeals-alert-firefox-addon-0.0.1.xpi). Once this file is generated, go to Firefox and choose File - Open File and select the .xpi file you generated. Firefox will then ask if you want to install the addon.