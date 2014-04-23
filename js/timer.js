$( document ).ready(function(){
start_timer(60);
});

function start_timer(seconds) {
		// Handler for .ready() called.
		var millis = seconds * 100;
		var $s = $("#timerknob")
		$s.defaultValue = millis.toString();
		$s.val(millis).trigger("change");
		var tid = setInterval(tick_down, 50);
		function tick_down() {
			millis-=5;
			// refresh view
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
		}