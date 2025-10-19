import React from 'react';

const IntroSidebar = ({ profileData }) => {
  if (!profileData) return null;

  // SVG Icons for social media
  const FacebookIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );

  const InstagramIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987c6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.22 14.815 3.73 13.664 3.73 12.367s.49-2.448 1.396-3.323c.875-.808 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.906.875 1.396 2.026 1.396 3.323s-.49 2.448-1.396 3.323c-.875.808-2.026 1.297-3.323 1.297zm7.718 1.819c-.423 0-.808-.134-1.134-.422-.327-.288-.49-.673-.49-1.134s.163-.846.49-1.134c.326-.288.711-.422 1.134-.422s.808.134 1.134.422c.327.288.49.673.49 1.134s-.163.846-.49 1.134c-.326.288-.711.422-1.134.422zm2.355-7.567c0 .875-.288 1.61-.865 2.204-.576.596-1.312.884-2.187.884s-1.61-.288-2.187-.884c-.576-.596-.865-1.33-.865-2.204s.288-1.61.865-2.205c.576-.596 1.312-.884 2.187-.884s1.61.288 2.187.884c.576.596.865 1.33.865 2.205z"/>
    </svg>
  );

  const LinkedInIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );

  const GithubIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  );

  const socialLinks = [
    {
      platform: 'facebook',
      link: profileData.facebook_link,
      icon: <FacebookIcon />,
      color: 'text-blue-500',
      hoverColor: 'hover:text-blue-400',
      disabledColor: 'text-gray-500'
    },
    {
      platform: 'instagram',
      link: profileData.instagram_link,
      icon: <InstagramIcon />,
      color: 'text-pink-500',
      hoverColor: 'hover:text-pink-400',
      disabledColor: 'text-gray-500'
    },
    {
      platform: 'linkedin',
      link: profileData.linkedin_link,
      icon: <LinkedInIcon />,
      color: 'text-blue-700',
      hoverColor: 'hover:text-blue-600',
      disabledColor: 'text-gray-500'
    },
    {
      platform: 'github',
      link: profileData.github_link,
      icon: <GithubIcon />,
      color: 'text-gray-300',
      hoverColor: 'hover:text-white',
      disabledColor: 'text-gray-500'
    }
  ];

  const handleSocialClick = (link, platform) => {
    if (!link) {
      console.log(`${platform} link not available`);
      return;
    }
    window.open(link, '_blank', 'noopener noreferrer');
  };

  return (
    <aside className="bg-[#20222B] rounded-2xl shadow p-4 flex flex-col gap-6 mb-10 min-w-[250px] max-w-[300px] mx-auto">
      <div className="text-white font-bold text-lg mb-2">Intro</div>
      <div className="text-gray-300 text-sm mb-4">
        {profileData.bio || "এইটা আপনার ইনট্রো, নিজের সম্পর্কে তথ্য এখানে এডিট করতে পারবেন।"}
      </div>
      <ul className="text-gray-200 text-sm flex flex-col gap-2">
        <li><span className="font-semibold">Department:</span> {profileData.department?.toUpperCase()}</li>
        <li><span className="font-semibold">Batch:</span> {profileData.batch_no}</li>
        <li><span className="font-semibold">Semester:</span> {profileData.semester}</li>
        <li><span className="font-semibold">Section:</span> {profileData.section}</li>
        <li><span className="font-semibold">Blood Group:</span> {profileData.blood_grp || "N/A"}</li>
        <li><span className="font-semibold">Email:</span> {profileData.email}</li>
        <li><span className="font-semibold">Phone:</span> {profileData.phone_no || "N/A"}</li>
        <li><span className="font-semibold">Relationship:</span> {profileData.relationship_status || "N/A"}</li>
        <li><span className="font-semibold">Role:</span> {profileData.role}</li>
      </ul>
      
      <div className="mt-4">
        <div className="text-white font-semibold mb-3">Social Media</div>
        <div className="flex gap-3 justify-center">
          {socialLinks.map((social) => (
            <button
              key={social.platform}
              onClick={() => handleSocialClick(social.link, social.platform)}
              className={`
                relative p-3 rounded-full transition-all duration-200 transform group
                ${social.link 
                  ? `${social.color} ${social.hoverColor} hover:scale-110 cursor-pointer bg-gray-800 hover:bg-gray-700` 
                  : `${social.disabledColor} cursor-not-allowed bg-gray-800 opacity-40`
                }
                border border-gray-600
              `}
              title={social.link ? `Visit ${social.platform}` : `${social.platform} link not available`}
              disabled={!social.link}
            >
              {social.icon}
              
              {/* Tooltip for disabled links */}
              {!social.link && (
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                  Link not added
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default IntroSidebar;