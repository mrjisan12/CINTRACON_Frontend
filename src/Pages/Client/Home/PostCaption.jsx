import { useState } from "react";

const PostCaption = ({ caption }) => {
  const [showFull, setShowFull] = useState(false);

  const toggleShow = () => setShowFull(!showFull);

  if (!caption) return null;

  const shortText = caption.length > 100 ? caption.slice(0, 400) + "..." : caption;

  return (
    <div className="text-gray-100 text-lg">
      {showFull ? caption : shortText}
      {caption.length > 100 && (
        <button
          onClick={toggleShow}
          className="text-blue-400 ml-2 hover:underline"
        >
          {showFull ? "Show less" : "Show more"}
        </button>
      )}
    </div>
  );
};

export default PostCaption;
