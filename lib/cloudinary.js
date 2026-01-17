import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function uploadImage(file) {
  try {
    // Convert file to base64
    const buffer = Buffer.from(await file.arrayBuffer());
    const base64String = `data:${file.type};base64,${buffer.toString('base64')}`;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(base64String, {
      folder: 'anonympost',
      resource_type: 'auto',
      transformation: [
        { width: 1200, height: 1200, crop: 'limit' },
        { quality: 'auto:good' },
      ],
    });

    return result.secure_url;
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new Error('Failed to upload image');
  }
}

export function getOptimizedImageUrl(url, width = 800) {
  if (!url || !url.includes('cloudinary.com')) return url;
  
  // Replace with optimized version
  const baseUrl = url.split('/upload/')[0];
  const publicId = url.match(/\/upload\/(?:v\d+\/)?(.+?)\.\w+$/)?.[1];
  
  if (!publicId) return url;
  
  return `${baseUrl}/upload/c_scale,w_${width},q_auto:good/${publicId}`;
}