import React, { useState, useRef, useEffect } from 'react';
import { FaRegImage, FaSpinner } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { createPost } from '../../../api/homeApi';
import { getProfileInfo } from '../../../api/authApi';

const CreatePost = ({ onPostCreated }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [postText, setPostText] = useState('');
  const [media, setMedia] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef();
  const [profileInfo, setProfileInfo] = useState(null);
  const modalRef = useRef();

  const handleOpenModal = () => setModalOpen(true);
  
  const handleCloseModal = () => {
    if (loading) return; // Prevent closing while loading
    setModalOpen(false);
    setPostText('');
    setMedia(null);
    setError('');
  };

  // Fetch Profile Info
  useEffect(() => {
    const fetchProfileInfo = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (token) {
          const response = await getProfileInfo(token);
          const { success, data } = response.data;
          if (success) {
            setProfileInfo(data);
          }
        }
      } catch (error) {
        console.error("Failed to fetch profile info:", error);
      }
    };

    fetchProfileInfo();
  }, []);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Validate file size (e.g., 10MB max)
      const maxSize = 10 * 1024 * 1024; // 10MB in bytes
      if (file.size > maxSize) {
        setError('File size too large. Please select a file smaller than 10MB.');
        return;
      }
      
      // Validate file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'video/mp4', 'video/avi', 'video/mov'];
      if (!validTypes.includes(file.type)) {
        setError('Invalid file type. Please select an image or video file.');
        return;
      }
      
      setMedia(file);
      setError('');
    }
  };

  const handleImageClick = () => fileInputRef.current?.click();

  const handleCreatePost = async () => {
    if (!postText.trim() && !media) {
      setError('Please write something or add a photo/video');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const token = localStorage.getItem('accessToken');
      if (!token) {
        setError('Please login to create a post');
        return;
      }

      // Create FormData for file upload
      const formData = new FormData();
      
      // Add caption if provided
      if (postText.trim()) {
        formData.append('caption', postText.trim());
      }
      
      // Add media file if provided
      if (media) {
        formData.append('post_image', media);
      }

      // Show loading toast
      const toastId = toast.loading('Creating post...');

      // Call the API
      const response = await createPost(formData, token);
      
      if (response.data.success) {
        console.log('Post created successfully:', response.data);
        
        // Update toast to success
        toast.update(toastId, {
          render: 'Post created successfully!',
          type: 'success',
          isLoading: false,
          autoClose: 3000,
          closeButton: true,
        });
        
        // Reset form and close modal
        handleCloseModal();
        
        // Refresh newsfeed in parent component
        if (onPostCreated) {
          onPostCreated();
        }
        
        // Alternative: Use global event
        window.dispatchEvent(new CustomEvent('postCreated'));
        
      } else {
        toast.update(toastId, {
          render: response.data.msg || 'Failed to create post',
          type: 'error',
          isLoading: false,
          autoClose: 3000,
          closeButton: true,
        });
        setError(response.data.msg || 'Failed to create post');
      }
    } catch (err) {
      console.error('Error creating post:', err);
      const errorMsg = err.response?.data?.msg || 'Failed to create post. Please try again.';
      
      toast.error(errorMsg, {
        autoClose: 3000,
      });
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      // Ctrl+Enter to submit
      handleCreatePost();
    }
  };

  const removeMedia = () => {
    if (loading) return;
    setMedia(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [modalOpen]);

  return (
    <>
      {/* Main Card */}
      <div className="bg-[#20222B] rounded-2xl p-4 flex flex-col gap-3 w-full shadow">
        <div className="flex items-center gap-3">
          <img 
            src={profileInfo?.profile_photo || '/default-avatar.png'}
            alt="avatar" 
            className="h-10 w-10 rounded-full object-cover" 
            onError={(e) => {
              e.target.src = '/default-avatar.png';
            }}
          />
          <button
            className="flex-1 text-left bg-[#232F3E] text-gray-200 px-4 py-2 rounded-full focus:outline-none hover:bg-[#263142] transition text-base"
            onClick={handleOpenModal}
          >
            What's on your mind?
          </button>
        </div>
        <button
          className="flex items-center gap-2 text-white font-medium mt-1 px-2 py-1 rounded hover:bg-[#232F3E] w-fit"
          onClick={handleImageClick}
        >
          <FaRegImage className="text-green-400 text-xl" />
          <span>Photos/ Videos</span>
        </button>
        <input
          type="file"
          accept="image/*,video/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
        />
      </div>

      {/* Modal */}
      {modalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center"
          ref={modalRef}
        >
          {/* Overlay for blur and transparency - FIXED: No re-render on loading state */}
          <div
            className="absolute inset-0 bg-green bg-opacity-60 backdrop-blur-sm z-0 transition-opacity duration-300"
            onClick={handleCloseModal}
            tabIndex={-1}
            aria-label="Close create post modal"
          />
          
          {/* Modal content */}
          <div
            className="relative z-10 bg-[#232A36] rounded-2xl p-6 w-full max-w-md mx-2 flex flex-col gap-4 transform transition-all duration-300"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-4 text-gray-400 hover:text-white text-2xl font-bold transition-colors"
              onClick={handleCloseModal}
              aria-label="Close"
              disabled={loading}
            >
              &times;
            </button>
            
            <div className="flex items-center gap-3 mb-2">
              <img 
                src={profileInfo?.profile_photo || '/default-avatar.png'}
                alt="avatar" 
                className="h-10 w-10 rounded-full object-cover"
                onError={(e) => {
                  e.target.src = '/default-avatar.png';
                }}
              />
              <span className="text-white font-semibold text-base">
                {profileInfo?.full_name || 'User'}
              </span>
            </div>
            
            {/* Error Message */}
            {error && (
              <div className="bg-red-500/10 border border-red-500 rounded-lg p-3 text-red-400 text-sm animate-fade-in">
                {error}
              </div>
            )}
            
            <textarea
              className="w-full min-h-[120px] bg-[#20222B] text-gray-200 rounded-lg p-3 focus:outline-none resize-none transition-colors disabled:opacity-70"
              placeholder="What's on your mind?"
              value={postText}
              onChange={e => setPostText(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={loading}
            />
            
            {/* Media Preview */}
            {media && (
              <div className="mt-2 relative animate-fade-in">
                {media.type.startsWith('image') ? (
                  <>
                    <img 
                      src={URL.createObjectURL(media)} 
                      alt="preview" 
                      className="max-h-48 rounded-lg mx-auto object-contain" 
                    />
                    <button
                      onClick={removeMedia}
                      className="absolute top-2 right-2 bg-black/70 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-black/90 transition-all disabled:opacity-50"
                      disabled={loading}
                    >
                      ×
                    </button>
                  </>
                ) : (
                  <>
                    <video controls className="max-h-48 rounded-lg mx-auto">
                      <source src={URL.createObjectURL(media)} />
                      Your browser does not support the video tag.
                    </video>
                    <button
                      onClick={removeMedia}
                      className="absolute top-2 right-2 bg-black/70 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-black/90 transition-all disabled:opacity-50"
                      disabled={loading}
                    >
                      ×
                    </button>
                  </>
                )}
              </div>
            )}
            
            <div className="flex items-center gap-3 mt-2">
              <button
                className="flex items-center gap-2 px-3 py-2 bg-[#232F3E] text-green-400 rounded-lg text-sm font-medium hover:bg-[#263142] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                onClick={handleImageClick}
                disabled={loading}
              >
                <FaRegImage /> Add Photo/Video
              </button>
              
              <input
                type="file"
                accept="image/*,video/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
                disabled={loading}
              />
              
              <button
                className="ml-auto px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 min-w-[80px] justify-center"
                onClick={handleCreatePost}
                disabled={loading || (!postText.trim() && !media)}
              >
                {loading ? (
                  <>
                    <FaSpinner className="animate-spin" />
                    <span className="whitespace-nowrap">Posting...</span>
                  </>
                ) : (
                  'Post'
                )}
              </button>
            </div>
            
            {/* Helper text */}
            <div className="text-xs text-gray-400 text-center">
              Press Ctrl+Enter to post quickly
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreatePost;