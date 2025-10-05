import React from "react";
import ForumTopicCard from "./ForumTopicCard";

const ForumTopicList = ({ topics, onOpenModal }) => (
  <div className="flex flex-col gap-8">
    {topics.map((topic) => (
      <ForumTopicCard key={topic.id} topic={topic} onOpenModal={onOpenModal} />
    ))}
  </div>
);

export default ForumTopicList;