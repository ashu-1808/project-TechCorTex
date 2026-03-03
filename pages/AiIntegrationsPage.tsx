import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, BookOpen, Brain, Sparkles, Bot, Zap, Code, Database, Layers, 
  Server, Shield, Globe, Terminal, Cpu, Share2, Rocket, Briefcase, Search, MessageSquare, CheckCircle2
} from 'lucide-react';
import { 
  SiPython, SiOpenai, SiHuggingface, SiJavascript, SiReact, SiTypescript
} from 'react-icons/si';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button, AnimatedSection, FadeIn } from '../components/UI';

// --- Background Animation Component ---
const FloatingAiIcons = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 2000], [0, 400]); 

  const iconTypes = [
    { Icon: SiPython, color: 'text-yellow-400', label: 'Python' }, 
    { Icon: SiOpenai, color: 'text-emerald-400', label: 'OpenAI' }, 
    { Icon: SiHuggingface, color: 'text-yellow-500', label: 'Hugging Face' }, 
    { Icon: Brain, color: 'text-pink-500', label: 'Neural Net' }, 
    { Icon: Bot, color: 'text-indigo-400', label: 'Bot' }, 
    { Icon: Sparkles, color: 'text-violet-400', label: 'GenAI' }, 
    { Icon: Database, color: 'text-blue-500', label: 'Vector DB' },
    { Icon: SiReact, color: 'text-cyan-400', label: 'React' },
    { Icon: SiTypescript, color: 'text-blue-600', label: 'TS' },
    { Icon: Terminal, color: 'text-zinc-400', label: 'Terminal' },
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
    title: "Introduction to Generative AI & LLMs",
    Icon: Sparkles,
    color: "text-indigo-500",
    desc: "Dive into the world of Generative AI. Understand the core mechanics of Large Language Models.",
    why: "To effectively use AI tools, you must first understand how they 'think' and operate.",
    topics: ["What is Generative AI?", "High-level LLM Architecture", "Applications & Platforms", "The Future of AI Integration"]
  },
  {
    title: "LLM APIs & AI Service Providers",
    Icon: Server,
    color: "text-emerald-500",
    desc: "Connect to the brains of the operation. Learn to interface with GPT-4, Claude, and others.",
    why: "APIs are the bridge between your application and state-of-the-art intelligence.",
    topics: ["GPT-style & Claude-style APIs", "Authentication & Security", "Request/Response Cycles", "Rate Limits & Cost Management"]
  },
  {
    title: "Prompt Engineering Fundamentals",
    Icon: MessageSquare,
    color: "text-yellow-400",
    desc: "Speak the language of AI. Craft prompts that get you exactly what you need.",
    why: "The quality of your output is directly dependent on the quality of your prompt.",
    topics: ["Structure & Clarity", "System vs User Prompts", "Output Formatting", "Persona Adoption"]
  },
  {
    title: "Advanced Prompt Engineering Techniques",
    Icon: Code,
    color: "text-red-500",
    desc: "Push models to their limits. Use advanced strategies for complex reasoning.",
    why: "Simple prompts often fail on complex tasks. These techniques bridge the gap.",
    topics: ["Few-shot & Zero-shot Prompting", "Chain-of-Thought (CoT)", "Prompt Versioning", "Hallucination Reduction"]
  },
  // Placeholder 1
  {
    title: "Retrieval-Augmented Generation (RAG) Concepts",
    Icon: Search,
    color: "text-blue-400",
    desc: "Give your AI a memory. Overcome the knowledge cutoff with external data.",
    why: "RAG is the standard for building accurate, domain-specific AI applications.",
    topics: ["Limitations of Pure LLMs", "The RAG Architecture", "Knowledge Retrieval", "Context Windows"]
  },
  {
    title: "Building RAG Pipelines",
    Icon: Layers,
    color: "text-purple-500",
    desc: "Construct the flow. Ingest, chunk, and process data for your AI to use.",
    why: "Data preparation is 80% of the battle in building effective RAG systems.",
    topics: ["Data Ingestion Strategies", "Chunking & Formatting", "Vector Embeddings Intro", "Query-Retrieval-Generation Loop"]
  },
  {
    title: "Vector Databases & Embeddings",
    Icon: Database,
    color: "text-orange-500",
    desc: "Store meaning, not just keywords. Master vector search technologies.",
    why: "Vector DBs are the long-term memory for your AI applications.",
    topics: ["What are Embeddings?", "Vector Similarity Search", "Choosing a Vector Store", "Indexing Strategies"]
  },
  // Placeholder 2
  {
    title: "Integrating LLMs into Applications",
    Icon: Rocket,
    color: "text-pink-500",
    desc: "Bring it all together. Build full-stack apps with AI capabilities.",
    why: "Integration is where the magic happens—turning models into products.",
    topics: ["Backend Integration Patterns", "Frontend AI Features", "API Orchestration", "Middleware & State"]
  },
  {
    title: "AI Tools for Developer Productivity",
    Icon: Zap,
    color: "text-yellow-500",
    desc: "Code faster, document better. Use AI to supercharge your own workflow.",
    why: "AI isn't just for your users; it's a force multiplier for your development career.",
    topics: ["AI Coding Assistants", "Automated Documentation", "Test Generation", "Workflow Automation"]
  },
  {
    title: "Security, Privacy & Reliability",
    Icon: Shield,
    color: "text-green-500",
    desc: "Build responsibly. Ensure your AI apps are safe, private, and robust.",
    why: "Trust is hard to gain and easy to lose. Security is non-negotiable.",
    topics: ["Data Privacy & Compliance", "Prompt Injection Protection", "Input Validation", "Monitoring & Observability"]
  },
  // Placeholder 3
  {
    title: "Real-World Use Cases & Mini Projects",
    Icon: Briefcase,
    color: "text-cyan-400",
    desc: "Theory into practice. Build real working prototypes.",
    why: "The best way to learn is by doing. Build a portfolio of AI apps.",
    topics: ["Chat Assistants", "Knowledge Base Q&A", "AI Dashboards", "Automation Scripts"]
  },
];

const AiIntegrationsPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 font-sans text-zinc-100 selection:bg-indigo-500/30 overflow-x-hidden">
      
      {/* GLOBAL BACKGROUND ICONS */}
      <FloatingAiIcons />

      {/* 1) Course Information (Hero) */}
      <section className="relative pt-32 pb-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-zinc-950 to-zinc-950 pointer-events-none z-0" />
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <FadeIn>
            <div className="inline-flex items-center justify-center p-3 mb-8 rounded-2xl bg-zinc-900/60 border border-zinc-700/50 shadow-2xl backdrop-blur-xl">
               <div className="bg-gradient-to-r from-emerald-500 to-cyan-500 p-2 rounded-lg mr-3 shadow-lg">
                 <Terminal className="w-6 h-6 text-white" />
               </div>
               <span className="text-xl font-bold tracking-tight text-white">AI Integrations & Tools</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight leading-tight text-white drop-shadow-sm">
              Power Your Apps with <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 animate-text-shimmer bg-[length:200%_auto]">
                Applied Intelligence.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-zinc-200 max-w-3xl mx-auto mb-10 leading-relaxed font-normal drop-shadow-md">
              Bridge the gap between theory and practice. Learn to integrate LLMs, build RAG pipelines, 
              and engineer prompts for real-world software solutions.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                size="lg" 
                onClick={() => navigate('/apply', { state: { selectedCourse: 'ai-integrations' } })} 
                className="min-w-[220px] shadow-emerald-500/20 shadow-2xl !bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white border-none font-bold text-lg transition-all duration-300 active:scale-95 py-4"
              >
                Enroll Now
              </Button>
              <Button 
                variant="outline"
                size="lg" 
                onClick={() => document.getElementById('syllabus')?.scrollIntoView({ behavior: 'smooth'})} 
                className="min-w-[220px] text-white border-white/20 hover:border-emerald-500/50 hover:!bg-emerald-500/10 backdrop-blur-md !bg-transparent transition-all duration-300 active:scale-95 py-4 group"
                leftIcon={() => <BookOpen className="w-5 h-5 mr-2 text-emerald-400" />}
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
              { title: "LLM Integration", desc: "Integrate Models into Frontend & Backend Apps", Icon: Rocket, color: "text-pink-500" },
              { title: "Modern APIs", desc: "Effective use of OpenAI, Anthropic, & Open Source APIs", Icon: Server, color: "text-emerald-500" },
              { title: "Reliable Prompts", desc: "Design Prompts for Consistent Outputs", Icon: MessageSquare, color: "text-yellow-400" },
              { title: "RAG Systems", desc: "Build Retrieval-Augmented Generation Pipelines", Icon: Layers, color: "text-blue-500" },
            ].map((item, i) => (
              <motion.div 
                key={i} 
                whileHover={{ scale: 1.03, backgroundColor: "rgba(24, 24, 27, 0.95)" }}
                className={`bg-zinc-900/90 backdrop-blur-lg p-6 rounded-2xl border border-zinc-700/50 hover:border-zinc-500 transition-all cursor-default group h-full`}
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
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-zinc-900/90 to-zinc-950 rounded-3xl p-8 md:p-12 border border-zinc-700/50 shadow-2xl relative overflow-hidden group hover:border-emerald-500/30 transition-all duration-500 backdrop-blur-sm">
          <div className="absolute top-0 right-0 p-12 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity duration-700 pointer-events-none transform translate-x-10 -translate-y-10">
            <Cpu className="w-80 h-80 text-emerald-500" />
          </div>
          <h2 className="text-3xl font-bold mb-6 relative z-10 text-white">Prerequisites</h2>
          <p className="text-zinc-200 mb-8 relative z-10 text-lg font-medium">
            Ready to integrate AI? Here's what you need to bring:
          </p>
          <ul className="space-y-5 relative z-10">
            {[
              "Basic programming knowledge in any modern language (JS/TS/Python).",
              "Familiarity with REST APIs and HTTP concepts.",
              "Curiosity about AI, automation, and optimizing workflows.",
              "A desire to build practical, real-world applications."
            ].map((text, i) => (
              <li key={i} className="flex items-center text-zinc-100 font-medium">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 mr-4 flex-shrink-0" />
                {text}
              </li>
            ))}
          </ul>
        </div>
      </AnimatedSection>

      {/* 4) Why AI Integrations & Tools Matter? */}
      <AnimatedSection dark>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">Why AI Integration Matters?</h2>
            <div className="space-y-10">
              {[
                { icon: Rocket, title: "AI-Powered Apps", desc: "It's not just about chat. It's about intelligent features in every app." },
                { icon: Zap, title: "Automation & Productivity", desc: "Automate complex tasks and workflows that were previously impossible." },
                { icon: Brain, title: "AI-Assisted Decisions", desc: "Empower users with data-driven, AI-generated insights in real-time." }
              ].map((item, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="flex gap-5 group">
                    <div className="flex-shrink-0 mt-1 bg-zinc-900 p-3 rounded-xl border border-zinc-700 group-hover:border-emerald-500/50 transition-all shadow-lg">
                      <item.icon className="w-6 h-6 text-emerald-400" />
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
             <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 to-teal-500/20 blur-[80px] rounded-full" />
             <div className="bg-zinc-900/90 backdrop-blur-xl rounded-3xl p-10 border border-zinc-700/50 shadow-2xl relative hover:border-emerald-500/40 transition-all duration-500">
                {/* Code Snippet Visual */}
                <div className="font-mono text-sm overflow-hidden">
                  <div className="flex items-center gap-2 border-b border-zinc-800 pb-2 mb-4">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500/50" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                      <div className="w-3 h-3 rounded-full bg-green-500/50" />
                    </div>
                    <span className="text-zinc-500 text-xs ml-2">generate_summary.ts</span>
                  </div>
                  <div className="space-y-1 text-zinc-400">
                    <p><span className="text-purple-400">async function</span> <span className="text-yellow-300">summarize</span>(text: string) {'{'}</p>
                    <p className="pl-4"><span className="text-purple-400">const</span> response = <span className="text-purple-400">await</span> ai.chat.completions.create({'{'}</p>
                    <p className="pl-8">model: <span className="text-green-400">"gpt-4-turbo"</span>,</p>
                    <p className="pl-8">messages: [</p>
                    <p className="pl-12">{'{'} role: <span className="text-green-400">"system"</span>, content: <span className="text-green-400">"Summarize briefly."</span> {'}'},</p>
                    <p className="pl-12">{'{'} role: <span className="text-green-400">"user"</span>, content: text {'}'}</p>
                    <p className="pl-8">]</p>
                    <p className="pl-4">{'}'});</p>
                    <p className="pl-4"><span className="text-purple-400">return</span> response.choices[0].message.content;</p>
                    <p>{'}'}</p>
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
             <span className="text-emerald-500 font-bold tracking-[0.2em] text-xs uppercase mb-4 block">Course Modules</span>
             <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Syllabus</h2>
             <p className="text-zinc-200 text-lg font-medium">Master the stack of modern AI application development.</p>
          </div>
          
          <div className="space-y-8">
            {SYLLABUS_MODULES.map((mod, i) => (
              <React.Fragment key={i}>
                <motion.div 
                  whileHover={{ borderColor: "rgba(16, 185, 129, 0.4)", backgroundColor: "rgba(9, 9, 11, 0.98)" }}
                  className="bg-zinc-950 rounded-3xl border border-zinc-800 overflow-hidden hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-500"
                >
                  <div className="p-8 md:p-12">
                     <div className="flex flex-col md:flex-row gap-10">
                        <div className="flex-shrink-0">
                           <div className={`w-16 h-16 bg-zinc-900 rounded-2xl flex items-center justify-center border border-zinc-800 shadow-inner group-hover:border-emerald-500/30 transition-colors`}>
                             <mod.Icon className={`w-8 h-8 ${mod.color}`} />
                           </div>
                        </div>
                        <div className="flex-grow">
                           <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">{mod.title}</h3>
                           <p className="text-zinc-300 mb-6 leading-relaxed font-medium text-lg">{mod.desc}</p>
                           
                           <div className="mb-8 p-6 bg-zinc-900/40 rounded-2xl border border-zinc-800/50 backdrop-blur-sm">
                              <span className="text-xs font-black text-emerald-500 uppercase tracking-[0.15em] block mb-3">Why this matters</span>
                              <p className="text-zinc-100 text-base italic font-medium">"{mod.why}"</p>
                           </div>

                           <div>
                             <span className="text-xs font-black text-zinc-500 uppercase tracking-[0.2em] mb-4 block">Key Concepts</span>
                             <div className="grid sm:grid-cols-2 gap-y-3 gap-x-8">
                               {mod.topics.map((topic, tIndex) => (
                                 <div key={tIndex} className="flex items-start text-base text-zinc-300 font-medium group/topic">
                                   <div className="w-2 h-2 bg-emerald-500/40 rounded-full mt-2 mr-3 flex-shrink-0 transition-colors group-hover/topic:bg-emerald-500" />
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
                {(i === 3 || i === 6 || i === 9) && (
                   <div className="py-8 flex justify-center opacity-30">
                      <div className="w-full h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />
                   </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* 6) What You Will Learn in the AI Integrations & Tools Course? (Summary) */}
      <AnimatedSection dark>
        <div className="max-w-5xl mx-auto bg-zinc-900/50 rounded-3xl p-10 border border-zinc-800">
           <h2 className="text-3xl font-bold mb-8 text-center text-white">Course Outcomes</h2>
           <div className="grid md:grid-cols-2 gap-6">
              {[
                 "Confidently integrate LLMs into any codebase.",
                 "Design and deploy production-grade RAG systems.",
                 "Engineer robust prompts for consistent results.",
                 "Use vector databases for semantic search.",
                 "Build AI-powered features that drive user value.",
                 "Secure and monitor AI applications effectively."
              ].map((outcome, i) => (
                 <div key={i} className="flex items-center text-lg text-zinc-200">
                    <CheckCircle2 className="w-6 h-6 text-teal-400 mr-4 flex-shrink-0" />
                    {outcome}
                 </div>
              ))}
           </div>
        </div>
      </AnimatedSection>

      {/* 7) Key Features */}
      <AnimatedSection dark>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center text-white">Key Course Features</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {["Hands-on Integration", "Real Workflows", "Tool-Driven Learning", "Practical Problem Solving"].map((feat, i) => (
              <motion.div 
                key={i} 
                whileHover={{ y: -10, borderColor: "rgba(16, 185, 129, 0.5)", backgroundColor: "rgba(24, 24, 27, 0.95)" }}
                className="bg-zinc-950 p-10 rounded-[32px] border border-zinc-800 text-center transition-all duration-300 group cursor-default shadow-xl"
              >
                <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto mb-8 rounded-full group-hover:w-full transition-all duration-500" />
                <h3 className="font-bold text-xl text-white tracking-tight">{feat}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* 8) Career Applications & Industry Relevance */}
      <AnimatedSection dark>
         <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center text-white">Career Relevance</h2>
         <div className="flex flex-wrap justify-center gap-6 max-w-5xl mx-auto">
            {["AI Application Engineer", "Full Stack Developer (AI)", "Software Architect", "Technical Product Manager", "Automation Specialist"].map((role, i) => (
               <FadeIn key={i} delay={i * 0.05}>
                 <div className="px-10 py-5 rounded-2xl bg-zinc-950 border border-zinc-700/50 text-white font-bold text-lg shadow-2xl hover:border-emerald-500/60 hover:text-emerald-400 hover:scale-110 transition-all cursor-default backdrop-blur-md">
                   {role}
                 </div>
               </FadeIn>
            ))}
         </div>
         <p className="text-center text-zinc-500 mt-12 max-w-2xl mx-auto font-bold uppercase tracking-widest text-xs">
           Enhance your existing skills with AI integration capabilities
         </p>
      </AnimatedSection>

      {/* 9) Start Your Journey Today (CTA) */}
      <section className="py-32 bg-zinc-950 relative overflow-hidden text-center px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 to-black pointer-events-none" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-900/20 via-transparent to-transparent pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-10 tracking-tighter drop-shadow-2xl">Start Your Journey Today</h2>
          <p className="text-emerald-100 text-2xl mb-16 max-w-2xl mx-auto font-medium leading-relaxed opacity-90">
            Don't just watch the AI revolution. Build it. 
            Secure your spot in the AI Integrations course.
          </p>
          <Button 
            size="lg" 
            className="min-w-[300px] shadow-emerald-500/40 shadow-2xl !bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white border-none font-bold text-2xl py-6 transition-all duration-500 uppercase tracking-widest hover:scale-110"
            onClick={() => navigate('/apply', { state: { selectedCourse: 'ai-integrations' } })}
          >
            Apply Now <ArrowRight className="w-8 h-8 ml-3" />
          </Button>
          <p className="mt-12 text-zinc-500 font-bold uppercase tracking-[0.3em] text-xs">
            Practical • Developer-Focused • Future-Ready
          </p>
        </div>
      </section>

    </div>
  );
};

export default AiIntegrationsPage;