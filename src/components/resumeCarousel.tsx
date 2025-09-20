"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Define the interface for a single work or leadership experience item
interface ExperienceItem {
  jobTitle?: string;
  company?: string;
  location?: string;
  duration: string;
  responsibilities: string[];
  title?: string;
  organization?: string;
}

// Define the interfaces for each section of the resume data
interface PersonalInformation {
  name: string;
  phone: string;
  location: string;
  email: string;
  linkedIn: string;
}

interface Education {
  degree: string;
  university: string;
  cgpa: string;
  minor: string;
  honors: string;
}

interface Skills {
  technical: string[];
  soft: string[];
  languages: {
    english: string;
    arabic: string;
    german: string;
    spanish: string;
  };
}

// Define the main interface for the entire resume data object
interface ResumeData {
  personalInformation: PersonalInformation;
  education: Education;
  workExperience: ExperienceItem[];
  leadershipAndActivities: ExperienceItem[];
  skills: Skills;
}

// Type the resumeData object with the ResumeData interface
const resumeData: ResumeData = {
  personalInformation: {
    name: "Dana Dabdoub",
    phone: "+961 76 058 707",
    location: "Lebanon",
    email: "danadabdoub@gmail.com",
    linkedIn: "Dana Dabdoub",
  },
  education: {
    degree: "Bachelor of Science in Computer Science",
    university: "Rafic Hariri University (RHU)",
    cgpa: "94.34 ",
    minor: "Business Administration",
    honors: "President's Honors list (Fall 2022 - Spring 2025)",
  },
  workExperience: [
    {
      jobTitle: "Computer Science Intern",
      company: "AUB Vision & Robotics Lab",
      location: "Meshref, Lebanon",
      duration: "May 2025 - September 2025",
      responsibilities: [
        "Developed a filter to smooth the pose of 3D objects within DSP-SLAM (C++/Python/Ubuntu).",
        "Worked on a thread pool to asynchronously do the reconstruction of 3D objects (C++/Ubuntu).",
        "Assisted with Git and GitHub-related issues.",
      ],
    },
    {
      jobTitle: "Teaching Assistant",
      company: "RHU",
      duration: "September 2024 - April 2025",
      responsibilities: [
        "Assisted in teaching React JS, Web Programming, and Advanced Web Programming courses to students.",
        "Mentored 9 teams on their React JS, Web, and Advanced Web Programming projects.",
        "Delivered and assisted with over 10 lab sessions in the React JS course.",
      ],
    },
  ],
  leadershipAndActivities: [
    {
      title: "Board Member",
      organization: "Association for Computing Machinary (ACM)",
      location: "Meshref, Lebanon",
      duration: "August 2023 - August 2025",
      responsibilities: [
        "Led and planned React JS, React Native, Git, GitHub, and WordPress workshops.",
        "Organized and prepared participation certificates for over 100 workshop attendees.",
      ],
    },
    {
      title: "Club Member",
      organization: "RHU FEMINIST CLUB",
      location: "Meshref, Lebanon",
      duration: "September 2022 - September 2023",
      responsibilities: [
        "Assisted in organizing over 7 fundraisers and events related to many causes, such as breast cancer awareness.",
      ],
    },
  ],
  skills: {
    technical: [
      "HTML",
      "CSS",
      "JavaScript",
      "JQuery",
      "JSON",
      "React JS",
      "React Native",
      "Firebase",
      "PHP",
      "Laravel",
      "C++",
      "C#",
      "SQL",
      "Bootstrap",
      "AJAX",
      "Git",
      "GitHub",
      "WordPress",
      "TensorFlow",
      "Linux",
      "Django",
      "Flask",
      "Python",
      "Tailwind CSS"
    ],
    soft: [
      "Communication",
      "Teamwork",
      "Leadership",
      "Critical thinking",
      "Problem solving",
    ],
    languages: {
      english: "Fluent",
      arabic: "Fluent",
      german: "Intermediate",
      spanish: "Basic",
    },
  },
};

// Type the sectionNames object with a Record type
const sectionNames: Record<keyof ResumeData, string> = {
  personalInformation: "Personal Information",
  education: "Education",
  workExperience: "Work Experience",
  leadershipAndActivities: "Leadership & Activities",
  skills: "Skills",
};

export default function ResumeCarousel() {
  const sections = Object.keys(resumeData) as (keyof ResumeData)[];
  const [activeSection, setActiveSection] = useState<keyof ResumeData>(
    sections[0]
  );

  const renderSectionContent = () => {
    const data = resumeData[activeSection];
    switch (activeSection) {
      case "personalInformation":
        const info = data as PersonalInformation;
        return (
          <div>
            <h3>{info.name}</h3>
            <p>
              <strong>Phone:</strong> {info.phone}
            </p>
            <p>
              <strong>Location:</strong> {info.location}
            </p>
            <p>
              <strong>Email:</strong> {info.email}
            </p>
            <p>
              <strong>LinkedIn:</strong> {info.linkedIn}
            </p>
          </div>
        );
      case "education":
        const education = data as Education;
        return (
          <div>
            <h3>{education.degree}</h3>
            <p>
              <strong>University:</strong> {education.university}
            </p>
            <p>
              <strong>CGPA:</strong> {education.cgpa}
            </p>
            <p>
              <strong>Minor:</strong> {education.minor}
            </p>
            <p>
              <strong>Honors:</strong> {education.honors}
            </p>
          </div>
        );
      case "workExperience":
      case "leadershipAndActivities":
        const experiences = data as ExperienceItem[];
        return (
          <div className="space-y-4">
            {" "}
            {experiences.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold">
                    {item.jobTitle || item.title}
                    {item.company || item.organization ? (
                      <span className="text-gray-600">
                        {" "}
                        at {item.company || item.organization}
                      </span>
                    ) : (
                      ""
                    )}
                  </h4>
                  <p className="text-sm text-gray-500">{item.duration}</p>
                </div>
                {item.location && (
                  <p className="text-sm text-gray-500">{item.location}</p>
                )}
                <ul className="list-disc list-inside mt-2 space-y-1">
                  {item.responsibilities.map((res, i) => (
                    <li key={i} className="text-sm">
                      {res}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        );
      case "skills":
        const skills = data as Skills;
        return (
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-lg">Technical Skills</h4>
              <ul className="flex flex-wrap gap-2 mt-2">
                {skills.technical.map((skill, index) => (
                  <li key={index} className="bg-color-primary-green text-white rounded-lg px-3 py-1 text-sm font-medium">
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-lg">Soft Skills</h4>
              <ul className="flex flex-wrap gap-2 mt-2">
                {skills.soft.map((skill, index) => (
                  <li key={index} className="bg-color-primary-green text-white rounded-lg px-3 py-1 text-sm font-medium">
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-lg">Languages</h4>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>
                  <strong>English:</strong> {skills.languages.english}
                </li>
                <li>
                  <strong>Arabic:</strong> {skills.languages.arabic}
                </li>
                <li>
                  <strong>German:</strong> {skills.languages.german}
                </li>
                <li>
                  <strong>Spanish:</strong> {skills.languages.spanish}
                </li>
              </ul>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  // Define the animation variants for the content section
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  };

  return (
    <section className="flex flex-col items-center justify-center">
      <section className="flex flex-wrap justify-center">
        {sections.map((sec) => (
          <button
            key={sec}
            onClick={() => setActiveSection(sec)}
            className={`rounded-lg mx-1 my-3 p-2 font-semibold ${
              activeSection === sec
                ? "bg-color-primary-green text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {sectionNames[sec]}
          </button>
        ))}
      </section>
      <AnimatePresence mode="wait">
        <motion.section
          key={activeSection}
          className="my-6 p-4 border rounded-lg shadow-md max-w-2xl w-full"
          variants={contentVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-xl font-bold">{sectionNames[activeSection]}</h2>
          {renderSectionContent()}
        </motion.section>
      </AnimatePresence>
    </section>
  );
}