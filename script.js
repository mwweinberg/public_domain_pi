//TODO: fullscreen, turn off screen at night, start at boot



//https://openaccess-api.clevelandart.org/api/artworks/?skip=5&limit=10&indent=1&cc0=1&has_image=1&department=Chinese%20Art

//function to generate a random number
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}

//uses the function to pick a random image in the collection
var offset = getRndInteger(1, 31278);
//inserts that random number into the request url, returning a json file
var target_json_url = "https://openaccess-api.clevelandart.org/api/artworks/?limit=10&indent=1&cc0=1&has_image=1&skip=" + offset;

console.log(target_json_url);

//create new request object instance
let request = new XMLHttpRequest();
//opens the file
request.open('GET', target_json_url);
request.responseType = 'json'
request.send();

request.onload = function() {
    const response_json = request.response;
    //gets the image URL + tombstone of a random image from the collection and turns it into an array assigned to a variable
    var found_image_info = grabImageInfo(response_json);



    console.log('this ' + found_image_info[0]);
    console.log('that ' + found_image_info[1]);

    var picked_image_URL = found_image_info[0];
    var picked_image_tombstone = found_image_info[1];

    //creates the image to be  posted
    var img = document.createElement("img");
    img.src = picked_image_URL;

    img.alt = 'picked_image_tombstone';

    //creates the text
    var tomb_text = document.createTextNode(picked_image_tombstone)

    //creates the linebreak
    var linebreak = document.createElement('br');

    let item = document.createElement('div');
    item.classList.add('item');
    item.innerHTML = `<div class="container"><img class="beach-image"  src="${picked_image_URL}" alt="beach image"/><div class="textStyle">${picked_image_tombstone}</div></div>`;
    document.body.appendChild(item);

    //set up the refresh
    //time is in ms
    //this sets the range
    var refresh_interval = getRndInteger(5000, 20000)
    console.log("refresh rate = " + refresh_interval);
    //this uses the range to reset the page
    setTimeout(function(){
        location = ''
    },refresh_interval)




}

function grabImageInfo(jsonObj) {
    console.log(jsonObj['data'][0]['images']['web']['url']);
    //creates an array with the URL and tombstone of the random object picked
    var function_image_url = [jsonObj['data'][0]['images']['web']['url'], jsonObj['data'][0]['tombstone']];
    console.log(function_image_url[0]);
    //returns that array
    return function_image_url;
}





