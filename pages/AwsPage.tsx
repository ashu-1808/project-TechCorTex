import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, CheckCircle2, BookOpen,
  Globe, TrendingUp, Shield, Users, Server, Laptop, Database, Layers, HardDrive, Network,
  Activity, Folder, Key, Lock, Cpu
} from 'lucide-react';
import { 
  SiAmazonec2, SiAmazons3, SiAmazonrds, SiAmazonroute53, 
  SiAmazoniam, SiAmazoncloudwatch, SiAwslambda, SiAmazondynamodb
} from 'react-icons/si';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button, AnimatedSection, FadeIn } from '../components/UI';

// --- Background Animation Component ---
const FloatingAwsIcons = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 200]); 

  const iconTypes = [
    { Icon: SiAmazonec2, color: 'text-orange-500', label: 'EC2' }, 
    { Icon: SiAmazonec2, color: 'text-orange-500', label: 'Fargate' }, 
    { Icon: SiAmazons3, color: 'text-green-500', label: 'S3' }, 
    { Icon: SiAmazonrds, color: 'text-blue-500', label: 'RDS' }, 
    { Icon: SiAmazondynamodb, color: 'text-blue-500', label: 'DynamoDB' },
    { Icon: SiAmazonroute53, color: 'text-purple-500', label: 'Route53' },
    { Icon: SiAmazoniam, color: 'text-red-500', label: 'IAM' }, 
    { Icon: SiAmazoncloudwatch, color: 'text-pink-500', label: 'CloudWatch' }, 
    { Icon: SiAwslambda, color: 'text-orange-500', label: 'Lambda' }, 
    { Icon: SiAmazonroute53, color: 'text-purple-500', label: 'API Gateway' }, 
  ];

  // Initialize immediately
  const [drops] = useState(() => 
    Array.from({ length: 95 }).map((_, i) => {
      const type = iconTypes[Math.floor(Math.random() * iconTypes.length)];
      const duration = 25 + Math.random() * 35;
      return {
        id: i,
        ...type,
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: duration,
        delay: -Math.random() * duration, // Instant start
        size: 30 + Math.random() * 50,
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
            y: [0, -50, 0],
            x: [0, 30, 0],
            rotate: [0, 15, -15, 0],
            opacity: [drop.opacity, drop.opacity * 1.5, drop.opacity]
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
    title: "Introduction to Cloud Computing & AWS",
    Icon: SiAmazonroute53,
    color: "text-purple-500",
    desc: "Understand the 'why' behind the cloud revolution. We'll cover the shift from traditional data centers to on-demand cloud infrastructure.",
    why: "Foundation for everything. You need to know the landscape before building on it.",
    topics: ["Cloud Service Models (IaaS, PaaS, SaaS)", "AWS Global Infrastructure (Regions, AZs)", "Creating your AWS Free Tier Account", "AWS Pricing & Billing Alarms"]
  },
  {
    title: "Identity & Access Management (IAM)",
    Icon: SiAmazoniam,
    color: "text-red-500",
    desc: "Security starts here. Learn how to control who can access your AWS resources and what they can do.",
    why: "Every real-world project requires strict security controls. This is day-one knowledge.",
    topics: ["IAM", "KMS", "WAF", "Shield", "GuardDuty"]
  },
  {
    title: "Compute Services",
    Icon: SiAmazonec2,
    color: "text-orange-500",
    desc: "The backbone of the cloud. Learn to launch, manage, and scale virtual servers in the cloud.",
    why: "Most applications still run on servers. You'll likely launch an EC2 instance in your first week on the job.",
    topics: ["EC2", "Lambda", "ECS", "EKS", "Fargate"]
  },
  {
    title: "Storage Solutions",
    Icon: SiAmazons3,
    color: "text-green-500",
    desc: "Where data lives. Explore object storage for files and block storage for your databases and OS.",
    why: "Data is the new oil. Knowing how to store it securely and cheaply is a critical skill.",
    topics: ["S3", "EBS", "EFS", "Glacier", "Storage Gateway"]
  },
  {
    title: "Networking & Delivery",
    Icon: Network, 
    color: "text-purple-500",
    desc: "Build your own isolated network in the cloud. This is the most technical but most rewarding part.",
    why: "Without a network, your servers can't talk. Mastering VPC sets you apart from junior engineers.",
    topics: ["VPC", "Route 53", "CloudFront", "Direct Connect"]
  },
  {
    title: "Database Management",
    Icon: SiAmazonrds,
    color: "text-blue-500",
    desc: "Move away from managing DB servers. Let AWS handle the heavy lifting for SQL and NoSQL databases.",
    why: "Modern apps need reliable databases. Managed services like RDS save huge amounts of admin time.",
    topics: ["RDS", "DynamoDB", "ElastiCache", "Redshift"]
  },
  {
    title: "High Availability & Scalability",
    Icon: SiAmazoncloudwatch,
    color: "text-pink-500",
    desc: "Make your app uncrashable. Learn to handle traffic spikes and server failures automatically.",
    why: "The cloud's main promise is infinite scale. This module teaches you how to unlock it.",
    topics: ["Auto Scaling", "Elastic Load Balancing (ALB/NLB)"]
  },
  {
    title: "Management & Governance",
    Icon: SiAmazoncloudwatch,
    color: "text-pink-500",
    desc: "Monitor and audit your AWS environment to ensure operational excellence and compliance.",
    why: "You can't manage what you don't measure. Observability is key to reliability.",
    topics: ["CloudWatch", "CloudTrail", "Config", "Systems Manager"]
  },
  {
    title: "Application Integration",
    Icon: SiAwslambda,
    color: "text-orange-400",
    desc: "Decouple microservices and build event-driven architectures.",
    why: "Modern cloud-native apps rely on asynchronous communication.",
    topics: ["SQS", "SNS", "Step Functions", "EventBridge"]
  },
  {
    title: "Developer Tools",
    Icon: SiAmazonec2,
    color: "text-blue-400",
    desc: "Automate your release pipelines and manage infrastructure as code.",
    why: "DevOps is the standard. Manual deployments are a thing of the past.",
    topics: ["CloudFormation", "CodeCommit", "CodeBuild", "CodeDeploy"]
  },
];

const AwsPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 font-sans text-zinc-100 selection:bg-orange-500/30 overflow-x-hidden">
      
      {/* GLOBAL BACKGROUND ICONS */}
      <FloatingAwsIcons />

      {/* 1) Course Information (Hero) */}
      <section className="relative pt-32 pb-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-900/10 via-zinc-950 to-zinc-950 pointer-events-none z-0" />
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <FadeIn>
            <div className="inline-flex items-center justify-center p-3 mb-8 rounded-2xl bg-zinc-900/40 border border-zinc-700/50 shadow-2xl backdrop-blur-xl">
               <div className="bg-orange-500/20 p-2 rounded-lg mr-3 shadow-inner">
                 <SiAmazonec2 className="w-6 h-6 text-orange-500" />
               </div>
               <span className="text-xl font-bold tracking-tight text-white text-center">Amazon Web Services (AWS) Cloud Computing</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight leading-tight text-white drop-shadow-sm">
              Master the Cloud. <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400 animate-text-shimmer bg-[length:200%_auto]">
                Build Scalable Solutions.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-zinc-200 max-w-3xl mx-auto mb-10 leading-relaxed font-normal drop-shadow-md">
              Comprehensive training designed to take you from a beginner to a confident Cloud Architect. 
              Learn to design, deploy, and manage robust applications on the world's leading cloud platform.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                size="lg" 
                onClick={() => navigate('/apply', { state: { selectedCourse: 'cloud-computing' } })} 
                className="min-w-[220px] shadow-orange-500/40 shadow-2xl !bg-orange-600 hover:!bg-orange-500 text-white border-none font-bold text-lg transition-all duration-300 active:scale-95 py-4"
              >
                Enroll Now
              </Button>
              <Button 
                variant="outline"
                size="lg" 
                onClick={() => document.getElementById('syllabus')?.scrollIntoView({ behavior: 'smooth'})} 
                className="min-w-[220px] text-white border-white/20 hover:border-orange-500/50 hover:!bg-orange-500/10 backdrop-blur-md !bg-transparent transition-all duration-300 active:scale-95 py-4 group"
                leftIcon={() => <BookOpen className="w-5 h-5 mr-2 text-orange-500" />}
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Compute Services", services: "EC2, Lambda, ECS, EKS, Fargate", Icon: SiAmazonec2, color: "text-orange-500" },
              { title: "Storage Solutions", services: "S3, EBS, EFS, Glacier, Storage Gateway", Icon: SiAmazons3, color: "text-green-500" },
              { title: "Networking & Delivery", services: "VPC, Route 53, CloudFront, Direct Connect", Icon: SiAmazonroute53, color: "text-purple-500" },
              { title: "Database Management", services: "RDS, DynamoDB, ElastiCache, Redshift", Icon: SiAmazonrds, color: "text-blue-500" },
              { title: "Security & Identity", services: "IAM, KMS, WAF, Shield, GuardDuty", Icon: SiAmazoniam, color: "text-red-500" },
              { title: "Management", services: "CloudWatch, CloudTrail, Config, Systems Manager", Icon: SiAmazoncloudwatch, color: "text-pink-500" },
              { title: "Application Integration", services: "SQS, SNS, Step Functions, EventBridge", Icon: SiAwslambda, color: "text-orange-400" },
              { title: "Developer Tools", services: "CloudFormation, CodeCommit, CodeBuild, CodeDeploy", Icon: SiAmazonec2, color: "text-blue-400" },
              { title: "High Availability", services: "Auto Scaling, Elastic Load Balancing (ALB/NLB)", Icon: SiAmazoncloudwatch, color: "text-orange-500" },
            ].map((item, i) => (
              <motion.div 
                key={i} 
                whileHover={{ scale: 1.03, borderColor: "rgba(249, 115, 22, 0.6)", backgroundColor: "rgba(24, 24, 27, 0.95)" }}
                className="bg-zinc-900/90 backdrop-blur-lg p-6 rounded-2xl border border-zinc-700/50 hover:shadow-2xl hover:shadow-orange-900/20 transition-all cursor-default group"
              >
                <div className="flex items-center mb-4">
                  <div className={`bg-zinc-950 p-2.5 rounded-xl mr-3 border border-zinc-700/50 group-hover:border-orange-500/50 transition-colors shadow-inner`}>
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
            <SiAmazonec2 className="w-80 h-80 text-orange-500" />
          </div>
          <h2 className="text-3xl font-bold mb-6 relative z-10 text-white">Prerequisites</h2>
          <p className="text-zinc-200 mb-8 relative z-10 text-lg font-medium">
            This course is designed to be accessible, but a few basics will help you get the most out of it:
          </p>
          <ul className="space-y-5 relative z-10">
            {[
              "Basic understanding of how computers and networks work.",
              "Familiarity with any operating system (Windows/Linux/Mac).",
              "No prior coding experience is strictly required, though helpful."
            ].map((text, i) => (
              <li key={i} className="flex items-center text-zinc-100 font-medium">
                <span className="w-2.5 h-2.5 bg-orange-500 rounded-full mr-4 shadow-[0_0_12px_rgba(249,115,22,0.8)] border border-orange-400/50" />
                {text}
              </li>
            ))}
          </ul>
        </div>
      </AnimatedSection>

      {/* 4) Why Choose AWS Cloud? */}
      <AnimatedSection dark>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">Why Learn AWS Cloud?</h2>
            <div className="space-y-10">
              {[
                { icon: Globe, title: "Global Industry Standard", desc: "AWS holds the largest market share in the cloud industry. Mastering it opens doors to opportunities worldwide." },
                { icon: TrendingUp, title: "High Demand Skills", desc: "Companies of all sizes, from startups to enterprises, are migrating to the cloud and need skilled professionals." },
                { icon: Shield, title: "Future-Proof Career", desc: "Cloud computing is the backbone of modern tech, including AI, IoT, and Data Analytics." }
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
             <div className="absolute inset-0 bg-orange-500/5 blur-[100px] rounded-full" />
             <div className="bg-zinc-900/90 backdrop-blur-xl rounded-3xl p-10 border border-zinc-700/50 shadow-2xl relative hover:border-orange-500/40 transition-all duration-500">
                <div className="flex items-center justify-between mb-10 pb-6 border-b border-zinc-800">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center border border-orange-500/20">
                      <SiAmazonec2 className="w-6 h-6 text-orange-500" />
                    </div>
                    <div>
                      <div className="text-sm text-zinc-400 font-bold uppercase tracking-wider">Instance Status</div>
                      <div className="text-white font-mono text-base font-bold">i-0a1b2c3d4e5f</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 rounded-full border border-green-500/20">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <div className="text-xs text-green-500 font-bold uppercase tracking-tighter">Running</div>
                  </div>
                </div>
                
                <div className="space-y-5 font-mono text-sm">
                  {[
                    { label: "Region", value: "us-east-1 (N. Virginia)" },
                    { label: "Public IPv4", value: "54.210.124.88" },
                    { label: "VPC ID", value: "vpc-0a1b2c3d" },
                    { label: "Instance Type", value: "t3.medium" }
                  ].map((row, idx) => (
                    <div key={idx} className="flex justify-between border-b border-zinc-800/50 pb-2">
                      <span className="text-zinc-500 font-bold">{row.label}</span>
                      <span className="text-zinc-100 font-bold">{row.value}</span>
                    </div>
                  ))}
                  <div className="mt-8 pt-4 text-center">
                     <span className="text-orange-500/80 text-xs font-bold uppercase tracking-[0.2em]">Live Training Environment</span>
                  </div>
                </div>
             </div>
         </FadeIn>
        </div>
      </AnimatedSection>

      {/* 5) Why Techcortex? */}
      <AnimatedSection>
        <div className="text-center mb-16">
           <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Why Techcortex for AWS?</h2>
           <p className="text-zinc-200 max-w-2xl mx-auto text-lg font-medium">We focus on what matters: practical skills that get the job done.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {[
            { icon: Users, title: "Expert-Led Training", desc: "Learn from architects who manage production clouds daily." },
            { icon: SiAmazonec2, title: "Real Environments", desc: "Work on live AWS consoles, not just simulations." },
            { icon: Shield, title: "Project-Based", desc: "Build a secure, scalable web app from scratch." }
          ].map((feature, i) => (
             <motion.div 
               key={i} 
               whileHover={{ y: -8, borderColor: "rgba(249, 115, 22, 0.4)", backgroundColor: "rgba(24, 24, 27, 0.98)" }}
               className="bg-zinc-900/90 backdrop-blur-lg p-10 rounded-3xl border border-zinc-700/50 shadow-xl transition-all duration-300 group cursor-default"
             >
               <div className="w-16 h-16 bg-zinc-950 rounded-2xl flex items-center justify-center border border-zinc-700/50 mb-8 group-hover:scale-110 group-hover:border-orange-500/40 transition-all duration-300 shadow-2xl">
                  <feature.icon className="w-8 h-8 text-orange-500" />
               </div>
               <h3 className="text-2xl font-bold mb-4 text-white">{feature.title}</h3>
               <p className="text-zinc-300 leading-relaxed font-medium">{feature.desc}</p>
             </motion.div>
          ))}
        </div>
      </AnimatedSection>

      {/* 6) Syllabus */}
      <AnimatedSection id="syllabus" dark className="relative overflow-hidden bg-transparent">
         <div className="absolute inset-0 bg-zinc-950/80 pointer-events-none" />
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-16">
             <span className="text-orange-500 font-bold tracking-[0.2em] text-xs uppercase mb-4 block">Comprehensive Curriculum</span>
             <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Course Syllabus</h2>
             <p className="text-zinc-200 text-lg font-medium">A structured path from basics to advanced architecture.</p>
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
                           <span className="text-xs font-black text-zinc-500 uppercase tracking-[0.2em] mb-4 block">Detailed Topics</span>
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

      {/* 7) Practical Skills */}
      <AnimatedSection>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
             <div>
               <h2 className="text-3xl md:text-4xl font-bold mb-10 text-white">Practical Skills You'll Master</h2>
               <div className="space-y-10">
                  {[
                    { icon: SiAmazonrds, title: "Architecting Solutions", desc: "Design multi-tier architectures that are secure, fault-tolerant, and cost-effective." },
                    { icon: SiAmazonec2, title: "Deployment Automation", desc: "Automate infrastructure deployment using code (IaC) instead of manual configuration." },
                    { icon: SiAmazoniam, title: "Security Best Practices", desc: "Implement the principle of least privilege, encryption at rest/transit, and network isolation." }
                  ].map((skill, i) => (
                    <FadeIn key={i} delay={i * 0.1} className="flex gap-6 group">
                        <div className="w-14 h-14 bg-zinc-900 rounded-2xl flex items-center justify-center flex-shrink-0 border border-zinc-700/50 group-hover:border-orange-500/40 transition-all shadow-lg">
                          <skill.icon className="w-7 h-7 text-orange-500" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold mb-2 text-white">{skill.title}</h3>
                          <p className="text-zinc-300 leading-relaxed font-medium text-lg">{skill.desc}</p>
                        </div>
                    </FadeIn>
                  ))}
               </div>
             </div>
             <div className="relative h-[600px] bg-zinc-900 rounded-[32px] border border-zinc-700/50 overflow-hidden shadow-2xl flex items-center justify-center group/viz">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-950/20 via-zinc-950 to-zinc-950" />
                <div className="relative z-10 grid grid-cols-2 gap-12 opacity-90 group-hover/viz:scale-105 transition-transform duration-700">
                   <div className="w-28 h-28 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center animate-pulse shadow-2xl"><SiAmazonec2 className="w-12 h-12 text-orange-500" /></div>
                   <div className="w-28 h-28 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center shadow-2xl"><SiAmazonrds className="w-12 h-12 text-blue-500" /></div>
                   <div className="w-28 h-28 rounded-2xl bg-green-500/10 border border-green-500/30 flex items-center justify-center shadow-2xl"><SiAmazons3 className="w-12 h-12 text-green-500" /></div>
                   <div className="w-28 h-28 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center shadow-2xl"><SiAmazonroute53 className="w-12 h-12 text-purple-500" /></div>
                </div>
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-10">
                   <line x1="50%" y1="50%" x2="35%" y2="35%" stroke="white" strokeWidth="1" />
                   <line x1="50%" y1="50%" x2="65%" y2="35%" stroke="white" strokeWidth="1" />
                   <line x1="50%" y1="50%" x2="35%" y2="65%" stroke="white" strokeWidth="1" />
                   <line x1="50%" y1="50%" x2="65%" y2="65%" stroke="white" strokeWidth="1" />
                </svg>
             </div>
         </div>
        </div>
      </AnimatedSection>

      {/* 8) Key Features */}
      <AnimatedSection dark>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center text-white">Course Highlights</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {["Live Labs", "Real-world Projects", "Weekend Batches", "Resume Building"].map((feat, i) => (
              <motion.div 
                key={i} 
                whileHover={{ y: -10, borderColor: "rgba(249, 115, 22, 0.5)", backgroundColor: "rgba(24, 24, 27, 0.95)" }}
                className="bg-zinc-950 p-10 rounded-[32px] border border-zinc-800 text-center transition-all duration-300 group cursor-default shadow-xl"
              >
                <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-yellow-500 mx-auto mb-8 rounded-full group-hover:w-full transition-all duration-500" />
                <h3 className="font-bold text-xl text-white tracking-tight">{feat}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* 9) Benefits */}
      <AnimatedSection>
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-zinc-900/90 to-black p-10 md:p-20 rounded-[48px] border border-zinc-700/50 shadow-2xl hover:border-orange-500/30 transition-all duration-700 backdrop-blur-md">
          <h2 className="text-4xl font-bold mb-12 text-center text-white tracking-tight">Benefits of this Training</h2>
          <ul className="grid md:grid-cols-2 gap-x-12 gap-y-8">
            {[
              "Gain confidence to handle cloud migrations.",
              "Understand cloud cost management to save money.",
              "Ability to troubleshoot complex network issues.",
              "Prepare for technical interviews with solid concepts.",
              "Join a community of like-minded tech enthusiasts.",
              "Lifetime access to course materials and updates."
            ].map((benefit, i) => (
              <FadeIn key={i} delay={i * 0.05} className="flex items-start text-zinc-100 group">
                <div className="bg-orange-500/10 p-1 rounded-lg mr-4 mt-1 border border-orange-500/20 group-hover:bg-orange-500 transition-colors">
                  <CheckCircle2 className="w-5 h-5 text-orange-500 group-hover:text-white transition-colors" />
                </div>
                <span className="text-xl font-medium leading-relaxed">{benefit}</span>
              </FadeIn>
            ))}
          </ul>
        </div>
      </AnimatedSection>

      {/* 10) Career Opportunities */}
      <AnimatedSection dark>
         <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center text-white">Career Paths</h2>
         <div className="flex flex-wrap justify-center gap-6 max-w-5xl mx-auto">
            {["Cloud Engineer", "Solutions Architect", "DevOps Engineer", "SysOps Administrator", "Cloud Consultant"].map((role, i) => (
               <FadeIn key={i} delay={i * 0.05}>
                 <div className="px-10 py-5 rounded-2xl bg-zinc-950 border border-zinc-700/50 text-white font-bold text-lg shadow-2xl hover:border-orange-500/60 hover:text-orange-400 hover:scale-110 transition-all cursor-default backdrop-blur-md">
                   {role}
                 </div>
               </FadeIn>
            ))}
         </div>
         <p className="text-center text-zinc-500 mt-12 max-w-2xl mx-auto font-bold uppercase tracking-widest text-xs">
           Industry Recognized Roles & Responsibilities
         </p>
      </AnimatedSection>

      {/* 11) Proficiency */}
      <AnimatedSection>
        <div className="max-w-4xl mx-auto text-center">
           <div className="inline-block p-6 rounded-3xl bg-orange-500/10 mb-10 border border-orange-500/20 shadow-2xl">
             <TrendingUp className="w-16 h-16 text-orange-500" />
           </div>
           <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white tracking-tighter">Your Proficiency Post-Training</h2>
           <p className="text-2xl text-zinc-200 leading-relaxed font-medium drop-shadow-sm">
             By the end of this course, you will be able to independently architect, deploy, and secure a highly available web application on AWS. You will understand the <span className="text-orange-500 font-black">"why"</span> and <span className="text-orange-500 font-black">"how"</span> behind every major service.
           </p>
        </div>
      </AnimatedSection>

      {/* 12) CTA */}
      <section className="py-32 bg-orange-950 relative overflow-hidden text-center px-4">
        <div className="absolute inset-0 bg-black/90" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-900/40 via-transparent to-transparent pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-10 tracking-tighter drop-shadow-2xl">Ready to Launch Your Cloud Career?</h2>
          <p className="text-orange-100 text-2xl mb-16 max-w-2xl mx-auto font-medium leading-relaxed opacity-90">
            Don't just watch the cloud revolution happen. Be a part of it. 
            Secure your spot in the upcoming batch today.
          </p>
          <Button 
            size="lg" 
            className="bg-orange-500 text-white hover:bg-orange-400 hover:scale-110 shadow-[0_0_50px_rgba(249,115,22,0.6)] border-none min-w-[300px] text-2xl py-6 font-black transition-all duration-500 uppercase tracking-widest"
            onClick={() => navigate('/apply', { state: { selectedCourse: 'cloud-computing' } })}
          >
            Join Now <ArrowRight className="w-8 h-8 ml-3" />
          </Button>
          <p className="mt-12 text-zinc-500 font-bold uppercase tracking-[0.3em] text-xs">
            Limited Seats Available • 24/7 Support
          </p>
        </div>
      </section>

    </div>
  );
};

export default AwsPage;