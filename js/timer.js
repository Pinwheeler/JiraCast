$( document ).ready(function() {
		// Handler for .ready() called.
		var seconds = 60; //This should be able to be dynamically set: running time of timer in seconds
		var millis = seconds * 100;
		var tid = setInterval(tick_down, 50);
		function tick_down() {
			millis-=5;
			// refresh view
			var $s = $("#timerknob")
			$s.val(millis).trigger("change");
			if (millis == 0)
			{
				abortTimer()
			}
		}
		function abortTimer()
		{
			clearInterval(tid);
		}
		});
