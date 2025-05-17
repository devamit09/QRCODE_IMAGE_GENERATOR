let imgBox = document.getElementById("imgBox");
let qrImage = document.getElementById("qrImage");
let qrText = document.getElementById("qrText");
let downloadBtn = document.getElementById("downloadBtn");

function generateQR() {
  let text = qrText.value.trim();  

  if (text.length > 0) {
    qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(text)}`;
    imgBox.classList.add("show-img");

    // Enable the download button
    downloadBtn.disabled = false;

  } else {
    qrText.classList.add("error");
    setTimeout(() => {
      qrText.classList.remove("error");
    }, 1000);


    // Disable the download button if input is invalid
    downloadBtn.disabled = true;

  }
}

function downloadQR() {
  let imageSrc = qrImage.src;

  if (!imageSrc || imageSrc === "") {
    alert("Please generate a QR code first!");
    return;
  }

  // Create an image object
  const img = new Image();
  img.crossOrigin = "anonymous"; // Needed for cross-origin images

  img.onload = function () {
    // Create a canvas and draw the image onto it
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    // Convert canvas to data URL
    const dataURL = canvas.toDataURL('image/png');

    // Create and trigger the download
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'qr-code.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  img.src = imageSrc;
}

