import { supabase } from './supabase';
import { BucketName, UploadOptions, UploadResult, FileDeleteOptions, ALLOWED_LOGO_FORMATS, ALLOWED_IMAGE_FORMATS, ALLOWED_VIDEO_FORMATS, MAX_FILE_SIZES } from '@/types/storage';

/**
 * Lädt eine Datei in Supabase Storage hoch (über API Route mit Service Role Key)
 */
export async function uploadFile(options: UploadOptions): Promise<UploadResult> {
  const { bucket, file, path, onProgress } = options;

  try {
    // Validierung der Dateigröße
    const maxSize = MAX_FILE_SIZES[bucket];
    if (file.size > maxSize) {
      return {
        path: '',
        url: '',
        error: `Datei ist zu groß. Maximum: ${maxSize / 1024 / 1024}MB`,
      };
    }

    // Validierung des Dateityps
    let allowedFormats: string[];
    switch (bucket) {
      case 'logos':
        allowedFormats = ALLOWED_LOGO_FORMATS;
        break;
      case 'gallery-images':
        allowedFormats = ALLOWED_IMAGE_FORMATS;
        break;
      case 'videos':
        allowedFormats = ALLOWED_VIDEO_FORMATS;
        break;
      default:
        return {
          path: '',
          url: '',
          error: 'Ungültiger Bucket-Name',
        };
    }

    if (!allowedFormats.includes(file.type)) {
      return {
        path: '',
        url: '',
        error: `Ungültiger Dateityp. Erlaubt: ${allowedFormats.join(', ')}`,
      };
    }

    // Upload über API Route (verwendet Service Role Key)
    const formData = new FormData();
    formData.append('file', file);
    formData.append('bucket', bucket);
    if (path) {
      formData.append('path', path);
    }

    // Simuliere Progress
    if (onProgress) {
      onProgress(50);
    }

    const response = await fetch('/api/storage/upload', {
      method: 'POST',
      body: formData,
    });

    if (onProgress) {
      onProgress(100);
    }

    const result = await response.json();

    if (!response.ok) {
      return {
        path: '',
        url: '',
        error: result.error || 'Upload fehlgeschlagen',
      };
    }

    return {
      path: result.path,
      url: result.url,
    };
  } catch (error) {
    return {
      path: '',
      url: '',
      error: error instanceof Error ? error.message : 'Unbekannter Fehler beim Upload',
    };
  }
}

/**
 * Löscht eine Datei aus Supabase Storage
 */
export async function deleteFile(options: FileDeleteOptions): Promise<{ success: boolean; error?: string }> {
  const { bucket, path } = options;

  try {
    const { error } = await supabase.storage.from(bucket).remove([path]);

    if (error) {
      return {
        success: false,
        error: error.message,
      };
    }

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unbekannter Fehler beim Löschen',
    };
  }
}

/**
 * Komprimiert ein Bild vor dem Upload (Client-seitig)
 */
export async function compressImage(file: File, maxWidth: number = 1920, quality: number = 0.8): Promise<File> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Canvas-Kontext konnte nicht erstellt werden'));
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Bild-Komprimierung fehlgeschlagen'));
              return;
            }
            const compressedFile = new File([blob], file.name, {
              type: 'image/webp',
              lastModified: Date.now(),
            });
            resolve(compressedFile);
          },
          'image/webp',
          quality
        );
      };
      img.onerror = () => reject(new Error('Bild konnte nicht geladen werden'));
    };
    reader.onerror = () => reject(new Error('Datei konnte nicht gelesen werden'));
  });
}

/**
 * Validiert eine Datei vor dem Upload
 */
export function validateFile(file: File, bucket: BucketName): { valid: boolean; error?: string } {
  // Größenprüfung
  const maxSize = MAX_FILE_SIZES[bucket];
  if (file.size > maxSize) {
    return {
      valid: false,
      error: `Datei ist zu groß. Maximum: ${maxSize / 1024 / 1024}MB`,
    };
  }

  // Typ-Prüfung
  let allowedFormats: string[];
  switch (bucket) {
    case 'logos':
      allowedFormats = ALLOWED_LOGO_FORMATS;
      break;
    case 'gallery-images':
      allowedFormats = ALLOWED_IMAGE_FORMATS;
      break;
    case 'videos':
      allowedFormats = ALLOWED_VIDEO_FORMATS;
      break;
    default:
      return {
        valid: false,
        error: 'Ungültiger Bucket-Name',
      };
  }

  if (!allowedFormats.includes(file.type)) {
    return {
      valid: false,
      error: `Ungültiger Dateityp. Erlaubt: ${allowedFormats.join(', ')}`,
    };
  }

  return { valid: true };
}

