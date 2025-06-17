window.onload = function () {
  const canvas = new fabric.Canvas('editorCanvas');
  console.log("✅ Canvas initialized");

  const uploadInput = document.getElementById('upload');
  const downloadBtn = document.getElementById('downloadBtn');

  // Load SVG sticker once and store it
  let sticker = null;
  fabric.loadSVGFromURL('img/menu-open.svg', function (objects, options) {
    sticker = fabric.util.groupSVGElements(objects, options);
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
  }, { crossOrigin: 'anonymous' });

  // Handle image upload
  uploadInput.addEventListener('change', function (e) {
    const file = e.target.files[0];
    if (!file) return;

    console.log("📁 File selected:", file);
    const reader = new FileReader();

    reader.onload = function (event) {
      console.log("📷 Image read as DataURL");

      fabric.Image.fromURL(event.target.result, function (img) {
        const canvasWidth = canvas.getWidth();
        const canvasHeight = canvas.getHeight();
        const scale = Math.min(canvasWidth / img.width, canvasHeight / img.height);

        img.set({
          scaleX: scale,
          scaleY: scale,
          left: 0,
          top: 0,
          selectable: false,
        });

        canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
        canvas.renderAll();
      }, { crossOrigin: 'anonymous' });
    };

    reader.readAsDataURL(file);
  });

  // Download the canvas image
  downloadBtn.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'profile-picture.png';
    link.href = canvas.toDataURL({ format: 'png', quality: 1.0 });
    link.click();
  });
};
