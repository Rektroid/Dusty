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

      // Create an image object from the uploaded file
      const imageUrl = event.target.result;
      fabric.Image.fromURL(imageUrl, function (img) {
        console.log("✅ Image loaded onto the canvas");

        const canvasWidth = canvas.getWidth();
        const canvasHeight = canvas.getHeight();
        const scale = Math.min(canvasWidth / img.width, canvasHeight / img.height);

        img.set({
          scaleX: scale,
          scaleY: scale,
          left: (canvasWidth - img.width * scale) / 2,  // Center image horizontally
          top: (canvasHeight - img.height * scale) / 2,  // Center image vertically
          selectable: false
        });

        // Add the image to the canvas
        canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
        canvas.renderAll();
      });
    };

    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    } else {
      console.error("⛔️ No file selected");
    }
  });

  // Load SVG sticker and add it to canvas
  fabric.loadSVGFromURL('img/menu-open.svg', function (objects, options) {
    console.log("✅ Sticker loaded");

    // Group the SVG objects and set properties
    const sticker = fabric.util.groupSVGElements(objects, options);
    sticker.set({
      left: 100,
      top: 100,
      scaleX: 0.5,
      scaleY: 0.5,
      cornerStyle: 'circle',
      hasRotatingPoint: true
    });

    // Add the sticker to the canvas
    canvas.add(sticker);
    canvas.setActiveObject(sticker);
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
