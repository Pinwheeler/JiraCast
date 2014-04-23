// Constant for https://ajax-db.appspot.com/access.js
		APP_ID = 5685265389584384;

        var dataContextClass = function () {
            var self = this;

            self.displayName = ko.observable();

            self.openIssues = ko.observableArray();
            self.inProgressIssues = ko.observableArray();
            self.inReviewIssues = ko.observableArray();
            self.closedIssues = ko.observableArray();

            self.showInfo = ko.observable(false);

            self.db = new AjaxDB();

            self.queryJira = function(username, password, jql, callback) {
              self.db.query('queryJira', {
                'username': username,
                'password': password,
                'jql': encodeURI(jql)
              }, callback);
            };

            self.initCast = function () {
            	// cast.receiver.logger.setLevelValue(0);
            	
            	window.castReceiverManager = cast.receiver.CastReceiverManager.getInstance();
            	//	console.log('Starting Receiver Manager');

            	//	handler for the 'ready' event
            	castReceiverManager.onReady = function(event) {
            		//	console.log('Received Ready event: ' + JSON.stringify(event.data));
            		window.castReceiverManager.setApplicationState("Application status is ready...");
            	};

            	// handler for 'senderconnected' event
            	castReceiverManager.onSenderConnected = function(event) {
            		//	console.log('Received Sender Connected event: ' + event.data);
            		//	console.log(window.castReceiverManager.getSender(event.data).userAgent);
            	};

            	// handler for 'senderdisconnected' event
            	castReceiverManager.onSenderDisconnected = function(event) {
            		// console.log('Received Sender Disconnected event: ' + event.data);
            		if (window.castReceiverManager.getSenders().length == 0) {
            			window.close();
            		}
            	};

            	// handler for 'systemvolumechanged' event
            	castReceiverManager.onSystemVolumeChanged = function(event) {
            		// console.log('Received System Volume Changed event: ' + event.data['level'] + ' ' + event.data['muted']);
            	};

            	// create a CastMessageBus to handle messages for a custom namespace
            	window.messageBus = window.castReceiverManager.getCastMessageBus('urn:x-cast:com.google.cast.sample.helloworld');

            	// handler for the CastMessageBus message event
            	window.messageBus.onMessage = function(event) {
            		//console.log('Message [' + event.senderId + ']: ' + event.data);

            		// display the message from the sender
            		self.showUserInfo(event.data);

            		// inform all senders on the CastMessageBus of the incoming message event
            		// sender message listener will be invoked
            		window.messageBus.send(event.senderId, event.data);
            	}

            	// initialize the CastReceiverManager with an application status message
            	window.castReceiverManager.start({statusText: "Application is starting"});
            	// console.log('Receiver Manager started');
            };

    		self.showUserInfo = function(userId) {

    			var jql = 'project = LC AND fixVersion = "XRM R 1.0 MVP" AND updated >= -3w AND assignee in (' + userId + ') ORDER BY assignee ASC, status ASC';

    			//var jql = 'project = LCS AND status in (Open, "In Progress", Reopened, "Ready for CR Review", "Ready for QA Review") AND updated >= -3w ORDER BY assignee ASC, status ASC';

    			self.queryJira( 'rainer.gonzalez', 'jira2014', jql, function (data) {

    				var parseJSONData = JSON.parse(JSON.parse(data));

    				var tempOpenIssues = [];
    				var tempInProgressIssues = [];
    				var tempInReviewIssues = [];
    				var tempClosedIssues = [];

    				for (var i = 0; i < parseJSONData.issues.length; i++) {

    					switch (parseJSONData.issues[i].fields.status.name) {
    						case "Open":
    							tempOpenIssues.push(parseJSONData.issues[i]);
    							break;

    						case "In Progress":
    							tempInProgressIssues.push(parseJSONData.issues[i]);
    							break;

    						case "In Review":
								tempInReviewIssues.push(parseJSONData.issues[i]);
    							break;

    						case "Closed":
								tempClosedIssues.push(parseJSONData.issues[i]);
    							break;
    					}
    				}

    				self.displayName(parseJSONData.issues[0].fields.assignee.displayName);

					self.openIssues(tempOpenIssues);
    				self.inProgressIssues(tempInProgressIssues);
    				self.inReviewIssues(tempInReviewIssues);
    				self.closedIssues(tempClosedIssues);

    				self.showInfo(true);

    				window.castReceiverManager.setApplicationState(userId);

    			});
    		};
        };

        window.dataContext = new dataContextClass();
       

        $(document).ready(function () {
            ko.applyBindings(window.dataContext);

            window.dataContext.showUserInfo(event.data);

            //window.dataContext.initCast();
        });
