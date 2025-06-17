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

      fabric.loadSVGFromURL('./img/menu-open.svg', function (objects, options) {
        console.log("✅ Fabric image loaded");

        const canvasWidth = canvas.getWidth();
        const canvasHeight = canvas.getHeight();
        const scale = Math.min(canvasWidth / img.width, canvasHeight / img.height);

        img.set({
          scaleX: scale,
          scaleY: scale,
          left: 0,
          top: 0,
          selectable: false
        });

        canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
        canvas.renderAll();
      }, { crossOrigin: 'anonymous' });
    };

    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    } else {
      console.error("⛔️ No file selected");
    }
  });

  // Load SVG sticker
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
  console.log("Sticker added to canvas");
};

    const sticker = fabric.util.groupSVGElements(objects, options);
    sticker.set({
      left: 100,
      top: 100,
      scaleX: 0.5,
      scaleY: 0.5,
      hasControls: true,
      cornerStyle: 'circle',
      cornerColor: 'blue',
      transparentCorners: false,
    });
    canvas.add(sticker);
    canvas.renderAll();
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
