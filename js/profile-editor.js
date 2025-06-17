document.addEventListener("DOMContentLoaded", () => {
  const uploadInput = document.getElementById("upload");
  const uploadedImg = document.getElementById("uploaded-image");
  const sticker = document.getElementById("sticker");
  const downloadBtn = document.getElementById("download");

  let offsetX, offsetY, isDragging = false;

  uploadInput.addEventListener("change", (e) => {
    const reader = new FileReader();
    reader.onload = function (event) {
      uploadedImg.src = event.target.result;
    };
    reader.readAsDataURL(e.target.files[0]);
  });

  sticker.addEventListener("mousedown", (e) => {
    isDragging = true;
    offsetX = e.offsetX;
    offsetY = e.offsetY;
  });

  document.addEventListener("mouseup", () => isDragging = false);

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    const rect = document.getElementById("editor").getBoundingClientRect();
    const x = e.clientX - rect.left - offsetX;
    const y = e.clientY - rect.top - offsetY;
    sticker.style.left = `${x}px`;
    sticker.style.top = `${y}px`;
  });

  downloadBtn.addEventListener("click", () => {
    const canvas = document.createElement("canvas");
    canvas.width = 300;
    canvas.height = 300;
    const ctx = canvas.getContext("2d");
    const bg = new Image();
    bg.src = uploadedImg.src;

    bg.onload = () => {
      ctx.drawImage(bg, 0, 0, 300, 300);
      const stickerX = parseInt(sticker.style.left || 0);
      const stickerY = parseInt(sticker.style.top || 0);
      ctx.drawImage(sticker, stickerX, stickerY, sticker.width, sticker.height);

      const link = document.createElement("a");
      link.download = 'profile-picture.png';
      link.href = canvas.toDataURL();
      link.click();
    };
  });
});
