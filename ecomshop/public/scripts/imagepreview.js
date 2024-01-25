//* For image preview during adding product

const imagepicker = document.querySelector("#image-upload-control input");
const imagepreview = document.querySelector("#image-upload-control img");

//function to update the image preview
function updateImagePreview() {
  //getting the image picked
  const files = imagepicker.files;

  if (!files || files.length === 0) {
    imagepreview.style.display = "none";
    return;
  }

  const pickedFile = files[0];

  //creating the image url
  imagepreview.src = URL.createObjectURL(pickedFile);
  imagepreview.style.display = "inline";
}

imagepicker.addEventListener("change", updateImagePreview);
