export type BucketName = 'logos' | 'gallery-images' | 'videos';

export interface UploadOptions {
  bucket: BucketName;
  file: File;
  path?: string;
  onProgress?: (progress: number) => void;
}

export interface UploadResult {
  path: string;
  url: string;
  error?: string;
}

export interface FileDeleteOptions {
  bucket: BucketName;
  path: string;
}

export const ALLOWED_LOGO_FORMATS = ['image/png', 'image/svg+xml', 'image/jpeg', 'image/jpg'];
export const ALLOWED_IMAGE_FORMATS = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
export const ALLOWED_VIDEO_FORMATS = ['video/mp4', 'video/webm'];

export const MAX_FILE_SIZES = {
  logos: 5 * 1024 * 1024, // 5MB
  'gallery-images': 10 * 1024 * 1024, // 10MB
  videos: 50 * 1024 * 1024, // 50MB
};

