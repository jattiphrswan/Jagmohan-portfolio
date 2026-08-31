import { useState, useRef } from 'react';
import { API_BASE } from '../config/api';
import { FiUploadCloud, FiImage, FiTrash2, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';

export default function MediaUpload({
  label = 'Upload Image',
  value = '',
  onChange,
  onPublicIdChange,
  placeholder = 'Select an image (PNG, JPG, WebP, SVG up to 5MB)',
  className = ''
}) {
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError('');
    setUploadSuccess(false);

    // Validate size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size exceeds the 5MB limit.');
      return;
    }

    // Validate type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'];
    if (!validTypes.includes(file.type)) {
      setError('Invalid file type. Supported formats: PNG, JPG, WebP, SVG.');
      return;
    }

    try {
      setUploading(true);
      const reader = new FileReader();

      reader.onload = async () => {
        try {
          const base64Data = reader.result;
          const res = await fetch(`${API_BASE}/api/admin/media/upload`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
              data: base64Data,
              filename: file.name,
              mimeType: file.type
            })
          });

          const json = await res.json();
          if (!res.ok || !json.success) {
            throw new Error(json.message || 'Failed to upload media file.');
          }

          if (onChange) onChange(json.data.url);
          if (onPublicIdChange) onPublicIdChange(json.data.publicId || '');
          setUploadSuccess(true);
          setTimeout(() => setUploadSuccess(false), 3000);
        } catch (uploadErr) {
          setError(uploadErr.message || 'Failed to upload image');
        } finally {
          setUploading(false);
        }
      };

      reader.onerror = () => {
        setError('Error reading local file.');
        setUploading(false);
      };

      reader.readAsDataURL(file);
    } catch (err) {
      setError(err.message || 'Image upload failed.');
      setUploading(false);
    }
  };

  const handleRemove = () => {
    if (onChange) onChange('');
    if (onPublicIdChange) onPublicIdChange('');
    if (fileInputRef.current) fileInputRef.current.value = '';
    setError('');
  };

  return (
    <div className={`space-y-2 text-xs ${className}`}>
      <label className="block font-semibold text-slate-700">{label}</label>

      {/* Hidden native input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png, image/jpeg, image/webp, image/svg+xml"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Error or Success alerts */}
      {error && (
        <div className="flex items-center gap-1.5 text-xs text-red-600">
          <FiAlertCircle className="shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {uploadSuccess && (
        <div className="flex items-center gap-1.5 text-xs text-emerald-600">
          <FiCheckCircle className="shrink-0" />
          <span>Image ready!</span>
        </div>
      )}

      {/* Image Preview Container */}
      {value ? (
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/80 p-3">
          <div className="relative h-20 w-32 shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-white">
            <img
              src={value}
              alt="Preview"
              className="h-full w-full object-contain"
              loading="lazy"
            />
          </div>

          <div className="min-w-0 flex-1 space-y-1.5">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="rounded-full bg-white border border-slate-300 px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
              >
                {uploading ? 'Uploading...' : 'Replace Image'}
              </button>
              <button
                type="button"
                onClick={handleRemove}
                disabled={uploading}
                className="rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-semibold text-red-600 hover:bg-red-100 transition cursor-pointer"
              >
                Remove
              </button>
            </div>
            <div className="truncate text-[11px] text-slate-500 font-mono">
              {value.startsWith('data:') ? 'Base64 data asset' : value}
            </div>
          </div>
        </div>
      ) : (
        <div
          onClick={() => !uploading && fileInputRef.current?.click()}
          className={`flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/60 p-6 text-center transition cursor-pointer hover:border-[#0a66c2] hover:bg-blue-50/30 ${uploading ? 'opacity-60 cursor-wait' : ''}`}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-[#0a66c2] text-lg">
            {uploading ? (
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#0a66c2] border-t-transparent" />
            ) : (
              <FiUploadCloud />
            )}
          </div>
          <div>
            <p className="font-semibold text-slate-800">
              {uploading ? 'Uploading media asset...' : 'Click to upload image'}
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">{placeholder}</p>
          </div>
        </div>
      )}
    </div>
  );
}
