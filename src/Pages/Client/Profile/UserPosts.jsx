import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  FaHeart,
  FaRegComment,
  FaShare,
  FaThumbsUp,
  FaSadTear,
  FaAngry,
  FaLaughSquint,
} from 'react-icons/fa';
import { getPostDetails, addReaction, addComment } from '../../../api/homeApi';
import { getProfileInfo } from '../../../api/authApi';
import PostMenu from '../Home/PostMenu.jsx';

const reactions = [
  { name: 'Haha', icon: <FaLaughSquint className="text-yellow-500" />, key: 'haha' },
  { name: 'Love', icon: <FaHeart className="text-red-500" />, key: 'love' },
  { name: 'Sad', icon: <FaSadTear className="text-yellow-400" />, key: 'sad' },
  { name: 'Angry', icon: <FaAngry className="text-orange-600" />, key: 'angry' },
];

const UserPosts = ({ profilePosts, loadMorePosts, hasMorePosts, loadingMore }) => {
  const [posts, setPosts] = useState([]);
  const [userReactions, setUserReactions] = useState({});
  const [hoveredPost, setHoveredPost] = useState(null);
  const [commentModal, setCommentModal] = useState({ 
    open: false, 
    post: null, 
    comments: [], 
    loading: false,
    newComment: '' 
  });
  const [imageModal, setImageModal] = useState({ open: false, src: '' });
  const [error, setError] = useState(null);
  const [profileInfo, setProfileInfo] = useState(null);
  
  const reactionTimeout = useRef();
  const observer = useRef();
  const commentInputRef = useRef();

  const currentUserID = localStorage.getItem("user_id");

  // Set posts when profilePosts prop changes
  useEffect(() => {
    if (profilePosts) {
      setPosts(profilePosts);
    }
  }, [profilePosts]);

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

  // Format time difference
  const formatTime = (createdAt) => {
    const now = new Date();
    const postDate = new Date(createdAt);
    const diffInHours = Math.floor((now - postDate) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now - postDate) / (1000 * 60));
      return `${diffInMinutes}m ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ago`;
    }
  };

  // Fetch post details for comment modal
  const fetchPostDetails = async (postId) => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await getPostDetails(postId, token);
      if (response.data.success) {
        return response.data.data;
      }
    } catch (err) {
      console.error('Error fetching post details:', err);
      setError('Failed to load post details.');
    }
    return null;
  };

  // Infinite scroll observer
  const lastPostRef = useCallback(node => {
    if (loadingMore) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMorePosts) {
        loadMorePosts();
      }
    });
    
    if (node) observer.current.observe(node);
  }, [loadingMore, hasMorePosts, loadMorePosts]);

  const handlePostUpdated = (updatedPost) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === updatedPost.id ? { ...post, ...updatedPost } : post
      )
    );
  };

  const handlePostDeleted = (deletedPostId) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== deletedPostId));
  };

  const handleReport = (postId, data) => {
    console.log("Reported Post:", postId, data);
    // 🔧 Send report data to backend
  };

  // Add reaction to post
  const handleAddReaction = async (postId, reactionType) => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        setError('Please login to react');
        return;
      }

      const currentReaction = userReactions[postId];
      
      // If clicking the same reaction, remove it
      if (currentReaction === reactionType) {
        await handleRemoveReaction(postId);
        return;
      }

      console.log('Adding reaction:', { postId, reactionType });

      // Update UI immediately for better UX
      setPosts(prevPosts => 
        prevPosts.map(post => {
          if (post.id === postId) {
            const updatedReactions = { ...post.reaction };
            
            // Decrement previous reaction if exists
            if (currentReaction) {
              updatedReactions[currentReaction] = Math.max(0, (updatedReactions[currentReaction] || 0) - 1);
            }
            
            // Increment new reaction
            updatedReactions[reactionType] = (updatedReactions[reactionType] || 0) + 1;
            
            return {
              ...post,
              reaction: updatedReactions
            };
          }
          return post;
        })
      );

      // Update user reaction state
      setUserReactions(prev => ({
        ...prev,
        [postId]: reactionType
      }));

      // Hide reaction picker
      setHoveredPost(null);

      // Call API
      const response = await addReaction(postId, reactionType, token);
      
      if (response.data.success) {
        console.log('Reaction added successfully:', response.data);
        
        // Update comment modal if open
        if (commentModal.open && commentModal.post?.id === postId) {
          setCommentModal(prev => ({
            ...prev,
            post: {
              ...prev.post,
              reaction: response.data.data?.reaction || prev.post.reaction
            }
          }));
        }
      }
    } catch (err) {
      console.error('Error adding reaction:', err);
      setError('Failed to add reaction');
      
      // Revert UI changes if API call fails
      setPosts(prevPosts => 
        prevPosts.map(post => {
          if (post.id === postId) {
            const updatedReactions = { ...post.reaction };
            const currentReaction = userReactions[postId];
            
            // Revert changes
            if (currentReaction) {
              updatedReactions[currentReaction] = (updatedReactions[currentReaction] || 0) + 1;
            }
            updatedReactions[reactionType] = Math.max(0, (updatedReactions[reactionType] || 0) - 1);
            
            return {
              ...post,
              reaction: updatedReactions
            };
          }
          return post;
        })
      );
    }
  };

  // Remove reaction from post
  const handleRemoveReaction = async (postId) => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        setError('Please login to react');
        return;
      }

      const currentReaction = userReactions[postId];
      if (!currentReaction) return;

      console.log('Removing reaction:', { postId, currentReaction });

      // Update UI immediately for better UX
      setPosts(prevPosts => 
        prevPosts.map(post => {
          if (post.id === postId) {
            const updatedReactions = { ...post.reaction };
            
            // Decrement current reaction
            updatedReactions[currentReaction] = Math.max(0, (updatedReactions[currentReaction] || 0) - 1);
            
            return {
              ...post,
              reaction: updatedReactions
            };
          }
          return post;
        })
      );

      // Remove user reaction state
      setUserReactions(prev => {
        const newState = { ...prev };
        delete newState[postId];
        return newState;
      });

      // Hide reaction picker
      setHoveredPost(null);

      // Call API
      const response = await addReaction(postId, currentReaction, token);
      
      if (response.data.success) {
        console.log('Reaction removed successfully:', response.data);
        
        // Update comment modal if open
        if (commentModal.open && commentModal.post?.id === postId) {
          setCommentModal(prev => ({
            ...prev,
            post: {
              ...prev.post,
              reaction: response.data.data?.reaction || prev.post.reaction
            }
          }));
        }
      }
    } catch (err) {
      console.error('Error removing reaction:', err);
      setError('Failed to remove reaction');
      
      // Revert UI changes if API call fails
      setPosts(prevPosts => 
        prevPosts.map(post => {
          if (post.id === postId) {
            const updatedReactions = { ...post.reaction };
            const currentReaction = userReactions[postId];
            
            // Revert changes
            updatedReactions[currentReaction] = (updatedReactions[currentReaction] || 0) + 1;
            
            return {
              ...post,
              reaction: updatedReactions
            };
          }
          return post;
        })
      );
      
      // Restore user reaction state
      setUserReactions(prev => ({
        ...prev,
        [postId]: currentReaction
      }));
    }
  };

  // Add comment to post
  const handleAddComment = async (postId) => {
    if (!commentModal.newComment.trim()) return;

    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        setError('Please login to comment');
        return;
      }

      const response = await addComment(postId, commentModal.newComment, token);
      
      if (response.data.success) {
        const updatedPostDetails = await fetchPostDetails(postId);
        
        if (updatedPostDetails) {
          setCommentModal(prev => ({
            ...prev,
            comments: updatedPostDetails.comments || [],
            newComment: ''
          }));

          setPosts(prevPosts => 
            prevPosts.map(p => 
              p.id === postId 
                ? { ...p, total_comments: updatedPostDetails.comments?.length || 0 }
                : p
            )
          );
        }

        if (commentInputRef.current) {
          commentInputRef.current.value = '';
        }
      }
    } catch (err) {
      console.error('Error adding comment:', err);
      setError('Failed to add comment');
    }
  };

  // Handle comment input key press
  const handleCommentKeyPress = (e, postId) => {
    if (e.key === 'Enter') {
      handleAddComment(postId);
    }
  };

  // Handle comment modal open
  const handleCommentModalOpen = async (post) => {
    try {
      setCommentModal({ 
        open: true, 
        post, 
        comments: [], 
        loading: true,
        newComment: '' 
      });
      const postDetails = await fetchPostDetails(post.id);
      
      if (postDetails) {
        setCommentModal(prev => ({
          ...prev,
          post: postDetails,
          comments: postDetails.comments || [],
          loading: false
        }));
        
        setPosts(prevPosts => 
          prevPosts.map(p => 
            p.id === post.id 
              ? { ...p, total_comments: postDetails.comments?.length || 0 }
              : p
          )
        );
      }
    } catch (err) {
      setCommentModal(prev => ({ ...prev, loading: false }));
    }
  };

  const handleReactionMouseEnter = (postId) => {
    if (reactionTimeout.current) clearTimeout(reactionTimeout.current);
    setHoveredPost(postId);
  };

  const handleReactionMouseLeave = () => {
    reactionTimeout.current = setTimeout(() => setHoveredPost(null), 3000);
  };

  // Get total reactions count
  const getTotalReactions = (reactionObj) => {
    return Object.values(reactionObj || {}).reduce((sum, count) => sum + count, 0);
  };

  // Get reaction counts for display - ALL reactions including 0 counts
  const getReactionCounts = (post) => {
    return reactions.map(r => ({
      ...r,
      count: post.reaction?.[r.key] || 0
    }));
  };

  // Get current user's reaction for a post
  const getUserReaction = (postId) => {
    return userReactions[postId];
  };

  // Get display reaction (icon and name) for a post
  const getDisplayReaction = (postId) => {
    const userReaction = getUserReaction(postId);
    if (userReaction) {
      return reactions.find(r => r.key === userReaction);
    }
    return { name: 'Love', icon: <FaHeart className="text-red-500" /> };
  };

  // No posts state
  if (!posts || posts.length === 0) {
    return (
      <div className="text-center text-gray-400 py-8">
        No posts yet. Start sharing your thoughts!
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 mb-10">
      {error && (
        <div className="bg-red-500/10 border border-red-500 rounded-2xl p-4 text-red-400 text-center">
          {error}
        </div>
      )}

      {posts.map((post, index) => (
        <div
          key={post.id}
          ref={index === posts.length - 1 ? lastPostRef : null}
          className="bg-[#20222B] rounded-2xl shadow p-6 flex flex-col gap-4 relative"
        >
          {/* Post Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={post.user?.profile_photo || '/default-avatar.png'}
                alt="avatar"
                className="h-9 w-9 rounded-full object-cover"
                onError={(e) => {
                  e.target.src = '/default-avatar.png';
                }}
              />
              <div>
                <div className="text-white font-semibold leading-tight text-base">
                  {post.user?.full_name || 'Unknown User'}
                </div>
                <div className="text-xs text-gray-400">
                  {formatTime(post.created_at)}
                </div>
              </div>
            </div>

            <PostMenu
              post={post}
              currentUserId={currentUserID}
              onPostUpdated={handlePostUpdated}
              onPostDeleted={handlePostDeleted}
              onReport={handleReport}
            />
          </div>

          {/* Post Text */}
          {post.caption && (
            <div className="text-gray-100 text-lg">{post.caption}</div>
          )}

          {/* Post Image */}
          {post.post_image && (
            <div
              className="rounded-xl overflow-hidden border border-blue-400 cursor-pointer"
              onClick={() => setImageModal({ open: true, src: post.post_image })}
            >
              <img
                src={post.post_image}
                alt="post"
                className="w-full h-80 object-cover transition-transform duration-200 hover:scale-105"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
          )}

          {/* Reaction Summary Bar - Show ALL reactions including 0 counts */}
          <div className="flex gap-2 items-center">
            {getReactionCounts(post).map((reaction) => (
              <div
                key={reaction.key}
                className={`flex items-center gap-1 bg-[#20222B] px-3 py-1 rounded-full shadow border border-[#374151] ${
                  reaction.count === 0 ? 'opacity-50' : ''
                }`}
              >
                <span className="text-xl">{reaction.icon}</span>
                <span className="text-gray-200 font-semibold text-sm">
                  {reaction.count}
                </span>
              </div>
            ))}
          </div>

          {/* Post Actions */}
          <div className="flex items-center pt-2 border-t border-[#374151] mt-2 w-full">
            {/* Reaction Button */}
            <div className="flex-1 flex justify-start">
              <div className="relative group">
                <button
                  className={`flex items-center gap-2 text-lg font-medium px-2 py-1 transition-colors ${
                    getUserReaction(post.id) 
                      ? 'text-blue-400' 
                      : 'text-gray-300 hover:text-blue-400'
                  }`}
                  onMouseEnter={() => handleReactionMouseEnter(post.id)}
                  onMouseLeave={handleReactionMouseLeave}
                  onClick={() => {
                    const userReaction = getUserReaction(post.id);
                    if (userReaction) {
                      handleRemoveReaction(post.id);
                    } else {
                      handleAddReaction(post.id, 'like');
                    }
                  }}
                >
                  {getDisplayReaction(post.id).icon}
                  <span>{getDisplayReaction(post.id).name}</span>
                </button>

                {hoveredPost === post.id && (
                  <div
                    className="absolute bottom-10 left-0 flex gap-2 bg-[#232A36] px-3 py-2 rounded-xl shadow z-20 border border-[#374151] animate-fade-in"
                    onMouseEnter={() => handleReactionMouseEnter(post.id)}
                    onMouseLeave={handleReactionMouseLeave}
                  >
                    {reactions.map((r) => (
                      <button
                        key={r.name}
                        className={`flex flex-col items-center group/reaction transform transition-transform hover:scale-110 ${
                          getUserReaction(post.id) === r.key ? 'scale-110' : ''
                        }`}
                        onClick={() => handleAddReaction(post.id, r.key)}
                      >
                        <span className="text-2xl">{r.icon}</span>
                        <span className="text-xs text-gray-300 group-hover/reaction:text-white">
                          {r.name}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Comment Button */}
            <div className="flex-1 flex justify-center">
              <button
                className="flex items-center gap-2 text-gray-300 hover:text-blue-400 text-lg font-medium px-2 py-1 transition-colors"
                onClick={() => handleCommentModalOpen(post)}
              >
                <FaRegComment /> Comment ({post.total_comments || 0})
              </button>
            </div>

            {/* Share Button */}
            <div className="flex-1 flex justify-end">
              <button className="flex items-center gap-2 text-gray-300 hover:text-blue-400 text-lg font-medium px-2 py-1 transition-colors">
                <FaShare /> Share
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Loading Indicator */}
      {loadingMore && (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      )}

      {/* No More Posts */}
      {!hasMorePosts && posts.length > 0 && (
        <div className="text-center text-gray-400 py-8">
          You've reached the end of posts
        </div>
      )}

      {/* 🖼️ Image Modal */}
      {imageModal.open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          onClick={() => setImageModal({ open: false, src: '' })}
        >
          <div
            className="relative max-w-5xl w-auto max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-3 text-white text-3xl font-bold bg-black/40 rounded-full px-2"
              onClick={() => setImageModal({ open: false, src: '' })}
            >
              &times;
            </button>
            <img
              src={imageModal.src}
              alt="fullscreen"
              className="max-h-[80vh] max-w-[80vw] rounded-2xl border-4 border-blue-400 shadow-lg object-contain"
            />
          </div>
        </div>
      )}

      {/* 💬 Comment Modal */}
      {commentModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-green bg-opacity-60 backdrop-blur-sm z-0"
            onClick={() => setCommentModal({ open: false, post: null, comments: [], newComment: '' })}
            tabIndex={-1}
            aria-label="Close comment modal"
          />

          {/* Modal Content */}
          <div className="relative z-10 bg-[#232A36] rounded-2xl p-6 w-full max-w-xl mx-2 flex flex-col gap-4 max-h-[90vh] overflow-hidden">
            <button
              className="absolute top-3 right-4 text-gray-400 hover:text-white text-2xl font-bold"
              onClick={() => setCommentModal({ open: false, post: null, comments: [], newComment: '' })}
              aria-label="Close"
            >
              &times;
            </button>

            {commentModal.loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <>
                {/* Scrollable Post Details */}
                <div className="overflow-y-auto pr-2 max-h-[45vh] hide-scrollbar">
                  <div className="flex items-center gap-3 mb-2">
                    <img
                      src={commentModal.post?.user?.profile_photo || '/default-avatar.png'}
                      alt="avatar"
                      className="h-9 w-9 rounded-full object-cover"
                      onError={(e) => {
                        e.target.src = '/default-avatar.png';
                      }}
                    />
                    <div>
                      <div className="text-white font-semibold leading-tight text-base">
                        {commentModal.post?.user?.full_name || 'Unknown User'}
                      </div>
                      <div className="text-xs text-gray-400">
                        {formatTime(commentModal.post?.created_at)}
                      </div>
                    </div>
                  </div>

                  {commentModal.post?.caption && (
                    <div className="text-gray-100 text-lg mb-3">
                      {commentModal.post.caption}
                    </div>
                  )}

                  {commentModal.post?.post_image && (
                    <div className="rounded-xl overflow-hidden border border-blue-400 mb-3">
                      <img
                        src={commentModal.post.post_image}
                        alt="post"
                        className="w-full h-80 object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                  )}

                  {/* Reaction Summary - Show ALL reactions including 0 counts */}
                  <div className="flex gap-4 items-center">
                    {getReactionCounts(commentModal.post).map((reaction) => (
                      <div
                        key={reaction.key}
                        className={`flex items-center gap-1 bg-[#20222B] px-3 py-1 rounded-full shadow border border-[#374151] ${
                          reaction.count === 0 ? 'opacity-50' : ''
                        }`}
                      >
                        <span className="text-xl">{reaction.icon}</span>
                        <span className="text-gray-200 font-semibold text-sm">
                          {reaction.count}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Comments Section */}
                <div className="mt-2 flex flex-col flex-1">
                  <div className="text-white font-semibold mb-2">
                    Comments ({commentModal.comments.length})
                  </div>
                  <div className="flex flex-col gap-3 max-h-60 overflow-y-auto hide-scrollbar">
                    {commentModal.comments.length > 0 ? (
                      commentModal.comments.map((comment, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <img
                            src={comment.profile_photo || '/default-avatar.png'}
                            alt="avatar"
                            className="h-8 w-8 rounded-full object-cover"
                            onError={(e) => {
                              e.target.src = '/default-avatar.png';
                            }}
                          />
                          <div className="bg-[#20222B] rounded-lg px-3 py-2 text-gray-200 flex-1">
                            <div className="flex justify-between items-start">
                              <div className="font-semibold text-sm">
                                {comment.full_name || 'Unknown User'}
                              </div>
                              <div className="text-xs text-gray-400">
                                {formatTime(comment.created_at)}
                              </div>
                            </div>
                            <div className="mt-1">{comment.content}</div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-gray-400 text-center py-4">
                        No comments yet
                      </div>
                    )}
                  </div>

                  {/* Add Comment */}
                  <div className="flex items-center gap-2 mt-4">
                    <img
                      src={profileInfo?.profile_photo || '/default-avatar.png'}
                      alt="avatar"
                      className="h-8 w-8 rounded-full object-cover"
                    />
                    <input
                      ref={commentInputRef}
                      type="text"
                      className="flex-1 bg-[#20222B] text-gray-200 rounded-full px-4 py-2 focus:outline-none"
                      placeholder="Write a comment..."
                      value={commentModal.newComment}
                      onChange={(e) => setCommentModal(prev => ({ 
                        ...prev, 
                        newComment: e.target.value 
                      }))}
                      onKeyPress={(e) => handleCommentKeyPress(e, commentModal.post?.id)}
                    />
                    <button 
                      className="px-4 py-2 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={() => handleAddComment(commentModal.post?.id)}
                      disabled={!commentModal.newComment.trim()}
                    >
                      Post
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserPosts;