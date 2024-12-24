import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

try {
  dotenv.config();

  if (!process.env.CLOUDINARY_URL) {
    throw new Error('CLOUDINARY_URL environment variable is required');
  }

  cloudinary.config({
    cloud_url: process.env.CLOUDINARY_URL,
  });

} catch (error) {
  console.error('Failed to initialize Cloudinary:', error.message);
}

export default cloudinary;
