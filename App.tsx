
import React, { useState } from 'react';
import FrameSelection from './components/FrameSelection';
import LandingPage from './components/LandingPage';
import CameraPage from './components/CameraPage';
import CapturePage from './components/CapturePage';
import CoverPage from './components/CoverPage';
import PhotoWall from './components/PhotoWall';
import ImageEditor from './components/ImageEditor';
import { type Frame } from './types';

export default function App() {
  const [page, setPage] = useState<'cover' | 'upload' | 'image-editor' | 'frames' | 'editor' | 'capture' | 'photowall'>('cover');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFrame, setSelectedFrame] = useState<Frame | null>(null);
  const [lastUploadedUrl, setLastUploadedUrl] = useState<string | null>(null);

  const handleStart = () => {
    setPage('upload');
  };

  const handleImageSelected = (image: string) => {
    setSelectedImage(image);
    // Go to Image Editor first
    setPage('image-editor');
  };
  
  const handleGoToCapture = () => {
    setPage('capture');
  };

  const handleEditorSaved = (editedImage: string) => {
    setSelectedImage(editedImage);
    setPage('frames');
  };

  const handleEditorBack = () => {
    setPage('upload');
    setSelectedImage(null);
  };

  const handleFrameSelected = (frame: Frame | null) => {
    setSelectedFrame(frame);
    setPage('editor');
  };

  const handleBackToUpload = () => {
    setSelectedImage(null);
    setSelectedFrame(null);
    setPage('upload');
  }

  const handleBackToFrames = () => {
    setSelectedFrame(null);
    setPage('frames');
  }
  
  const handleGoToWall = (url: string) => {
    setLastUploadedUrl(url);
    setPage('photowall');
  }

  return (
    <div className="min-h-screen w-full bg-neutral-950 flex items-center justify-center overflow-hidden">
      {/* Mobile Container Constraint */}
      <div className="w-full h-[100dvh] sm:max-w-[430px] sm:h-[90vh] sm:max-h-[932px] bg-white sm:rounded-[2rem] shadow-2xl overflow-hidden relative flex flex-col">
        {page === 'cover' && <CoverPage onStart={handleStart} />}
        {page === 'upload' && <LandingPage onImageSelect={handleImageSelected} onTakePicture={handleGoToCapture} />}
        {page === 'capture' && <CapturePage onPhotoTaken={handleImageSelected} onBack={handleBackToUpload} />}
        {page === 'image-editor' && selectedImage && (
            <ImageEditor 
                imageSrc={selectedImage}
                onSave={handleEditorSaved}
                onBack={handleEditorBack}
            />
        )}
        {page === 'frames' && selectedImage && (
          <FrameSelection 
            onSelectFrame={handleFrameSelected}
            onBack={handleBackToUpload}
          />
        )}
        {page === 'editor' && selectedImage && (
          <CameraPage
            imageSrc={selectedImage}
            frame={selectedFrame}
            onBack={handleBackToFrames}
            onStartOver={handleBackToUpload}
            onGoToWall={handleGoToWall}
          />
        )}
        {page === 'photowall' && (
          <PhotoWall 
            currentUpload={lastUploadedUrl}
            onBack={handleBackToUpload}
          />
        )}
      </div>
    </div>
  );
}
