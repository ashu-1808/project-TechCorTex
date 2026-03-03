import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, BookOpen, Shield, Lock, Database, Server, Activity, 
  FileText, Key, Network, CheckCircle2, DollarSign, CreditCard, 
  Landmark, AlertTriangle, FileKey, Scale, BarChart3, Code2
} from 'lucide-react';
import { 
  SiSpringboot, SiPostgresql, SiHibernate, SiApachekafka, SiDocker, 
  SiRedis, SiJsonwebtokens
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button, AnimatedSection, FadeIn } from '../components/UI';

// --- Background Animation Component ---
const FloatingFinTechIcons = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 2000], [0, 400]); 

  const iconTypes = [
    { Icon: FaJava, color: 'text-red-500', label: 'Java' }, 
    { Icon: SiSpringboot, color: 'text-green-500', label: 'Spring' }, 
    { Icon: Database, color: 'text-blue-500', label: 'DB' }, 
    { Icon: Shield, color: 'text-emerald-500', label: 'Security' }, 
    { Icon: Lock, color: 'text-yellow-500', label: 'Lock' }, 
    { Icon: Server, color: 'text-zinc-400', label: 'Server' }, 
    { Icon: DollarSign, color: 'text-green-400', label: 'Finance' }, 
    { Icon: Key, color: 'text-orange-400', label: 'Auth' },
    { Icon: SiPostgresql, color: 'text-blue-400', label: 'SQL' },
    { Icon: SiApachekafka, color: 'text-zinc-100', label: 'Kafka' },
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

// --- Syllabus Data (Backend Focused) ---
const PROJECT_MODULES = [
  {
    title: "Backend Architecture & System Design",
    Icon: Network,
    color: "text-blue-500",
    desc: "Architect scalable financial systems. Choose between monolithic and microservices based on requirements.",
    why: "A robust architecture is the foundation of high-availability financial platforms.",
    topics: ["Monolithic vs Microservices", "API-First Design Principles", "Service Communication", "Scalability & Fault Tolerance"]
  },
  {
    title: "Secure API Development",
    Icon: Lock,
    color: "text-emerald-500",
    desc: "Build fortress-like APIs. Implement rigorous authentication and authorization protocols.",
    why: "Security is paramount in FinTech. Data breaches are not an option.",
    topics: ["RESTful API Design Standards", "Input Validation & Sanitization", "OAuth2 & JWT Implementation", "Role-Based Access Control (RBAC)"]
  },
  {
    title: "Payment Gateways Integration",
    Icon: CreditCard,
    color: "text-purple-500",
    desc: "Process money programmatically. Integrate with external payment providers securely.",
    why: "Understanding the flow of money is critical for any FinTech engineer.",
    topics: ["Payment Gateway Fundamentals", "Idempotency in APIs", "Webhooks & Event Callbacks", "Handling Transaction Failures"]
  },
  {
    title: "Transaction Processing & Consistency",
    Icon: Activity,
    color: "text-yellow-500",
    desc: "Guarantee data integrity. Master ACID properties and concurrent transaction handling.",
    why: "Financial data must be accurate. Double-spending or lost transactions are unacceptable.",
    topics: ["ACID Compliance", "Isolation Levels", "Concurrency Control", "Race Condition Prevention"]
  },
  // Placeholder 1: System Flow Diagram
  {
    title: "Transaction Security",
    Icon: Key,
    color: "text-red-500",
    desc: "Protect sensitive data. Encrypt information at rest and in transit.",
    why: "Compliance standards like PCI-DSS require strict data protection measures.",
    topics: ["Encryption (At Rest & In Transit)", "Key Management Systems", "PII/PCI Data Protection", "Secure Error Handling"]
  },
  {
    title: "Audit Logs & Compliance Tracking",
    Icon: FileText,
    color: "text-zinc-400",
    desc: "Track everything. Build immutable logs for regulatory compliance and debugging.",
    why: "In finance, if it's not logged, it didn't happen. Audits are mandatory.",
    topics: ["Immutable Audit Strategies", "Regulatory Requirements", "Action & Access Logging", "Audit Trail Integrity"]
  },
  {
    title: "Database Design for Financial Systems",
    Icon: Database,
    color: "text-blue-400",
    desc: "Model money. Design ledger-style databases that ensure historical accuracy.",
    why: "The database schema defines how money is tracked and reported.",
    topics: ["Relational Data Modeling", "Ledger-Style Structures", "Performance Indexing", "Data Retention Policies"]
  },
  // Placeholder 2: Database Diagram
  {
    title: "Monitoring, Logging & Observability",
    Icon: BarChart3,
    color: "text-orange-500",
    desc: "Keep a pulse on the system. Detect anomalies and failures in real-time.",
    why: "Downtime costs money. You need to know when and why systems fail immediately.",
    topics: ["Structured Application Logging", "Distributed Tracing", "Anomaly Detection", "Alerting Strategies"]
  },
  {
    title: "Error Handling & Resilience",
    Icon: AlertTriangle,
    color: "text-yellow-400",
    desc: "Fail gracefully. Build systems that recover automatically from errors.",
    why: "Networks fail. Services go down. Your system must handle it without losing money.",
    topics: ["Graceful Degradation", "Retry Policies with Backoff", "Circuit Breaker Patterns", "System Reliability Engineering"]
  },
  {
    title: "Security & Compliance Best Practices",
    Icon: Scale,
    color: "text-emerald-400",
    desc: "Code by the rules. Adhere to secure coding principles and industry regulations.",
    why: "Compliance isn't just a checklist; it's a development mindset.",
    topics: ["Secure Coding Principles", "Compliance-First Mindset", "Least Privilege Access", "Data Privacy Laws"]
  },
  // Placeholder 3: Security Diagram
  {
    title: "Capstone Implementation",
    Icon: Code2,
    color: "text-cyan-400",
    desc: "Bring it all together. Build and deploy a complete backend banking system.",
    why: "Theory is good, but shipping code is better. Prove your skills with a working artifact.",
    topics: ["End-to-End Payment Flow", "Real-World Validation", "Production Readiness", "Final Code Review"]
  },
];

const FinTechPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 font-sans text-zinc-100 selection:bg-emerald-500/30 overflow-x-hidden">
      
      {/* GLOBAL BACKGROUND ICONS */}
      <FloatingFinTechIcons />

      {/* 1) Project Overview (Hero) */}
      <section className="relative pt-32 pb-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/20 via-zinc-950 to-zinc-950 pointer-events-none z-0" />
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <FadeIn>
            <div className="inline-flex items-center justify-center p-3 mb-8 rounded-2xl bg-zinc-900/60 border border-zinc-700/50 shadow-2xl backdrop-blur-xl">
               <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-2 rounded-lg mr-3 shadow-lg">
                 <Landmark className="w-6 h-6 text-white" />
               </div>
               <span className="text-xl font-bold tracking-tight text-white">Industry Project: FinTech</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight leading-tight text-white drop-shadow-sm">
              Engineer Secure <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 animate-text-shimmer bg-[length:200%_auto]">
                Financial Systems.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-zinc-200 max-w-3xl mx-auto mb-10 leading-relaxed font-normal drop-shadow-md">
              A deep dive into backend engineering. Build a simulation of enterprise-grade 
              banking and payment platforms with a focus on security, compliance, and reliability.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                size="lg" 
                onClick={() => navigate('/apply', { state: { selectedCourse: 'industry-project-1' } })} 
                className="min-w-[220px] shadow-emerald-500/20 shadow-2xl !bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white border-none font-bold text-lg transition-all duration-300 active:scale-95 py-4"
              >
                Start Project
              </Button>
              <Button 
                variant="outline"
                size="lg" 
                onClick={() => document.getElementById('syllabus')?.scrollIntoView({ behavior: 'smooth'})} 
                className="min-w-[220px] text-white border-white/20 hover:border-emerald-500/50 hover:!bg-emerald-500/10 backdrop-blur-md !bg-transparent transition-all duration-300 active:scale-95 py-4 group"
                leftIcon={() => <BookOpen className="w-5 h-5 mr-2 text-emerald-400" />}
              >
                Technical Scope
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 2) What You Will Build */}
      <AnimatedSection dark className="border-y border-zinc-900 relative">
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center text-white">What You Will Build</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Payment Processing", desc: "Backend systems for handling secure transaction lifecycles.", Icon: CreditCard, color: "text-emerald-500" },
              { title: "Account Management", desc: "Ledger-based account systems with high data integrity.", Icon: Database, color: "text-blue-500" },
              { title: "Secure APIs", desc: "Hardened API endpoints protecting sensitive financial data.", Icon: Lock, color: "text-red-500" },
            ].map((item, i) => (
              <motion.div 
                key={i} 
                whileHover={{ scale: 1.03, backgroundColor: "rgba(24, 24, 27, 0.95)" }}
                className={`bg-zinc-900/90 backdrop-blur-lg p-6 rounded-2xl border border-zinc-700/50 hover:border-emerald-500/30 transition-all cursor-default group h-full`}
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

      {/* 3) Core Backend Learning Outcomes */}
      <AnimatedSection>
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-zinc-900/90 to-zinc-950 rounded-3xl p-8 md:p-12 border border-zinc-700/50 shadow-2xl relative overflow-hidden group hover:border-emerald-500/30 transition-all duration-500 backdrop-blur-sm">
          <div className="absolute top-0 right-0 p-12 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity duration-700 pointer-events-none transform translate-x-10 -translate-y-10">
            <Server className="w-80 h-80 text-emerald-500" />
          </div>
          <h2 className="text-3xl font-bold mb-6 relative z-10 text-white">Backend Mastery</h2>
          <p className="text-zinc-200 mb-8 relative z-10 text-lg font-medium">
            Gain specialized skills in backend engineering for high-stakes environments:
          </p>
          <ul className="space-y-5 relative z-10">
            {[
              "Designing scalable, fault-tolerant backend architectures.",
              "Implementing secure, ACID-compliant transaction flows.",
              "Managing strict data consistency across distributed systems.",
              "Building audit-ready logging and monitoring infrastructure."
            ].map((text, i) => (
              <li key={i} className="flex items-center text-zinc-100 font-medium">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 mr-4 flex-shrink-0" />
                {text}
              </li>
            ))}
          </ul>
        </div>
      </AnimatedSection>

      {/* 4) Why FinTech Backend Systems Matter */}
      <AnimatedSection dark>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">Why Backend Matters in FinTech?</h2>
            <div className="space-y-10">
              {[
                { icon: Activity, title: "High Availability", desc: "Financial systems must be always-on. Downtime means lost revenue and trust." },
                { icon: Shield, title: "Uncompromised Integrity", desc: "Accuracy is everything. Data must be consistent, secure, and verifiable." },
                { icon: Scale, title: "Regulatory Compliance", desc: "Code must adhere to strict legal standards like GDPR, PCI-DSS, and SOX." }
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
                {/* Visual Representation of Backend Logic / JSON */}
                <div className="font-mono text-xs md:text-sm overflow-hidden text-zinc-400">
                  <div className="flex items-center gap-2 border-b border-zinc-800 pb-2 mb-4">
                    <span className="text-zinc-500">POST /api/v1/transactions/transfer</span>
                  </div>
                  <div className="space-y-1">
                    <p><span className="text-purple-400">@Transactional</span></p>
                    <p><span className="text-yellow-300">public</span> <span className="text-blue-400">TransactionResponse</span> processTransfer(Request req) {'{'}</p>
                    <p className="pl-4"><span className="text-zinc-500">// 1. Validate Balance</span></p>
                    <p className="pl-4"><span className="text-yellow-300">if</span> (!account.hasFunds(req.amount)) <span className="text-yellow-300">throw</span> <span className="text-blue-400">new</span> InsufficientFundsException();</p>
                    <p className="pl-4"><span className="text-zinc-500">// 2. Debit Sender (Atomic)</span></p>
                    <p className="pl-4">accountRepository.debit(req.senderId, req.amount);</p>
                    <p className="pl-4"><span className="text-zinc-500">// 3. Credit Receiver (Atomic)</span></p>
                    <p className="pl-4">accountRepository.credit(req.receiverId, req.amount);</p>
                    <p className="pl-4"><span className="text-zinc-500">// 4. Audit Log</span></p>
                    <p className="pl-4">auditService.log(TransactionType.TRANSFER, req);</p>
                    <p className="pl-4"><span className="text-yellow-300">return</span> <span className="text-blue-400">new</span> TransactionResponse(Status.SUCCESS);</p>
                    <p>{'}'}</p>
                  </div>
                </div>
             </div>
          </FadeIn>
        </div>
      </AnimatedSection>

      {/* 5) Technical Scope (Syllabus) */}
      <AnimatedSection id="syllabus" dark className="relative bg-transparent">
         <div className="absolute inset-0 bg-zinc-950/80 pointer-events-none" />
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-16">
             <span className="text-emerald-500 font-bold tracking-[0.2em] text-xs uppercase mb-4 block">Project Blueprint</span>
             <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Technical Scope</h2>
             <p className="text-zinc-200 text-lg font-medium">A comprehensive backend roadmap for financial engineering.</p>
          </div>
          
          <div className="space-y-8">
            {PROJECT_MODULES.map((mod, i) => (
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

      {/* 6) Technologies & Tools */}
      <AnimatedSection dark>
        <div className="max-w-6xl mx-auto">
           <h2 className="text-3xl font-bold mb-10 text-center text-white">Technologies Stack</h2>
           <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {[
                 { name: "Java / Spring Boot", Icon: SiSpringboot, color: "text-green-500" },
                 { name: "PostgreSQL", Icon: SiPostgresql, color: "text-blue-400" },
                 { name: "Hibernate / JPA", Icon: SiHibernate, color: "text-yellow-600" },
                 { name: "Apache Kafka", Icon: SiApachekafka, color: "text-zinc-100" },
                 { name: "Docker", Icon: SiDocker, color: "text-blue-500" },
                 { name: "Redis", Icon: SiRedis, color: "text-red-500" },
              ].map((tech, i) => (
                 <div key={i} className="flex flex-col items-center justify-center p-6 bg-zinc-900 rounded-xl border border-zinc-800 hover:border-emerald-500/50 transition-all">
                    <tech.Icon className={`w-10 h-10 ${tech.color} mb-3`} />
                    <span className="text-zinc-300 font-bold text-sm text-center">{tech.name}</span>
                 </div>
              ))}
           </div>
        </div>
      </AnimatedSection>

      {/* 7) What You Will Learn (Summary) */}
      <AnimatedSection dark>
        <div className="max-w-5xl mx-auto bg-zinc-900/50 rounded-3xl p-10 border border-zinc-800 mt-16">
           <h2 className="text-3xl font-bold mb-8 text-center text-white">Project Outcomes</h2>
           <div className="grid md:grid-cols-2 gap-6">
              {[
                 "Think like a backend architect for high-stakes systems.",
                 "Implement defense-in-depth security strategies.",
                 "Build production-grade, reliable, and testable code.",
                 "Master data consistency in distributed environments.",
                 "Navigate complex compliance and regulatory requirements.",
                 "Deploy and monitor secure financial applications."
              ].map((outcome, i) => (
                 <div key={i} className="flex items-center text-lg text-zinc-200">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400 mr-4 flex-shrink-0" />
                    {outcome}
                 </div>
              ))}
           </div>
        </div>
      </AnimatedSection>

      {/* 8) Career Relevance */}
      <AnimatedSection dark>
         <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center text-white">Career Impact</h2>
         <div className="flex flex-wrap justify-center gap-6 max-w-5xl mx-auto">
            {["Backend Engineer", "FinTech Developer", "Platform Engineer", "Systems Architect", "Security Engineer"].map((role, i) => (
               <FadeIn key={i} delay={i * 0.05}>
                 <div className="px-10 py-5 rounded-2xl bg-zinc-950 border border-zinc-700/50 text-white font-bold text-lg shadow-2xl hover:border-emerald-500/60 hover:text-emerald-400 hover:scale-110 transition-all cursor-default backdrop-blur-md">
                   {role}
                 </div>
               </FadeIn>
            ))}
         </div>
         <p className="text-center text-zinc-500 mt-12 max-w-2xl mx-auto font-bold uppercase tracking-widest text-xs">
           Directly applicable skills for the financial technology sector
         </p>
      </AnimatedSection>

      {/* 9) Start Your Journey Today (CTA) */}
      <section className="py-32 bg-zinc-950 relative overflow-hidden text-center px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 to-black pointer-events-none" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-900/20 via-transparent to-transparent pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-10 tracking-tighter drop-shadow-2xl">Build the Backend of the Future</h2>
          <p className="text-emerald-100 text-2xl mb-16 max-w-2xl mx-auto font-medium leading-relaxed opacity-90">
            Secure, scalable, and compliant. Prove you can build the systems that power the global economy.
          </p>
          <Button 
            size="lg" 
            className="min-w-[300px] shadow-emerald-500/40 shadow-2xl !bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white border-none font-bold text-2xl py-6 transition-all duration-500 uppercase tracking-widest hover:scale-110"
            onClick={() => navigate('/apply', { state: { selectedCourse: 'industry-project-1' } })}
          >
            Apply for Project <ArrowRight className="w-8 h-8 ml-3" />
          </Button>
          <p className="mt-12 text-zinc-500 font-bold uppercase tracking-[0.3em] text-xs">
            Simulation • Backend • Enterprise-Grade
          </p>
        </div>
      </section>

    </div>
  );
};

export default FinTechPage;