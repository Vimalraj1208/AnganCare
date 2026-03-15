const faceapi = require("face-api.js");
const canvas = require("canvas");
const fs = require("fs");
const path = require("path");

const { Canvas, Image, ImageData } = canvas;

faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

const facesPath = path.join(__dirname, "../faces");

async function loadModels() {
  await faceapi.nets.ssdMobilenetv1.loadFromDisk("./models");
  await faceapi.nets.faceRecognitionNet.loadFromDisk("./models");
  await faceapi.nets.faceLandmark68Net.loadFromDisk("./models");
}

async function recognizeFace(imageBuffer) {

  const img = await canvas.loadImage(imageBuffer);

  const detection = await faceapi
    .detectSingleFace(img)
    .withFaceLandmarks()
    .withFaceDescriptor();

  if (!detection) return null;

  const descriptor = detection.descriptor;

  const files = fs.readdirSync(facesPath);

  for (let file of files) {

    const savedImage = await canvas.loadImage(
      path.join(facesPath, file)
    );

    const savedDetection = await faceapi
      .detectSingleFace(savedImage)
      .withFaceLandmarks()
      .withFaceDescriptor();

    if (!savedDetection) continue;

    const distance = faceapi.euclideanDistance(
      descriptor,
      savedDetection.descriptor
    );

    if (distance < 0.5) {

      return file.replace(".jpg", "");

    }
  }

  return null;
}

module.exports = {
  loadModels,
  recognizeFace
};