import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Cloud, Code, Cpu, BookOpen, CheckCircle, 
  Users, Briefcase, Zap, ArrowRight, MonitorPlay, 
  MapPin, Globe, Video, Clock, MessageCircle, Quote, Star,
  FileCode, Coffee, GitBranch, Box, Hexagon, Terminal
} from 'lucide-react';
import { SiAmazonec2, SiAmazons3, SiDocker, SiKubernetes, SiReact } from 'react-icons/si';
import { FaJava } from 'react-icons/fa';
import { AnimatePresence, motion, useScroll, useTransform, useInView, animate } from 'framer-motion';
import { Button, AnimatedSection, FadeIn } from './UI';
import { Course } from '../types';

// --- Data ---
const COURSES: Course[] = [
  {
    id: 'cloud-computing',
    title: 'AWS / Microsoft Azure',
    description: 'Master leading cloud platforms. Learn EC2, S3, Azure VMs, and cloud architecture patterns for scalable solutions.',
    duration: '2 Months',
    level: 'Advanced',
    iconName: 'Cloud',
    features: ['AWS Solutions Architect', 'Azure Administration', 'Cloud Security']
  },
  {
    id: 'devops',
    title: 'DevOps Engineering',
    description: 'Automate deployment pipelines. Bridge the gap between development and operations with modern tools.',
    duration: '2 Months',
    level: 'Advanced',
    iconName: 'Terminal',
    features: ['CI/CD with Jenkins', 'Docker & Kubernetes', 'Terraform IaC']
  },
  {
    id: 'aiml-deeplearning',
    title: 'AI, ML & Deep Learning',
    description: 'Build the future with data. Create neural networks and predictive models using Python, TensorFlow, and PyTorch.',
    duration: '3 Months',
    level: 'Advanced',
    iconName: 'Cpu',
    features: ['Neural Networks', 'Computer Vision', 'NLP & Transformers']
  },
  {
    id: 'fullstack-java-python',
    title: 'Full Stack Python / Java',
    description: 'Enterprise-grade development. Specialized tracks for Java Spring Boot or Python Django with React frontends.',
    duration: '3 Months',
    level: 'Intermediate',
    iconName: 'Coffee',
    features: ['Spring Boot / Django', 'Microservices', 'System Design']
  },
  {
    id: 'mean-mern',
    title: 'MEAN / MERN Stack',
    description: 'JavaScript everywhere. Build dynamic web applications using MongoDB, Express, Angular/React, and Node.js.',
    duration: '3 Months',
    level: 'Intermediate',
    iconName: 'Code',
    features: ['React & Angular', 'Node.js Backend', 'NoSQL Database']
  },
  {
    id: 'ai-integrations',
    title: 'AI Integrations & Tools',
    description: 'Leverage GenAI. Integrate LLMs like GPT-4 and Claude into apps and master modern AI tools for productivity.',
    duration: '1 Month',
    level: 'Beginner to Pro',
    iconName: 'Zap',
    features: ['LLM APIs', 'Prompt Engineering', 'RAG Pipelines']
  },
  {
    id: 'webapp-dev',
    title: 'Web App Development',
    description: 'The fundamentals of the web. Specific focus on frontend architecture, accessibility, and high performance.',
    duration: '2 Months',
    level: 'Beginner',
    iconName: 'Globe',
    features: ['Modern HTML/CSS', 'JavaScript ES6+', 'Responsive UI']
  },
  {
    id: 'industry-project-1',
    title: 'Industry Project: FinTech',
    description: 'Real-world simulation. Build a secure banking or payment processing application with strict compliance standards.',
    duration: '1 Month',
    level: 'Practical',
    iconName: 'Briefcase',
    features: ['Payment Gateways', 'Transaction Security', 'Audit Logs']
  },
  {
    id: 'industry-project-2',
    title: 'Industry Project: SaaS',
    description: 'End-to-end development. Create a multi-tenant SaaS platform with subscription billing and admin dashboards.',
    duration: '1 Month',
    level: 'Practical',
    iconName: 'Briefcase',
    features: ['Multi-tenancy', 'Stripe Integration', 'Analytics Dashboard']
  },
];

const ICONS: Record<string, React.ElementType> = {
  Cloud, Code, Cpu, BookOpen, Terminal, Coffee, Zap, Globe, Briefcase
};

// --- Helper for Beautiful Icons ---
const IconBox = ({ icon: Icon, className = "" }: { icon: React.ElementType, className?: string }) => (
  <div className={`w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700 shadow-lg shadow-teal-900/10 group-hover:shadow-teal-500/20 group-hover:border-teal-500/30 transition-all duration-300 ${className}`}>
    <Icon className="w-7 h-7 text-teal-400 group-hover:text-teal-300 transition-colors" />
  </div>
);

// --- Animated Icon for Courses ---
const CourseIcon = ({ icon: Icon, id }: { icon: React.ElementType, id: string }) => {
  // Theme configuration for each course
  const theme = {
    'cloud-computing': { 
      color: 'text-sky-400', 
      bg: 'bg-sky-500',
      border: 'group-hover:border-sky-500/50',
      glow: 'shadow-sky-500/20' 
    },
    'devops': { 
      color: 'text-orange-400', 
      bg: 'bg-orange-500',
      border: 'group-hover:border-orange-500/50',
      glow: 'shadow-orange-500/20'
    },
    'aiml-deeplearning': { 
      color: 'text-indigo-400', 
      bg: 'bg-indigo-500',
      border: 'group-hover:border-indigo-500/50',
      glow: 'shadow-indigo-500/20'
    },
    'fullstack-java-python': { 
      color: 'text-yellow-400', 
      bg: 'bg-yellow-500',
      border: 'group-hover:border-yellow-500/50',
      glow: 'shadow-yellow-500/20'
    },
    'mean-mern': { 
      color: 'text-teal-400', 
      bg: 'bg-teal-500',
      border: 'group-hover:border-teal-500/50',
      glow: 'shadow-teal-500/20'
    },
    'ai-integrations': { 
      color: 'text-purple-400', 
      bg: 'bg-purple-500',
      border: 'group-hover:border-purple-500/50',
      glow: 'shadow-purple-500/20'
    },
    'webapp-dev': { 
      color: 'text-blue-400', 
      bg: 'bg-blue-500',
      border: 'group-hover:border-blue-500/50',
      glow: 'shadow-blue-500/20'
    },
    'industry-project-1': { 
      color: 'text-emerald-400', 
      bg: 'bg-emerald-500',
      border: 'group-hover:border-emerald-500/50',
      glow: 'shadow-emerald-500/20'
    },
    'industry-project-2': { 
      color: 'text-emerald-400', 
      bg: 'bg-emerald-500',
      border: 'group-hover:border-emerald-500/50',
      glow: 'shadow-emerald-500/20'
    },
  }[id] || { 
    color: 'text-teal-400', 
    bg: 'bg-teal-500',
    border: 'group-hover:border-teal-500/50',
    glow: 'shadow-teal-500/20'
  };

  return (
    <div className="mb-6 relative w-14 h-14">
      {/* Pulse Effect */}
      <motion.div
         className={`absolute inset-0 rounded-xl ${theme.bg} opacity-0 blur-lg`}
         variants={{
           hover: { opacity: 0.3, scale: 1.2 }
         }}
         transition={{ duration: 0.4 }}
      />

      {/* Main Icon Box */}
      <motion.div
        className={`relative w-full h-full rounded-xl bg-zinc-900 border border-zinc-700 flex items-center justify-center z-10 ${theme.border} transition-colors duration-300`}
        variants={{
           hover: { y: -4 }
        }}
      >
        <motion.div
          variants={{
             hover: { rotate: [0, -10, 10, -5, 5, 0], scale: 1.1 }
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <Icon className={`w-7 h-7 ${theme.color}`} strokeWidth={1.5} />
        </motion.div>
      </motion.div>
    </div>
  );
};

// --- Falling Tech Icons Background ---
const FallingTechIcons = () => {
  const iconTypes = [
    { Icon: FileCode, color: 'text-yellow-400' },
    { Icon: Coffee, color: 'text-red-400' },
    { Icon: Cloud, color: 'text-orange-400' },
    { Icon: GitBranch, color: 'text-orange-500' },
    { Icon: Box, color: 'text-blue-400' },
    { Icon: Hexagon, color: 'text-cyan-400' },
    { Icon: Terminal, color: 'text-green-400' },
    { Icon: Code, color: 'text-blue-500' },
    { Icon: Cpu, color: 'text-indigo-400' },
    { Icon: Globe, color: 'text-teal-400' },
    // New Domain Specific Icons
    { Icon: SiAmazonec2, color: 'text-orange-500' },
    { Icon: SiAmazons3, color: 'text-green-500' },
    { Icon: SiDocker, color: 'text-blue-400' },
    { Icon: SiKubernetes, color: 'text-blue-600' },
    { Icon: SiReact, color: 'text-cyan-400' },
    { Icon: FaJava, color: 'text-red-500' },
  ];

  // Initialize state immediately with lazy initializer to avoid delay and re-renders
  const [drops] = useState(() => 
    Array.from({ length: 130 }).map((_, i) => {
      const type = iconTypes[Math.floor(Math.random() * iconTypes.length)];
      const duration = 15 + Math.random() * 25;
      return {
        id: i,
        ...type,
        left: Math.random() * 100,
        duration: duration,
        // Negative delay makes them start at different points in their animation cycle immediately
        delay: -Math.random() * duration, 
        size: 20 + Math.random() * 30,
        opacity: 0.3 + Math.random() * 0.2 // Increased opacity (0.3 - 0.5) for high visibility
      };
    })
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {drops.map((drop) => (
        <motion.div
          key={drop.id}
          className={`absolute ${drop.color}`}
          style={{ left: `${drop.left}%` }}
          initial={{ top: -100, opacity: 0 }}
          animate={{ 
            top: '120vh', 
            opacity: [0, drop.opacity, drop.opacity, 0], // Fade in, stay visible, fade out
            rotate: 360 
          }}
          transition={{
            duration: drop.duration,
            repeat: Infinity,
            ease: "linear",
            delay: drop.delay, // Negative delay for instant start
            repeatDelay: 0
          }}
        >
          <drop.Icon style={{ width: drop.size, height: drop.size }} strokeWidth={1.5} />
        </motion.div>
      ))}
    </div>
  );
};

// --- Gen-Z Quotes Component ---
const GenZRotatingQuotes = () => {
  const quotes = [
    { text: "Stop just writing code. Start building world-class systems.", color: "from-teal-400 via-cyan-400 to-indigo-500", font: "font-sans" },
    { text: "Secure the bag with full-stack mastery. Big moves only.", color: "from-orange-400 via-red-500 to-yellow-500", font: "font-mono" },
    { text: "Give your tech career that main character energy.", color: "from-purple-400 via-pink-500 to-rose-500", font: "font-serif" },
    { text: "Ship it like it's hot. DevOps excellence never misses.", color: "from-green-400 via-emerald-500 to-teal-500", font: "font-mono" },
    { text: "No cap, just pure Cloud Architect energy. Scalable & Elite.", color: "from-blue-400 via-indigo-500 to-violet-500", font: "font-sans" },
    { text: "Debug your path, refactor your future. Level up today.", color: "from-yellow-400 via-orange-500 to-red-500", font: "font-serif" }
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % quotes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-16 md:h-20 flex items-center justify-center relative overflow-hidden mb-2">
      <AnimatePresence mode="wait">
        <motion.h2
          key={index}
          initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={`text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight ${quotes[index].font} max-w-4xl text-transparent bg-clip-text bg-gradient-to-r ${quotes[index].color}`}
        >
          {quotes[index].text}
        </motion.h2>
      </AnimatePresence>
    </div>
  );
};

// --- Techcortex Title Animation ---
const AnimatedTitle = () => {
  const text = "Techcortex";
  const letters = text.split("");

  return (
    <div className="flex justify-center overflow-hidden mb-4 pb-2 whitespace-nowrap">
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.5,
            delay: i * 0.03,
            type: "spring",
            stiffness: 120
          }}
          className="font-sans text-6xl sm:text-7xl lg:text-8xl font-black tracking-tighter bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-500 text-transparent bg-clip-text bg-[length:200%_auto] animate-text-shimmer inline-block hover:scale-105 transition-transform cursor-default px-0.5"
        >
          {letter}
        </motion.span>
      ))}
    </div>
  );
};

// --- Sections ---

export const Hero = () => {
  const { scrollY } = useScroll();
  const navigate = useNavigate();
  
  // Parallax transforms
  const y1 = useTransform(scrollY, [0, 1000], [0, 300]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -200]);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-zinc-950 overflow-hidden pt-0">
        {/* Background Gradient Tint */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-teal-900/20 via-zinc-950/80 to-zinc-950 pointer-events-none z-0" />
        
        {/* Falling Icons Animation */}
        <FallingTechIcons />

        {/* Background Decorative Elements */}
        <motion.div 
          style={{ y: y1 }}
          className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-teal-900/10 blur-3xl opacity-30 pointer-events-none" 
        />
        <motion.div 
          style={{ y: y2 }}
          className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-indigo-900/10 blur-3xl opacity-30 pointer-events-none" 
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[800px] bg-zinc-900/30 blur-[120px] -z-10 rounded-full mix-blend-screen"></div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 flex flex-col items-center text-center -mt-12">
            
            <FadeIn>
              <span className="inline-block px-4 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800 text-teal-400 font-semibold text-xs uppercase tracking-wider mb-8 shadow-[0_0_15px_rgba(20,184,166,0.15)] backdrop-blur-sm">
                🚀 Admissions Open for All Batches
              </span>
            </FadeIn>
            
            {/* Animated Title */}
            <AnimatedTitle />

            {/* Rotating Gen-Z Quotes */}
            <GenZRotatingQuotes />

            <FadeIn delay={0.3}>
              <div className="max-w-3xl mx-auto mt-8">
                <p className="text-lg md:text-xl text-zinc-300 leading-relaxed font-light mb-6">
                  Bridge the gap between college exams and the real world. Learn the skills top companies are actually looking for. Master 
                  <span className="font-bold text-teal-400 font-brand mx-1">AWS, Docker, & Kubernetes</span> 
                  for Cloud. Build modern websites with 
                  <span className="font-bold text-cyan-400 font-brand mx-1">React & Node.js</span>, 
                  and step into the future with 
                  <span className="font-bold text-indigo-400 font-brand mx-1">AI & Machine Learning</span>.
                </p>
                <p className="text-base text-zinc-500 leading-relaxed font-medium pl-4 border-l-2 border-zinc-800 inline-block text-left">
                  Don't just memorize code. Build real-world projects that make your resume stand out and get you hired.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.4} className="mt-12 flex flex-wrap gap-4 justify-center">
              <Button size="lg" onClick={() => navigate('/apply')} className="shadow-teal-900/20 shadow-xl min-w-[160px]">Apply Now</Button>
              <Button size="lg" variant="outline" onClick={() => document.getElementById('courses')?.scrollIntoView({behavior: 'smooth'})} className="min-w-[160px]">View Courses</Button>
            </FadeIn>
          </div>
    </div>
  );
};

export const About = () => {
  return (
    <AnimatedSection id="about">
      {/* Updated header layout to be split instead of centered */}
      <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center mb-16 lg:mb-24">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-100 mb-4 font-brand">Why Choose Techcortex?</h2>
          <div className="h-1 w-20 bg-teal-500 rounded-full"></div>
        </div>
        <div>
          <p className="text-lg text-zinc-400 leading-relaxed">
            We don't just teach syntax; we teach systems. Our curriculum is designed by industry veterans to ensure you are day-one ready for your job.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-20">
        {[
          { icon: Zap, title: "Hands-on Learning", desc: "No boring lectures. 80% of your time will be spent coding and building." },
          { icon: Users, title: "Expert Mentors", desc: "Learn directly from seniors working at top product-based companies." },
          { icon: Briefcase, title: "Career Support", desc: "Resume reviews, mock interviews, and direct referrals to hiring partners." }
        ].map((item, idx) => (
          <FadeIn key={idx} delay={idx * 0.1}>
            <div className="group bg-zinc-950 p-8 rounded-2xl border border-zinc-800 hover:border-teal-500/30 hover:shadow-lg hover:shadow-teal-900/10 transition-all duration-300 relative overflow-hidden h-full">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <item.icon className="w-24 h-24 text-teal-500" />
              </div>
              <div className="mb-6 relative">
                 <IconBox icon={item.icon} />
              </div>
              <h3 className="text-xl font-bold text-zinc-100 mb-3 relative z-10">{item.title}</h3>
              <p className="text-zinc-400 leading-relaxed relative z-10">{item.desc}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </AnimatedSection>
  );
};

export const CoursesList = () => {
  const navigate = useNavigate();

  return (
    <AnimatedSection id="courses" dark>
      <div className="flex flex-col md:flex-row justify-between items-end mb-12">
        <div className="max-w-2xl">
           <h2 className="text-3xl font-bold text-zinc-100 mb-4 font-brand">Specialized Tracks</h2>
           <p className="text-zinc-400">Curated learning paths designed for specific career outcomes.</p>
        </div>
        <Button variant="ghost" className="mt-4 md:mt-0" onClick={() => navigate('/apply')}>View Full Schedule &rarr;</Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {COURSES.map((course, idx) => {
          const Icon = ICONS[course.iconName];
          // Determine hover border color based on course type for the card itself
          const hoverBorder = {
             'cloud-computing': 'hover:border-sky-500/50 hover:shadow-sky-900/10',
             'devops': 'hover:border-orange-500/50 hover:shadow-orange-900/10',
             'aiml-deeplearning': 'hover:border-indigo-500/50 hover:shadow-indigo-900/10',
             'fullstack-java-python': 'hover:border-yellow-500/50 hover:shadow-yellow-900/10',
             'mean-mern': 'hover:border-teal-500/50 hover:shadow-teal-900/10',
             'ai-integrations': 'hover:border-purple-500/50 hover:shadow-purple-900/10',
             'webapp-dev': 'hover:border-blue-500/50 hover:shadow-blue-900/10',
             'industry-project-1': 'hover:border-emerald-500/50 hover:shadow-emerald-900/10',
             'industry-project-2': 'hover:border-emerald-500/50 hover:shadow-emerald-900/10',
          }[course.id] || 'hover:border-teal-500/50 hover:shadow-teal-900/10';

          return (
            <FadeIn key={course.id} delay={idx * 0.05} className="flex">
              <motion.div 
                className={`bg-zinc-900 rounded-2xl p-6 shadow-sm border border-zinc-800 flex flex-col ${hoverBorder} hover:shadow-md transition-all duration-300 w-full group relative overflow-hidden`}
                whileHover="hover"
                initial="rest"
                animate="rest"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-zinc-800 group-hover:bg-opacity-0 transition-colors"></div>
                
                {/* Dynamic Animated Icon */}
                <CourseIcon icon={Icon} id={course.id} />
                
                <h3 className="text-lg font-bold text-zinc-100 mb-2 group-hover:text-white transition-colors">{course.title}</h3>
                <p className="text-sm text-zinc-400 mb-4 flex-grow">{course.description}</p>
                
                <div className="space-y-2 mb-6">
                  {course.features.map(feat => (
                    <div key={feat} className="flex items-start text-xs text-zinc-500 group-hover:text-zinc-400 transition-colors">
                      <CheckCircle className="w-3.5 h-3.5 text-zinc-600 group-hover:text-current mr-2 mt-0.5 flex-shrink-0" />
                      {feat}
                    </div>
                  ))}
                </div>
                
                <div className="mt-auto pt-4 border-t border-zinc-800">
                   <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full group-hover:bg-zinc-100 group-hover:text-zinc-900 group-hover:border-zinc-100 transition-all"
                    onClick={() => {
                      const routes: Record<string, string> = {
                        'cloud-computing': '/aws',
                        'devops': '/devops',
                        'aiml-deeplearning': '/aiml-deeplearning',
                        'fullstack-java-python': '/fullstack-java-python',
                        'mean-mern': '/mean-mern',
                        'ai-integrations': '/ai-integrations',
                        'webapp-dev': '/webapp-dev',
                        'industry-project-1': '/industry-project-1',
                        'industry-project-2': '/industry-project-2',
                      };
                      
                      const route = routes[course.id];
                      if (route) {
                        navigate(route);
                      } else {
                        navigate('/apply', { state: { selectedCourse: course.id } });
                      }
                    }}
                   >
                     Know More
                   </Button>
                </div>
              </motion.div>
            </FadeIn>
          );
        })}
      </div>
    </AnimatedSection>
  );
};

export const LearningModes = () => {
  const testimonials = [
    { text: "The live sessions were incredibly interactive. Felt just like a real classroom, but from home.", author: "Sarah J.", role: "Full Stack Grad" },
    { text: "Being able to watch recordings allowed me to balance my job and studies perfectly.", author: "Mike T.", role: "DevOps Engineer" },
    { text: "The 1:1 mentorship helped me crack my dream job interview at a FAANG company.", author: "Priya R.", role: "AI Researcher" },
    { text: "I was skeptical about online learning, but the community support is unmatched.", author: "David K.", role: "Student" },
    { text: "The curriculum is updated regularly. I learned tools that were released just months ago.", author: "James L.", role: "Senior Developer" },
    { text: "Career support is real. They actually review your resume and do mock interviews.", author: "Anita S.", role: "Software Engineer" },
    { text: "The projects we built were not just simple to-do apps, but real deployed systems.", author: "Omar F.", role: "Backend Dev" }
  ];

  // Tripled list for seamless scrolling
  const scrollingTestimonials = [...testimonials, ...testimonials, ...testimonials];

  return (
    <AnimatedSection dark>
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
           <h2 className="text-3xl font-bold mb-6 text-zinc-100 font-brand">100% Online, 100% Effective</h2>
           <p className="text-zinc-400 mb-8 text-lg">
             Master specialized tech skills from the comfort of your home. We've optimized every aspect of our curriculum for remote learning.
           </p>
           
           <div className="space-y-6">
             {[
                { title: 'Live Interactive Classes', desc: 'Real-time sessions with experts. Ask questions instantly.', icon: Video },
                { title: 'Flexible Recorded Access', desc: 'Missed a class? Watch high-quality recordings anytime.', icon: Clock },
                { title: '1-on-1 Mentorship', desc: 'Personalized guidance and code reviews from industry pros.', icon: MessageCircle },
             ].map((mode) => (
               <div key={mode.title} className="flex items-start group">
                 <div className="w-12 h-12 rounded-lg bg-zinc-800 flex items-center justify-center mr-4 border border-zinc-700 group-hover:border-teal-500/50 group-hover:shadow-[0_0_15px_rgba(20,184,166,0.15)] transition-all duration-300">
                   <mode.icon className="w-6 h-6 text-teal-400" />
                 </div>
                 <div>
                   <h3 className="text-xl font-bold text-zinc-100 group-hover:text-teal-400 transition-colors">{mode.title}</h3>
                   <p className="text-zinc-400">{mode.desc}</p>
                 </div>
               </div>
             ))}
           </div>
        </div>
        
        <div className="relative h-[600px] bg-zinc-950 rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl">
             {/* Fade Gradients */}
             <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-zinc-950 to-transparent z-10 pointer-events-none" />
             <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-zinc-950 to-transparent z-10 pointer-events-none" />
             
             {/* Scrolling Content */}
             <motion.div
               className="flex flex-col gap-5 p-6"
               animate={{ y: ["0%", "-33.33%"] }} 
               transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
             >
                {scrollingTestimonials.map((t, idx) => (
                  <div key={idx} className="p-6 rounded-xl bg-zinc-900 border border-zinc-800/60 shadow-lg hover:border-teal-500/20 transition-colors">
                    <div className="flex gap-1 mb-3">
                      {[1,2,3,4,5].map(star => <Star key={star} className="w-3.5 h-3.5 text-teal-500 fill-teal-500" />)}
                    </div>
                    <p className="text-zinc-300 italic mb-4 text-sm leading-relaxed">"{t.text}"</p>
                    <div className="flex items-center gap-3 border-t border-zinc-800/50 pt-3">
                      <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-teal-400 font-bold text-xs border border-zinc-700">
                        {t.author.charAt(0)}
                      </div>
                      <div>
                        <p className="text-zinc-100 font-semibold text-sm">{t.author}</p>
                        <p className="text-zinc-500 text-xs">{t.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
             </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export const StickyCTA = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-zinc-900 border-t border-zinc-800 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.5)] z-50 md:hidden animate-slide-up">
      <Button className="w-full shadow-lg" size="lg" onClick={() => navigate('/apply')}>
        Proceed to Application
      </Button>
    </div>
  );
};