
const STORAGE_KEY = 'ulp_photo_history';

export const getPhotoHistory = (): string[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    console.warn('Failed to load photo history', e);
    return [];
  }
};

export const savePhotoToHistory = (url: string) => {
  try {
    const history = getPhotoHistory();
    
    // Avoid duplicates
    if (history.includes(url)) return;
    
    // Add to front
    // Limit to 6 items to prevent LocalStorage quota issues (Data URLs are large)
    const newHistory = [url, ...history].slice(0, 6); 
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
  } catch (e) {
    // If quota exceeded, try removing the oldest item and try again
    try {
        const history = getPhotoHistory();
        if (history.length > 1) {
            const trimmedHistory = [url, ...history.slice(0, history.length - 1)];
             localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmedHistory));
        }
    } catch (retryError) {
        console.warn('Storage quota exceeded, could not save photo to history.', retryError);
    }
  }
};
