import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, CheckCircle2, BookOpen,
  Globe, TrendingUp, Shield, Users, Server, Laptop, Database, Layers, Brain, Sparkles, Bot, Cpu, Zap, Code
} from 'lucide-react';
import { 
  SiPython, SiTensorflow, SiPytorch, SiScikitlearn, SiPandas, SiNumpy, SiOpenai, SiHuggingface, SiKeras, SiJupyter
} from 'react-icons/si';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button, AnimatedSection, FadeIn } from '../components/UI';

// --- Background Animation Component ---
const FloatingAiIcons = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 2000], [0, 400]); 

  // AI Theme: Indigo, Violet, Pink, Rose
  const iconTypes = [
    { Icon: SiPython, color: 'text-yellow-400', label: 'Python' }, 
    { Icon: SiTensorflow, color: 'text-orange-500', label: 'TensorFlow' }, 
    { Icon: SiPytorch, color: 'text-red-500', label: 'PyTorch' }, 
    { Icon: SiOpenai, color: 'text-zinc-100', label: 'OpenAI' }, 
    { Icon: SiHuggingface, color: 'text-yellow-500', label: 'Hugging Face' }, 
    { Icon: Brain, color: 'text-pink-500', label: 'Neural Net' }, 
    { Icon: Bot, color: 'text-indigo-400', label: 'Bot' }, 
    { Icon: Sparkles, color: 'text-violet-400', label: 'GenAI' }, 
    { Icon: SiScikitlearn, color: 'text-orange-400', label: 'Scikit' }, 
    { Icon: SiPandas, color: 'text-blue-500', label: 'Pandas' },
    { Icon: SiNumpy, color: 'text-blue-400', label: 'NumPy' },
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
    title: "Introduction to AI & Machine Learning",
    Icon: Brain,
    color: "text-indigo-500",
    desc: "Understand the landscape of Artificial Intelligence. Learn the difference between AI, ML, and Deep Learning.",
    why: "It's the foundation of the future. Understanding the core concepts is the first step to mastery.",
    topics: ["What is Artificial Intelligence?", "AI vs ML vs Deep Learning", "History & Evolution", "Real-world Applications"]
  },
  {
    title: "Python for Data Science & AI",
    Icon: SiPython,
    color: "text-yellow-400",
    desc: "Master Python, the lingua franca of AI. Learn to manipulate data with Pandas and NumPy.",
    why: "Python is the primary tool for almost all AI research and development.",
    topics: ["Python Syntax & Structures", "NumPy Arrays & Math", "Pandas DataFrames", "Data Visualization (Matplotlib)"]
  },
  {
    title: "Data Preprocessing & Feature Engineering",
    Icon: Database,
    color: "text-blue-500",
    desc: "Garbage in, garbage out. Learn to clean, transform, and prepare data for modeling.",
    why: "Real-world data is messy. 80% of an AI engineer's time is spent here.",
    topics: ["Handling Missing Data", "Normalization & Scaling", "Encoding Categorical Data", "Feature Selection"]
  },
  {
    title: "Supervised Learning Algorithms",
    Icon: TrendingUp,
    color: "text-green-500",
    desc: "Predict outcomes with labeled data. Master regression and classification techniques.",
    why: "Supervised learning powers everything from spam filters to house price prediction.",
    topics: ["Linear & Logistic Regression", "Decision Trees & Random Forests", "Support Vector Machines (SVM)", "K-Nearest Neighbors"]
  },
  {
    title: "Unsupervised Learning",
    Icon: Layers,
    color: "text-purple-500",
    desc: "Find hidden patterns in unlabeled data. Group customers or reduce dimensionality.",
    why: "Essential for discovering insights when you don't know what you're looking for.",
    topics: ["Clustering (K-Means, Hierarchical)", "Dimensionality Reduction (PCA)", "Association Rules", "Anomaly Detection"]
  },
  {
    title: "Neural Networks & Deep Learning",
    Icon: SiTensorflow,
    color: "text-orange-500",
    desc: "Build brains in code. Learn to create and train multi-layer neural networks.",
    why: "Deep learning is the engine behind modern AI breakthroughs like self-driving cars.",
    topics: ["Perceptrons & Multi-Layer Perceptrons", "Activation Functions (ReLU, Sigmoid)", "Backpropagation & Optimization", "Loss Functions"]
  },
  {
    title: "Generative AI Fundamentals",
    Icon: Sparkles,
    color: "text-pink-500",
    desc: "Create new content. Understand the revolution behind ChatGPT and Midjourney.",
    why: "GenAI is the hottest skill in tech right now. It's changing how we work.",
    topics: ["What is Generative AI?", "Discriminative vs Generative Models", "Foundation Models", "Prompt Engineering Basics"]
  },
  {
    title: "Generative Models (GANs, VAEs)",
    Icon: Bot,
    color: "text-violet-500",
    desc: "Dive deep into the architectures that generate realistic images and data.",
    why: "Understanding these models allows you to build creative AI applications.",
    topics: ["Generative Adversarial Networks (GANs)", "Variational Autoencoders (VAEs)", "Training Stability", "Image Generation"]
  },
  {
    title: "Natural Language Processing (NLP)",
    Icon: Globe,
    color: "text-teal-400",
    desc: "Teach computers to understand human language. Process text and speech.",
    why: "NLP is the key to chatbots, translation, and sentiment analysis.",
    topics: ["Text Preprocessing (Tokenization)", "Word Embeddings (Word2Vec)", "RNNs & LSTMs", "Sentiment Analysis"]
  },
  {
    title: "Transformer Architectures & Attention",
    Icon: SiHuggingface,
    color: "text-yellow-500",
    desc: "Master the 'T' in GPT. Understand the architecture that changed AI forever.",
    why: "Transformers are the gold standard for modern NLP and GenAI.",
    topics: ["Self-Attention Mechanism", "Encoder-Decoder Architecture", "BERT & GPT Overview", "Fine-tuning Models"]
  },
  {
    title: "Large Language Models (LLMs)",
    Icon: SiOpenai,
    color: "text-zinc-100",
    desc: "Work with giants. Learn to deploy, fine-tune, and integrate LLMs into apps.",
    why: "Building apps on top of LLMs is a massive career opportunity.",
    topics: ["RAG (Retrieval Augmented Generation)", "LangChain Framework", "Prompt Engineering Strategies", "Ethical AI"]
  },
  {
    title: "Model Evaluation & Deployment",
    Icon: Server,
    color: "text-blue-400",
    desc: "Take it to production. Evaluate your models and deploy them as APIs.",
    why: "A model on your laptop is useless. You need to serve it to the world.",
    topics: ["Confusion Matrix & ROC-AUC", "Model Serialization (Pickle)", "Flask/FastAPI Deployment", "MLOps Basics"]
  },
];

const AiMlPage: React.FC = () => {
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
               <div className="bg-gradient-to-r from-indigo-500 to-pink-500 p-2 rounded-lg mr-3 shadow-lg">
                 <Brain className="w-6 h-6 text-white" />
               </div>
               <span className="text-xl font-bold tracking-tight text-white">Generative AI & Machine Learning</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight leading-tight text-white drop-shadow-sm">
              Build the Future with <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 animate-text-shimmer bg-[length:200%_auto]">
                Artificial Intelligence.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-zinc-200 max-w-3xl mx-auto mb-10 leading-relaxed font-normal drop-shadow-md">
              From foundational Machine Learning to cutting-edge Generative AI. 
              Master Python, TensorFlow, and Large Language Models to shape the next generation of technology.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                size="lg" 
                onClick={() => navigate('/apply', { state: { selectedCourse: 'aiml-deeplearning' } })} 
                className="min-w-[220px] shadow-indigo-500/40 shadow-2xl !bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white border-none font-bold text-lg transition-all duration-300 active:scale-95 py-4"
              >
                Enroll Now
              </Button>
              <Button 
                variant="outline"
                size="lg" 
                onClick={() => document.getElementById('syllabus')?.scrollIntoView({ behavior: 'smooth'})} 
                className="min-w-[220px] text-white border-white/20 hover:border-indigo-500/50 hover:!bg-indigo-500/10 backdrop-blur-md !bg-transparent transition-all duration-300 active:scale-95 py-4 group"
                leftIcon={() => <BookOpen className="w-5 h-5 mr-2 text-indigo-400" />}
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
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center text-white">AI Arsenal</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Machine Learning", services: "Supervised & Unsupervised Learning, Regression, Classification, Clustering", Icon: Brain, color: "text-indigo-500", border: "hover:border-indigo-500/50" },
              { title: "Deep Learning", services: "Neural Networks, CNNs, RNNs, Backpropagation, Optimization", Icon: SiTensorflow, color: "text-orange-500", border: "hover:border-orange-500/50" },
              { title: "Generative AI", services: "LLMs, Transformers, GANs, VAEs, Prompt Engineering", Icon: Sparkles, color: "text-pink-500", border: "hover:border-pink-500/50" },
              { title: "Natural Language Processing", services: "Text Analysis, Sentiment Analysis, Chatbots, Word Embeddings", Icon: Globe, color: "text-teal-400", border: "hover:border-teal-500/50" },
              { title: "Data Science Stack", services: "Python, NumPy, Pandas, Matplotlib, Seaborn, Scikit-Learn", Icon: SiPython, color: "text-yellow-400", border: "hover:border-yellow-500/50" },
              { title: "AI Deployment (MLOps)", services: "Model Serving, Flask/FastAPI, Docker, Model Monitoring", Icon: Server, color: "text-blue-400", border: "hover:border-blue-500/50" },
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
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-zinc-900/90 to-zinc-950 rounded-3xl p-8 md:p-12 border border-zinc-700/50 shadow-2xl relative overflow-hidden group hover:border-indigo-500/30 transition-all duration-500 backdrop-blur-sm">
          <div className="absolute top-0 right-0 p-12 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity duration-700 pointer-events-none transform translate-x-10 -translate-y-10">
            <Bot className="w-80 h-80 text-indigo-500" />
          </div>
          <h2 className="text-3xl font-bold mb-6 relative z-10 text-white">Prerequisites</h2>
          <p className="text-zinc-200 mb-8 relative z-10 text-lg font-medium">
            AI is complex, but we break it down. Here is what you need to start:
          </p>
          <ul className="space-y-5 relative z-10">
            {[
              "Basic understanding of programming logic (Python preferred but not mandatory).",
              "Comfort with high school level mathematics (Linear Algebra/Calculus basics helpful).",
              "A curious mind ready to experiment and debug models.",
              "Laptop with internet connection (Cloud environments like Colab provided)."
            ].map((text, i) => (
              <li key={i} className="flex items-center text-zinc-100 font-medium">
                <span className="w-2.5 h-2.5 bg-indigo-500 rounded-full mr-4 shadow-[0_0_12px_rgba(99,102,241,0.8)] border border-indigo-400/50" />
                {text}
              </li>
            ))}
          </ul>
        </div>
      </AnimatedSection>

      {/* 4) Why AI/ML? */}
      <AnimatedSection dark>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">Why Learn Generative AI?</h2>
            <div className="space-y-10">
              {[
                { icon: Sparkles, title: "The Next Industrial Revolution", desc: "AI is transforming every industry from healthcare to finance. Be on the right side of history." },
                { icon: TrendingUp, title: "Explosive Demand", desc: "Companies are scrambling to hire engineers who can build and deploy LLM applications." },
                { icon: Zap, title: "Unlock Creativity", desc: "Generative AI isn't just about data; it's about creating art, code, and text at superhuman speed." }
              ].map((item, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="flex gap-5 group">
                    <div className="flex-shrink-0 mt-1 bg-zinc-900 p-3 rounded-xl border border-zinc-700 group-hover:border-indigo-500/50 transition-all shadow-lg">
                      <item.icon className="w-6 h-6 text-indigo-400" />
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
             <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-pink-500/20 blur-[80px] rounded-full" />
             <div className="bg-zinc-900/90 backdrop-blur-xl rounded-3xl p-10 border border-zinc-700/50 shadow-2xl relative hover:border-indigo-500/40 transition-all duration-500">
                
                {/* Visual Representation of Neural Net / GenAI */}
                <div className="flex flex-col gap-6">
                   <div className="flex justify-between items-center bg-zinc-950/50 p-4 rounded-xl border border-zinc-800">
                      <div className="flex items-center gap-3">
                         <div className="w-10 h-10 bg-indigo-900/30 rounded-lg flex items-center justify-center text-indigo-400"><SiPython className="w-6 h-6" /></div>
                         <div className="text-sm font-mono text-zinc-300">train_model.py</div>
                      </div>
                      <div className="text-xs text-green-400 font-bold animate-pulse">Running...</div>
                   </div>

                   <div className="grid grid-cols-3 gap-2">
                      {[1,2,3,4,5,6].map(n => (
                        <div key={n} className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                           <div className="h-full bg-gradient-to-r from-indigo-500 to-pink-500 animate-pulse" style={{ width: `${Math.random() * 100}%` }}></div>
                        </div>
                      ))}
                   </div>

                   <div className="bg-zinc-950/80 p-4 rounded-xl border border-zinc-800 font-mono text-xs text-zinc-400">
                      <p><span className="text-pink-500">Epoch 10/10</span> - loss: 0.0241 - acc: 0.985</p>
                      <p className="mt-2 text-zinc-500">// Generating response...</p>
                      <p className="mt-1 text-white typing-effect">"AI is reshaping the world..."</p>
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
             <span className="text-indigo-500 font-bold tracking-[0.2em] text-xs uppercase mb-4 block">Comprehensive Roadmap</span>
             <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Course Syllabus</h2>
             <p className="text-zinc-200 text-lg font-medium">From Python basics to deploying Large Language Models.</p>
          </div>
          
          <div className="space-y-8">
            {SYLLABUS_MODULES.map((mod, i) => (
              <motion.div 
                key={i} 
                whileHover={{ borderColor: "rgba(168, 85, 247, 0.4)", backgroundColor: "rgba(9, 9, 11, 0.98)" }}
                className="bg-zinc-950 rounded-3xl border border-zinc-800 overflow-hidden hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-500"
              >
                <div className="p-8 md:p-12">
                   <div className="flex flex-col md:flex-row gap-10">
                      <div className="flex-shrink-0">
                         <div className={`w-16 h-16 bg-zinc-900 rounded-2xl flex items-center justify-center border border-zinc-800 shadow-inner group-hover:border-indigo-500/30 transition-colors`}>
                           <mod.Icon className={`w-8 h-8 ${mod.color}`} />
                         </div>
                      </div>
                      <div className="flex-grow">
                         <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">{mod.title}</h3>
                         <p className="text-zinc-300 mb-6 leading-relaxed font-medium text-lg">{mod.desc}</p>
                         
                         <div className="mb-8 p-6 bg-zinc-900/40 rounded-2xl border border-zinc-800/50 backdrop-blur-sm">
                            <span className="text-xs font-black text-indigo-500 uppercase tracking-[0.15em] block mb-3">Why this matters</span>
                            <p className="text-zinc-100 text-base italic font-medium">"{mod.why}"</p>
                         </div>

                         <div>
                           <span className="text-xs font-black text-zinc-500 uppercase tracking-[0.2em] mb-4 block">Key Concepts</span>
                           <div className="grid sm:grid-cols-2 gap-y-3 gap-x-8">
                             {mod.topics.map((topic, tIndex) => (
                               <div key={tIndex} className="flex items-start text-base text-zinc-300 font-medium group/topic">
                                 <div className="w-2 h-2 bg-indigo-500/40 rounded-full mt-2 mr-3 flex-shrink-0 transition-colors group-hover/topic:bg-indigo-500" />
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
            {["Real-world Datasets", "GPU-Powered Labs", "Build Your Own LLM", "Capstone Project"].map((feat, i) => (
              <motion.div 
                key={i} 
                whileHover={{ y: -10, borderColor: "rgba(168, 85, 247, 0.5)", backgroundColor: "rgba(24, 24, 27, 0.95)" }}
                className="bg-zinc-950 p-10 rounded-[32px] border border-zinc-800 text-center transition-all duration-300 group cursor-default shadow-xl"
              >
                <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-pink-500 mx-auto mb-8 rounded-full group-hover:w-full transition-all duration-500" />
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
            {["AI Engineer", "Data Scientist", "ML Ops Engineer", "NLP Specialist", "AI Research Scientist"].map((role, i) => (
               <FadeIn key={i} delay={i * 0.05}>
                 <div className="px-10 py-5 rounded-2xl bg-zinc-950 border border-zinc-700/50 text-white font-bold text-lg shadow-2xl hover:border-indigo-500/60 hover:text-indigo-400 hover:scale-110 transition-all cursor-default backdrop-blur-md">
                   {role}
                 </div>
               </FadeIn>
            ))}
         </div>
         <p className="text-center text-zinc-500 mt-12 max-w-2xl mx-auto font-bold uppercase tracking-widest text-xs">
           High Paying Roles in Tech, Finance & Healthcare
         </p>
      </AnimatedSection>

      {/* 8) CTA */}
      <section className="py-32 bg-zinc-950 relative overflow-hidden text-center px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 to-black pointer-events-none" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-transparent to-transparent pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-10 tracking-tighter drop-shadow-2xl">Start Your AI Journey</h2>
          <p className="text-indigo-100 text-2xl mb-16 max-w-2xl mx-auto font-medium leading-relaxed opacity-90">
            Join the revolution. Build intelligence that changes the world.
            Secure your spot today.
          </p>
          <Button 
            size="lg" 
            className="min-w-[300px] shadow-indigo-500/40 shadow-2xl !bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white border-none font-bold text-2xl py-6 transition-all duration-500 uppercase tracking-widest hover:scale-110"
            onClick={() => navigate('/apply', { state: { selectedCourse: 'aiml-deeplearning' } })}
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

export default AiMlPage;