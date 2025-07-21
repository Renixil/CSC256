// Array holding the paths to the slideshow images
let arrImages = [
    "images/image1.jpeg",
    "images/image2.jpeg",
    "images/image3.jpeg",
    "images/image4.jpeg"
];
//  This variable will keep track of the current image that we are showing
let currentImageIndex = 0;
//function to show the image on the page
function showImage(index) {
    // set up a nickname/shortcut to the img tag on the page.
    let imageSlide = document.getElementById("imgSlide");
    // set the iamge source(image file name) to the location of the image from the array
    imageSlide.src = arrImages[index];
}

// Go to Previous Slide
function prevSlide() {
    currentImageIndex--;
    if (currentImageIndex < 0) {
        currentImageIndex = arrImages.length - 1;
    }
    showImage(currentImageIndex);
}

// Move to next Slide
function nextSlide() {
    currentImageIndex++;
    if (currentImageIndex >= arrImages.length) {
        currentImageIndex = 0;
    }
    showImage(currentImageIndex);
}

// Show first image when page loads
showImage(currentImageIndex);
