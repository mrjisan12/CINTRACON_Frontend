import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaBriefcase, FaMapMarkerAlt, FaMoneyBillWave, FaCalendarAlt, FaExternalLinkAlt, FaShare, FaCopy, FaWhatsapp, FaFacebook, FaCheck } from 'react-icons/fa';
import { getPublicJob, getShareUrl } from '../../api/publicApi';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';

const PublicJobPage = () => {
    const { jobId } = useParams();
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);
    const [shareOpen, setShareOpen] = useState(false);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const res = await getPublicJob(jobId);
                if (res.data.success) setJob(res.data.data);
                else setNotFound(true);
            } catch (err) {
                if (err.response?.status === 404) setNotFound(true);
            } finally {
                setLoading(false);
            }
        };
        fetchJob();
    }, [jobId]);

    const shareUrl = getShareUrl('job', jobId);

    const handleCopy = () => {
        navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        toast.success('Link copied!');
    };

    const isExpired = job?.deadline && new Date(job.deadline) < new Date();

    if (loading) return (
        <div className="min-h-screen bg-[#181820] flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
        </div>
    );

    if (notFound) return (
        <div className="min-h-screen bg-[#181820] flex flex-col items-center justify-center gap-4">
            <div className="text-6xl">💼</div>
            <h2 className="text-white text-2xl font-bold">Job not found</h2>
            <p className="text-gray-400">This job may have been removed or doesn't exist.</p>
            <button onClick={() => navigate('/jobs')} className="mt-2 px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">
                Browse Jobs
            </button>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#181820]">
            {/* Mini Navbar */}
            <nav className="sticky top-0 z-30 bg-[#181820] border-b border-[#232A36] h-14 flex items-center px-4 sm:px-8 gap-4">
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/home')}>
                    <img src="/logo.png" alt="logo" className="h-8 w-8 object-contain" />
                    <span className="font-bold text-lg text-white">CINTRACON</span>
                </div>
                <div className="ml-auto flex items-center gap-3">
                    {isAuthenticated ? (
                        <button onClick={() => navigate('/jobs')} className="px-4 py-1.5 bg-[#232A36] text-gray-200 rounded-lg text-sm hover:bg-[#2d3748] transition">Jobs</button>
                    ) : (
                        <>
                            <button onClick={() => navigate('/login')} className="px-4 py-1.5 bg-[#232A36] text-gray-200 rounded-lg text-sm hover:bg-[#2d3748] transition">Login</button>
                            <button onClick={() => navigate('/signup')} className="px-4 py-1.5 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition">Sign Up</button>
                        </>
                    )}
                </div>
            </nav>

            <div className="max-w-2xl mx-auto px-4 py-8">
                <div className="bg-[#20222B] rounded-2xl border border-[#2d3748] overflow-hidden">
                    {/* Job Image */}
                    {job.job_post_image && (
                        <img src={job.job_post_image} alt="job" className="w-full h-48 object-cover" onError={e => { e.target.style.display = 'none'; }} />
                    )}

                    <div className="p-6 flex flex-col gap-5">
                        {/* Header */}
                        <div className="flex items-start gap-4">
                            <div className="h-14 w-14 rounded-2xl bg-blue-500/15 flex items-center justify-center flex-shrink-0">
                                <FaBriefcase className="text-blue-400 text-2xl" />
                            </div>
                            <div className="flex-1">
                                <h1 className="text-white font-bold text-xl leading-tight">{job.title}</h1>
                                <div className="text-blue-400 font-medium mt-0.5">{job.company_name}</div>
                                {isExpired && (
                                    <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-red-500/15 text-red-400 text-xs font-medium">Deadline Passed</span>
                                )}
                            </div>
                        </div>

                        {/* Details Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {job.place && (
                                <div className="flex items-center gap-2 text-gray-300 text-sm">
                                    <FaMapMarkerAlt className="text-gray-500 flex-shrink-0" />
                                    {job.place}
                                </div>
                            )}
                            {job.salary && (
                                <div className="flex items-center gap-2 text-gray-300 text-sm">
                                    <FaMoneyBillWave className="text-green-500 flex-shrink-0" />
                                    {job.salary}
                                </div>
                            )}
                            {job.deadline && (
                                <div className="flex items-center gap-2 text-sm">
                                    <FaCalendarAlt className={`flex-shrink-0 ${isExpired ? 'text-red-400' : 'text-yellow-400'}`} />
                                    <span className={isExpired ? 'text-red-400' : 'text-gray-300'}>
                                        Deadline: {new Date(job.deadline).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Description */}
                        {job.description && (
                            <div className="py-4 border-y border-[#2d3748]">
                                <h3 className="text-white font-semibold mb-2">Job Description</h3>
                                <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">{job.description}</p>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex items-center gap-3 flex-wrap">
                            {job.apply_link && !isExpired && (
                                <a
                                    href={job.apply_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition text-sm font-medium"
                                >
                                    <FaExternalLinkAlt /> Apply Now
                                </a>
                            )}

                            <div className="relative">
                                <button
                                    onClick={() => setShareOpen(o => !o)}
                                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#232A36] text-gray-300 hover:bg-[#2d3748] transition text-sm font-medium"
                                >
                                    <FaShare /> Share
                                </button>
                                {shareOpen && (
                                    <div className="absolute left-0 top-11 bg-[#232A36] border border-[#2d3748] rounded-xl shadow-lg p-3 z-20 flex flex-col gap-2 min-w-[200px]">
                                        <button onClick={handleCopy} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#2d3748] text-gray-200 text-sm transition">
                                            {copied ? <FaCheck className="text-green-400" /> : <FaCopy className="text-gray-400" />}
                                            {copied ? 'Copied!' : 'Copy link'}
                                        </button>
                                        <a href={`https://wa.me/?text=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer"
                                            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#2d3748] text-green-400 text-sm transition">
                                            <FaWhatsapp /> WhatsApp
                                        </a>
                                        <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer"
                                            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#2d3748] text-blue-400 text-sm transition">
                                            <FaFacebook /> Facebook
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>

                        {!isAuthenticated && (
                            <div className="bg-[#181820] rounded-xl px-4 py-3 text-center border border-[#2d3748]">
                                <p className="text-gray-400 text-sm">
                                    <button onClick={() => navigate('/login')} className="text-blue-400 hover:underline">Login</button>
                                    {' '}to see all job opportunities on CINTRACON
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PublicJobPage;
