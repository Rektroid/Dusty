window.onload = function () {
  const canvas = new fabric.Canvas('editorCanvas');
  console.log("Canvas initialized:", canvas);

  const uploadInput = document.getElementById('upload');
  const downloadBtn = document.getElementById('downloadBtn');

  // 1. Upload image
  uploadInput.addEventListener('change', function (e) {
    const reader = new FileReader();

    reader.onload = function (event) {
      fabric.Image.fromURL(event.target.result, function (img) {
        const canvasWidth = canvas.getWidth();
        const canvasHeight = canvas.getHeight();

        const scale = Math.min(
          canvasWidth / img.width,
          canvasHeight / img.height
        );

        img.set({
          scaleX: scale,
          scaleY: scale,
          left: 0,
          top: 0,
          selectable: false
        });

        canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
      }, { crossOrigin: 'anonymous' });
    };

    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    } else {
      console.error("No file selected.");
    }
  });

  // 2. Add SVG sticker
  fabric.loadSVGFromURL('img/menu-open.svg', function (objects, options) {
    const sticker = fabric.util.groupSVGElements(objects, options);
    sticker.set({
      left: 100,
      top: 100,
      scaleX: 0.5,
      scaleY: 0.5,
      hasControls: true,
      hasBorders: true,
      cornerStyle: 'circle',
      cornerColor: 'blue',
      transparentCorners: false,
    });
    canvas.add(sticker);
    console.log("Sticker loaded.");
  });

  // 3. Download button
  downloadBtn.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'profile-picture.png';
    link.href = canvas.toDataURL({ format: 'png', quality: 1.0 });
    link.click();
  });
};
