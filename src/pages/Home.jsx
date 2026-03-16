import React from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import SkillsSection from "../components/SkillsSection";
import ExperienceSection from "../components/ExperienceSection";
import ProjectsSection from "../components/ProjectsSection";
import EducationSection from "../components/EducationSection";
import PublicationsSection from "../components/PublicationsSection";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export default function Home() {
  return (
    <div style={{ background: "#050505", minHeight: "100vh" }}>
      <Navbar />
      <HeroSection />
      {[SkillsSection, ExperienceSection, ProjectsSection, EducationSection, PublicationsSection].map(
        (Section, index) => (
          <motion.div
            key={index}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <Section />
          </motion.div>
        )
      )}
    </div>
  );
}
