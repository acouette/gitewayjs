var giteway = giteway || {};
var ENTER_KEY = 13;

var GITHUB_ROOT = "https://api.github.com";
var GITHUB_SEARCH_REPO = "/legacy/repos/search/:keyword";

$(function() {

	// Kick things off by creating the **App**.
	new giteway.AppView();

});