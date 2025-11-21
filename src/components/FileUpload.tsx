'use client';

import { useState, useRef, DragEvent } from 'react';
import { BucketName } from '@/types/storage';
import { uploadFile, compressImage, validateFile } from '@/lib/storage';
import { FiUpload, FiX, FiCheck, FiAlertCircle } from 'react-icons/fi';
import { formatFileSize } from '@/lib/utils';

interface FileUploadProps {
  bucket: BucketName;
  label: string;
  accept: string;
  maxSize: number;
  onUploadComplete: (url: string, path: string) => void;
  onUploadError?: (error: string) => void;
  existingFile?: string;
  compress?: boolean;
  multiple?: boolean;
}

export default function FileUpload({
  bucket,
  label,
  accept,
  maxSize,
  onUploadComplete,
  onUploadError,
  existingFile,
  compress = false,
  multiple = false,
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [uploadedFiles, setUploadedFiles] = useState<Array<{ url: string; path: string; name: string }>>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    await processFiles(files);
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      await processFiles(files);
    }
  };

  const processFiles = async (files: File[]) => {
    setUploadStatus('uploading');
    setErrorMessage('');
    setUploadProgress(0);

    const processedFiles: Array<{ url: string; path: string; name: string }> = [];

    for (const file of files) {
      // Validierung
      const validation = validateFile(file, bucket);
      if (!validation.valid) {
        setUploadStatus('error');
        setErrorMessage(validation.error || 'Ungültige Datei');
        if (onUploadError) {
          onUploadError(validation.error || 'Ungültige Datei');
        }
        continue;
      }

      try {
        // Komprimierung bei Bildern
        let fileToUpload = file;
        if (compress && file.type.startsWith('image/')) {
          fileToUpload = await compressImage(file);
        }

        // Upload
        const result = await uploadFile({
          bucket,
          file: fileToUpload,
          onProgress: (progress) => {
            setUploadProgress(progress);
          },
        });

        if (result.error) {
          setUploadStatus('error');
          setErrorMessage(result.error);
          if (onUploadError) {
            onUploadError(result.error);
          }
          continue;
        }

        processedFiles.push({
          url: result.url,
          path: result.path,
          name: file.name,
        });

        onUploadComplete(result.url, result.path);
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : 'Upload fehlgeschlagen';
        setUploadStatus('error');
        setErrorMessage(errorMsg);
        if (onUploadError) {
          onUploadError(errorMsg);
        }
      }
    }

    if (processedFiles.length > 0) {
      setUploadedFiles((prev) => [...prev, ...processedFiles]);
      setUploadStatus('success');
      setUploadProgress(100);
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-white mb-2">{label}</label>

      {/* Upload Area */}
      <div
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={openFileDialog}
        className={`
          relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all
          ${
            isDragging
              ? 'border-brand bg-brand/10'
              : 'border-gray-600 hover:border-gray-500'
          }
          ${uploadStatus === 'uploading' ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileSelect}
          className="hidden"
          disabled={uploadStatus === 'uploading'}
        />

        <div className="flex flex-col items-center">
          <FiUpload className="w-12 h-12 text-gray-400 mb-4" />
          <p className="text-white mb-2">
            {isDragging ? 'Datei hier ablegen' : 'Klicken oder Datei hierher ziehen'}
          </p>
          <p className="text-sm text-gray-400">
            Max. {formatFileSize(maxSize)} • {accept}
          </p>
        </div>

        {/* Progress Bar */}
        {uploadStatus === 'uploading' && (
          <div className="mt-4">
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-brand h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-400 mt-2">{uploadProgress}%</p>
          </div>
        )}

        {/* Status Icons */}
        {uploadStatus === 'success' && (
          <div className="absolute top-4 right-4">
            <FiCheck className="w-6 h-6 text-green-400" />
          </div>
        )}
        {uploadStatus === 'error' && (
          <div className="absolute top-4 right-4">
            <FiAlertCircle className="w-6 h-6 text-red-400" />
          </div>
        )}
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div className="flex items-center gap-2 text-red-400 text-sm">
          <FiAlertCircle className="w-4 h-4" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Uploaded Files List */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm text-gray-400">Hochgeladene Dateien:</p>
          {uploadedFiles.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between glass p-3 rounded-lg"
            >
              <span className="text-white text-sm truncate flex-1">{file.name}</span>
              <button
                onClick={() => removeFile(index)}
                className="ml-4 p-1 hover:bg-red-500/20 rounded transition-colors"
                aria-label="Datei entfernen"
              >
                <FiX className="w-4 h-4 text-red-400" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Existing File Display */}
      {existingFile && uploadedFiles.length === 0 && (
        <div className="glass p-3 rounded-lg">
          <p className="text-sm text-gray-400 mb-1">Aktuelle Datei:</p>
          <a
            href={existingFile}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand hover:underline text-sm"
          >
            {existingFile}
          </a>
        </div>
      )}
    </div>
  );
}

