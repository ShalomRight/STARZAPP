
import { type Frame } from './types';

// Cloudinary Configuration
export const CLOUDINARY_CONFIG = {
  cloudName: "dac3tqyuj",
  // This is a DEMO preset. For the Photo Wall to work persistently, ensure this preset 
  // is "Unsigned" and ideally allows tags.
  uploadPreset: "ml_default",
  // The tag used to group images for the wall
  wallTag: "ulp_wall"
};

// Frame data - these PNG files should be in public/frames/
export const FRAMES: Frame[] = [
  { id: 'default-1', name: 'Classic Border', category: 'minimal', url: 'https://ik.imagekit.io/bcmzxhknk3/PhotoApp/socials_reel__9-16__1080x1920_1.png' },
  { id: 'default-2', name: 'Elegant Frame', category: 'minimal', url: 'https://ik.imagekit.io/bcmzxhknk3/PhotoApp/socials_reel__9-16__1080x1920_2.png' },
  { id: 'default-3', name: 'Party Vibes', category: 'fun', url: '/frames/default-3.png' },
  { id: 'default-4', name: 'Event Special', category: 'events', url: '/frames/default-4.png' },
  { id: 'default-5', name: 'Celebration', category: 'events', url: '/frames/default-5.png' },
];

export const CATEGORIES = ['All Frames', 'Minimal', 'Events', 'Fun'];