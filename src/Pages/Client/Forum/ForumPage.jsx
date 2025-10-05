import React, { useState } from "react";
import LeftSideBar from "../../../Components/LeftSideBar";
import NavbarMain from "../../../Ui/NavbarMain";
import ForumTopicList from "./ForumTopicList";
import ForumModal from "./ForumModal";
import ForumAddTopicModal from "./ForumAddTopicModal";

// Demo forum topics data
const forumTopics = [
	{
		id: 1,
		title: "How to prepare for CSE 3.2 Final Exam?",
		author: {
			name: "Mizanur Rahman Jisan",
			avatar: "jisan.jpg",
			time: "2 hours ago",
		},
		description:
			"Can anyone share tips, resources, or strategies for preparing for the CSE 3.2 final exam? What topics should I focus on, and are there any recommended notes or books?",
		solutions: [
			{
				id: 1,
				author: { name: "Shahid Al Mamin", avatar: "mamim.jpg" },
				time: new Date(Date.now() - 60 * 60 * 1000).toISOString(), // 1 hour ago
				text: "Focus on previous years' questions and make sure you understand the core algorithms. Also, group study helps a lot!",
				upvotes: 7,
				downvotes: 1,
			},
			{
				id: 2,
				author: { name: "Lamia Akter Jesmin", avatar: "jesmin.jpeg" },
				time: new Date(Date.now() - 45 * 60 * 1000).toISOString(), // 45 min ago
				text: "Try to solve all the assignments again and revise the lecture slides. Don't forget to take breaks!",
				upvotes: 5,
				downvotes: 0,
			},
		],
	},
	{
		id: 2,
		title: "Best resources for learning React?",
		author: {
			name: "Lamia Akter Jesmin",
			avatar: "jesmin.jpeg",
			time: "3 hours ago",
		},
		description:
			"What are the best online resources or books for learning React from scratch?",
		solutions: [
			{
				id: 1,
				author: { name: "Nashrah Zakir Nawmi", avatar: "nawmi.jpg" },
				time: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
				text: "The official React docs and freeCodeCamp are great. Also check out the Net Ninja's YouTube series.",
				upvotes: 4,
				downvotes: 0,
			},
		],
	},
	{
		id: 3,
		title: "How to manage study stress?",
		author: {
			name: "Shahid Al Mamin",
			avatar: "mamim.jpg",
			time: "5 hours ago",
		},
		description:
			"Exams are coming up and I'm feeling stressed. Any tips for managing study stress?",
		solutions: [
			{
				id: 1,
				author: { name: "Mizanur Rahman Jisan", avatar: "jisan.jpg" },
				time: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
				text: "Take regular breaks, get enough sleep, and talk to friends. Meditation helps too!",
				upvotes: 6,
				downvotes: 0,
			},
		],
	},
];

const ForumPage = () => {
	const [topics, setTopics] = useState(forumTopics);
	const [modalTopic, setModalTopic] = useState(null);
	const [comment, setComment] = useState("");
	const [showAddModal, setShowAddModal] = useState(false);
	const [newTitle, setNewTitle] = useState("");
	const [newDesc, setNewDesc] = useState("");

	// Upvote/Downvote
	const handleVote = (topicId, solId, type) => {
		setTopics((prev) =>
			prev.map((topic) =>
				topic.id === topicId
					? {
							...topic,
							solutions: topic.solutions.map((sol) =>
								sol.id === solId
									? {
											...sol,
											upvotes:
												type === "up"
													? sol.upvotes + 1
													: sol.upvotes,
											downvotes:
												type === "down"
													? sol.downvotes + 1
													: sol.downvotes,
										}
									: sol
							),
					  }
					: topic
			)
		);
		// Update modalTopic if open
		if (modalTopic && modalTopic.id === topicId) {
			setModalTopic((prev) => ({
				...prev,
				solutions: prev.solutions.map((sol) =>
					sol.id === solId
						? {
								...sol,
								upvotes:
									type === "up"
										? sol.upvotes + 1
										: sol.upvotes,
								downvotes:
									type === "down"
										? sol.downvotes + 1
										: sol.downvotes,
							}
						: sol
				),
			}));
		}
	};

	// Add solution/comment
	const handleAddSolution = (e, topicId, isModal = false) => {
		e.preventDefault();
		if (!comment.trim()) return;
		const now = new Date();
		const newSolution = {
			id: Date.now(),
			author: { name: "Mizanur Rahman Jisan", avatar: "jisan.jpg" },
			time: now.toISOString(),
			text: comment,
			upvotes: 0,
			downvotes: 0,
		};
		setTopics((prev) =>
			prev.map((topic) =>
				topic.id === topicId
					? {
							...topic,
							solutions: [newSolution, ...topic.solutions],
					  }
					: topic
			)
		);
		// Update modalTopic instantly for immediate feedback
		if (modalTopic && modalTopic.id === topicId) {
			setModalTopic((prev) => ({
				...prev,
				solutions: [newSolution, ...prev.solutions],
			}));
		}
		setComment("");
	};

	// Add new topic
	const handleAddTopic = (e) => {
		e.preventDefault();
		if (!newTitle.trim() || !newDesc.trim()) return;
		const now = new Date();
		const newTopic = {
			id: Date.now(),
			title: newTitle,
			author: {
				name: "Mizanur Rahman Jisan",
				avatar: "jisan.jpg",
				time: "Just now",
			},
			description: newDesc,
			solutions: [],
		};
		setTopics([newTopic, ...topics]);
		setShowAddModal(false);
		setNewTitle("");
		setNewDesc("");
	};

	return (
		<div className="min-h-screen bg-[#181820]">
			<NavbarMain />
			<div className="max-w-7xl mx-auto px-3 md:px-6 pt-6">
				<div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
					<aside className="hidden lg:block">
						<LeftSideBar />
					</aside>
					<main className="flex-1">
						<div className="flex items-center justify-between mb-6">
							<h1 className="text-3xl font-bold text-white">Forum Topics</h1>
							<button
								className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-700 to-purple-700 text-white font-semibold shadow hover:from-blue-600 hover:to-purple-800 transition"
								onClick={() => setShowAddModal(true)}
							>
								+ Add
							</button>
						</div>
						<ForumTopicList topics={topics} onOpenModal={setModalTopic} />
					</main>
				</div>
			</div>
			<ForumModal
				open={!!modalTopic}
				onClose={() => setModalTopic(null)}
				topic={modalTopic}
				handleVote={handleVote}
				handleAddSolution={handleAddSolution}
				comment={comment}
				setComment={setComment}
			/>
			<ForumAddTopicModal
				open={showAddModal}
				onClose={() => setShowAddModal(false)}
				newTitle={newTitle}
				setNewTitle={setNewTitle}
				newDesc={newDesc}
				setNewDesc={setNewDesc}
				handleAddTopic={handleAddTopic}
			/>
		</div>
	);
};

export default ForumPage;