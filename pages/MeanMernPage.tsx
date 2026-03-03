import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, CheckCircle2, BookOpen,
  Globe, TrendingUp, Shield, Users, Server, Laptop, Database, Layers, Code,
  Layout, Terminal, Box, Braces, Zap
} from 'lucide-react';
import { 
  SiMongodb, SiExpress, SiAngular, SiNodedotjs, SiReact, SiJavascript, SiTypescript, SiRedux, SiTailwindcss, SiBootstrap, SiGit, SiHeroku
} from 'react-icons/si';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button, AnimatedSection, FadeIn } from '../components/UI';

// --- Background Animation Component ---
const FloatingMernIcons = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 2000], [0, 400]); 

  // MERN Theme: Green (Node/Mongo), Blue (React), Red (Angular), Yellow (JS)
  const iconTypes = [
    { Icon: SiMongodb, color: 'text-green-500', label: 'MongoDB' }, 
    { Icon: SiExpress, color: 'text-zinc-400', label: 'Express' }, 
    { Icon: SiReact, color: 'text-cyan-400', label: 'React' }, 
    { Icon: SiNodedotjs, color: 'text-green-600', label: 'Node.js' }, 
    { Icon: SiAngular, color: 'text-red-600', label: 'Angular' }, 
    { Icon: SiJavascript, color: 'text-yellow-400', label: 'JS' }, 
    { Icon: SiTypescript, color: 'text-blue-500', label: 'TS' }, 
    { Icon: SiRedux, color: 'text-purple-500', label: 'Redux' }, 
    { Icon: Braces, color: 'text-orange-400', label: 'JSON' }, 
    { Icon: Database, color: 'text-emerald-400', label: 'DB' },
    { Icon: Globe, color: 'text-teal-400', label: 'Web' },
  ];

  const [drops, setDrops] = useState<{id: number, Icon: any, color: string, left: number, top: number, duration: number, delay: number, size: number, opacity: number}[]>([]);

  useEffect(() => {
    setDrops(
      Array.from({ length: 125 }).map((_, i) => ({
        id: i,
        ...iconTypes[Math.floor(Math.random() * iconTypes.length)],
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: 20 + Math.random() * 30,
        delay: -Math.random() * 20, // Instant start
        size: 24 + Math.random() * 45,
        opacity: 0.15 + Math.random() * 0.10 
      }))
    );
  }, []);

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
    title: "Introduction to Full Stack Development",
    Icon: Layers,
    color: "text-teal-400",
    desc: "Understand the big picture. Learn what it takes to build a complete web application from scratch.",
    why: "Knowing the ecosystem is the first step to mastering it.",
    topics: ["What is Full Stack?", "MEAN vs MERN Stack", "Modern Web Architecture", "Setting up the Environment"]
  },
  {
    title: "JavaScript Fundamentals (Review)",
    Icon: SiJavascript,
    color: "text-yellow-400",
    desc: "Master the language of the web. Deep dive into ES6+ features and asynchronous programming.",
    why: "JavaScript is the engine that powers the entire stack. You can't skip this.",
    topics: ["ES6+ Features (Arrow Functions, Destructuring)", "Async/Await & Promises", "DOM Manipulation", "Functional Programming Basics"]
  },
  {
    title: "Frontend with Angular (MEAN)",
    Icon: SiAngular,
    color: "text-red-600",
    desc: "Build enterprise-grade applications with Google's powerful framework.",
    why: "Angular is a favorite for large-scale corporate applications.",
    topics: ["Angular Architecture", "Components & Templates", "Services & Dependency Injection", "Routing & Forms"]
  },
  {
    title: "Frontend with React (MERN)",
    Icon: SiReact,
    color: "text-cyan-400",
    desc: "Create dynamic, high-performance user interfaces with Facebook's library.",
    why: "React is the most popular frontend library in the world right now.",
    topics: ["JSX & Components", "Hooks (useState, useEffect)", "State Management", "React Router"]
  },
  {
    title: "Node.js & Express.js Backend",
    Icon: SiNodedotjs,
    color: "text-green-600",
    desc: "Run JavaScript on the server. Build fast, scalable network applications.",
    why: "Node.js unifies web development with a single language across the stack.",
    topics: ["Node.js Event Loop", "Modules & NPM", "Express.js Framework", "Middleware & Routing"]
  },
  {
    title: "REST API Development",
    Icon: Server,
    color: "text-purple-500",
    desc: "Build the communication layer. Design and implement robust APIs.",
    why: "APIs are the bridge between your frontend and backend.",
    topics: ["REST Architecture", "CRUD Operations", "Handling Requests/Responses", "Status Codes & Error Handling"]
  },
  {
    title: "MongoDB Fundamentals",
    Icon: SiMongodb,
    color: "text-green-500",
    desc: "Master NoSQL databases. Store data in flexible, JSON-like documents.",
    why: "MongoDB is built for modern application data structures.",
    topics: ["NoSQL vs SQL", "Collections & Documents", "CRUD with MongoDB Shell", "Indexing & Aggregation"]
  },
  {
    title: "Database Integration (Mongoose)",
    Icon: Database,
    color: "text-emerald-400",
    desc: "Connect your Node app to MongoDB efficiently.",
    why: "Mongoose makes interacting with MongoDB simple and powerful.",
    topics: ["Schemas & Models", "Data Validation", "Async Database Queries", "Population & Relationships"]
  },
  {
    title: "Authentication & Authorization",
    Icon: Shield,
    color: "text-indigo-500",
    desc: "Secure your application. Implement user login and protected routes.",
    why: "Security is paramount. Every app needs to know who is accessing it.",
    topics: ["JWT (JSON Web Tokens)", "Password Hashing (Bcrypt)", "Protected Routes", "Role-based Access"]
  },
  {
    title: "State Management (Redux/Context)",
    Icon: SiRedux,
    color: "text-purple-600",
    desc: "Manage complex application state across your frontend.",
    why: "As apps grow, managing data flow becomes critical.",
    topics: ["Context API", "Redux Toolkit", "Global State Store", "Async Actions"]
  },
  {
    title: "Full-Stack Project Integration",
    Icon: Code,
    color: "text-orange-500",
    desc: "Put it all together. Connect your frontend to your backend API.",
    why: "This is where you become a true full-stack developer.",
    topics: ["Connecting React/Angular to Node", "CORS & Proxy", "End-to-End Data Flow", "Debugging Full Stack Apps"]
  },
  {
    title: "Deployment & Best Practices",
    Icon: Globe,
    color: "text-blue-500",
    desc: "Go live. Deploy your application to the cloud.",
    why: "An app on your localhost doesn't count. Show the world what you built.",
    topics: ["Environment Variables", "Production Builds", "Deploying to Heroku/Vercel", "Code Structure & Clean Code"]
  },
];

const MeanMernPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 font-sans text-zinc-100 selection:bg-teal-500/30 overflow-x-hidden">
      
      {/* GLOBAL BACKGROUND ICONS */}
      <FloatingMernIcons />

      {/* 1) Course Information (Hero) */}
      <section className="relative pt-32 pb-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-900/20 via-zinc-950 to-zinc-950 pointer-events-none z-0" />
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <FadeIn>
            <div className="inline-flex items-center justify-center p-3 mb-8 rounded-2xl bg-zinc-900/60 border border-zinc-700/50 shadow-2xl backdrop-blur-xl">
               <div className="bg-gradient-to-r from-teal-500 to-green-500 p-2 rounded-lg mr-3 shadow-lg">
                 <SiJavascript className="w-6 h-6 text-white" />
               </div>
               <span className="text-xl font-bold tracking-tight text-white">MEAN & MERN Stack Masterclass</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight leading-tight text-white drop-shadow-sm">
              Master the Web with <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-green-400 to-yellow-400 animate-text-shimmer bg-[length:200%_auto]">
                JavaScript.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-zinc-200 max-w-3xl mx-auto mb-10 leading-relaxed font-normal drop-shadow-md">
              Become a complete Full Stack Developer. Build dynamic, scalable web applications using MongoDB, Express, Angular/React, and Node.js.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                size="lg" 
                onClick={() => navigate('/apply', { state: { selectedCourse: 'mean-mern' } })} 
                className="min-w-[220px] shadow-teal-500/40 shadow-2xl !bg-gradient-to-r from-teal-600 to-green-600 hover:from-teal-500 hover:to-green-500 text-white border-none font-bold text-lg transition-all duration-300 active:scale-95 py-4"
              >
                Enroll Now
              </Button>
              <Button 
                variant="outline"
                size="lg" 
                onClick={() => document.getElementById('syllabus')?.scrollIntoView({ behavior: 'smooth'})} 
                className="min-w-[220px] text-white border-white/20 hover:border-teal-500/50 hover:!bg-teal-500/10 backdrop-blur-md !bg-transparent transition-all duration-300 active:scale-95 py-4 group"
                leftIcon={() => <BookOpen className="w-5 h-5 mr-2 text-teal-400" />}
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
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center text-white">Full Stack Mastery</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "MongoDB (NoSQL)", services: "Document Database, Mongoose ORM, Aggregation Pipeline", Icon: SiMongodb, color: "text-green-500", border: "hover:border-green-500/50" },
              { title: "Express.js", services: "RESTful APIs, Middleware, Routing, Server-Side Logic", Icon: SiExpress, color: "text-zinc-400", border: "hover:border-zinc-500/50" },
              { title: "Angular (MEAN)", services: "TypeScript, Components, Dependency Injection, RxJS", Icon: SiAngular, color: "text-red-600", border: "hover:border-red-600/50" },
              { title: "Node.js", services: "Event Loop, Async Programming, NPM, Backend Architecture", Icon: SiNodedotjs, color: "text-green-600", border: "hover:border-green-600/50" },
              { title: "React.js (MERN)", services: "Virtual DOM, Hooks, Redux, Context API, Tailwind CSS", Icon: SiReact, color: "text-cyan-400", border: "hover:border-cyan-500/50" },
              { title: "JavaScript Ecosystem", services: "ES6+, Async/Await, Promises, JSON, Webpack", Icon: SiJavascript, color: "text-yellow-400", border: "hover:border-yellow-500/50" },
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
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-zinc-900/90 to-zinc-950 rounded-3xl p-8 md:p-12 border border-zinc-700/50 shadow-2xl relative overflow-hidden group hover:border-teal-500/30 transition-all duration-500 backdrop-blur-sm">
          <div className="absolute top-0 right-0 p-12 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity duration-700 pointer-events-none transform translate-x-10 -translate-y-10">
            <SiJavascript className="w-80 h-80 text-yellow-500" />
          </div>
          <h2 className="text-3xl font-bold mb-6 relative z-10 text-white">Prerequisites</h2>
          <p className="text-zinc-200 mb-8 relative z-10 text-lg font-medium">
            This course is designed to take you from basics to pro. A few things help:
          </p>
          <ul className="space-y-5 relative z-10">
            {[
              "Basic understanding of HTML & CSS.",
              "Familiarity with programming concepts (variables, loops).",
              "A passion for building things on the web.",
              "No prior backend experience required."
            ].map((text, i) => (
              <li key={i} className="flex items-center text-zinc-100 font-medium">
                <span className="w-2.5 h-2.5 bg-teal-500 rounded-full mr-4 shadow-[0_0_12px_rgba(20,184,166,0.8)] border border-teal-400/50" />
                {text}
              </li>
            ))}
          </ul>
        </div>
      </AnimatedSection>

      {/* 4) Why MEAN/MERN? */}
      <AnimatedSection dark>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">Why Learn Full Stack JS?</h2>
            <div className="space-y-10">
              {[
                { icon: SiJavascript, title: "One Language Everywhere", desc: "Use JavaScript for both client-side and server-side development. Simplify your stack." },
                { icon: TrendingUp, title: "High Demand", desc: "Startups and enterprises alike love the speed and scalability of Node.js and React/Angular." },
                { icon: Zap, title: "Rapid Development", desc: "Build prototypes and production apps faster with a unified JSON-based data structure." }
              ].map((item, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="flex gap-5 group">
                    <div className="flex-shrink-0 mt-1 bg-zinc-900 p-3 rounded-xl border border-zinc-700 group-hover:border-teal-500/50 transition-all shadow-lg">
                      <item.icon className="w-6 h-6 text-teal-400" />
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
             <div className="absolute inset-0 bg-gradient-to-r from-teal-600/20 to-green-500/20 blur-[80px] rounded-full" />
             <div className="bg-zinc-900/90 backdrop-blur-xl rounded-3xl p-10 border border-zinc-700/50 shadow-2xl relative hover:border-teal-500/40 transition-all duration-500">
                
                {/* Visual Representation of MERN Architecture */}
                <div className="flex flex-col gap-6">
                   <div className="flex items-center gap-4 bg-zinc-950/50 p-4 rounded-xl border border-cyan-500/30">
                      <div className="w-10 h-10 bg-cyan-900/30 rounded-lg flex items-center justify-center text-cyan-400"><SiReact className="w-6 h-6" /></div>
                      <div>
                        <p className="text-white font-bold">Client Side</p>
                        <p className="text-xs text-zinc-400">React / Angular UI</p>
                      </div>
                   </div>
                   
                   <div className="h-8 w-0.5 bg-zinc-700 mx-auto"></div>

                   <div className="flex items-center gap-4 bg-zinc-950/50 p-4 rounded-xl border border-green-500/30">
                      <div className="w-10 h-10 bg-green-900/30 rounded-lg flex items-center justify-center text-green-400"><SiNodedotjs className="w-6 h-6" /></div>
                      <div>
                        <p className="text-white font-bold">Server Side</p>
                        <p className="text-xs text-zinc-400">Node.js & Express</p>
                      </div>
                   </div>

                   <div className="h-8 w-0.5 bg-zinc-700 mx-auto"></div>

                   <div className="flex items-center gap-4 bg-zinc-950/50 p-4 rounded-xl border border-emerald-500/30">
                      <div className="w-10 h-10 bg-emerald-900/30 rounded-lg flex items-center justify-center text-emerald-400"><SiMongodb className="w-6 h-6" /></div>
                      <div>
                        <p className="text-white font-bold">Database</p>
                        <p className="text-xs text-zinc-400">MongoDB Atlas</p>
                      </div>
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
             <span className="text-teal-500 font-bold tracking-[0.2em] text-xs uppercase mb-4 block">Complete Roadmap</span>
             <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Course Syllabus</h2>
             <p className="text-zinc-200 text-lg font-medium">From HTML basics to Full Stack Deployment.</p>
          </div>
          
          <div className="space-y-8">
            {SYLLABUS_MODULES.map((mod, i) => (
              <motion.div 
                key={i} 
                whileHover={{ borderColor: "rgba(20, 184, 166, 0.4)", backgroundColor: "rgba(9, 9, 11, 0.98)" }}
                className="bg-zinc-950 rounded-3xl border border-zinc-800 overflow-hidden hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-500"
              >
                <div className="p-8 md:p-12">
                   <div className="flex flex-col md:flex-row gap-10">
                      <div className="flex-shrink-0">
                         <div className={`w-16 h-16 bg-zinc-900 rounded-2xl flex items-center justify-center border border-zinc-800 shadow-inner group-hover:border-teal-500/30 transition-colors`}>
                           <mod.Icon className={`w-8 h-8 ${mod.color}`} />
                         </div>
                      </div>
                      <div className="flex-grow">
                         <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">{mod.title}</h3>
                         <p className="text-zinc-300 mb-6 leading-relaxed font-medium text-lg">{mod.desc}</p>
                         
                         <div className="mb-8 p-6 bg-zinc-900/40 rounded-2xl border border-zinc-800/50 backdrop-blur-sm">
                            <span className="text-xs font-black text-teal-500 uppercase tracking-[0.15em] block mb-3">Why this matters</span>
                            <p className="text-zinc-100 text-base italic font-medium">"{mod.why}"</p>
                         </div>

                         <div>
                           <span className="text-xs font-black text-zinc-500 uppercase tracking-[0.2em] mb-4 block">Key Concepts</span>
                           <div className="grid sm:grid-cols-2 gap-y-3 gap-x-8">
                             {mod.topics.map((topic, tIndex) => (
                               <div key={tIndex} className="flex items-start text-base text-zinc-300 font-medium group/topic">
                                 <div className="w-2 h-2 bg-teal-500/40 rounded-full mt-2 mr-3 flex-shrink-0 transition-colors group-hover/topic:bg-teal-500" />
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
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center text-white">Why This Course?</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {["Real-world Projects", "Code Reviews", "Interview Prep", "Lifetime Access"].map((feat, i) => (
              <motion.div 
                key={i} 
                whileHover={{ y: -10, borderColor: "rgba(20, 184, 166, 0.5)", backgroundColor: "rgba(24, 24, 27, 0.95)" }}
                className="bg-zinc-950 p-10 rounded-[32px] border border-zinc-800 text-center transition-all duration-300 group cursor-default shadow-xl"
              >
                <div className="w-20 h-1 bg-gradient-to-r from-teal-500 to-green-500 mx-auto mb-8 rounded-full group-hover:w-full transition-all duration-500" />
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
            {["MERN Stack Developer", "MEAN Stack Developer", "Frontend Engineer", "Backend Developer", "JavaScript Engineer"].map((role, i) => (
               <FadeIn key={i} delay={i * 0.05}>
                 <div className="px-10 py-5 rounded-2xl bg-zinc-950 border border-zinc-700/50 text-white font-bold text-lg shadow-2xl hover:border-teal-500/60 hover:text-teal-400 hover:scale-110 transition-all cursor-default backdrop-blur-md">
                   {role}
                 </div>
               </FadeIn>
            ))}
         </div>
         <p className="text-center text-zinc-500 mt-12 max-w-2xl mx-auto font-bold uppercase tracking-widest text-xs">
           High Paying Roles in Tech & Startups
         </p>
      </AnimatedSection>

      {/* 8) CTA */}
      <section className="py-32 bg-zinc-950 relative overflow-hidden text-center px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 to-black pointer-events-none" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-teal-900/20 via-transparent to-transparent pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-10 tracking-tighter drop-shadow-2xl">Start Your Full Stack Journey</h2>
          <p className="text-teal-100 text-2xl mb-16 max-w-2xl mx-auto font-medium leading-relaxed opacity-90">
            Build modern, scalable applications from front to back.
            Secure your spot today.
          </p>
          <Button 
            size="lg" 
            className="min-w-[300px] shadow-teal-500/40 shadow-2xl !bg-gradient-to-r from-teal-600 to-green-600 hover:from-teal-500 hover:to-green-500 text-white border-none font-bold text-2xl py-6 transition-all duration-500 uppercase tracking-widest hover:scale-110"
            onClick={() => navigate('/apply', { state: { selectedCourse: 'mean-mern' } })}
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

export default MeanMernPage;