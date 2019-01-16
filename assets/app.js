//function that populates the Button Section
$(function(){
    populateButtons(searchArray, 'searchButton', '#buttonSection');
})

var searchArray = ['snake', 'puppy', 'fish'];

// used to dynamically add buttons with Jquery
// assigning a class and appending it to the searchArray
function populateButtons(searchArray,classToAdd,areaToAddTo){
    $(areaToAddTo).empty();
    for(var i=0; i<searchArray.length;i++){
    var a = $('<button>');
    a.addClass(classToAdd);
    a.attr('data-type', searchArray[i]);
    a.text(searchArray[i]);
    $(areaToAddTo).append(a);
    //using different methods to create our buttons
    }
}
//created a click function to be presented when we select the searchButton
$(document).on('click', '.searchButton', function(){
$('#searches').empty();
var type = $(this).data('type');
var queryURL = 'http://api.giphy.com/v1/gifs/search?q='+type+'&api_key=MqAQB6vTy9zxVNLXWcy36pRSNbLUm0iO&limit=15'; 
$.ajax({
    url:queryURL,
    method:'GET'
})
})