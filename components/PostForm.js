'use client';

import { useState, useRef } from 'react';
import { Image, Send, X } from 'lucide-react';
import toast from 'react-hot-toast';

export function PostForm({ userId, onSubmit, onSuccess }) {
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isConfession, setIsConfession] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error('Image must be less than 10MB');
      return;
    }

    setImage(file);
    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!text.trim()) {
      toast.error('Please enter some text');
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('text', text.trim());
      formData.append('userId', userId);
      formData.append('isConfession', isConfession.toString());
      if (image) {
        formData.append('image', image);
      }

      await onSubmit(formData);
      toast.success('Post created successfully!');
      
      // Reset form
      setText('');
      setImage(null);
      setImagePreview(null);
      setIsConfession(false);
      
      if (onSuccess) onSuccess();
    } catch (error) {
      toast.error('Failed to create post');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="glass-card rounded-xl p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold gradient-text">
          {isConfession ? 'Share a Confession' : 'Share Your Thoughts'}
        </h2>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setIsConfession(false)}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              !isConfession
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            Regular Post
          </button>
          <button
            type="button"
            onClick={() => setIsConfession(true)}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              isConfession
                ? 'bg-purple-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            Confession
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={
              isConfession
                ? 'What would you like to confess? (Images supported)'
                : "What's on your mind? Share anonymously..."
            }
            className="w-full min-h-[120px] bg-gray-800 border border-gray-700 rounded-lg p-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            maxLength={2000}
          />
          <div className="text-sm text-gray-500 mt-2">
            {text.length}/2000 characters
          </div>
        </div>

        {isConfession && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium flex items-center gap-2">
                <Image className="w-4 h-4" />
                Add Image (Optional)
              </label>
              <span className="text-xs text-gray-500">
                Max 10MB • JPG, PNG, GIF, WebP
              </span>
            </div>
            
            {imagePreview ? (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full max-h-64 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 p-2 bg-black/50 hover:bg-black/70 rounded-full"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors"
              >
                <Image className="w-8 h-8 mx-auto mb-3 text-gray-500" />
                <p className="text-sm text-gray-500">Click to upload image</p>
              </div>
            )}
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Posting as: <span className="font-mono">{userId.substring(0, 8)}...</span>
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting || !text.trim()}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              'Posting...'
            ) : isConfession ? (
              'Post Confession'
            ) : (
              'Post Anonymously'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}