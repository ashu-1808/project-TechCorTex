import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, CheckCircle2, BookOpen,
  Globe, TrendingUp, Shield, Users, Server, Laptop, Database, Layers, Code,
  Layout, Smartphone, Terminal, Coffee, Box
} from 'lucide-react';
import { 
  SiSpringboot, SiSpring, SiReact, SiHibernate, SiMysql, SiPostgresql, 
  SiHtml5, SiCss3, SiJavascript, SiTypescript, SiJunit5, SiApachemaven, SiDocker, SiJenkins
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button, AnimatedSection, FadeIn } from '../components/UI';

// --- Background Animation Component ---
const FloatingJavaIcons = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 2000], [0, 400]); 

  const iconTypes = [
    { Icon: FaJava, color: 'text-red-500', label: 'Java' }, 
    { Icon: SiSpringboot, color: 'text-green-500', label: 'Spring Boot' }, 
    { Icon: SiReact, color: 'text-cyan-400', label: 'React' }, 
    { Icon: SiMysql, color: 'text-blue-500', label: 'MySQL' }, 
    { Icon: SiHibernate, color: 'text-yellow-600', label: 'Hibernate' }, 
    { Icon: SiHtml5, color: 'text-orange-500', label: 'HTML5' }, 
    { Icon: SiJavascript, color: 'text-yellow-400', label: 'JS' }, 
    { Icon: SiApachemaven, color: 'text-red-600', label: 'Maven' }, 
    { Icon: Coffee, color: 'text-orange-800', label: 'OOP' }, 
    { Icon: Database, color: 'text-blue-400', label: 'DB' },
    { Icon: SiDocker, color: 'text-blue-500', label: 'Docker' },
  ];

  // Initialize immediately
  const [drops] = useState(() => 
    Array.from({ length: 125 }).map((_, i) => {
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
    title: "Introduction to Programming with Java",
    Icon: FaJava,
    color: "text-red-500",
    desc: "Start your journey with the world's most popular enterprise language.",
    why: "Java powers the backend of most Fortune 500 companies.",
    topics: ["Why Java?", "JDK, JRE & JVM Architecture", "Data Types & Variables", "Control Flow Statements"]
  },
  {
    title: "Object-Oriented Programming (OOP)",
    Icon: Box,
    color: "text-orange-500",
    desc: "Master the paradigm that defines modern software architecture.",
    why: "OOP is the blueprint for building scalable, maintainable systems.",
    topics: ["Classes & Objects", "Inheritance & Polymorphism", "Encapsulation & Abstraction", "Interfaces & Abstract Classes"]
  },
  {
    title: "Core APIs & Exception Handling",
    Icon: Code,
    color: "text-yellow-500",
    desc: "Deep dive into Java's robust standard library and error management.",
    why: "Writing bug-free code requires mastering exceptions and collections.",
    topics: ["Collections Framework (List, Set, Map)", "Exception Handling (Try-Catch)", "Java I/O & Streams", "Multithreading Basics"]
  },
  {
    title: "Web Technologies Fundamentals",
    Icon: Globe,
    color: "text-orange-400",
    desc: "Build the visual layer of your applications.",
    why: "A full-stack developer must understand the browser.",
    topics: ["HTML5 Structure", "CSS3 Styling & Flexbox", "JavaScript ES6+ Basics", "DOM Manipulation"]
  },
  {
    title: "Servlets & JSP",
    Icon: Server,
    color: "text-blue-500",
    desc: "Understand how Java works on the server-side under the hood.",
    why: "Knowing the Servlet lifecycle helps you debug complex frameworks later.",
    topics: ["Servlet Lifecycle", "Request & Response", "JSP Basics", "Session Management"]
  },
  {
    title: "Spring Framework Introduction",
    Icon: SiSpring,
    color: "text-green-500",
    desc: "Learn the industry-standard framework for Java development.",
    why: "Spring simplifies enterprise Java development by 50% or more.",
    topics: ["Dependency Injection (IoC)", "Spring Beans & Scopes", "Spring Boot Starter", "Auto Configuration"]
  },
  {
    title: "REST APIs with Spring Boot",
    Icon: SiSpringboot,
    color: "text-green-600",
    desc: "Build scalable web services that power modern apps.",
    why: "REST APIs are the glue connecting mobile apps and frontends to your backend.",
    topics: ["REST Principles", "GET, POST, PUT, DELETE Mappings", "Request Parameters", "Postman Testing"]
  },
  {
    title: "Database Integration (JPA/Hibernate)",
    Icon: SiHibernate,
    color: "text-yellow-600",
    desc: "Persist your application data without writing complex SQL.",
    why: "ORMs let you interact with databases using Java objects.",
    topics: ["ORM Concepts", "Entity Mapping", "Spring Data JPA Repositories", "Transaction Management"]
  },
  {
    title: "Frontend with React",
    Icon: SiReact,
    color: "text-cyan-400",
    desc: "Create dynamic, single-page applications.",
    why: "React is the most in-demand frontend library in the world.",
    topics: ["Components & JSX", "Props & State (Hooks)", "useEffect & Lifecycle", "Consuming REST APIs"]
  },
  {
    title: "Routing & State Management",
    Icon: Layout,
    color: "text-cyan-500",
    desc: "Build complex frontend flows and manage global data.",
    why: "Real-world apps need navigation and shared data state.",
    topics: ["React Router Setup", "Navigation Hooks", "Context API", "Forms & Validation"]
  },
  {
    title: "Full-Stack Project Integration",
    Icon: Layers,
    color: "text-indigo-500",
    desc: "Connect your React frontend to your Spring Boot backend.",
    why: "This is where you become a true Full-Stack Developer.",
    topics: ["CORS Configuration", "End-to-End Data Flow", "Error Handling Strategy", "Secure Communication"]
  },
  {
    title: "Build & Deployment",
    Icon: SiJenkins,
    color: "text-red-500",
    desc: "Package your app and ship it to the world.",
    why: "Code provides no value until it's deployed.",
    topics: ["Maven Build Lifecycle", "JAR Packaging", "Dockerizing Apps", "CI/CD Basics"]
  },
];

const FullStackPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 font-sans text-zinc-100 selection:bg-yellow-500/30 overflow-x-hidden">
      
      {/* GLOBAL BACKGROUND ICONS */}
      <FloatingJavaIcons />

      {/* 1) Course Information (Hero) */}
      <section className="relative pt-32 pb-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-yellow-900/20 via-zinc-950 to-zinc-950 pointer-events-none z-0" />
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <FadeIn>
            <div className="inline-flex items-center justify-center p-3 mb-8 rounded-2xl bg-zinc-900/60 border border-zinc-700/50 shadow-2xl backdrop-blur-xl">
               <div className="bg-gradient-to-r from-red-500 to-orange-500 p-2 rounded-lg mr-3 shadow-lg">
                 <FaJava className="w-6 h-6 text-white" />
               </div>
               <span className="text-xl font-bold tracking-tight text-white">Java Full-Stack Masterclass</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight leading-tight text-white drop-shadow-sm">
              Master Enterprise <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 animate-text-shimmer bg-[length:200%_auto]">
                Java Development.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-zinc-200 max-w-3xl mx-auto mb-10 leading-relaxed font-normal drop-shadow-md">
              Become a complete developer. Build robust backends with Spring Boot and dynamic frontends with React. 
              The ultimate skill set for high-paying enterprise careers.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                size="lg" 
                onClick={() => navigate('/apply', { state: { selectedCourse: 'fullstack-java-python' } })} 
                className="min-w-[220px] shadow-orange-500/40 shadow-2xl !bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white border-none font-bold text-lg transition-all duration-300 active:scale-95 py-4"
              >
                Enroll Now
              </Button>
              <Button 
                variant="outline"
                size="lg" 
                onClick={() => document.getElementById('syllabus')?.scrollIntoView({ behavior: 'smooth'})} 
                className="min-w-[220px] text-white border-white/20 hover:border-orange-500/50 hover:!bg-orange-500/10 backdrop-blur-md !bg-transparent transition-all duration-300 active:scale-95 py-4 group"
                leftIcon={() => <BookOpen className="w-5 h-5 mr-2 text-orange-400" />}
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
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center text-white">Full-Stack Arsenal</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Core Java & OOP", services: "Syntax, Collections, Streams, Multithreading, JVM Internals", Icon: FaJava, color: "text-red-500", border: "hover:border-red-500/50" },
              { title: "Spring Boot Ecosystem", services: "MVC, Data JPA, Security, Actuator, Cloud", Icon: SiSpringboot, color: "text-green-500", border: "hover:border-green-500/50" },
              { title: "Frontend Engineering", services: "React.js, Hooks, Redux, Tailwind CSS, Responsive UI", Icon: SiReact, color: "text-cyan-400", border: "hover:border-cyan-500/50" },
              { title: "Database Mastery", services: "MySQL, PostgreSQL, Hibernate ORM, Transaction Management", Icon: SiMysql, color: "text-blue-500", border: "hover:border-blue-500/50" },
              { title: "RESTful Microservices", services: "API Design, JSON, Postman, Service Discovery", Icon: Server, color: "text-orange-500", border: "hover:border-orange-500/50" },
              { title: "DevOps & Tools", services: "Git, Maven, Docker, Jenkins, AWS Basics", Icon: SiJenkins, color: "text-zinc-400", border: "hover:border-zinc-500/50" },
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
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-zinc-900/90 to-zinc-950 rounded-3xl p-8 md:p-12 border border-zinc-700/50 shadow-2xl relative overflow-hidden group hover:border-orange-500/30 transition-all duration-500 backdrop-blur-sm">
          <div className="absolute top-0 right-0 p-12 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity duration-700 pointer-events-none transform translate-x-10 -translate-y-10">
            <Coffee className="w-80 h-80 text-orange-500" />
          </div>
          <h2 className="text-3xl font-bold mb-6 relative z-10 text-white">Prerequisites</h2>
          <p className="text-zinc-200 mb-8 relative z-10 text-lg font-medium">
            We start from the ground up, but a little prep goes a long way:
          </p>
          <ul className="space-y-5 relative z-10">
            {[
              "Basic understanding of any programming logic (loops, variables).",
              "Curiosity about how websites and servers communicate.",
              "No prior Java experience required - we teach it from scratch.",
              "A laptop with 8GB+ RAM recommended for running Java IDEs."
            ].map((text, i) => (
              <li key={i} className="flex items-center text-zinc-100 font-medium">
                <span className="w-2.5 h-2.5 bg-orange-500 rounded-full mr-4 shadow-[0_0_12px_rgba(249,115,22,0.8)] border border-orange-400/50" />
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
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">Why Java Full-Stack?</h2>
            <div className="space-y-10">
              {[
                { icon: Shield, title: "Enterprise Standard", desc: "Java is the #1 choice for banking, finance, and large-scale enterprise systems globally." },
                { icon: Layers, title: "Backend + Frontend", desc: "Don't just be a coder. Be a creator. Build the entire application from database to user interface." },
                { icon: TrendingUp, title: "High Stability & Pay", desc: "Java developers enjoy some of the most stable and high-paying careers in the tech industry." }
              ].map((item, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="flex gap-5 group">
                    <div className="flex-shrink-0 mt-1 bg-zinc-900 p-3 rounded-xl border border-zinc-700 group-hover:border-orange-500/50 transition-all shadow-lg">
                      <item.icon className="w-6 h-6 text-orange-500" />
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
             <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 to-yellow-500/20 blur-[80px] rounded-full" />
             <div className="bg-zinc-900/90 backdrop-blur-xl rounded-3xl p-10 border border-zinc-700/50 shadow-2xl relative hover:border-orange-500/40 transition-all duration-500">
                
                {/* Visual Representation of Full Stack Arch */}
                <div className="flex flex-col gap-6">
                   {/* Frontend */}
                   <div className="flex items-center gap-4 bg-zinc-950/50 p-4 rounded-xl border border-cyan-500/30">
                      <div className="w-10 h-10 bg-cyan-900/30 rounded-lg flex items-center justify-center text-cyan-400"><SiReact className="w-6 h-6" /></div>
                      <div>
                        <p className="text-white font-bold">React Frontend</p>
                        <p className="text-xs text-zinc-400">User Interface & State</p>
                      </div>
                   </div>
                   
                   {/* Connection */}
                   <div className="h-8 w-0.5 bg-zinc-700 mx-auto"></div>

                   {/* Backend */}
                   <div className="flex items-center gap-4 bg-zinc-950/50 p-4 rounded-xl border border-green-500/30">
                      <div className="w-10 h-10 bg-green-900/30 rounded-lg flex items-center justify-center text-green-400"><SiSpringboot className="w-6 h-6" /></div>
                      <div>
                        <p className="text-white font-bold">Spring Boot API</p>
                        <p className="text-xs text-zinc-400">Business Logic & Security</p>
                      </div>
                   </div>

                   {/* Connection */}
                   <div className="h-8 w-0.5 bg-zinc-700 mx-auto"></div>

                   {/* Database */}
                   <div className="flex items-center gap-4 bg-zinc-950/50 p-4 rounded-xl border border-blue-500/30">
                      <div className="w-10 h-10 bg-blue-900/30 rounded-lg flex items-center justify-center text-blue-400"><SiMysql className="w-6 h-6" /></div>
                      <div>
                        <p className="text-white font-bold">Database</p>
                        <p className="text-xs text-zinc-400">Persistent Storage</p>
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
             <span className="text-orange-500 font-bold tracking-[0.2em] text-xs uppercase mb-4 block">Complete Roadmap</span>
             <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Course Syllabus</h2>
             <p className="text-zinc-200 text-lg font-medium">From "Hello World" to deployed Microservices.</p>
          </div>
          
          <div className="space-y-8">
            {SYLLABUS_MODULES.map((mod, i) => (
              <motion.div 
                key={i} 
                whileHover={{ borderColor: "rgba(249, 115, 22, 0.4)", backgroundColor: "rgba(9, 9, 11, 0.98)" }}
                className="bg-zinc-950 rounded-3xl border border-zinc-800 overflow-hidden hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-500"
              >
                <div className="p-8 md:p-12">
                   <div className="flex flex-col md:flex-row gap-10">
                      <div className="flex-shrink-0">
                         <div className={`w-16 h-16 bg-zinc-900 rounded-2xl flex items-center justify-center border border-zinc-800 shadow-inner group-hover:border-orange-500/30 transition-colors`}>
                           <mod.Icon className={`w-8 h-8 ${mod.color}`} />
                         </div>
                      </div>
                      <div className="flex-grow">
                         <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">{mod.title}</h3>
                         <p className="text-zinc-300 mb-6 leading-relaxed font-medium text-lg">{mod.desc}</p>
                         
                         <div className="mb-8 p-6 bg-zinc-900/40 rounded-2xl border border-zinc-800/50 backdrop-blur-sm">
                            <span className="text-xs font-black text-orange-500 uppercase tracking-[0.15em] block mb-3">Why this matters</span>
                            <p className="text-zinc-100 text-base italic font-medium">"{mod.why}"</p>
                         </div>

                         <div>
                           <span className="text-xs font-black text-zinc-500 uppercase tracking-[0.2em] mb-4 block">Key Concepts</span>
                           <div className="grid sm:grid-cols-2 gap-y-3 gap-x-8">
                             {mod.topics.map((topic, tIndex) => (
                               <div key={tIndex} className="flex items-start text-base text-zinc-300 font-medium group/topic">
                                 <div className="w-2 h-2 bg-orange-500/40 rounded-full mt-2 mr-3 flex-shrink-0 transition-colors group-hover/topic:bg-orange-500" />
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
                whileHover={{ y: -10, borderColor: "rgba(249, 115, 22, 0.5)", backgroundColor: "rgba(24, 24, 27, 0.95)" }}
                className="bg-zinc-950 p-10 rounded-[32px] border border-zinc-800 text-center transition-all duration-300 group cursor-default shadow-xl"
              >
                <div className="w-20 h-1 bg-gradient-to-r from-red-500 to-orange-500 mx-auto mb-8 rounded-full group-hover:w-full transition-all duration-500" />
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
            {["Full Stack Developer", "Backend Engineer", "Java Developer", "Software Architect", "Technical Lead"].map((role, i) => (
               <FadeIn key={i} delay={i * 0.05}>
                 <div className="px-10 py-5 rounded-2xl bg-zinc-950 border border-zinc-700/50 text-white font-bold text-lg shadow-2xl hover:border-orange-500/60 hover:text-orange-400 hover:scale-110 transition-all cursor-default backdrop-blur-md">
                   {role}
                 </div>
               </FadeIn>
            ))}
         </div>
         <p className="text-center text-zinc-500 mt-12 max-w-2xl mx-auto font-bold uppercase tracking-widest text-xs">
           High Paying Roles in FinTech, Retail & Tech
         </p>
      </AnimatedSection>

      {/* 8) CTA */}
      <section className="py-32 bg-zinc-950 relative overflow-hidden text-center px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 to-black pointer-events-none" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-900/20 via-transparent to-transparent pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-10 tracking-tighter drop-shadow-2xl">Start Your Java Journey</h2>
          <p className="text-orange-100 text-2xl mb-16 max-w-2xl mx-auto font-medium leading-relaxed opacity-90">
            Build the foundation for a rock-solid career in software engineering.
            Secure your spot today.
          </p>
          <Button 
            size="lg" 
            className="min-w-[300px] shadow-orange-500/40 shadow-2xl !bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white border-none font-bold text-2xl py-6 transition-all duration-500 uppercase tracking-widest hover:scale-110"
            onClick={() => navigate('/apply', { state: { selectedCourse: 'fullstack-java-python' } })}
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

export default FullStackPage;