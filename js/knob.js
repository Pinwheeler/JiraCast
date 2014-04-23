
$(function($) {

    $(".knob").knob({
        change : function (value) {
            //console.log("change : " + value);
            // perc is a percentage of the maximum value of an arbitrary slider
		    // value is a value between 0 and 511; 
		    // 0 = red, 255 = yellow, 511 = green.
		    // value needs to be derived from perc
		    var perc = value * 511/(this.o.max);
		    if (perc > 500)
		    	perc = 500;
		    //console.log(perc);
		    
		    var redValue;
		    var greenValue;
		    if (perc < 255) {
		        redValue = 255;
		        greenValue = Math.sqrt(perc) * 16;
		        greenValue = Math.round(greenValue);
		    } else {
		        greenValue = 255;
		        perc = perc - 255;
		        redValue = 255 - (perc * perc / 255)
		        redValue = Math.round(redValue);
		    }
		    var hexColor = "#" + redValue.toString(16) + greenValue.toString(16) + "00";
		
			//console.log(hexColor);
		
            //this.fgColor = hexColor;
            this.o.fgColor = hexColor;
        },
        release : function (value) {
            //console.log(this.$.attr('value'));
            //console.log("release : " + value);
        },
        cancel : function () {
            //console.log("cancel : ", this);
        },
        /*format : function (value) {
            return value + '%';
        },*/
        draw : function () {

            // "tron" case
            if(this.$.data('skin') == 'tron') {

                this.cursorExt = 0.3;

                var a = this.arc(this.cv)  // Arc
                    , pa                   // Previous arc
                    , r = 1;

                this.g.lineWidth = this.lineWidth;

                if (this.o.displayPrevious) {
                    pa = this.arc(this.v);
                    this.g.beginPath();
                    this.g.strokeStyle = this.pColor;
                    this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, pa.s, pa.e, pa.d);
                    this.g.stroke();
                }

                this.g.beginPath();
                this.g.strokeStyle = r ? this.o.fgColor : this.fgColor ;
                this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, a.s, a.e, a.d);
                this.g.stroke();

                this.g.lineWidth = 2;
                this.g.beginPath();
                this.g.strokeStyle = this.o.fgColor;
                this.g.arc( this.xy, this.xy, this.radius - this.lineWidth + 1 + this.lineWidth * 2 / 3, 0, 2 * Math.PI, false);
                this.g.stroke();

                return false;
            }
        }
    });
    
});