import React, { useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Cpu, Code, Hash, Terminal, Database } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Input, Select, TextArea, FadeIn } from '../components/UI';
import { ApplicationFormData, CourseId } from '../types';

// --- Form Options ---

const COURSE_OPTIONS = [
  { id: 'cloud-computing', label: 'AWS / Microsoft Azure Cloud', description: '2 Months • Advanced' },
  { id: 'devops', label: 'DevOps Engineering', description: '2 Months • Advanced' },
  { id: 'aiml-deeplearning', label: 'AI, ML & Deep Learning', description: '3 Months • Advanced' },
  { id: 'fullstack-java-python', label: 'Full Stack Python / Java', description: '3 Months • Intermediate' },
  { id: 'mean-mern', label: 'MEAN / MERN Stack Dev', description: '3 Months • Intermediate' },
  { id: 'ai-integrations', label: 'AI Integrations & Tools', description: '1 Month • Beginner to Pro' },
  { id: 'webapp-dev', label: 'Web App Development', description: '2 Months • Beginner' },
  { id: 'industry-project-1', label: 'Industry Project: FinTech', description: '1 Month • Practical' },
  { id: 'industry-project-2', label: 'Industry Project: SaaS', description: '1 Month • Practical' },
];

// --- Sub-components for cleaner file ---

interface FormSectionProps {
  title: string;
  children: React.ReactNode;
  delay?: number;
}

const FormSection: React.FC<FormSectionProps> = ({ title, children, delay = 0 }) => (
  <FadeIn delay={delay} className="mb-8 p-6 bg-zinc-900 rounded-xl border border-zinc-800 shadow-sm">
    <h3 className="text-lg font-semibold text-zinc-100 mb-4 border-b border-zinc-800 pb-2">{title}</h3>
    <div className="grid gap-6">
      {children}
    </div>
  </FadeIn>
);

const ApplicationPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Pre-select course if coming from landing page
  const preSelectedCourse = (location.state as any)?.selectedCourse as CourseId | undefined;

  const { register, control, handleSubmit, watch, formState: { errors } } = useForm<ApplicationFormData>({
    defaultValues: {
      courses: preSelectedCourse ? [preSelectedCourse] : [],
      status: 'Student',
      consent: false
    }
  });

  const statusValue = watch('status');

  const onSubmit: SubmitHandler<ApplicationFormData> = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('http://localhost:8080/api/v1/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        // Handle specific validation errors from backend
        const errorMessage = result.message || result.error || 'Failed to submit application';
        console.error("Backend Error Details:", result);
        throw new Error(errorMessage);
      }

      console.log("Form Data Submitted:", result);
      setIsSuccess(true);
      window.scrollTo(0, 0);
    } catch (error: any) {
      console.error("Submission Error:", error);
      alert(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    const quotes = [
      "\"Debugging: Being the detective in a crime movie where you are also the murderer.\"",
      "\"Code is like humor. When you have to explain it, it’s bad.\"",
      "\"Real programmers count from 0.\"",
      "\"It works on my machine... and now it's gonna work on yours.\"",
      "\"Eat. Sleep. Code. Repeat.\"",
      "\"Simplicity is the soul of efficiency.\""
    ];
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
        {/* Ambient Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-teal-900/20 via-zinc-950 to-zinc-950 pointer-events-none" />
        
        <motion.div 
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="bg-zinc-900/80 backdrop-blur-xl p-8 md:p-12 rounded-3xl shadow-2xl max-w-lg w-full text-center border border-zinc-800 relative z-10"
        >
          <motion.div 
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-24 h-24 bg-gradient-to-br from-teal-400 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-teal-500/20"
          >
            <CheckCircle2 className="w-12 h-12 text-white" />
          </motion.div>
          
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-indigo-500 mb-4 animate-text-shimmer bg-[length:200%_auto]">
            It's Giving... Success!
          </h2>
          
          <p className="text-zinc-300 text-lg mb-6 font-medium">
            You're officially on the radar. <span className="text-teal-400">Big moves only</span> from here on out. 🚀
          </p>

          <div className="bg-zinc-950/50 p-6 rounded-2xl border border-zinc-800/50 mb-8 transform rotate-1 hover:rotate-0 transition-transform duration-300">
             <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-2">Vibe Check</p>
             <p className="text-zinc-300 italic font-medium">
               {randomQuote}
             </p>
          </div>

          <div className="text-left space-y-4 mb-10">
             <h4 className="text-zinc-100 font-bold mb-3 flex items-center">
               <Cpu className="w-4 h-4 mr-2 text-teal-500" /> 
               What's the tea? (Next Steps)
             </h4>
             <ul className="text-sm text-zinc-400 space-y-3">
               <li className="flex items-start">
                 <div className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-1.5 mr-3 flex-shrink-0 animate-pulse" />
                 Sit tight, bestie. We're reviewing your app.
               </li>
               <li className="flex items-start">
                 <div className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-1.5 mr-3 flex-shrink-0 animate-pulse" />
                 Our team will slide into your DMs (or WhatsApp) within 24h.
               </li>
               <li className="flex items-start">
                 <div className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-1.5 mr-3 flex-shrink-0 animate-pulse" />
                 Let's get this bread. 🍞
               </li>
             </ul>
          </div>

          <Button onClick={() => navigate('/')} variant="primary" className="w-full bg-zinc-800 hover:bg-zinc-700 text-white border-none shadow-xl py-4 text-lg">
            Back to Base
          </Button>
          
          <p className="mt-4 text-xs text-zinc-600 font-mono">Ref ID: TC-{Math.floor(Math.random() * 100000)} // No Cap</p>
        </motion.div>
        
        {/* Glowing Tech Symbols - Left Side */}
        {[Code, Cpu, Hash, Terminal, Database].map((Icon, i) => (
          <motion.div
            key={`symbol-left-${i}`}
            className="absolute text-teal-500/40"
            initial={{ y: '110vh', opacity: 0, x: 0 }}
            animate={{ 
              y: '-10vh', 
              opacity: [0, 0.6, 0], 
              x: [0, (i % 2 === 0 ? 20 : -20), 0],
              rotate: [0, 45, -45, 0]
            }}
            transition={{ 
              duration: 8 + Math.random() * 5, 
              repeat: Infinity, 
              ease: "linear",
              delay: i * 2
            }}
            style={{ 
              left: `${4 + (i * 4)}%`,
            }}
          >
            <Icon size={32 + Math.random() * 20} strokeWidth={1.5} className="drop-shadow-[0_0_10px_rgba(20,184,166,0.5)]" />
          </motion.div>
        ))}
        
        {/* Glowing Tech Symbols - Right Side */}
        {[Code, Cpu, Hash, Terminal, Database].map((Icon, i) => (
          <motion.div
            key={`symbol-right-${i}`}
            className="absolute text-indigo-500/40"
            initial={{ y: '110vh', opacity: 0, x: 0 }}
            animate={{ 
              y: '-10vh', 
              opacity: [0, 0.6, 0], 
              x: [0, (i % 2 === 0 ? -20 : 20), 0],
              rotate: [0, -45, 45, 0]
            }}
            transition={{ 
              duration: 8 + Math.random() * 5, 
              repeat: Infinity, 
              ease: "linear",
              delay: i * 2.5
            }}
            style={{ 
              left: `${78 + (i * 4)}%`,
            }}
          >
            <Icon size={32 + Math.random() * 20} strokeWidth={1.5} className="drop-shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 font-sans">
      {/* Minimal Header */}
      <header className="bg-zinc-950 border-b border-zinc-800 h-16 flex items-center sticky top-0 z-30">
        <div className="max-w-3xl mx-auto w-full px-4 flex items-center justify-between">
          <Link to="/" className="flex items-center text-zinc-400 hover:text-teal-400 transition-colors text-sm font-medium group">
            <ArrowLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
          <div className="flex items-center space-x-3">
             <div className="bg-zinc-900 p-1.5 rounded-lg border border-teal-500/30">
                <Cpu className="w-5 h-5 text-teal-500" />
             </div>
            <span className="font-brand font-bold text-3xl tracking-tight bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-500 text-transparent bg-clip-text bg-[length:200%_auto] animate-text-shimmer">Techcortex</span>
          </div>
          <div className="w-20" /> {/* Spacer for centering */}
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-12">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-zinc-100 mb-2">Student Application Form</h1>
          <p className="text-zinc-400">Please fill out the details accurately. This helps us customize your learning path.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          
          <FormSection title="A. Personal Information" delay={0.1}>
            <div className="grid md:grid-cols-2 gap-4">
              <Input 
                label="Full Name" 
                placeholder="John Doe" 
                {...register("fullName", { required: "Name is required" })}
                error={errors.fullName?.message}
              />
              <Input 
                label="Mobile Number" 
                type="tel"
                placeholder="+1 (555) 000-0000" 
                {...register("mobile", { 
                  required: "Mobile is required",
                  pattern: { value: /^[0-9+\-\s()]*$/, message: "Invalid phone number" }
                })}
                error={errors.mobile?.message}
              />
            </div>
            <Input 
              label="Email Address" 
              type="email" 
              placeholder="john@example.com" 
              {...register("email", { 
                required: "Email is required",
                pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" }
              })}
              error={errors.email?.message}
            />
            <div className="grid md:grid-cols-2 gap-4">
               <Input 
                label="City / Location" 
                placeholder="e.g. New York" 
                {...register("location")} 
               />
               <AnimatePresence>
                 {statusValue === 'Student' && (
                   <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <Input 
                        label="College Name" 
                        placeholder="University of Tech" 
                        {...register("collegeName", { required: statusValue === 'Student' ? "College name is required" : false })}
                        error={errors.collegeName?.message}
                      />
                   </motion.div>
                 )}
               </AnimatePresence>
            </div>
          </FormSection>

          <FormSection title="B. Academic & Professional Status" delay={0.2}>
            <div className="grid md:grid-cols-2 gap-4">
              <Select 
                label="Current Status"
                options={[
                  { value: 'Student', label: 'Student' },
                  { value: 'Fresher', label: 'Fresher (Graduated)' },
                  { value: 'Professional', label: 'Working Professional' },
                  { value: 'Career Switcher', label: 'Career Switcher' },
                ]}
                {...register("status", { required: "Status is required" })}
                error={errors.status?.message}
              />
              <Input label="Highest Qualification / Course" placeholder="e.g. B.Tech CS, MBA" {...register("currentCourse")} />
            </div>
             <div className="grid md:grid-cols-2 gap-4">
              <Input label="Current Year / Designation" placeholder="e.g. 3rd Year OR Junior Dev" {...register("currentYear")} />
              <Input label="Graduation Year (Expected)" type="number" placeholder="2024" {...register("gradYear")} />
            </div>
          </FormSection>

          <FormSection title="C. Course Preference" delay={0.3}>
             <div>
               <label className="block text-sm font-medium text-zinc-300 mb-3">Select Interested Courses <span className="text-red-400">*</span></label>
               <div className="grid md:grid-cols-2 gap-4">
                 <Controller
                    name="courses"
                    control={control}
                    rules={{ required: "Please select at least one course" }}
                    render={({ field }) => (
                      <>
                        {COURSE_OPTIONS.map(option => (
                           <label 
                            key={option.id}
                            className={`relative flex flex-col p-4 border rounded-xl cursor-pointer transition-all ${
                              field.value.includes(option.id as CourseId) 
                              ? 'border-teal-500 bg-teal-900/20 ring-1 ring-teal-500' 
                              : 'border-zinc-700 hover:border-zinc-600 bg-zinc-950'
                            }`}
                           >
                             <div className="flex items-start justify-between">
                               <div>
                                 <span className="font-semibold text-zinc-100 block">{option.label}</span>
                                 <span className="text-xs text-zinc-400">{option.description}</span>
                               </div>
                               <input 
                                  type="checkbox" 
                                  value={option.id}
                                  checked={field.value.includes(option.id as CourseId)}
                                  onChange={(e) => {
                                    const value = e.target.value as CourseId;
                                    if (e.target.checked) {
                                      field.onChange([...field.value, value]);
                                    } else {
                                      field.onChange(field.value.filter((v: any) => v !== value));
                                    }
                                  }}
                                  className="h-5 w-5 text-teal-600 border-zinc-600 rounded focus:ring-teal-500 mt-0.5 bg-zinc-800"
                               />
                             </div>
                           </label>
                        ))}
                      </>
                    )}
                 />
               </div>
               {errors.courses && <p className="mt-2 text-sm text-red-400">{errors.courses.message}</p>}
             </div>
             
             <div className="grid md:grid-cols-2 gap-4 mt-6">
                <Select 
                  label="Preferred Learning Style"
                  options={[
                    { value: 'Live Online', label: 'Live Online Classes' },
                    { value: 'Self-Paced', label: 'Self-Paced Recordings' },
                    { value: 'Mentorship', label: 'With 1-on-1 Mentorship' },
                  ]}
                  {...register("learningMode", { required: "Mode is required" })}
                  error={errors.learningMode?.message}
                />
                 <Select 
                  label="Preferred Timing"
                  options={[
                    { value: 'Weekday', label: 'Weekdays (Mon-Fri)' },
                    { value: 'Weekend', label: 'Weekends (Sat-Sun)' },
                  ]}
                  {...register("batchType", { required: "Batch is required" })}
                  error={errors.batchType?.message}
                />
             </div>
          </FormSection>

          <FormSection title="D. Motivation & Additional" delay={0.4}>
            <TextArea 
              label="Why do you want to join this course?"
              placeholder="Tell us about your career goals and what you hope to achieve..."
              {...register("message", { required: "Please provide a short message" })}
              error={errors.message?.message}
            />
            
            <div className="mt-4">
              <Input 
                label="Friend to Study With (Optional)" 
                placeholder="Name of your friend (if applying together)"
                {...register("studyPartner")}
              />
            </div>
            
            <div className="mt-4">
               <Select 
                  label="How did you hear about us?"
                  options={[
                    { value: 'Google', label: 'Google Search' },
                    { value: 'Social Media', label: 'Instagram / LinkedIn' },
                    { value: 'Friend', label: 'Friend Referral' },
                    { value: 'Campus', label: 'Campus Drive' },
                  ]}
                  {...register("referralSource", { required: "This field is required" })}
                  error={errors.referralSource?.message}
                />
            </div>

            <div className="mt-6 flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="consent"
                  type="checkbox"
                  className="h-4 w-4 text-teal-600 border-zinc-600 rounded focus:ring-teal-500 bg-zinc-800"
                  {...register("consent", { required: "You must agree to proceed" })}
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="consent" className="font-medium text-zinc-300">
                  I consent to receiving updates and career counseling calls from Techcortex.
                </label>
                {errors.consent && <p className="text-red-400 mt-1">{errors.consent.message}</p>}
              </div>
            </div>
          </FormSection>

          <div className="flex justify-end pt-4 pb-20">
             <Button 
              type="submit" 
              size="lg" 
              isLoading={isSubmitting} 
              className="w-full md:w-auto min-w-[200px]"
             >
               Submit Application
             </Button>
          </div>

        </form>
      </main>
    </div>
  );
};

export default ApplicationPage;