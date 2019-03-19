var i = 0; 			// Start Point
var images = [];	// Images Array
var time = 6000;	// Time Between Switch
	 
// Image List
images[0] = "images/testimonial1.png";
images[1] = "images/testimonial2.png";
images[2] = "images/testimonial3.png";
images[3] = "images/testimonial4.png";
images[4] = "images/testimonial5.png";
images[5] = "images/testimonial6.png";
images[6] = "images/testimonial7.png";
images[7] = "images/testimonial8.png";

// Change Image
function changeImg(){
	document.slide.src = images[i];

	// Check If Index Is Under Max
	if(i < images.length - 1){
	  // Add 1 to Index
	  i++; 
	} else { 
		// Reset Back To O
		i = 0;
	}

	// Run function every x seconds
	setTimeout("changeImg()", time);
}

// Run function when page loads
window.onload=changeImg;
