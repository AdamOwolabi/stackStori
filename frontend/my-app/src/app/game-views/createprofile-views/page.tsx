"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from "../../../../lib/supabase"; // Fixed: relative path

interface Particle {
  x: number;
  y: number;
  size: number;
  opacity: number;
}

const CreateProfile = () => {
  const [playerName, setPlayerName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  const router = useRouter();

  useEffect(() => {
    // Glitch effect
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 150);
    }, 5000);

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
      for (let i = 0; i < 30; i++) {
        newParticles.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.4 + 0.1
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!playerName.trim()) return;

    setIsLoading(true);

    try {
      // Step 1: Insert into player_profile
      const { data: profile, error: profileError } = await supabase
        .from("player_profile")
        .insert([
          {
            user_name: playerName.trim(),
            risk_profile: "moderate",        // default risk profile
            age_months: 22 * 12,             // starting age = 22 years
            net_worth: 50000,
            max_net_worth: 50000,
            created_at: new Date().toISOString(),
          },
        ])
        .select()
        .single();

      if (profileError) throw profileError;
      console.log("✅ Player profile created:", profile);

      // Step 2: Create a linked game_session
      const { data: session, error: sessionError } = await supabase
        .from("game_session")
        .insert([
          {
            player_id: profile.id,            // link to newly created profile
            status: "ACTIVE",
            turn_number: 0,
            started_at: new Date().toISOString(),
          },
        ])
        .select()
        .single();

      if (sessionError) throw sessionError;
      console.log("✅ Game session created:", session);

      // Step 3: Redirect to game view with playerId
      router.push(`/game-views/game-session?playerId=${profile.id}`);
    } catch (err) {
      console.error("❌ Error creating profile/session:", err);

      // fallback mock id for dev
      const mockId = `mock_${Date.now()}`;
      router.push(`/game-views/game-session?playerId=${mockId}`);
    } finally {
      setIsLoading(false);
    }
  };

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

      {/* Main Content */}
      <div className="relative z-10 max-w-3xl w-full mx-auto p-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className={`text-7xl font-black mb-6 ${glitchActive ? 'animate-pulse text-red-500' : 'text-green-400'}`}>
            INITIALIZE_PLAYER
          </div>
          <div className="text-lg text-gray-400 tracking-[0.4em] uppercase mb-6">
            PROFILE_CREATION_PROTOCOL
          </div>
          <div className="w-32 h-1 bg-green-400 mx-auto"></div>
          
          <div className="mt-12 text-gray-300 text-xl leading-relaxed">
            Enter your player designation.<br/>
            Begin financial simulation.<br/>
            Accumulate digital wealth.
          </div>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
          
          {/* Name Input Section */}
          <div className="bg-gray-900/50 border-4 border-green-400 p-12 mb-12">
            <label className="block text-green-400 text-xl uppercase tracking-wide mb-6 text-center">
              PLAYER_NAME:
            </label>
            
            <div className="relative">
              <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                className="w-full bg-black border-2 border-gray-600 text-white p-6 text-2xl font-mono text-center focus:border-green-400 focus:outline-none uppercase tracking-wider placeholder-gray-500"
                placeholder="ENTER_YOUR_NAME"
                required
                maxLength={20}
                disabled={isLoading}
              />
              
              {/* Character count */}
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                {playerName.length}/20
              </div>
            </div>
            
            {/* Input decoration */}
            <div className="flex justify-center mt-4">
              <div className="w-16 h-1 bg-green-400"></div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center mb-12">
            <button
              type="submit"
              disabled={!playerName.trim() || isLoading}
              className={`px-20 py-8 text-3xl font-black uppercase tracking-wider border-4 border-black transition-all duration-200 ${
                isLoading 
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                  : !playerName.trim()
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                    : 'bg-green-400 text-black hover:bg-yellow-400 shadow-[12px_12px_0px_0px_#000000] hover:shadow-[6px_6px_0px_0px_#000000] hover:translate-x-1 hover:translate-y-1'
              }`}
            >
              {isLoading ? 'INITIALIZING...' : 'BEGIN_SIMULATION'}
            </button>
          </div>

          {/* Loading indicator */}
          {isLoading && (
            <div className="text-center mb-8">
              <div className="text-green-400 text-lg animate-pulse">
                → CONNECTING TO SUPABASE DATABASE...<br/>
                → CREATING PLAYER PROFILE...<br/>
                → LOADING FINANCIAL SCENARIOS...
              </div>
            </div>
          )}

          {/* Player Stats Preview */}
          <div className="grid grid-cols-3 gap-6 mb-12 opacity-60">
            <div className="border-l-4 border-yellow-400 pl-6 bg-gray-900/20 p-4">
              <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">STARTING_AGE</div>
              <div className="text-2xl font-bold text-yellow-400">22</div>
            </div>
            <div className="border-l-4 border-blue-400 pl-6 bg-gray-900/20 p-4">
              <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">STARTING_CAPITAL</div>
              <div className="text-2xl font-bold text-blue-400">$50K</div>
            </div>
            <div className="border-l-4 border-red-400 pl-6 bg-gray-900/20 p-4">
              <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">RISK_PROFILE</div>
              <div className="text-2xl font-bold text-red-400">MODERATE</div>
            </div>
          </div>
        </form>

        {/* Back Button */}
        <div className="text-center">
          <button
            onClick={() => router.push('/')}
            className="text-gray-400 hover:text-white transition-colors uppercase tracking-wide text-lg border-2 border-gray-600 hover:border-white px-8 py-3"
          >
            ← BACK_TO_MENU
          </button>
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

export default CreateProfile;