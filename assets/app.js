//function that populates the Button Section
$(document).ready(function(){
    populateButtons(searchArray, 'searchButton', '#buttonSection');
});


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
    console.log("debugger");
    $('#searches').empty();
    var type = $(this).data('type');
    var queryURL = 'https://api.giphy.com/v1/gifs/search?q='+type+'&api_key=MqAQB6vTy9zxVNLXWcy36pRSNbLUm0iO&limit=10'; 
    $.ajax({
        url:queryURL,
        method:'GET'
    })
    //when the GET request is done, we want to return what is given back
    //looping through the response data within our search array
    //created variables for ratings
    //we append the rating text and image to the search div which includes the search items
    // we are adding the new searchDiv to our #searches area
    .done(function(response){
        for (var i=0; i< response.data.length; i++){
            var searchDiv = $('<div class = "search-item">');
            var rating = response.data[i].rating;
            var p = $('<p>').text('Rating ' +rating);
            var animated = response.data[i].images.fixed_height.url;
            var still = response.data[i].images.fixed_height_still.url;
            var image = $('<img>');
            image.attr('src',still);
            image.attr('data-still',still);
            image.attr('data-animated',animated);
            image.attr('data-state','still');
            image.addClass('searchImage');
            searchDiv.append(p);
            searchDiv.append(image);
            $('#searches').append(searchDiv);
        }
        console.log(response.data);
    });
});
//section where we figure out how to animate our gifs
$(document).on('click', '.searchImage',function(){
    var state = $(this).attr('data-state');
    if(state == 'still'){
        $(this).attr('src',$(this).data('animated'));
        $(this).attr('data-state','animated');
    }else{
        $(this).attr('src',$(this).data('still'));
        $(this).attr('data-state','still');
    }
});

//section for adding new searches to our search
$('#addSearch').on('click',function(){
    var newSearch = $('#search-input').val();
    searchArray.push(newSearch);
    populateButtons(searchArray, 'searchButton', '#buttonSection');
    return false;
});

