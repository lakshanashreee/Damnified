import { Home, User, Code, Award, Briefcase, Mail, FileText, ClipboardList } from "lucide-react";
import { motion } from "framer-motion";

const links = [
  { name: "Home", icon: Home, id: "home" },
  { name: "About", icon: User, id: "about" },
  { name: "Skills", icon: Code, id: "skills" },
  { name: "Certifications", icon: Award, id: "certifications" },
  { name: "Projects", icon: Briefcase, id: "projects" },
  { name: "Contact", icon: Mail, id: "contact" },
  { name: "Resume", icon: FileText, id: "resume" },
  { name: "Internship", icon: ClipboardList, id: "internship" },
];

export default function Sidebar({ currentSection, setCurrentSection }) {
  return (
    <motion.nav
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="fixed top-0 left-0 h-full w-20 bg-gray-900 flex flex-col items-center py-8 space-y-6"
    >
      {links.map(({ name, icon: Icon, id }) => (
        <button
          key={id}
          onClick={() => {
            document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
            setCurrentSection(id);
          }}
          className={`p-3 rounded-lg hover:bg-gray-700 ${
            currentSection === id ? "bg-gray-700" : ""
          }`}
          title={name}
        >
          <Icon className="text-white" size={24} />
        </button>
      ))}
    </motion.nav>
  );
}
