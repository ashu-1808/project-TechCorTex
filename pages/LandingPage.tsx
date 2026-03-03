import React from 'react';
import { Hero, About, CoursesList, LearningModes, StickyCTA } from '../components/LandingSections';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/UI';
import { Cpu, Facebook, Twitter, Linkedin, Instagram, CircuitBoard } from 'lucide-react';

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="sticky top-0 z-40 w-full bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => navigate('/')}>
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 bg-teal-500 blur opacity-20 group-hover:opacity-40 transition-opacity rounded-lg"></div>
            <div className="relative bg-gradient-to-br from-zinc-900 to-zinc-950 p-2 rounded-lg border border-teal-500/30 group-hover:border-teal-500/50 transition-colors shadow-lg">
               <Cpu className="w-5 h-5 text-teal-400" />
            </div>
          </div>
          <span className="font-brand font-bold text-3xl tracking-tight bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-500 text-transparent bg-clip-text bg-[length:200%_auto] animate-text-shimmer">Techcortex</span>
        </div>
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex gap-6 text-sm font-medium text-zinc-400">
            <a href="#about" className="hover:text-teal-400 transition-colors">About</a>
            <a href="#courses" className="hover:text-teal-400 transition-colors">Courses</a>
            <a href="#reviews" className="hover:text-teal-400 transition-colors">Reviews</a>
          </nav>
          <Button size="sm" onClick={() => navigate('/apply')}>Apply Now</Button>
        </div>
      </div>
    </header>
  );
};

const Footer = () => {
  return (
    <footer className="bg-zinc-900 border-t border-zinc-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-1">
             <div className="flex items-center space-x-3 mb-4">
                <div className="bg-teal-500/10 p-1.5 rounded-lg border border-teal-500/20">
                  <Cpu className="w-5 h-5 text-teal-500" />
                </div>
                <span className="font-brand font-bold text-lg text-zinc-100">Techcortex</span>
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Empowering the next generation of tech leaders with industry-ready skills and real-world experience.
              </p>
          </div>
          <div>
            <h4 className="font-bold text-zinc-100 mb-4">Programs</h4>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li>AWS & DevOps</li>
              <li>Full Stack Web Dev</li>
              <li>Data Science & AI</li>
              <li>Corporate Training</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-zinc-100 mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li>About Us</li>
              <li>Success Stories</li>
              <li>Careers</li>
              <li>Contact</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-zinc-100 mb-4">Connect</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-zinc-500 hover:text-teal-400 transition-colors"><Facebook className="w-5 h-5"/></a>
              <a href="#" className="text-zinc-500 hover:text-teal-400 transition-colors"><Twitter className="w-5 h-5"/></a>
              <a href="#" className="text-zinc-500 hover:text-teal-400 transition-colors"><Linkedin className="w-5 h-5"/></a>
              <a href="#" className="text-zinc-500 hover:text-teal-400 transition-colors"><Instagram className="w-5 h-5"/></a>
            </div>
          </div>
        </div>
        <div className="border-t border-zinc-800 pt-8 text-center text-sm text-zinc-500">
          &copy; {new Date().getFullYear()} Techcortex. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Hero />
        <CoursesList />
        <About />
        <LearningModes />
        {/* Why Choose Us / CTA Final */}
        <section className="py-20 bg-teal-900 text-white text-center px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-zinc-950/70"></div>
          {/* Decorative mesh */}
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-900/40 via-zinc-900/0 to-transparent"></div>
          
          <div className="relative max-w-4xl mx-auto z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Ready to Transform Your Career?</h2>
            <p className="text-teal-100 text-lg mb-8 max-w-2xl mx-auto">
              Join 5,000+ graduates who have successfully transitioned into top-tier tech roles.
              Seats are filling fast for the upcoming batch.
            </p>
            <Button 
              size="lg" 
              variant="secondary" // Visual contrast on dark bg
              className="bg-white text-teal-900 hover:bg-zinc-100 border-none shadow-xl"
              onClick={() => window.location.hash = '/apply'}
            >
              Start Your Application
            </Button>
            <p className="mt-4 text-sm text-teal-200 opacity-80">Takes less than 2 minutes</p>
          </div>
        </section>
      </main>
      <Footer />
      <StickyCTA />
    </div>
  );
};

export default LandingPage;