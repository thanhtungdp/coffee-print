var easyimg = require("easyimage");
easyimg
  .rescrop({
    src: "public/uploads/image_1500973508902.jpg",
    dst: "public/kitten-thumbnail.jpg",
    width: 300,
    cropwidth: 260,
    cropheight: 260,
    x: 0,
    y: 0
  })
  .then(
    function(image) {
      console.log("Resized and cropped: " + image.width + " x " + image.height);
    },
    function(err) {
      console.log(err);
    }
  );
