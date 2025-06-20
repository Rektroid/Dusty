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
  fabric.Image.fromURL('img/bottle.png', function(stickerImg) {
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

  // Download image with better quality including the sticker
  downloadBtn.addEventListener('click', () => {
    // Increase the resolution without resizing the canvas (multiplier for better quality)
    const dataUrl = canvas.toDataURL({
      format: 'png',
      quality: 1, // Maximum quality
      multiplier: 2 // Increase resolution by multiplier (adjust as necessary)
    });

    // Create a download link
    const link = document.createElement('a');
    link.download = 'profile-picture.png'; // Set the file name
    link.href = dataUrl;
    link.click(); // Simulate the download
    console.log("✅ Image download initiated");
  });
};
