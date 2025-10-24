import { useState } from "react";
import { updatePost, deletePost } from "../../../api/homeApi";
import { toast } from "react-toastify";

const PostMenu = ({ post, currentUserId, onPostUpdated, onPostDeleted, onReport }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [reportType, setReportType] = useState("");
  const [reportReason, setReportReason] = useState("");
  const [editedCaption, setEditedCaption] = useState(post.caption || "");

  const token = localStorage.getItem("accessToken");
  const isOwnPost = post.user.id === Number(currentUserId);

  const handleReportSubmit = () => {
    onReport({ type: reportType, reason: reportReason });
    setShowReportModal(false);
    setReportType("");
    setReportReason("");
  };

  const handleEditSubmit = async () => {
    try {
      const response = await updatePost(post.id, { caption: editedCaption }, token);
      if (response.data.success) {
        toast.success(response.data.msg);
        onPostUpdated(response.data.data);
      } else {
        toast.error(response.data.msg || "Failed to update post");
      }
    } catch (error) {
      toast.error("Error updating post");
    }
    setShowEditModal(false);
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await deletePost(post.id, token);
      if (response.data.success) {
        toast.success(response.data.msg);
        onPostDeleted(post.id);
      } else {
        toast.error(response.data.msg || "Failed to delete post");
      }
    } catch (error) {
      toast.error("Error deleting post");
    }
    setShowDeleteModal(false);
  };

  return (
    <div className="relative inline-block text-left">
      {/* 3-dot button */}
      <button
        className="text-gray-400 hover:text-gray-200 text-xl font-bold"
        onClick={() => setShowMenu(!showMenu)}
      >
        &#8942;
      </button>

      {/* Dropdown */}
      {showMenu && (
        <div className="absolute right-0 mt-2 w-44 bg-gray-800 border border-gray-700 rounded-xl shadow-lg z-20">
          {isOwnPost ? (
            <>
              <button
                onClick={() => {
                  setShowEditModal(true);
                  setShowMenu(false);
                }}
                className="block w-full text-left px-4 py-2 text-gray-200 hover:bg-gray-700"
              >
                Edit Post
              </button>
              <button
                onClick={() => {
                  setShowDeleteModal(true);
                  setShowMenu(false);
                }}
                className="block w-full text-left px-4 py-2 text-red-400 hover:bg-gray-700"
              >
                Delete Post
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                setShowReportModal(true);
                setShowMenu(false);
              }}
              className="block w-full text-left px-4 py-2 text-gray-200 hover:bg-gray-700"
            >
              Report Post
            </button>
          )}
        </div>
      )}

      {/* ===== Report Post Modal ===== */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-30">
          <div className="bg-gray-900 rounded-2xl p-6 w-96 text-gray-200">
            <h2 className="text-xl font-semibold mb-4">Report Post</h2>

            <label className="block mb-2">Type</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 mb-3"
            >
              <option value="">Select type</option>
              <option value="Spam">Spam</option>
              <option value="Harassment">Harassment</option>
              <option value="Misinformation">Misinformation</option>
              <option value="Inappropriate Content">Inappropriate Content</option>
            </select>

            <label className="block mb-2">Reason</label>
            <textarea
              value={reportReason}
              onChange={(e) => setReportReason(e.target.value)}
              placeholder="Explain your reason..."
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 h-24"
            />

            <div className="flex justify-end mt-4 gap-3">
              <button
                onClick={() => setShowReportModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleReportSubmit}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== Edit Post Modal ===== */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-30">
          <div className="bg-gray-900 rounded-2xl p-6 w-96 text-gray-200">
            <h2 className="text-xl font-semibold mb-4">Edit Post</h2>

            <textarea
              value={editedCaption}
              onChange={(e) => setEditedCaption(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 h-28"
            />

            <div className="flex justify-end mt-4 gap-3">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleEditSubmit}
                className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-500"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== Delete Confirmation Modal ===== */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-30">
          <div className="bg-gray-900 rounded-2xl p-6 w-80 text-gray-200 text-center">
            <h2 className="text-lg font-semibold mb-4">
              Are you sure you want to delete this post?
            </h2>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostMenu;
