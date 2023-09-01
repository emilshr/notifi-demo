const backgroundUrls = [
  "https://img.freepik.com/free-vector/wallpaper-with-topographic-map-design_23-2148589477.jpg",
  "https://img.freepik.com/free-vector/topographic-map-background_23-2148588649.jpg",
  "https://img.freepik.com/free-vector/topographic-map-blue-contour-lines_23-2148582765.jpg",
];

export const getRandomBackgroundUrl = () => {
  return (
    backgroundUrls[Math.floor(Math.random() * backgroundUrls.length)] || "#"
  );
};
