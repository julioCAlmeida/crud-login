import path from "path";
import multer from "multer";
import crypto from "crypto";

const TMP_FOLDER = path.resolve(__dirname, "..", "..", "tmp");
const UPLOADS_FOLDER = path.resolve(TMP_FOLDER, "uploads");

const MULTER = {
  Storage: multer.diskStorage({
    destination: TMP_FOLDER,
    filename(req, file, callback) {
        const fileHash = crypto.randomBytes(10).toString("hex");
        const fileName = `${fileHash}-${file.originalname}`;

        return callback(null, fileName)
    },
  })
}

export  { TMP_FOLDER, UPLOADS_FOLDER, MULTER }