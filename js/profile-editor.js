window.onload = function () {
  const canvas = new fabric.Canvas('editorCanvas');
  console.log("✅ Canvas initialized");

  const uploadInput = document.getElementById('upload');
  const downloadBtn = document.getElementById('downloadBtn');

  // Ensure the canvas has defined size (in case it's not defined in CSS)
  canvas.setWidth(500);  // Set width of canvas
  canvas.setHeight(500); // Set height of canvas

  // Upload user image
  uploadInput.addEventListener('change', function (e) {
    console.log("📁 File selected:", e.target.files[0]);
    const reader = new FileReader();

    reader.onload = function (event) {
      console.log("📷 Image read as DataURL");

      const imageUrl = event.target.result;
      const img = new Image();
      img.src = imageUrl;

      img.onload = function() {
        // Create a fabric image from the uploaded file
        const fabricImage = new fabric.Image(img);

        // Scale the image to fit the canvas
        const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
        fabricImage.set({
          scaleX: scale,
          scaleY: scale,
          left: (canvas.width - img.width * scale) / 2,  // Center the image horizontally
          top: (canvas.height - img.height * scale) / 2,  // Center the image vertically
        });

        // Add the image to the canvas and render
        canvas.setBackgroundImage(fabricImage, canvas.renderAll.bind(canvas));
        canvas.renderAll();  // Render the canvas to update the view
        console.log("✅ User image added to canvas");
      };
    };

    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    } else {
      console.error("⛔️ No file selected");
    }
  });

  // Load sticker (SVG) and add to canvas
  fabric.Image.fromURL('img/try1.png', function(stickerImg) {
    stickerImg.scale(0.15);
    stickerImg.set({
      left: 100,
      top: 100,
      cornerStyle: 'circle',
      hasRotatingPoint: true
    });
    canvas.add(stickerImg);
    canvas.setActiveObject(stickerImg);
    console.log("✅ Sticker added to canvas");
  });

  // Download image with high resolution
  downloadBtn.addEventListener('click', () => {
    // Get the current canvas size
    const width = canvas.width;
    const height = canvas.height;

    // Increase the resolution by a factor (e.g., 2x)
    const scaleFactor = 2;  // Change this value for higher/lower resolution

    // Create a new canvas for the high-res image
    const highResCanvas = document.createElement('canvas');
    const highResCtx = highResCanvas.getContext('2d');

    // Set the new canvas size based on the scale factor
    highResCanvas.width = width * scaleFactor;
    highResCanvas.height = height * scaleFactor;

    // Scale the drawing context to match the high resolution
    highResCtx.scale(scaleFactor, scaleFactor);

    // Render the content of the original canvas to the high-resolution canvas
    highResCtx.drawImage(canvas.lowerCanvasEl, 0, 0);

    // Convert the high-resolution canvas to a downloadable image
    const imageURL = highResCanvas.toDataURL('image/png');

    // Create a download link and simulate a click to download the high-res image
    const link = document.createElement('a');
    link.download = 'profile-picture.png'; // Set the file name
    link.href = imageURL;
    link.click();
  });
};
