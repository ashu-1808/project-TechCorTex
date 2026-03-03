import React, { ReactNode, forwardRef } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { LucideIcon, Loader2 } from 'lucide-react';

// --- Types ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: LucideIcon;
  rightIcon?: LucideIcon;
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { value: string; label: string }[];
  error?: string;
}

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  dark?: boolean;
}

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

// --- Components ---

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ 
  children, variant = 'primary', size = 'md', isLoading, className = '', leftIcon: LeftIcon, rightIcon: RightIcon, ...props 
}, ref) => {
  
  // Base styles:
  // - Added `duration-300 ease-out` for smoother transitions.
  // - `active:scale-[0.96]` gives a satisfying tactile "click" feel.
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg active:scale-[0.96]";
  
  const variants = {
    // Primary: Lifts up slightly (-translate-y-1) and increases shadow glow on hover.
    primary: "bg-teal-600 text-white hover:bg-teal-500 hover:shadow-2xl hover:shadow-teal-500/40 hover:-translate-y-1 active:translate-y-0 active:bg-teal-700 focus:ring-teal-500 shadow-lg shadow-teal-900/20 border border-transparent",
    
    // Secondary: Subtle lift and shadow increase.
    secondary: "bg-zinc-100 text-zinc-900 hover:bg-white hover:shadow-xl hover:shadow-zinc-200/20 hover:-translate-y-0.5 active:translate-y-0 active:bg-zinc-200 focus:ring-zinc-200 shadow-sm",
    
    // Outline: Fills with the primary color (Teal) on hover for a bold interaction.
    outline: "border border-zinc-700 bg-transparent text-zinc-300 hover:bg-teal-600 hover:border-teal-600 hover:text-white hover:shadow-lg hover:shadow-teal-500/20 active:bg-teal-700 focus:ring-teal-500",
    
    // Ghost: Standard subtle background change.
    ghost: "text-zinc-400 hover:bg-zinc-800 hover:text-white active:bg-zinc-800/80",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      ref={ref}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
      {!isLoading && LeftIcon && <LeftIcon className="w-4 h-4 mr-2" />}
      {children}
      {!isLoading && RightIcon && <RightIcon className="w-4 h-4 ml-2" />}
    </button>
  );
});

export const Input = forwardRef<HTMLInputElement, InputProps>(({ label, error, className = '', ...props }, ref) => {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-zinc-400 mb-1.5">
        {label} {props.required && <span className="text-teal-500">*</span>}
      </label>
      <input
        ref={ref}
        className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all bg-zinc-950 text-zinc-100 placeholder-zinc-600 ${
          error ? 'border-red-500 focus:border-red-500 focus:ring-red-900' : 'border-zinc-800 focus:border-teal-500'
        } ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
    </div>
  );
});

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(({ label, error, className = '', ...props }, ref) => {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-zinc-400 mb-1.5">
        {label} {props.required && <span className="text-teal-500">*</span>}
      </label>
      <textarea
        ref={ref}
        className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500/50 min-h-[100px] transition-all bg-zinc-950 text-zinc-100 placeholder-zinc-600 ${
          error ? 'border-red-500 focus:border-red-500 focus:ring-red-900' : 'border-zinc-800 focus:border-teal-500'
        } ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
    </div>
  );
});

export const Select = forwardRef<HTMLSelectElement, SelectProps>(({ label, options, error, className = '', ...props }, ref) => {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-zinc-400 mb-1.5">
        {label} {props.required && <span className="text-teal-500">*</span>}
      </label>
      <div className="relative">
        <select
          ref={ref}
          className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500/50 appearance-none bg-zinc-950 text-zinc-100 transition-all ${
            error ? 'border-red-500 focus:border-red-500 focus:ring-red-900' : 'border-zinc-800 focus:border-teal-500'
          } ${className}`}
          {...props}
        >
          <option value="">Select an option</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-zinc-500">
          <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
        </div>
      </div>
      {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
    </div>
  );
});

export const AnimatedSection: React.FC<SectionProps> = ({ children, className = '', id, dark = false }) => {
  return (
    <section 
      id={id} 
      className={`py-16 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden ${dark ? 'bg-zinc-900' : 'bg-zinc-950'} ${className}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-7xl mx-auto"
      >
        {children}
      </motion.div>
    </section>
  );
};

export const FadeIn: React.FC<FadeInProps> = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);