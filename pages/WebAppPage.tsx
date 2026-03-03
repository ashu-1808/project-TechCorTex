import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, BookOpen, Code, Globe, Laptop, Smartphone, Zap, 
  Shield, Layout, Eye, Gauge, Terminal, Cpu, CheckCircle2,
  MousePointer2, Layers, Type, PanelsTopLeft
} from 'lucide-react';
import { 
  SiHtml5, SiCss3, SiJavascript, SiReact, SiTypescript, SiVite
} from 'react-icons/si';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button, AnimatedSection, FadeIn } from '../components/UI';

// --- Background Animation Component ---
const FloatingWebIcons = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 2000], [0, 400]); 

  const iconTypes = [
    { Icon: SiHtml5, color: 'text-orange-500', label: 'HTML5' }, 
    { Icon: SiCss3, color: 'text-blue-500', label: 'CSS3' }, 
    { Icon: SiJavascript, color: 'text-yellow-400', label: 'JS' }, 
    { Icon: SiReact, color: 'text-cyan-400', label: 'React' }, 
    { Icon: Code, color: 'text-zinc-100', label: 'Code' }, 
    { Icon: Layout, color: 'text-purple-400', label: 'Layout' }, 
    { Icon: Globe, color: 'text-emerald-400', label: 'Web' }, 
    { Icon: Laptop, color: 'text-zinc-400', label: 'Dev' }, 
    { Icon: Smartphone, color: 'text-blue-300', label: 'Mobile' },
    { Icon: SiVite, color: 'text-violet-500', label: 'Vite' },
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
        delay: -Math.random() * 20,
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
    title: "Introduction to the Web & Browsers",
    Icon: Globe,
    color: "text-emerald-400",
    desc: "Understand the foundation of the internet. Learn how requests travel from your browser to a server and back.",
    why: "Knowing how the environment works is the first step to building effective tools for it.",
    topics: ["How the Web works", "Client-Server Architecture", "DNS & HTTP/HTTPS", "Browser Rendering Engines"]
  },
  {
    title: "Modern HTML (Semantic & Structured Markup)",
    Icon: SiHtml5,
    color: "text-orange-500",
    desc: "Build the skeleton of the web. Focus on meaningful, accessible, and SEO-friendly structure.",
    why: "Semantic HTML is the backbone of accessibility and search engine visibility.",
    topics: ["HTML5 Fundamentals", "Semantic Elements", "Forms, Inputs & Validation", "Document Object Model (DOM)"]
  },
  {
    title: "Modern CSS (Layout & Styling)",
    Icon: SiCss3,
    color: "text-blue-500",
    desc: "Master the art of design in code. Learn to build beautiful, modular, and maintainable styles.",
    why: "Great code needs a great interface. CSS is how you bring life to your applications.",
    topics: ["CSS Fundamentals", "Flexbox & Grid Layouts", "CSS Variables & Custom Properties", "Modular CSS Strategies"]
  },
  // Placeholder 1
  {
    title: "JavaScript Fundamentals",
    Icon: SiJavascript,
    color: "text-yellow-400",
    desc: "The logic of the web. Start your journey into programming with the language of the browser.",
    why: "JavaScript turns static pages into interactive applications.",
    topics: ["Variables & Data Types", "Functions & Scope", "Events & DOM Manipulation", "Control Flow & Logic"]
  },
  {
    title: "JavaScript ES6+ Features",
    Icon: Zap,
    color: "text-yellow-300",
    desc: "Modern JavaScript for modern apps. Master the syntax that makes development faster and cleaner.",
    why: "ES6+ is the industry standard. It's essential for working with modern frameworks.",
    topics: ["Arrow Functions & Destructuring", "Spread/Rest Operators", "ES Modules", "Async/Await & Promises"]
  },
  {
    title: "Responsive UI Design",
    Icon: Smartphone,
    color: "text-blue-300",
    desc: "One web, many devices. Learn to build layouts that look perfect on phones, tablets, and desktops.",
    why: "Users are everywhere. Your app must be wherever they are.",
    topics: ["Mobile-First Design", "Media Queries", "Responsive Images", "Cross-Device Compatibility"]
  },
  // Placeholder 2
  {
    title: "Frontend Architecture Basics",
    Icon: Layers,
    color: "text-indigo-400",
    desc: "Build for scale. Learn how to organize your code so it stays maintainable as it grows.",
    why: "Good architecture prevents 'spaghetti code' and allows teams to collaborate effectively.",
    topics: ["Separation of Concerns", "Reusable Component Logic", "Folder Structure Patterns", "Scalable Styling"]
  },
  {
    title: "Web Accessibility (a11y)",
    Icon: Eye,
    color: "text-cyan-400",
    desc: "Build for everyone. Ensure your applications are usable by people with different abilities.",
    why: "Accessibility is a right, not a feature. It's also required by law in many sectors.",
    topics: ["Why Accessibility Matters", "Keyboard Navigation", "ARIA Roles & Attributes", "Color Contrast & Screen Readers"]
  },
  {
    title: "Performance Optimization Fundamentals",
    Icon: Gauge,
    color: "text-rose-500",
    desc: "Speed is a feature. Learn to make your web apps load fast and run smooth.",
    why: "Users leave slow sites. Performance directly impacts engagement and conversion.",
    topics: ["Reducing Load Times", "Asset Optimization", "Efficient Rendering", "Web Vitals Basics"]
  },
  // Placeholder 3
  {
    title: "Modern Development Workflow",
    Icon: Terminal,
    color: "text-zinc-400",
    desc: "Work like a pro. Master the tools and techniques used in professional development teams.",
    why: "The right workflow makes you 10x more productive and reduces bugs.",
    topics: ["Browser Dev Tools Mastery", "Debugging Techniques", "Linting & Formatting", "Build Tools Overview"]
  },
  {
    title: "Mini Projects & Practical Exercises",
    Icon: Laptop,
    color: "text-emerald-400",
    desc: "Build real things. Apply everything you've learned to create production-ready UI components.",
    why: "Building projects is the best way to solidify your knowledge and build a portfolio.",
    topics: ["Responsive Landing Pages", "Interactive UI Widgets", "Accessible Form Systems", "Performance Case Studies"]
  },
];

const WebAppPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 font-sans text-zinc-100 selection:bg-blue-500/30 overflow-x-hidden">
      
      {/* GLOBAL BACKGROUND ICONS */}
      <FloatingWebIcons />

      {/* 1) Course Information (Hero) */}
      <section className="relative pt-32 pb-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-zinc-950 to-zinc-950 pointer-events-none z-0" />
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <FadeIn>
            <div className="inline-flex items-center justify-center p-3 mb-8 rounded-2xl bg-zinc-900/60 border border-zinc-700/50 shadow-2xl backdrop-blur-xl">
               <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-2 rounded-lg mr-3 shadow-lg">
                 <PanelsTopLeft className="w-6 h-6 text-white" />
               </div>
               <span className="text-xl font-bold tracking-tight text-white">Web App Development</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight leading-tight text-white drop-shadow-sm">
              Architect the <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-sky-400 animate-text-shimmer bg-[length:200%_auto]">
                Modern Web Interface.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-zinc-200 max-w-3xl mx-auto mb-10 leading-relaxed font-normal drop-shadow-md">
              Master the core fundamentals of frontend engineering. Build high-performance, 
              accessible, and responsive web applications from the ground up.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                size="lg" 
                onClick={() => navigate('/apply', { state: { selectedCourse: 'webapp-dev' } })} 
                className="min-w-[220px] shadow-blue-500/20 shadow-2xl !bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white border-none font-bold text-lg transition-all duration-300 active:scale-95 py-4"
              >
                Enroll Now
              </Button>
              <Button 
                variant="outline"
                size="lg" 
                onClick={() => document.getElementById('syllabus')?.scrollIntoView({ behavior: 'smooth'})} 
                className="min-w-[220px] text-white border-white/20 hover:border-blue-500/50 hover:!bg-blue-500/10 backdrop-blur-md !bg-transparent transition-all duration-300 active:scale-95 py-4 group"
                leftIcon={() => <BookOpen className="w-5 h-5 mr-2 text-blue-400" />}
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
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center text-white">What Will You Learn?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Semantic Markup", desc: "Build structured, search-engine-friendly web pages", Icon: SiHtml5, color: "text-orange-500" },
              { title: "Modern JavaScript", desc: "Write clean, efficient, and interactive logic with ES6+", Icon: SiJavascript, color: "text-yellow-400" },
              { title: "Responsive UIs", desc: "Create layouts that adapt perfectly to any screen size", Icon: Smartphone, color: "text-blue-300" },
              { title: "Performant Apps", desc: "Master rendering speed and optimization techniques", Icon: Gauge, color: "text-rose-500" },
            ].map((item, i) => (
              <motion.div 
                key={i} 
                whileHover={{ scale: 1.03, backgroundColor: "rgba(24, 24, 27, 0.95)" }}
                className={`bg-zinc-900/90 backdrop-blur-lg p-6 rounded-2xl border border-zinc-700/50 hover:border-blue-500/30 transition-all cursor-default group h-full`}
              >
                <div className="flex flex-col items-center text-center h-full">
                  <div className={`bg-zinc-950 p-3 rounded-xl mb-4 border border-zinc-700/50 shadow-inner`}>
                    <item.Icon className={`w-8 h-8 ${item.color}`} />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-zinc-300 text-sm leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* 3) Requirements */}
      <AnimatedSection>
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-zinc-900/90 to-zinc-950 rounded-3xl p-8 md:p-12 border border-zinc-700/50 shadow-2xl relative overflow-hidden group hover:border-blue-500/30 transition-all duration-500 backdrop-blur-sm">
          <div className="absolute top-0 right-0 p-12 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity duration-700 pointer-events-none transform translate-x-10 -translate-y-10">
            <Type className="w-80 h-80 text-blue-500" />
          </div>
          <h2 className="text-3xl font-bold mb-6 relative z-10 text-white">Prerequisites</h2>
          <p className="text-zinc-200 mb-8 relative z-10 text-lg font-medium">
            No strict prerequisites. We start from the basics and go to pro.
          </p>
          <ul className="space-y-5 relative z-10">
            {[
              "Basic computer usage familiarity.",
              "Logical thinking and a willingness to learn.",
              "Optional: Very basic HTML exposure is helpful but not required.",
              "A hunger to build things that live on the web."
            ].map((text, i) => (
              <li key={i} className="flex items-center text-zinc-100 font-medium">
                <CheckCircle2 className="w-5 h-5 text-blue-500 mr-4 flex-shrink-0" />
                {text}
              </li>
            ))}
          </ul>
        </div>
      </AnimatedSection>

      {/* 4) Why Web App Development Matters? */}
      <AnimatedSection dark>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">Why Learn Web Fundamentals?</h2>
            <div className="space-y-10">
              {[
                { icon: MousePointer2, title: "Unmatched User Experience", desc: "Fundamentals are the key to building interfaces that feel intuitive and fast." },
                { icon: Shield, title: "Accessibility for All", desc: "Learn to build a web that everyone can use, regardless of their hardware or ability." },
                { icon: Gauge, title: "Peak Performance", desc: "Modern users expect instant results. Learn the techniques that deliver them." }
              ].map((item, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="flex gap-5 group">
                    <div className="flex-shrink-0 mt-1 bg-zinc-900 p-3 rounded-xl border border-zinc-700 group-hover:border-blue-500/50 transition-all shadow-lg">
                      <item.icon className="w-6 h-6 text-blue-400" />
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
             <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-500/20 blur-[80px] rounded-full" />
             <div className="bg-zinc-900/90 backdrop-blur-xl rounded-3xl p-10 border border-zinc-700/50 shadow-2xl relative hover:border-blue-500/40 transition-all duration-500">
                {/* Visual Representation of Layout/Grid */}
                <div className="grid grid-cols-4 grid-rows-3 gap-2 h-48">
                   <div className="col-span-4 bg-blue-500/20 rounded-lg border border-blue-500/30 flex items-center justify-center text-[10px] text-blue-400 font-mono">Header</div>
                   <div className="col-span-1 row-span-2 bg-zinc-800 rounded-lg border border-zinc-700 flex items-center justify-center text-[10px] text-zinc-500 font-mono text-center">Sidebar</div>
                   <div className="col-span-3 row-span-2 bg-zinc-800 rounded-lg border border-zinc-700 p-3 overflow-hidden">
                      <div className="h-2 w-1/2 bg-blue-400/20 rounded-full mb-2"></div>
                      <div className="h-2 w-3/4 bg-zinc-700 rounded-full mb-2"></div>
                      <div className="h-2 w-full bg-zinc-700 rounded-full mb-2"></div>
                      <div className="grid grid-cols-3 gap-2 mt-4">
                        <div className="h-8 bg-zinc-700 rounded"></div>
                        <div className="h-8 bg-zinc-700 rounded"></div>
                        <div className="h-8 bg-zinc-700 rounded"></div>
                      </div>
                   </div>
                </div>
                <div className="mt-6 flex justify-between items-center text-xs font-mono text-zinc-500">
                  <span>viewport: 1440px</span>
                  <div className="flex gap-2">
                    <div className="w-4 h-4 rounded bg-blue-500/40"></div>
                    <div className="w-4 h-4 rounded bg-cyan-500/40"></div>
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
             <span className="text-blue-500 font-bold tracking-[0.2em] text-xs uppercase mb-4 block">Foundation Roadmap</span>
             <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Course Syllabus</h2>
             <p className="text-zinc-200 text-lg font-medium">From basic HTML to high-performance frontend engineering.</p>
          </div>
          
          <div className="space-y-8">
            {SYLLABUS_MODULES.map((mod, i) => (
              <React.Fragment key={i}>
                <motion.div 
                  whileHover={{ borderColor: "rgba(59, 130, 246, 0.4)", backgroundColor: "rgba(9, 9, 11, 0.98)" }}
                  className="bg-zinc-950 rounded-3xl border border-zinc-800 overflow-hidden hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-500"
                >
                  <div className="p-8 md:p-12">
                     <div className="flex flex-col md:flex-row gap-10">
                        <div className="flex-shrink-0">
                           <div className={`w-16 h-16 bg-zinc-900 rounded-2xl flex items-center justify-center border border-zinc-800 shadow-inner group-hover:border-blue-500/30 transition-colors`}>
                             <mod.Icon className={`w-8 h-8 ${mod.color}`} />
                           </div>
                        </div>
                        <div className="flex-grow">
                           <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">{mod.title}</h3>
                           <p className="text-zinc-300 mb-6 leading-relaxed font-medium text-lg">{mod.desc}</p>
                           
                           <div className="mb-8 p-6 bg-zinc-900/40 rounded-2xl border border-zinc-800/50 backdrop-blur-sm">
                              <span className="text-xs font-black text-blue-500 uppercase tracking-[0.15em] block mb-3">Why this matters</span>
                              <p className="text-zinc-100 text-base italic font-medium">"{mod.why}"</p>
                           </div>

                           <div>
                             <span className="text-xs font-black text-zinc-500 uppercase tracking-[0.2em] mb-4 block">Key Topics</span>
                             <div className="grid sm:grid-cols-2 gap-y-3 gap-x-8">
                               {mod.topics.map((topic, tIndex) => (
                                 <div key={tIndex} className="flex items-start text-base text-zinc-300 font-medium group/topic">
                                   <div className="w-2 h-2 bg-blue-500/40 rounded-full mt-2 mr-3 flex-shrink-0 transition-colors group-hover/topic:bg-blue-500" />
                                   {topic}
                                 </div>
                               ))}
                             </div>
                           </div>
                        </div>
                     </div>
                  </div>
                </motion.div>
                
                {/* Visual Placeholders at specific indices */}
                {(i === 2 || i === 5 || i === 8) && (
                   <div className="py-8 flex justify-center opacity-30">
                      <div className="w-full h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />
                   </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* 6) What You Will Learn (Summary) */}
      <AnimatedSection dark>
        <div className="max-w-5xl mx-auto bg-zinc-900/50 rounded-3xl p-10 border border-zinc-800">
           <h2 className="text-3xl font-bold mb-8 text-center text-white">Course Outcomes</h2>
           <div className="grid md:grid-cols-2 gap-6">
              {[
                 "Build production-ready, semantic web interfaces.",
                 "Write clean, logic-driven modern JavaScript.",
                 "Create truly responsive designs for any device.",
                 "Apply accessibility standards (a11y) to your apps.",
                 "Optimize frontend performance for maximum speed.",
                 "Understand professional dev workflows and tools."
              ].map((outcome, i) => (
                 <div key={i} className="flex items-center text-lg text-zinc-200">
                    <CheckCircle2 className="w-6 h-6 text-blue-400 mr-4 flex-shrink-0" />
                    {outcome}
                 </div>
              ))}
           </div>
        </div>
      </AnimatedSection>

      {/* 7) Key Features */}
      <AnimatedSection dark>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center text-white">Why This Course?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              "Fundamentals-First Approach", 
              "Hands-on UI Building", 
              "Accessibility-Aware Dev", 
              "Performance-Focused Mindset"
            ].map((feat, i) => (
              <motion.div 
                key={i} 
                whileHover={{ y: -10, borderColor: "rgba(59, 130, 246, 0.5)", backgroundColor: "rgba(24, 24, 27, 0.95)" }}
                className="bg-zinc-950 p-10 rounded-[32px] border border-zinc-800 text-center transition-all duration-300 group cursor-default shadow-xl h-full flex flex-col justify-between"
              >
                <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto mb-8 rounded-full group-hover:w-full transition-all duration-500" />
                <h3 className="font-bold text-xl text-white tracking-tight">{feat}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* 8) Career Path & Skill Relevance */}
      <AnimatedSection dark>
         <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center text-white">Career Path</h2>
         <div className="flex flex-wrap justify-center gap-6 max-w-5xl mx-auto">
            {["Frontend Developer", "UI Engineer", "Web Developer", "Accessibility Specialist", "Product Engineer"].map((role, i) => (
               <FadeIn key={i} delay={i * 0.05}>
                 <div className="px-10 py-5 rounded-2xl bg-zinc-950 border border-zinc-700/50 text-white font-bold text-lg shadow-2xl hover:border-blue-500/60 hover:text-blue-400 hover:scale-110 transition-all cursor-default backdrop-blur-md">
                   {role}
                 </div>
               </FadeIn>
            ))}
         </div>
         <p className="text-center text-zinc-500 mt-12 max-w-2xl mx-auto font-bold uppercase tracking-widest text-xs">
           Strong fundamentals are the foundation of any elite frontend career
         </p>
      </AnimatedSection>

      {/* 9) Start Your Journey Today (CTA) */}
      <section className="py-32 bg-zinc-950 relative overflow-hidden text-center px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 to-black pointer-events-none" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-10 tracking-tighter drop-shadow-2xl">Start Your Journey Today</h2>
          <p className="text-blue-100 text-2xl mb-16 max-w-2xl mx-auto font-medium leading-relaxed opacity-90">
            Build the web of tomorrow. Master the skills that 
            power the world's most successful applications.
          </p>
          <Button 
            size="lg" 
            className="min-w-[300px] shadow-blue-500/40 shadow-2xl !bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white border-none font-bold text-2xl py-6 transition-all duration-500 uppercase tracking-widest hover:scale-110"
            onClick={() => navigate('/apply', { state: { selectedCourse: 'webapp-dev' } })}
          >
            Apply Now <ArrowRight className="w-8 h-8 ml-3" />
          </Button>
          <p className="mt-12 text-zinc-500 font-bold uppercase tracking-[0.3em] text-xs">
            Hands-on • Project-Based • Career-Focused
          </p>
        </div>
      </section>

    </div>
  );
};

export default WebAppPage;