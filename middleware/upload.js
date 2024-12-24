import multer from "multer";

const allowedFormats = {
  thumbnail: ["image/png", "image/jpeg"],
  video: ["video/mp4", "video/mpeg", "video/avi"],
};

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (allowedFormats[file.fieldname]?.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        `Invalid file format for ${file.fieldname}. Allowed formats: ${allowedFormats[file.fieldname].join(
          ", "
        )}`
      )
    );
  }
};

const upload = multer({ storage, fileFilter });

export default upload;
