import React, { useState, useEffect, useRef } from 'react';
import { FaShare, FaCopy, FaWhatsapp, FaFacebook, FaCheck } from 'react-icons/fa';
import { getShareUrl } from '../api/publicApi';
import { toast } from 'react-toastify';

const SharePopover = ({ type, id, className = '' }) => {
    const [open, setOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const ref = useRef(null);
    const shareUrl = getShareUrl(type, id);

    useEffect(() => {
        if (!open) return;
        const handler = (e) => {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false);
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, [open]);

    const handleCopy = (e) => {
        e.stopPropagation();
        navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        toast.success('Link copied!');
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div ref={ref} className={`relative ${className}`}>
            <button
                onClick={(e) => { e.stopPropagation(); setOpen(o => !o); }}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:text-white transition text-sm"
                title="Share"
            >
                <FaShare className="text-xs" />
                <span>Share</span>
            </button>

            {open && (
                <div className="absolute bottom-full mb-2 right-0 bg-[#232A36] border border-[#2d3748] rounded-xl shadow-xl p-2 z-50 flex flex-col gap-1 min-w-[180px]">
                    <button
                        onClick={handleCopy}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#2d3748] text-gray-200 text-sm transition"
                    >
                        {copied ? <FaCheck className="text-green-400 text-xs" /> : <FaCopy className="text-gray-400 text-xs" />}
                        {copied ? 'Copied!' : 'Copy link'}
                    </button>
                    <a
                        href={`https://wa.me/?text=${encodeURIComponent(shareUrl)}`}
                        target="_blank" rel="noopener noreferrer"
                        onClick={(e) => { e.stopPropagation(); setOpen(false); }}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#2d3748] text-green-400 text-sm transition"
                    >
                        <FaWhatsapp className="text-xs" /> WhatsApp
                    </a>
                    <a
                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                        target="_blank" rel="noopener noreferrer"
                        onClick={(e) => { e.stopPropagation(); setOpen(false); }}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#2d3748] text-blue-400 text-sm transition"
                    >
                        <FaFacebook className="text-xs" /> Facebook
                    </a>
                </div>
            )}
        </div>
    );
};

export default SharePopover;
