function queryJira() {
	var jql = input.jql;
	
	var result = http.get("https://levatas.atlassian.net/rest/api/2/search?jql=" + jql)
		.basicAuthentication(input.username, input.password)
		.noCache()
		.executeString()+'';
	
	return result;
}