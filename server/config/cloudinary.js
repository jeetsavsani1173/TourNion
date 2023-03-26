// Define "require"
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const cloudinary = require("cloudinary").v2;

// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.CLOUD_KEY,
//   api_secret: process.env.CLOUD_KEY_SECRET,
// });

cloudinary.config({
  cloud_name: "drqdgikwf",
  api_key: "615987749892414",
  api_secret: "-Ec0V5OPnURrH_6hqupVnq9i8y8",
});

export default cloudinary;
