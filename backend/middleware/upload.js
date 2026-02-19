import multer from "multer";

/*
  Store file in memory
  (Needed because we directly send file as email attachment)
*/
const storage = multer.memoryStorage();

/*
  Allow only Resume file types
*/
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF or Word files are allowed"), false);
  }
};

/*
  Multer configuration
*/
export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max file size
  },
});
