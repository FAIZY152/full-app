import multer from "multer";

const storage = multer.memoryStorage();

const upload: multer.Multer = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 3,
  },
});

export default upload;
