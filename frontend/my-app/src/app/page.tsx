"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';


interface Particle {
  x: number;
  y: number;
  size: number;
  opacity: number;
}

const StackStori = () => {
  const [glitchActive, setGlitchActive] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Particle[]>([]);

  const router = useRouter(); // ✅ hook at top of component

  useEffect(() => {
    // Glitch effect
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 150);
    }, 4000);

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ 
        x: e.clientX - window.innerWidth / 2,
        y: e.clientY - window.innerHeight / 2
      });
    };

    // Particle system
    const createParticles = () => {
      const newParticles: Particle[] = [];
      for (let i = 0; i < 40; i++) {
        newParticles.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.5 + 0.1
        });
      }
      setParticles(newParticles);
    };

    window.addEventListener('mousemove', handleMouseMove);
    createParticles();

    return () => {
      clearInterval(glitchInterval);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative font-mono flex items-center justify-center">
      
      {/* Particle Canvas Background */}
      <div className="absolute inset-0">
        {particles.map((particle, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-green-400 rounded-full animate-pulse"
            style={{
              left: `${particle.x + mousePos.x * 0.01}px`,
              top: `${particle.y + mousePos.y * 0.01}px`,
              opacity: particle.opacity,
              transform: `scale(${particle.size})`
            }}
          />
        ))}
      </div>

      {/* Brutalist Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(90deg, #00ff00 1px, transparent 1px),
            linear-gradient(0deg, #00ff00 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          transform: `translate(${mousePos.x * 0.05}px, ${mousePos.y * 0.05}px)`
        }}
      />

      {/* Main Landing Content */}
      <div className="relative z-10 max-w-4xl w-full mx-auto p-8">
        
        {/* Header */}
        <div className="mb-20 text-center">
          <div className={`text-8xl font-black mb-6 ${glitchActive ? 'animate-pulse text-red-500' : 'text-green-400'}`}>
            STACK-STORY
          </div>
          <div className="text-lg text-gray-400 tracking-[0.4em] uppercase mb-6">
            FINANCIAL_LIFE_SIMULATOR
          </div>
          <div className="w-32 h-1 bg-green-400 mx-auto"></div>
          
          <div className="mt-12 text-gray-300 text-2xl leading-relaxed">
            Make financial choices.<br/>
            Build generational wealth.<br/>
            <div>
              Don&apos;t go broke.
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-8 mb-16">
          <div className="border-l-4 border-yellow-400 pl-8 bg-gray-900/30 p-6">
            <div className="text-sm text-gray-400 uppercase tracking-wide mb-2">ACTIVE_PLAYERS</div>
            <div className="text-4xl font-bold text-yellow-400">2,847</div>
          </div>
          <div className="border-l-4 border-blue-400 pl-8 bg-gray-900/30 p-6">
            <div className="text-sm text-gray-400 uppercase tracking-wide mb-2">LIFE_SCENARIOS</div>
            <div className="text-4xl font-bold text-blue-400">523</div>
          </div>
          <div className="border-l-4 border-red-400 pl-8 bg-gray-900/30 p-6">
            <div className="text-sm text-gray-400 uppercase tracking-wide mb-2">HIGHEST_NET_WORTH</div>
            <div className="text-4xl font-bold text-red-400">$10.0M</div>
          </div>
        </div>

        {/* Main CTA */}
        <div className="text-center mb-16">
          <button onClick={() => router.push('/game-views/createprofile-views')} className="bg-green-400 text-black px-24 py-8 text-3xl font-black uppercase tracking-wider hover:bg-yellow-400 transition-colors duration-200 border-4 border-black shadow-[12px_12px_0px_0px_#000000] hover:shadow-[6px_6px_0px_0px_#000000] hover:translate-x-1 hover:translate-y-1">
            START_SIMULATION
          </button>
        </div>

        {/* Secondary Actions */}
        <div className="grid grid-cols-2 gap-8 mb-16 max-w-2xl mx-auto">
          <button className="bg-black border-2 border-white text-white px-8 py-4 text-lg font-bold uppercase tracking-wide hover:bg-white hover:text-black transition-all duration-200">
            LEADERBOARD
          </button>
          <button className="bg-black border-2 border-gray-600 text-gray-400 px-8 py-4 text-lg font-bold uppercase tracking-wide hover:border-white hover:text-white transition-all duration-200">
            HOW_TO_PLAY
          </button>
        </div>

        {/* Tech Stack */}
        <div className="text-center mb-8">
          <div className="text-gray-500 mb-4 text-sm uppercase tracking-wide">POWERED_BY:</div>
          <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
            <div className="bg-gray-800 p-4 text-center text-green-400 text-sm font-bold">REACT</div>
            <div className="bg-gray-800 p-4 text-center text-blue-400 text-sm font-bold">FASTAPI</div>
            <div className="bg-gray-800 p-4 text-center text-yellow-400 text-sm font-bold">GEMINI</div>
            <div className="bg-gray-800 p-4 text-center text-purple-400 text-sm font-bold">SUPABASE</div>
          </div>
        </div>

        {/* Credits */}
        <div className="text-center text-sm text-gray-600">
          <div className="mb-3">UMBC_HACKATHON_2025</div>
          <div className="text-xs text-gray-700">
            SAMUEL_BAJUS • ADAM_OWOLABI • T12312433
          </div>
        </div>
      </div>

      {/* Glitch Effects */}
      {glitchActive && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="w-full h-full bg-red-500 opacity-10 animate-pulse"></div>
          <div className="absolute top-1/3 left-0 w-full h-1 bg-red-400 animate-pulse"></div>
          <div className="absolute top-2/3 left-0 w-full h-1 bg-green-400 animate-pulse"></div>
        </div>
      )}
    </div>
  );
};

export default StackStori;