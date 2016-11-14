




$(document).ready(function() {
	$('#fixedheader').hide();
    $(window).scroll(function() {
        if ($(document).scrollTop() > 20) {
            $('#fixedheader').fadeIn('slow');
        }
        else {
            $('#fixedheader').fadeOut('slow');
        }
    });

/*Make the HTML 5 Includes Work*/
w3IncludeHTML();

})



/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}