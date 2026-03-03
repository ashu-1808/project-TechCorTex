import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, CheckCircle2, BookOpen,
  Globe, TrendingUp, Shield, Users, Server, Laptop, Database, Layers, HardDrive, Network,
  Activity, Folder, Key, Lock, Cpu, GitBranch, Terminal, Container, Cloud, Code, Settings, Infinity as InfinityIcon
} from 'lucide-react';
import { 
  SiJenkins, SiGithubactions, SiGitlab, SiDocker, SiKubernetes, SiTerraform, SiAnsible, SiPrometheus, SiGrafana, SiLinux, SiGnubash
} from 'react-icons/si';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button, AnimatedSection, FadeIn } from '../components/UI';

// --- Background Animation Component ---
const FloatingDevOpsIcons = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 2000], [0, 400]); 

  const iconTypes = [
    { Icon: SiJenkins, color: 'text-violet-500', label: 'Jenkins' }, 
    { Icon: SiGithubactions, color: 'text-blue-500', label: 'Actions' }, 
    { Icon: SiGitlab, color: 'text-orange-500', label: 'GitLab' }, 
    { Icon: SiDocker, color: 'text-cyan-400', label: 'Docker' }, 
    { Icon: SiKubernetes, color: 'text-blue-400', label: 'K8s' }, 
    { Icon: SiTerraform, color: 'text-purple-400', label: 'Terraform' }, 
    { Icon: SiAnsible, color: 'text-red-500', label: 'Ansible' }, 
    { Icon: SiPrometheus, color: 'text-orange-400', label: 'Prometheus' }, 
    { Icon: SiGrafana, color: 'text-yellow-500', label: 'Grafana' }, 
    { Icon: InfinityIcon, color: 'text-cyan-500', label: 'Infinity' },
    { Icon: Terminal, color: 'text-green-400', label: 'Bash' },
  ];

  // Initialize immediately
  const [drops] = useState(() => 
    Array.from({ length: 140 }).map((_, i) => {
      const type = iconTypes[Math.floor(Math.random() * iconTypes.length)];
      const duration = 20 + Math.random() * 30;
      return {
        id: i,
        ...type,
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: duration,
        delay: -Math.random() * duration, // Instant start
        size: 24 + Math.random() * 45,
        opacity: 0.15 + Math.random() * 0.10
      };
    })
  );

  return (
    <motion.div style={{ y }} className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {drops.map((drop) => (
        <motion.div
          key={drop.id}
          className={`absolute ${drop.color}`}
          style={{ left: `${drop.left}%`, top: `${drop.top}%` }}
          animate={{ 
            y: [0, -40, 0],
            x: [0, 25, 0],
            rotate: [0, 15, -15, 0],
            opacity: [drop.opacity, drop.opacity * 1.4, drop.opacity]
          }}
          transition={{
            duration: drop.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: drop.delay
          }}
        >
          <drop.Icon style={{ width: drop.size, height: drop.size }} />
        </motion.div>
      ))}
    </motion.div>
  );
};

// --- Syllabus Data ---
const SYLLABUS_MODULES = [
  {
    title: "Introduction to DevOps",
    Icon: InfinityIcon,
    color: "text-cyan-400",
    desc: "Understand the cultural and technical shift that bridges development and operations.",
    why: "It's the foundation. You need to know 'why' before 'how'.",
    topics: ["What is DevOps?", "History & Evolution", "DevOps vs Traditional IT", "Key Principles (CAMS)"]
  },
  {
    title: "DevOps Principles & Lifecycle",
    Icon: Activity,
    color: "text-blue-500",
    desc: "Dive into the infinite loop of continuous integration, delivery, and deployment.",
    why: "Understanding the lifecycle is crucial for designing efficient pipelines.",
    topics: ["DevOps Culture & Collaboration", "CI/CD Lifecycle Overview", "Continuous Improvement (Kaizen)"]
  },
  {
    title: "Agile & DevOps Practices",
    Icon: Users,
    color: "text-violet-500",
    desc: "Learn how Agile methodologies like Scrum and Kanban integrate with DevOps.",
    why: "DevOps is the engine that powers Agile software delivery.",
    topics: ["Agile Fundamentals", "Agile vs DevOps", "Scrum & Kanban Workflows"]
  },
  {
    title: "Version Control (Git & GitHub)",
    Icon: GitBranch,
    color: "text-orange-500",
    desc: "Master the art of tracking changes and collaborating on code.",
    why: "Every line of code you write needs to be versioned. It's non-negotiable.",
    topics: ["Git Fundamentals", "Branching Strategies (GitFlow)", "Pull Requests & Code Reviews", "GitHub Collaboration"]
  },
  {
    title: "CI/CD & Automation",
    Icon: Settings,
    color: "text-cyan-500",
    desc: "Automate the build, test, and deployment process to release software faster.",
    why: "Automation eliminates manual errors and speeds up delivery.",
    topics: ["Continuous Integration vs Deployment", "Automation Benefits", "Pipeline Architecture"]
  },
  {
    title: "Jenkins, GitHub Actions & GitLab",
    Icon: SiJenkins,
    color: "text-red-500",
    desc: "Hands-on with the most popular CI/CD tools in the industry.",
    why: "These are the tools you will use daily to build and deploy applications.",
    topics: ["Jenkins Pipeline Syntax", "GitHub Actions Workflows", "GitLab CI/CD Configuration"]
  },
  {
    title: "Docker & Containerization",
    Icon: SiDocker,
    color: "text-blue-400",
    desc: "Package applications with their dependencies to run anywhere.",
    why: "Containers solved the 'it works on my machine' problem. Essential skill.",
    topics: ["Container Concepts", "Docker Architecture", "Writing Dockerfiles", "Image Management"]
  },
  {
    title: "Kubernetes Orchestration",
    Icon: SiKubernetes,
    color: "text-blue-600",
    desc: "Manage and scale containerized applications across clusters of machines.",
    why: "K8s is the operating system of the cloud. It manages your containers at scale.",
    topics: ["K8s Architecture (Master/Node)", "Pods, Deployments, Services", "Scaling & Rolling Updates"]
  },
  {
    title: "Infrastructure as Code (IaC)",
    Icon: SiTerraform,
    color: "text-purple-500",
    desc: "Manage infrastructure using code files rather than manual configuration.",
    why: "IaC allows you to version, replicate, and automate your entire infrastructure.",
    topics: ["Terraform Basics", "AWS CloudFormation", "State Management", "Declarative vs Imperative"]
  },
  {
    title: "Cloud Deployment (AWS/Azure/GCP)",
    Icon: Cloud,
    color: "text-orange-500",
    desc: "Deploy applications to major cloud providers using DevOps practices.",
    why: "The cloud is where modern applications live. You need to know how to get them there.",
    topics: ["Multi-cloud Fundamentals", "Cloud Deployment Strategies", "Environment Management"]
  },
  {
    title: "Monitoring & Observability",
    Icon: SiPrometheus,
    color: "text-orange-600",
    desc: "Keep an eye on your systems with Prometheus and Grafana.",
    why: "You can't fix what you can't see. Monitoring ensures system reliability.",
    topics: ["Metrics & Alerts", "Visual Dashboards (Grafana)", "Log Aggregation (ELK Stack)"]
  },
  {
    title: "Security (DevSecOps)",
    Icon: Shield,
    color: "text-green-500",
    desc: "Integrate security into every step of the DevOps pipeline.",
    why: "Security is everyone's responsibility. Shift-left security prevents breaches.",
    topics: ["Secrets Management", "Secure CI/CD Pipelines", "Container Security Scanning"]
  }
];

const DevOpsPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 font-sans text-zinc-100 selection:bg-violet-500/30 overflow-x-hidden">
      
      {/* GLOBAL BACKGROUND ICONS - High visibility & Parallax */}
      <FloatingDevOpsIcons />

      {/* 1) Course Information (Hero) */}
      <section className="relative pt-32 pb-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-violet-900/20 via-zinc-950 to-zinc-950 pointer-events-none z-0" />
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <FadeIn>
            <div className="inline-flex items-center justify-center p-3 mb-8 rounded-2xl bg-zinc-900/60 border border-zinc-700/50 shadow-2xl backdrop-blur-xl">
               <div className="bg-gradient-to-r from-violet-600 to-cyan-500 p-2 rounded-lg mr-3 shadow-lg">
                 <InfinityIcon className="w-6 h-6 text-white" />
               </div>
               <span className="text-xl font-bold tracking-tight text-white">DevOps Engineering Roadmap</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight leading-tight text-white drop-shadow-sm">
              Master DevOps, CI/CD & <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-400 animate-text-shimmer bg-[length:200%_auto]">
                Cloud Infrastructure.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-zinc-200 max-w-3xl mx-auto mb-10 leading-relaxed font-normal drop-shadow-md">
              Master the continuous loop of development and operations. Automate everything from code commit to production deployment with the industry's most powerful toolchain.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                size="lg" 
                onClick={() => navigate('/apply', { state: { selectedCourse: 'devops' } })} 
                className="min-w-[220px] shadow-violet-500/40 shadow-2xl !bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white border-none font-bold text-lg transition-all duration-300 active:scale-95 py-4"
              >
                Enroll Now
              </Button>
              <Button 
                variant="outline"
                size="lg" 
                onClick={() => document.getElementById('syllabus')?.scrollIntoView({ behavior: 'smooth'})} 
                className="min-w-[220px] text-white border-white/20 hover:border-violet-500/50 hover:!bg-violet-500/10 backdrop-blur-md !bg-transparent transition-all duration-300 active:scale-95 py-4 group"
                leftIcon={() => <BookOpen className="w-5 h-5 mr-2 text-violet-400" />}
              >
                View Syllabus
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 2) What Will You Learn? */}
      <AnimatedSection dark className="border-y border-zinc-900 relative">
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center text-white">The Infinity Toolchain</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Plan & Code", services: "Git, Jira, Confluence, Python, Bash", Icon: GitBranch, color: "text-violet-500", border: "hover:border-violet-500/50" },
              { title: "Build & Test", services: "Jenkins, Maven, Gradle, Selenium, JUnit", Icon: Settings, color: "text-blue-500", border: "hover:border-blue-500/50" },
              { title: "Release & Deploy", services: "Docker, Kubernetes, Helm, ArgoCD", Icon: SiDocker, color: "text-cyan-400", border: "hover:border-cyan-500/50" },
              { title: "Operate & Monitor", services: "Prometheus, Grafana, ELK, Splunk", Icon: Activity, color: "text-emerald-400", border: "hover:border-emerald-500/50" },
              { title: "Infrastructure as Code", services: "Terraform, Ansible, CloudFormation", Icon: SiTerraform, color: "text-purple-500", border: "hover:border-purple-500/50" },
              { title: "Cloud & Security", services: "AWS, Azure, Vault, SonarQube", Icon: Shield, color: "text-pink-500", border: "hover:border-pink-500/50" },
            ].map((item, i) => (
              <motion.div 
                key={i} 
                whileHover={{ scale: 1.03, backgroundColor: "rgba(24, 24, 27, 0.95)" }}
                className={`bg-zinc-900/90 backdrop-blur-lg p-6 rounded-2xl border border-zinc-700/50 ${item.border} hover:shadow-2xl transition-all cursor-default group`}
              >
                <div className="flex items-center mb-4">
                  <div className={`bg-zinc-950 p-2.5 rounded-xl mr-3 border border-zinc-700/50 shadow-inner`}>
                    <item.Icon className={`w-6 h-6 ${item.color} filter drop-shadow-[0_0_8px_rgba(0,0,0,0.5)]`} />
                  </div>
                  <h3 className="text-white font-bold text-lg">{item.title}</h3>
                </div>
                <p className="text-zinc-300 text-sm leading-relaxed font-medium">
                  {item.services}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* 3) Requirements */}
      <AnimatedSection>
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-zinc-900/90 to-zinc-950 rounded-3xl p-8 md:p-12 border border-zinc-700/50 shadow-2xl relative overflow-hidden group hover:border-violet-500/30 transition-all duration-500 backdrop-blur-sm">
          <div className="absolute top-0 right-0 p-12 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity duration-700 pointer-events-none transform translate-x-10 -translate-y-10">
            <InfinityIcon className="w-80 h-80 text-violet-500" />
          </div>
          <h2 className="text-3xl font-bold mb-6 relative z-10 text-white">Prerequisites</h2>
          <p className="text-zinc-200 mb-8 relative z-10 text-lg font-medium">
            This course is beginner-friendly but moves fast. Here is what helps you succeed:
          </p>
          <ul className="space-y-5 relative z-10">
            {[
              "Basic understanding of operating systems (Windows/Linux).",
              "Familiarity with command-line interfaces is a plus.",
              "Logical thinking and problem-solving mindset.",
              "No prior coding experience required (we teach scripts from scratch)."
            ].map((text, i) => (
              <li key={i} className="flex items-center text-zinc-100 font-medium">
                <span className="w-2.5 h-2.5 bg-violet-500 rounded-full mr-4 shadow-[0_0_12px_rgba(139,92,246,0.8)] border border-violet-400/50" />
                {text}
              </li>
            ))}
          </ul>
        </div>
      </AnimatedSection>

      {/* 4) Career Motivation */}
      <AnimatedSection dark>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">Master the Art of DevOps</h2>
            <div className="space-y-10">
              {[
                { icon: TrendingUp, title: "Accelerate Delivery", desc: "DevOps engineers enable companies to release software hundreds of times a day reliably." },
                { icon: Shield, title: "Enhance Reliability", desc: "Build systems that heal themselves. Learn to create resilient infrastructure that stays up." },
                { icon: Globe, title: "High Industry Demand", desc: "From startups to Fortune 500s, every modern company needs DevOps to compete." }
              ].map((item, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="flex gap-5 group">
                    <div className="flex-shrink-0 mt-1 bg-zinc-900 p-3 rounded-xl border border-zinc-700 group-hover:border-violet-500/50 transition-all shadow-lg">
                      <item.icon className="w-6 h-6 text-violet-400" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                        <p className="text-zinc-300 leading-relaxed font-medium">{item.desc}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
          
          <FadeIn delay={0.2} className="relative">
             <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-cyan-500/20 blur-[80px] rounded-full" />
             <div className="bg-zinc-900/90 backdrop-blur-xl rounded-3xl p-10 border border-zinc-700/50 shadow-2xl relative hover:border-violet-500/40 transition-all duration-500">
                
                {/* Visual Representation of a Pipeline */}
                <div className="flex justify-between items-center mb-8 relative">
                   <div className="absolute top-1/2 left-0 w-full h-0.5 bg-zinc-800 -z-10"></div>
                   {[
                     { icon: Code, label: "Code", color: "text-violet-400", bg: "bg-violet-500/10", border: "border-violet-500/20" },
                     { icon: Layers, label: "Build", color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" },
                     { icon: CheckCircle2, label: "Test", color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/20" },
                     { icon: Server, label: "Deploy", color: "text-green-400", bg: "bg-green-500/10", border: "border-green-500/20" },
                   ].map((step, idx) => (
                     <div key={idx} className="flex flex-col items-center gap-2 bg-zinc-900 p-2 rounded-xl border border-zinc-700">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${step.bg} ${step.border} border`}>
                           <step.icon className={`w-5 h-5 ${step.color}`} />
                        </div>
                        <span className="text-xs font-bold text-zinc-400">{step.label}</span>
                     </div>
                   ))}
                </div>

                <div className="space-y-4 font-mono text-xs md:text-sm text-zinc-400">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span>Fetch Code (Git)</span>
                    <span className="ml-auto text-zinc-500">2s</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span>Run Unit Tests</span>
                    <span className="ml-auto text-zinc-500">45s</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span>Build Docker Image</span>
                    <span className="ml-auto text-zinc-500">1m 20s</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span>Deploy to K8s</span>
                    <span className="ml-auto text-zinc-500">10s</span>
                  </div>
                  <div className="mt-6 pt-4 border-t border-zinc-800 text-center">
                     <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400 text-xs font-bold uppercase tracking-[0.2em]">
                        Continuous Delivery Pipeline
                     </span>
                  </div>
                </div>
             </div>
         </FadeIn>
        </div>
      </AnimatedSection>

      {/* 5) Syllabus */}
      <AnimatedSection id="syllabus" dark className="relative bg-transparent">
         <div className="absolute inset-0 bg-zinc-950/80 pointer-events-none" />
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-16">
             <span className="text-violet-400 font-bold tracking-[0.2em] text-xs uppercase mb-4 block">End-to-End Curriculum</span>
             <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Course Syllabus</h2>
             <p className="text-zinc-200 text-lg font-medium">From basics to expert orchestration and automation.</p>
          </div>
          
          <div className="space-y-8">
            {SYLLABUS_MODULES.map((mod, i) => (
              <motion.div 
                key={i} 
                whileHover={{ borderColor: "rgba(139, 92, 246, 0.4)", backgroundColor: "rgba(9, 9, 11, 0.98)" }}
                className="bg-zinc-950 rounded-3xl border border-zinc-800 overflow-hidden hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-500"
              >
                <div className="p-8 md:p-12">
                   <div className="flex flex-col md:flex-row gap-10">
                      <div className="flex-shrink-0">
                         <div className={`w-16 h-16 bg-zinc-900 rounded-2xl flex items-center justify-center border border-zinc-800 shadow-inner group-hover:border-violet-500/30 transition-colors`}>
                           <mod.Icon className={`w-8 h-8 ${mod.color}`} />
                         </div>
                      </div>
                      <div className="flex-grow">
                         <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">{mod.title}</h3>
                         <p className="text-zinc-300 mb-6 leading-relaxed font-medium text-lg">{mod.desc}</p>
                         
                         <div className="mb-8 p-6 bg-zinc-900/40 rounded-2xl border border-zinc-800/50 backdrop-blur-sm">
                            <span className="text-xs font-black text-violet-500 uppercase tracking-[0.15em] block mb-3">Why this matters</span>
                            <p className="text-zinc-100 text-base italic font-medium">"{mod.why}"</p>
                         </div>

                         <div>
                           <span className="text-xs font-black text-zinc-500 uppercase tracking-[0.2em] mb-4 block">Key Concepts</span>
                           <div className="grid sm:grid-cols-2 gap-y-3 gap-x-8">
                             {mod.topics.map((topic, tIndex) => (
                               <div key={tIndex} className="flex items-start text-base text-zinc-300 font-medium group/topic">
                                 <div className="w-2 h-2 bg-violet-500/40 rounded-full mt-2 mr-3 flex-shrink-0 transition-colors group-hover/topic:bg-violet-500" />
                                 {topic}
                               </div>
                             ))}
                           </div>
                         </div>
                      </div>
                   </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* 6) Key Features */}
      <AnimatedSection dark>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center text-white">Why Choose Our DevOps Program?</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {["Tool-Focused Learning", "Real-world Scenarios", "Automation First", "Mentor Support"].map((feat, i) => (
              <motion.div 
                key={i} 
                whileHover={{ y: -10, borderColor: "rgba(139, 92, 246, 0.5)", backgroundColor: "rgba(24, 24, 27, 0.95)" }}
                className="bg-zinc-950 p-10 rounded-[32px] border border-zinc-800 text-center transition-all duration-300 group cursor-default shadow-xl"
              >
                <div className="w-20 h-1 bg-gradient-to-r from-violet-500 via-blue-500 to-cyan-500 mx-auto mb-8 rounded-full group-hover:w-full transition-all duration-500" />
                <h3 className="font-bold text-xl text-white tracking-tight">{feat}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* 7) Career Opportunities */}
      <AnimatedSection dark>
         <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center text-white">Career Opportunities</h2>
         <div className="flex flex-wrap justify-center gap-6 max-w-5xl mx-auto">
            {["DevOps Engineer", "Site Reliability Engineer (SRE)", "Release Manager", "Cloud Infrastructure Engineer", "Automation Architect"].map((role, i) => (
               <FadeIn key={i} delay={i * 0.05}>
                 <div className="px-10 py-5 rounded-2xl bg-zinc-950 border border-zinc-700/50 text-white font-bold text-lg shadow-2xl hover:border-violet-500/60 hover:text-violet-400 hover:scale-110 transition-all cursor-default backdrop-blur-md">
                   {role}
                 </div>
               </FadeIn>
            ))}
         </div>
         <p className="text-center text-zinc-500 mt-12 max-w-2xl mx-auto font-bold uppercase tracking-widest text-xs">
           High Paying Roles with Rapid Growth
         </p>
      </AnimatedSection>

      {/* 8) CTA */}
      <section className="py-32 bg-zinc-950 relative overflow-hidden text-center px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 to-black pointer-events-none" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-900/20 via-transparent to-transparent pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-10 tracking-tighter drop-shadow-2xl">Start Your DevOps Journey</h2>
          <p className="text-violet-100 text-2xl mb-16 max-w-2xl mx-auto font-medium leading-relaxed opacity-90">
            Join the ranks of elite engineers automating the world's infrastructure.
            Secure your spot today.
          </p>
          <Button 
            size="lg" 
            className="min-w-[300px] shadow-violet-500/40 shadow-2xl !bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white border-none font-bold text-2xl py-6 transition-all duration-500 uppercase tracking-widest hover:scale-110"
            onClick={() => navigate('/apply', { state: { selectedCourse: 'devops' } })}
          >
            Apply Now <ArrowRight className="w-8 h-8 ml-3" />
          </Button>
          <p className="mt-12 text-zinc-500 font-bold uppercase tracking-[0.3em] text-xs">
            Practical Labs • Certification Prep • Job Assistance
          </p>
        </div>
      </section>

    </div>
  );
};

export default DevOpsPage;