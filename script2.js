$(document).ready(function () {
  function getColor(event) {
    console.log(event.target.value);
    $("#color-display").css("background-color", event.target.value);

    $("#rgb-red").html(event.target.value);
    $("#rgb-green").html(event.target.value);
    $("#rgb-blue").html(event.target.value);



    // get the color box
    // insert the current color inside the color box
  }

function hexToRgb(hexColor){            //8383e2

  var hex_color= hex, pattern_color= "^#([A-Fa-f0-9]{6})$";


  if (hexColor.match(pattern_color)){
    var hex_color= hex_color.replace("#", "")
    , r= parseInt(hex_color.substring(0,2),16)
    , g= parseInt(hex_color.substring(2,4),16)
    , b= parseInt(hex_color.substring(4,6),16)

      return [r,g,b];
  }

  else {
		alert('Error Color Format');
	}
}

  





  // return [r,g,b]
} 

  function colorToGrayscale(r, g, b) {

    // const color = []
    // const rgb= [200,220,110]

    // const gray = colorToGrayscale(r[0], g[1], b[2])

    // $("#grayscale").change()




    return color; // "#aabbcc"
  }

  $("#colorpicker").change(function (e) {
    getColor(e);
  });
});

















