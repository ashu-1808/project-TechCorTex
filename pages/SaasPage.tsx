import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, BookOpen, Cloud, Database, Users, Server, Globe, 
  CreditCard, Key, BarChart3, Shield, Activity, Layers, Repeat,
  Container, Settings, Code2, CheckCircle2, DollarSign
} from 'lucide-react';
import { 
  SiAmazonwebservices, SiStripe, SiDocker, SiKubernetes, SiPostgresql, 
  SiRedis, SiTypescript, SiNodedotjs, SiGo
} from 'react-icons/si';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button, AnimatedSection, FadeIn } from '../components/UI';

// --- Background Animation Component ---
const FloatingSaaSIcons = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 2000], [0, 400]); 

  const iconTypes = [
    { Icon: Cloud, color: 'text-sky-400', label: 'Cloud' }, 
    { Icon: SiAmazonwebservices, color: 'text-orange-500', label: 'AWS' }, 
    { Icon: SiStripe, color: 'text-indigo-400', label: 'Stripe' }, 
    { Icon: Users, color: 'text-emerald-400', label: 'Tenants' }, 
    { Icon: Database, color: 'text-blue-500', label: 'DB' }, 
    { Icon: Server, color: 'text-zinc-400', label: 'Server' }, 
    { Icon: SiDocker, color: 'text-blue-400', label: 'Docker' }, 
    { Icon: SiKubernetes, color: 'text-blue-600', label: 'K8s' },
    { Icon: CreditCard, color: 'text-purple-400', label: 'Billing' },
    { Icon: SiNodedotjs, color: 'text-green-500', label: 'Node' },
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

// --- Syllabus Data (SaaS Backend Focused) ---
const PROJECT_MODULES = [
  {
    title: "Modern SaaS Architecture Patterns",
    Icon: Layers,
    color: "text-indigo-400",
    desc: "Decouple and conquer. Understand service boundaries and evolving architectures.",
    why: "Choosing the right architecture prevents technical debt as you scale.",
    topics: ["Monolith vs Microservices", "API-First Design", "Event-Driven Architecture", "Service Boundaries"]
  },
  {
    title: "Multi-Tenancy Design Models",
    Icon: Users,
    color: "text-emerald-500",
    desc: "Serve thousands with one codebase. Master isolation strategies.",
    why: "Multi-tenancy is the defining characteristic of scalable SaaS platforms.",
    topics: ["Database-per-Tenant", "Schema-per-Tenant", "Row-Level Isolation", "Cost vs Isolation Trade-offs"]
  },
  {
    title: "Subscription & Billing Architecture",
    Icon: CreditCard,
    color: "text-purple-500",
    desc: "Monetize your platform. Build robust recurring billing workflows.",
    why: "Seamless billing is the lifeblood of any SaaS business.",
    topics: ["Subscription Lifecycles", "Stripe Integration", "Usage-Based Billing", "Webhook Event Handling"]
  },
  // Placeholder 1: Billing Flow Diagram
  {
    title: "Authentication & Tenant Access",
    Icon: Key,
    color: "text-yellow-500",
    desc: "Secure the perimeter. Manage users and roles within tenant contexts.",
    why: "Data leakage between tenants is a critical failure. Security must be tenant-aware.",
    topics: ["Tenant-Aware Auth", "Role-Based Access Control (RBAC)", "JWT & Session Management", "Context Propagation"]
  },
  {
    title: "Cloud-Native Infrastructure",
    Icon: Cloud,
    color: "text-sky-400",
    desc: "Built for the cloud. Leverage modern infrastructure patterns for infinite scale.",
    why: "Cloud-native apps are resilient, manageable, and observable by default.",
    topics: ["Stateless Services", "Horizontal Scaling", "Managed Cloud Services", "Infrastructure as Code"]
  },
  {
    title: "Containerization & Orchestration",
    Icon: Container,
    color: "text-blue-500",
    desc: "Ship consistently. Deploy your SaaS using Docker and Kubernetes.",
    why: "Containers ensure your app runs exactly the same in dev, staging, and prod.",
    topics: ["Docker Best Practices", "Kubernetes Deployment", "Rolling Updates", "Environment Isolation"]
  },
  // Placeholder 2: Infrastructure Diagram
  {
    title: "Data Management in SaaS",
    Icon: Database,
    color: "text-blue-400",
    desc: "Scale your storage. Design databases that handle multi-tenant loads efficiently.",
    why: "Data bottlenecks kill performance. Optimized storage is key to user happiness.",
    topics: ["SaaS Database Design", "Tenant-Aware Queries", "Zero-Downtime Migrations", "Backup & Recovery"]
  },
  {
    title: "Observability & Analytics",
    Icon: BarChart3,
    color: "text-orange-500",
    desc: "See inside the black box. Track usage and system health in real-time.",
    why: "You can't fix what you can't see. Metrics drive engineering decisions.",
    topics: ["Application Logging", "System Metrics", "Distributed Tracing", "Usage Analytics"]
  },
  {
    title: "Resilience, Scalability & Cost",
    Icon: Activity,
    color: "text-green-500",
    desc: "Scale up, costs down. Build systems that handle spikes without breaking the bank.",
    why: "Efficiency is profit. Cloud bills can explode without proper optimization.",
    topics: ["Auto-Scaling Policies", "Load Balancing", "Circuit Breakers", "Cost Optimization"]
  },
  // Placeholder 3: Scalability Diagram
  {
    title: "Security & Compliance in SaaS",
    Icon: Shield,
    color: "text-red-500",
    desc: "Trust is your product. Secure your platform against modern threats.",
    why: "SaaS customers trust you with their data. Security is non-negotiable.",
    topics: ["Data Encryption", "Secrets Management", "Compliance Standards (SOC2)", "Secure Configuration"]
  },
  {
    title: "Capstone Implementation",
    Icon: Code2,
    color: "text-cyan-400",
    desc: "Build the platform. From empty repo to production deployment.",
    why: "Experience the full lifecycle of shipping a modern cloud product.",
    topics: ["End-to-End Build", "Onboarding Flow", "Billing Integration", "Production Deployment"]
  },
];

const SaasPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 font-sans text-zinc-100 selection:bg-sky-500/30 overflow-x-hidden">
      
      {/* GLOBAL BACKGROUND ICONS */}
      <FloatingSaaSIcons />

      {/* 1) Project Overview (Hero) */}
      <section className="relative pt-32 pb-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-900/20 via-zinc-950 to-zinc-950 pointer-events-none z-0" />
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <FadeIn>
            <div className="inline-flex items-center justify-center p-3 mb-8 rounded-2xl bg-zinc-900/60 border border-zinc-700/50 shadow-2xl backdrop-blur-xl">
               <div className="bg-gradient-to-r from-sky-500 to-indigo-500 p-2 rounded-lg mr-3 shadow-lg">
                 <Cloud className="w-6 h-6 text-white" />
               </div>
               <span className="text-xl font-bold tracking-tight text-white">Industry Project: SaaS</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight leading-tight text-white drop-shadow-sm">
              Build Scalable <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-400 animate-text-shimmer bg-[length:200%_auto]">
                Cloud Platforms.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-zinc-200 max-w-3xl mx-auto mb-10 leading-relaxed font-normal drop-shadow-md">
              Master the backend engineering behind modern software products. 
              Architect multi-tenant systems, automate billing, and deploy to the cloud.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                size="lg" 
                onClick={() => navigate('/apply', { state: { selectedCourse: 'industry-project-2' } })} 
                className="min-w-[220px] shadow-sky-500/20 shadow-2xl !bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white border-none font-bold text-lg transition-all duration-300 active:scale-95 py-4"
              >
                Start Project
              </Button>
              <Button 
                variant="outline"
                size="lg" 
                onClick={() => document.getElementById('syllabus')?.scrollIntoView({ behavior: 'smooth'})} 
                className="min-w-[220px] text-white border-white/20 hover:border-sky-500/50 hover:!bg-sky-500/10 backdrop-blur-md !bg-transparent transition-all duration-300 active:scale-95 py-4 group"
                leftIcon={() => <BookOpen className="w-5 h-5 mr-2 text-sky-400" />}
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
              { title: "Multi-Tenant Core", desc: "A robust backend supporting thousands of isolated customer environments.", Icon: Users, color: "text-emerald-500" },
              { title: "Subscription Engine", desc: "Automated recurring billing, invoicing, and plan management.", Icon: Repeat, color: "text-purple-500" },
              { title: "Cloud Platform", desc: "Production-ready infrastructure with monitoring and auto-scaling.", Icon: Server, color: "text-sky-500" },
            ].map((item, i) => (
              <motion.div 
                key={i} 
                whileHover={{ scale: 1.03, backgroundColor: "rgba(24, 24, 27, 0.95)" }}
                className={`bg-zinc-900/90 backdrop-blur-lg p-6 rounded-2xl border border-zinc-700/50 hover:border-sky-500/30 transition-all cursor-default group h-full`}
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

      {/* 3) Core Backend & Cloud Learning Outcomes */}
      <AnimatedSection>
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-zinc-900/90 to-zinc-950 rounded-3xl p-8 md:p-12 border border-zinc-700/50 shadow-2xl relative overflow-hidden group hover:border-sky-500/30 transition-all duration-500 backdrop-blur-sm">
          <div className="absolute top-0 right-0 p-12 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity duration-700 pointer-events-none transform translate-x-10 -translate-y-10">
            <Globe className="w-80 h-80 text-sky-500" />
          </div>
          <h2 className="text-3xl font-bold mb-6 relative z-10 text-white">Cloud Engineering Mastery</h2>
          <p className="text-zinc-200 mb-8 relative z-10 text-lg font-medium">
            Gain the skills that power the world's biggest software companies:
          </p>
          <ul className="space-y-5 relative z-10">
            {[
              "Designing true multi-tenant architectures for scale.",
              "Implementing complex subscription billing workflows.",
              "Building cloud-native, containerized services.",
              "Managing tenant data isolation and platform security.",
              "Setting up observability stacks for production monitoring."
            ].map((text, i) => (
              <li key={i} className="flex items-center text-zinc-100 font-medium">
                <CheckCircle2 className="w-5 h-5 text-sky-500 mr-4 flex-shrink-0" />
                {text}
              </li>
            ))}
          </ul>
        </div>
      </AnimatedSection>

      {/* 4) Why Modern SaaS Architecture Matters */}
      <AnimatedSection dark>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">Why Learn SaaS Architecture?</h2>
            <div className="space-y-10">
              {[
                { icon: Activity, title: "Infinite Scalability", desc: "Learn to build systems that grow from 10 to 10 million users without rewriting code." },
                { icon: Shield, title: "Data Isolation", desc: "Master the techniques that keep customer data separate and secure in a shared environment." },
                { icon: DollarSign, title: "Business Logic", desc: "Understanding billing and subscriptions is what turns code into a profitable business." }
              ].map((item, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="flex gap-5 group">
                    <div className="flex-shrink-0 mt-1 bg-zinc-900 p-3 rounded-xl border border-zinc-700 group-hover:border-sky-500/50 transition-all shadow-lg">
                      <item.icon className="w-6 h-6 text-sky-400" />
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
             <div className="absolute inset-0 bg-gradient-to-r from-sky-600/20 to-indigo-500/20 blur-[80px] rounded-full" />
             <div className="bg-zinc-900/90 backdrop-blur-xl rounded-3xl p-10 border border-zinc-700/50 shadow-2xl relative hover:border-sky-500/40 transition-all duration-500">
                {/* Visual Representation of Cloud/Containers */}
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-center text-zinc-400 text-xs font-mono mb-2">
                    <span>Cluster Status: <span className="text-green-400">Healthy</span></span>
                    <span>Region: <span className="text-blue-400">us-east-1</span></span>
                  </div>
                  
                  {/* Pods Visualization */}
                  <div className="grid grid-cols-3 gap-3">
                     {[1,2,3].map(n => (
                       <div key={n} className="bg-zinc-800/50 rounded-lg p-3 border border-zinc-700/50 flex flex-col items-center">
                          <div className="w-8 h-8 rounded bg-sky-500/20 flex items-center justify-center mb-2">
                            <SiDocker className="w-5 h-5 text-sky-400" />
                          </div>
                          <div className="w-full h-1 bg-zinc-700 rounded-full overflow-hidden">
                             <div className="h-full bg-green-500 animate-pulse" style={{width: '80%'}}></div>
                          </div>
                          <span className="text-[10px] text-zinc-500 mt-1 font-mono">auth-service-{n}</span>
                       </div>
                     ))}
                     {[1,2,3].map(n => (
                       <div key={n+3} className="bg-zinc-800/50 rounded-lg p-3 border border-zinc-700/50 flex flex-col items-center">
                          <div className="w-8 h-8 rounded bg-purple-500/20 flex items-center justify-center mb-2">
                            <SiDocker className="w-5 h-5 text-purple-400" />
                          </div>
                          <div className="w-full h-1 bg-zinc-700 rounded-full overflow-hidden">
                             <div className="h-full bg-green-500 animate-pulse" style={{width: '60%'}}></div>
                          </div>
                          <span className="text-[10px] text-zinc-500 mt-1 font-mono">billing-svc-{n}</span>
                       </div>
                     ))}
                  </div>
                  
                  <div className="mt-4 p-3 bg-zinc-950 rounded-lg border border-zinc-800 font-mono text-[10px] text-zinc-500">
                    <p>&gt; kubectl get pods --namespace=production</p>
                    <p className="text-green-400 mt-1">NAME               READY   STATUS    RESTARTS   AGE</p>
                    <p>auth-service-1     1/1     Running   0          2d</p>
                    <p>billing-svc-1      1/1     Running   0          2d</p>
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
             <span className="text-sky-500 font-bold tracking-[0.2em] text-xs uppercase mb-4 block">Project Blueprint</span>
             <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Technical Scope</h2>
             <p className="text-zinc-200 text-lg font-medium">A comprehensive roadmap for cloud-native platform engineering.</p>
          </div>
          
          <div className="space-y-8">
            {PROJECT_MODULES.map((mod, i) => (
              <React.Fragment key={i}>
                <motion.div 
                  whileHover={{ borderColor: "rgba(14, 165, 233, 0.4)", backgroundColor: "rgba(9, 9, 11, 0.98)" }}
                  className="bg-zinc-950 rounded-3xl border border-zinc-800 overflow-hidden hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-500"
                >
                  <div className="p-8 md:p-12">
                     <div className="flex flex-col md:flex-row gap-10">
                        <div className="flex-shrink-0">
                           <div className={`w-16 h-16 bg-zinc-900 rounded-2xl flex items-center justify-center border border-zinc-800 shadow-inner group-hover:border-sky-500/30 transition-colors`}>
                             <mod.Icon className={`w-8 h-8 ${mod.color}`} />
                           </div>
                        </div>
                        <div className="flex-grow">
                           <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">{mod.title}</h3>
                           <p className="text-zinc-300 mb-6 leading-relaxed font-medium text-lg">{mod.desc}</p>
                           
                           <div className="mb-8 p-6 bg-zinc-900/40 rounded-2xl border border-zinc-800/50 backdrop-blur-sm">
                              <span className="text-xs font-black text-sky-500 uppercase tracking-[0.15em] block mb-3">Why this matters</span>
                              <p className="text-zinc-100 text-base italic font-medium">"{mod.why}"</p>
                           </div>

                           <div>
                             <span className="text-xs font-black text-zinc-500 uppercase tracking-[0.2em] mb-4 block">Key Concepts</span>
                             <div className="grid sm:grid-cols-2 gap-y-3 gap-x-8">
                               {mod.topics.map((topic, tIndex) => (
                                 <div key={tIndex} className="flex items-start text-base text-zinc-300 font-medium group/topic">
                                   <div className="w-2 h-2 bg-sky-500/40 rounded-full mt-2 mr-3 flex-shrink-0 transition-colors group-hover/topic:bg-sky-500" />
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
                 { name: "Node.js / Go", Icon: SiNodedotjs, color: "text-green-500" },
                 { name: "AWS Cloud", Icon: SiAmazonwebservices, color: "text-orange-500" },
                 { name: "PostgreSQL", Icon: SiPostgresql, color: "text-blue-400" },
                 { name: "Stripe API", Icon: SiStripe, color: "text-indigo-400" },
                 { name: "Kubernetes", Icon: SiKubernetes, color: "text-blue-600" },
                 { name: "Redis", Icon: SiRedis, color: "text-red-500" },
              ].map((tech, i) => (
                 <div key={i} className="flex flex-col items-center justify-center p-6 bg-zinc-900 rounded-xl border border-zinc-800 hover:border-sky-500/50 transition-all">
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
                 "Design scalable, multi-tenant database schemas.",
                 "Implement end-to-end subscription billing systems.",
                 "Deploy containerized microservices to the cloud.",
                 "Securely manage tenant data isolation.",
                 "Monitor production systems with real-time metrics.",
                 "Optimize cloud costs and resource usage."
              ].map((outcome, i) => (
                 <div key={i} className="flex items-center text-lg text-zinc-200">
                    <CheckCircle2 className="w-6 h-6 text-sky-400 mr-4 flex-shrink-0" />
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
            {["SaaS Backend Engineer", "Cloud Engineer", "Platform Engineer", "DevOps Specialist", "Technical Lead"].map((role, i) => (
               <FadeIn key={i} delay={i * 0.05}>
                 <div className="px-10 py-5 rounded-2xl bg-zinc-950 border border-zinc-700/50 text-white font-bold text-lg shadow-2xl hover:border-sky-500/60 hover:text-sky-400 hover:scale-110 transition-all cursor-default backdrop-blur-md">
                   {role}
                 </div>
               </FadeIn>
            ))}
         </div>
         <p className="text-center text-zinc-500 mt-12 max-w-2xl mx-auto font-bold uppercase tracking-widest text-xs">
           Directly applicable skills for the software-as-a-service sector
         </p>
      </AnimatedSection>

      {/* 9) Start Your Journey Today (CTA) */}
      <section className="py-32 bg-zinc-950 relative overflow-hidden text-center px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 to-black pointer-events-none" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-sky-900/20 via-transparent to-transparent pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-10 tracking-tighter drop-shadow-2xl">Engineer the Next Unicorn</h2>
          <p className="text-sky-100 text-2xl mb-16 max-w-2xl mx-auto font-medium leading-relaxed opacity-90">
            Scalable, profitable, and cloud-native. Prove you can build the platforms that run the modern web.
          </p>
          <Button 
            size="lg" 
            className="min-w-[300px] shadow-sky-500/40 shadow-2xl !bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white border-none font-bold text-2xl py-6 transition-all duration-500 uppercase tracking-widest hover:scale-110"
            onClick={() => navigate('/apply', { state: { selectedCourse: 'industry-project-2' } })}
          >
            Apply for Project <ArrowRight className="w-8 h-8 ml-3" />
          </Button>
          <p className="mt-12 text-zinc-500 font-bold uppercase tracking-[0.3em] text-xs">
            Simulation • Cloud-Native • Platform Engineering
          </p>
        </div>
      </section>

    </div>
  );
};

export default SaasPage;