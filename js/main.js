console.log("Main.js loaded - hello");

$(function() {
	var sCountryText = getQueryStringParams('country');
	// console.log(sCountryText);
	if (!sCountryText == false) {
		setBackgroundImage(sCountryText);
		setUpdateCountry(sCountryText);
		populateDropDown(sCountryText);
	}
});

function getQueryStringParams(sParam)
{
    var sPageURL = window.location.search.substring(1);
    	var sURLVariables = sPageURL.split('&');
    	for (var i = 0; i < sURLVariables.length; i++)
    	{
        	var sParameterName = sURLVariables[i].split('=');
        	if (sParameterName[0] == sParam)
        	{
            	return sParameterName[1];
       	 	}
    	}
}

 function setBackgroundImage(sCountryName) {
 	//request the JSON data and parse into the header image element
 	$.ajax({
   		url: './js/picture-list.json',
   		dataType:'JSON',
   		success:function(data){
     		//iterate over the data and append a select option
     		$.each(data.towns, function(key, val){
     			if (val.country === sCountryName) {
						var url = "./images/"+val.picture;
       				$('header').css("background-image", "url("+url+")");
       			}
     		})
   		},
   		error:function(){
     		//if there is an error drop out an alert message
     		alert("Failed to load background image");
   		}
 });
}

function setUpdateCountry(sCountryName) {
	sCountryName = sCountryName.charAt(0).toUpperCase() + sCountryName.slice(1);
	$('#update-message').text("You have chosen"+ " " +sCountryName+ ", " +"now pick a town from the drop down list below");
}

function populateDropDown(sCountryName) {
	//get a reference to the select element
	$selectObject = $('#town-list');
	// console.log(sCountryName);
	//request the JSON data and parse into the select element
	$.ajax({
  		url: './js/townlist3.json',
  		dataType:'JSON',
  		success:function(data){
    		//clear the current content of the select
    		$selectObject.html('');
    		//iterate over the data and append a select option
    		$.each(data.towns, function(key, val){
    			if (val.country === sCountryName) {
      				$selectObject.append('<option id="' + val.id + '">' + val.name + '</option>');
      			}
    		})
  		},
  		error:function(){
    		//if there is an error append a 'none available' option
    		$selectObject.html('<option id="-1">none available</option>');
  		}
	});
}

function callWeatherData(location) {
	console.log('In selector ajax function')
	$.ajax({
   		url : "./js/weather-static.json",
   		dataType : "jsonp",
   		success : function(data) {
   			$.each(data.forecastday, function(key, val){
   				var location = data['location']['city'];
   				var temp_f = data['current_observation']['temp_f'];  
   			}	

   		)}
   });

}

$('#town-list').on('selected', function () {
	console.log('drop down fired')
	var selectedValue = $( "#town-list option:selected" ).text();
	callWeatherData(selectedValue);

});

// OpenWeather API key - 0083271c623d722a24a18686f80d0e12
// Weather Underground API Key - fe4f7c74b1a52936

// jQuery(document).ready(function($) {
//   $.ajax({
//   url : "http://api.wunderground.com/api/fe4f7c74b1a52936/geolookup/forecast/q/IA/chamonix.json",
//   dataType : "jsonp",
//   success : function(parsed_json) {
//   var location = parsed_json['location']['city'];
//   var temp_f = parsed_json['current_observation']['temp_f'];
//   alert("Current temperature in " + location + " is: " + temp_f);
//   }
//   });
// });
