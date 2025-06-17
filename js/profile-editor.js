window.onload = function () {
  const canvas = new fabric.Canvas('editorCanvas');
  console.log("✅ Canvas initialized");

  const uploadInput = document.getElementById('upload');
  const downloadBtn = document.getElementById('downloadBtn');

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

        // Set the scale of the image to fit the canvas
        const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
        fabricImage.set({
          scaleX: scale,
          scaleY: scale,
          left: (canvas.width - img.width * scale) / 2,  // Center the image horizontally
          top: (canvas.height - img.height * scale) / 2,  // Center the image vertically
        });

        // Set the image as the background of the canvas
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
  fabric.Image.fromURL('img/menu-open.svg', function(stickerImg) {
    stickerImg.scale(0.5);
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

  // Download image
  downloadBtn.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'profile-picture.png';
    link.href = canvas.toDataURL({ format: 'png', quality: 1.0 });
    link.click();
  });
};
