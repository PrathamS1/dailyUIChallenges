import React, { useState } from "react";
import { Github, Linkedin, ExternalLink, Sun, Moon } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";

const profile = {
  name: "Pratham Singh",
  role: "Full Stack Developer",
  company: "OpenAI",
  location: "India",
  about: "Building full-stack applications with a focus on developer experience and performance. I love creating tools that empower developers to build better software.",
  avatar: "/profPic.jpg",
  coverPhoto: "/profCover.jpg",
  stats: {
    linkedinFollowers: "200",
    githubRepos: 56,
    githubStars: "128",
    projectsCompleted: 12
  },
  topProjects: [
    {
      name: "AI Code Assistant",
      description: "Open-source AI-powered code completion tool",
      url: "https://github.com/alexjohnson/ai-code-assistant"
    },
    {
      name: "CMS Dashboard", 
      description: "Management system for business operations and analytics",
      url: "https://github.com/alexjohnson/devflow"
    }
  ],
  social: {
    github: "pratham_s1",
    linkedin: "pratham_singh",
    email: "test@email.com",
    twitter: "prathams1",
    website: "https://itspratham.netlify.app/"
  }
};

const ProfessionalProfileCard = () => {
  const [profileHovered, setProfileHovered] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    const root = document.documentElement;
    
    if (!isDarkTheme) {
      // Switch to dark theme - use existing dark variants
      root.style.setProperty('--profile-card-primary', 'var(--profile-card-primary-dark)');
      root.style.setProperty('--profile-card-secondary', 'var(--profile-card-secondary-dark)');
      root.style.setProperty('--profile-card-background', 'var(--profile-card-background-dark)');
      root.style.setProperty('--profile-card-text', 'var(--profile-card-text-dark)');
      root.style.setProperty('--profile-card-accent', 'var(--profile-card-accent-dark)');
    } else {
      // Switch to light theme - use original values
      root.style.setProperty('--profile-card-primary', '#27D88C');
      root.style.setProperty('--profile-card-secondary', '#70FFB8');
      root.style.setProperty('--profile-card-background', '#E9FFF3');
      root.style.setProperty('--profile-card-text', '#122116');
      root.style.setProperty('--profile-card-accent', '#00B86B');
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-5 font-sans relative"
      style={{
        background: isDarkTheme 
          ? "linear-gradient(135deg, var(--profile-card-secondary) 0%, var(--profile-card-background) 100%)"
          : "linear-gradient(135deg, var(--profile-card-secondary) 0%, var(--profile-card-background) 100%)"
      }}
    >
      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className="fixed top-6 right-6 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ease-out hover:scale-110 z-50"
        style={{
          backgroundColor: isDarkTheme ? "var(--profile-card-background)" : "var(--profile-card-background)",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          border: `2px solid ${isDarkTheme ? "var(--profile-card-secondary)" : "var(--profile-card-secondary)"}`
        }}
      >
        {isDarkTheme ? (
          <Sun size={20} style={{ color: "var(--profile-card-text)" }} />
        ) : (
          <Moon size={20} style={{ color: "var(--profile-card-text)" }} />
        )}
      </button>
      <div 
        className="rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.1),0_0_0_1px_rgba(0,0,0,0.05)] max-w-[480px] w-full overflow-hidden relative"
        style={{ background: "var(--profile-card-background)" }}
      >
        {/* Cover Photo */}
        <div 
          className="relative h-60 bg-cover bg-center flex items-center justify-center"
          style={{
            backgroundImage: `url(${profile.coverPhoto})`,
            backgroundPosition: "50% 60%",
          }}
        >
          {/* Profile Image */}
          <div
            className={`relative w-30 h-30 rounded-full border-4 cursor-pointer transition-all duration-300 ease-out ${
              profileHovered 
                ? "shadow-[0_4px_16px_rgba(0,0,0,0.2)] scale-95" 
                : "shadow-[0_8px_24px_rgba(0,0,0,0.15)] scale-100"
            }`}
            // style={{ borderColor: "var(--profile-card-background)" }}
            onMouseEnter={() => setProfileHovered(true)}
            onMouseLeave={() => setProfileHovered(false)}
          >
            {/* GitHub Icon - slides to left */}
            <a
              href={`https://github.com/${profile.social.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`absolute w-10 h-10 rounded-full flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-all duration-300 ease-out top-1/2 left-1/2 z-10 ${
                profileHovered 
                  ? "-translate-x-28 -translate-y-1/2 opacity-100" 
                  : "-translate-x-1/2 -translate-y-1/2 opacity-0"
              }`}
            >
              <FaGithub size={24} style={{ color: "var(--profile-card-background)" }} />
            </a>

            {/* LinkedIn Icon - slides to right */}
            <a
              href={`https://linkedin.com/in/${profile.social.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`absolute w-10 h-10 rounded-full flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-all duration-300 ease-out top-1/2 left-1/2 z-10 ${
                profileHovered 
                  ? "translate-x-16 -translate-y-1/2 opacity-100" 
                  : "-translate-x-1/2 -translate-y-1/2 opacity-0"
              }`}
            >
              <FaLinkedinIn  size={24} style={{ color: "var(--profile-card-background)" }} />
            </a>
            
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-full h-full object-cover relative z-[5] rounded-full"
            />
          </div>
        </div>

        {/* Card Content */}
        <div className="p-8 pb-7">
          {/* Name, Role, Company */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold mb-2 leading-tight" style={{ color: "var(--profile-card-text)" }}>
              {profile.name}
            </h1>
            <p className="text-lg font-semibold mb-1" style={{ color: "var(--profile-card-primary)" }}>
              {profile.role}
            </p>
            <p className="text-base font-medium" style={{ color: "var(--profile-card-text)", opacity: 0.7 }}>
              @ {profile.company}
            </p>
          </div>

          {/* About */}
          <div className="mb-7">
            <h3 className="text-base font-bold mb-3" style={{ color: "var(--profile-card-text)" }}>
              About
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: "var(--profile-card-text)", opacity: 0.7 }}>
              {profile.about}
            </p>
          </div>

          {/* Stats */}
          <div className="mb-7">
            <div className="grid grid-cols-2 gap-6 gap-x-5">
              <div className="text-center">
                <div className="text-2xl font-bold mb-1.5 leading-none" style={{ color: "var(--profile-card-primary)" }}>
                  {profile.stats.linkedinFollowers}
                </div>
                <div className="text-xs font-medium uppercase tracking-wider" style={{ color: "var(--profile-card-text)", opacity: 0.7 }}>
                  LinkedIn Followers
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold mb-1.5 leading-none" style={{ color: "var(--profile-card-text)" }}>
                  {profile.stats.githubRepos}
                </div>
                <div className="text-xs font-medium uppercase tracking-wider" style={{ color: "var(--profile-card-text)", opacity: 0.7 }}>
                  GitHub Repos
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold mb-1.5 leading-none" style={{ color: "var(--profile-card-accent)" }}>
                  {profile.stats.githubStars}
                </div>
                <div className="text-xs font-medium uppercase tracking-wider" style={{ color: "var(--profile-card-text)", opacity: 0.7 }}>
                  GitHub Stars
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold mb-1.5 leading-none" style={{ color: "var(--profile-card-primary)" }}>
                  {profile.stats.projectsCompleted}
                </div>
                <div className="text-xs font-medium uppercase tracking-wider" style={{ color: "var(--profile-card-text)", opacity: 0.7 }}>
                  Projects Completed
                </div>
              </div>
            </div>
          </div>

          {/* Top Projects */}
          <div className="mb-7">
            <h3 className="text-base font-bold mb-4" style={{ color: "var(--profile-card-text)" }}>
              Top Projects
            </h3>
            <div className="flex flex-col gap-4">
              {profile.topProjects.map((project, index) => (
                <a
                  key={index}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative p-4 px-5 no-underline transition-all duration-200 ease-out block rounded-lg hover:translate-x-1"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold mb-1.5 transition-colors duration-200" style={{ color: "var(--profile-card-text)" }}>
                        {project.name}
                      </h4>
                      <p className="text-sm leading-relaxed transition-colors duration-200" style={{ color: "var(--profile-card-text)", opacity: 0.7 }}>
                        {project.description}
                      </p>
                    </div>
                    <div className="ml-3 opacity-50 group-hover:opacity-100 transition-opacity duration-200">
                      <ExternalLink size={16} style={{ color: "var(--profile-card-primary)" }} />
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mb-6">
            <div className="flex gap-3 mb-4">
              <button
                className="flex-1 border-0 rounded-xl py-3.5 px-5 text-sm font-semibold cursor-pointer transition-all duration-200 hover:-translate-y-px"
                style={{
                  backgroundColor: "var(--profile-card-primary)",
                  color: "var(--profile-card-background)",
                  boxShadow: "0 4px 12px rgba(37,99,235,0.3)"
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "translateY(-1px)";
                  e.target.style.boxShadow = "0 6px 16px rgba(37,99,235,0.4)";
                  e.target.style.filter = "brightness(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "0 4px 12px rgba(37,99,235,0.3)";
                  e.target.style.filter = "brightness(1)";
                }}
              >
                Connect
              </button>
              <button
                className="flex-1 border-2 rounded-xl py-3.5 px-5 text-sm font-semibold cursor-pointer transition-all duration-200 hover:-translate-y-px"
                style={{
                  backgroundColor: "var(--profile-card-background)",
                  color: "var(--profile-card-primary)",
                  borderColor: "var(--profile-card-primary)"
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "var(--profile-card-primary)";
                  e.target.style.color = "var(--profile-card-background)";
                  e.target.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "var(--profile-card-background)";
                  e.target.style.color = "var(--profile-card-primary)";
                  e.target.style.transform = "translateY(0)";
                }}
              >
                Message
              </button>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <div className="flex flex-wrap gap-4 justify-center pt-4 border-t" style={{ borderColor: "var(--profile-card-secondary)" }}>
              <a
                href={`mailto:${profile.social.email}`}
                className="no-underline text-xs font-medium transition-colors duration-200"
                style={{ color: "var(--profile-card-text)", opacity: 0.7 }}
                onMouseEnter={(e) => e.target.style.color = "var(--profile-card-primary)"}
                onMouseLeave={(e) => {
                  e.target.style.color = "var(--profile-card-text)";
                  e.target.style.opacity = "0.7";
                }}
              >
                {profile.social.email}
              </a>
              <a
                href={`https://${profile.social.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline text-xs font-medium transition-colors duration-200"
                style={{ color: "var(--profile-card-text)", opacity: 0.7 }}
                onMouseEnter={(e) => e.target.style.color = "var(--profile-card-primary)"}
                onMouseLeave={(e) => {
                  e.target.style.color = "var(--profile-card-text)";
                  e.target.style.opacity = "0.7";
                }}
              >
                {profile.social.website}
              </a>
              <a
                href={`https://twitter.com/${profile.social.twitter}`}
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline text-xs font-medium transition-colors duration-200"
                style={{ color: "var(--profile-card-text)", opacity: 0.7 }}
                onMouseEnter={(e) => e.target.style.color = "var(--profile-card-primary)"}
                onMouseLeave={(e) => {
                  e.target.style.color = "var(--profile-card-text)";
                  e.target.style.opacity = "0.7";
                }}
              >
                @{profile.social.twitter}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalProfileCard;
