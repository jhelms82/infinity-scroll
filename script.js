const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];



//Unspash API
const count = 30;
const apiKey = '4ro6JcJQkJvvUjElKZw3UlGduSya3MyJQBdfYqEViIY';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;


//Check if all images were loaded

function imageLoaded(){
    imageLoaded++;
    if(imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
    }
}


//Helper Function to set att on DOM element
function setAttributes(element, attributes){
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}



//Create Elements for Links & Photos, Add to Dom

function displayPhotos(){
    imageLoaded = 0;
    totalImages = photosArray.length;

    //Run function for each object in photosArray

    photosArray.forEach((photo) => {
        //Create <a> to link to unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html, 
            target: '_blank', 
        });
        //Create <img> for photo
        const img = document.createElement('img');

        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });

        //Event Listener, Check when each is finished Loading
        img.addEventListener('load', imageLoaded);

        //Put <img> inside <a>, then put both inside imageContainer element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

//Get photos from unsplash api
async function getPhotos(){
    try {
        const response = await fetch(apiUrl);
         photosArray = await response.json();
        
        displayPhotos();
    } catch (error) {
        //Catch error here
        console.log('error')

        
    }
}


//Check to see if scrolling near bottom of page, load more photos

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotos()
    }
})

//ON load
getPhotos();



