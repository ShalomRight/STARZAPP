
import { CLOUDINARY_CONFIG } from '../constants';

/**
 * Uploads an image to Cloudinary using a direct, unsigned upload method.
 * Adds a specific tag to the image so it can be retrieved for the Photo Wall.
 */
export const uploadToCloudinary = async (photoDataUrl: string): Promise<string> => {
  const formData = new FormData();
  formData.append('file', photoDataUrl);
  formData.append('upload_preset', CLOUDINARY_CONFIG.uploadPreset);
  // Add tag for the photo wall
  formData.append('tags', CLOUDINARY_CONFIG.wallTag);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/image/upload`,
    {
      method: 'POST',
      body: formData,
    }
  );

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error?.message || 'Cloudinary upload failed');
  }

  const data = await response.json();
  return data.secure_url;
};

export interface CloudinaryResource {
  public_id: string;
  version: number;
  format: string;
  created_at: string;
}

/**
 * Fetches the list of images tagged for the wall.
 * NOTE: This requires "Resource list" to be enabled in Cloudinary Security Settings.
 * If not enabled, it may return 403 or 404, in which case we return an empty list.
 */
export const getWallImages = async (): Promise<string[]> => {
  try {
    const response = await fetch(
      `https://res.cloudinary.com/${CLOUDINARY_CONFIG.cloudName}/image/list/${CLOUDINARY_CONFIG.wallTag}.json`
    );

    if (!response.ok) {
      console.warn("Could not fetch Photo Wall list. Check Cloudinary 'Resource list' security setting.");
      return [];
    }

    const data = await response.json();
    
    // Construct URLs from the response
    if (data.resources) {
      return data.resources.map((res: CloudinaryResource) => 
        `https://res.cloudinary.com/${CLOUDINARY_CONFIG.cloudName}/image/upload/v${res.version}/${res.public_id}.${res.format}`
      );
    }
    return [];
  } catch (error) {
    console.error("Error getting wall images:", error);
    return [];
  }
};
