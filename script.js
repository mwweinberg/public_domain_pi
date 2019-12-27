
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

    var picked_image_URL = found_image_info[0];
    var picked_image_tombstone = found_image_info[1];
    var picked_image_title = found_image_info[2];
    var picked_image_author = found_image_info[3];
    var picked_image_date = found_image_info[4];

    //creates the image to be  posted
    var img = document.createElement("img");
    img.src = picked_image_URL;

    img.alt = 'picked_image_tombstone';

    let item = document.createElement('div');
    item.classList.add('item');
    item.innerHTML = `<div class="container"><img class="picked_image"  src="${picked_image_URL}" alt="${picked_image_tombstone}"/><div class="textStyle">${picked_image_title}<br>${picked_image_author}<br>${picked_image_date}</div></div>`;
    document.body.appendChild(item);

    //set up the refresh
    //time is in ms
    //this sets the range
    //currently set at 30-90 minutes
    var refresh_interval = getRndInteger(1800000, 5400000)
    console.log("refresh rate = " + refresh_interval);
    //this uses the range to reset the page
    setTimeout(function(){
        location = ''
    },refresh_interval)




}

function grabImageInfo(jsonObj) {

    //pulls the elements of each piece and assigns it to a variable
    var data_url = jsonObj['data'][0]['images']['web']['url']
    var data_tombstone = jsonObj['data'][0]['tombstone']
    console.log(data_tombstone)
    var data_title = jsonObj['data'][0]['title']
    //the author info sometimes doesn't exist, which screws up the function. Pulling this part out of the function fixes it because the jsonObj is not evaluated before the try/catch. I am not sure what that means but it works.
    try {
         data_author = jsonObj['data'][0]['creators'][0]['description']
     }
     catch (e) {
         data_author = ''

     }
    var data_creation_date = jsonObj['data'][0]['creation_date']

    console.log("url = " +data_url)

    //creates an array with the URL, tombstone, title, author, and creation date of the random object picked
    var function_image_data = [data_url, data_tombstone, data_title, data_author, data_creation_date]
    //returns that array
    return function_image_data;
}








