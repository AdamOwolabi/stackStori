"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getSupabase } from "../../../../lib/supabase";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
}

const CreateProfile = () => {
  const [playerName, setPlayerName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  const router = useRouter();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const glitchInterval = setInterval(() => {
      if (Math.random() < 0.1) {
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 200);
      }
    }, 2000);

    const particleInterval = setInterval(() => {
      setParticles(prev => [
        ...prev.filter(p => p.life > 0),
        {
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          life: 100,
          maxLife: 100,
        }
      ].slice(-50));
    }, 100);

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      clearInterval(glitchInterval);
      clearInterval(particleInterval);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const animateParticles = () => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        x: particle.x + particle.vx,
        y: particle.y + particle.vy,
        life: particle.life - 1,
      })));
    };

    const animationFrame = requestAnimationFrame(animateParticles);
    return () => cancelAnimationFrame(animationFrame);
  }, [particles]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!playerName.trim()) return;

    setIsLoading(true);

    try {
      const supabase = getSupabase();
      
      if (!supabase) {
        throw new Error('Supabase client not available');
      }

      // Step 1: Insert into player_profile
      const { data: profile, error: profileError } = await supabase
        .from("player_profile")
        .insert([
          {
            user_name: playerName.trim(),
            risk_profile: "moderate",
            age_months: 22 * 12,
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
            player_id: profile.id,
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
      
      {/* Animated Grid Background */}
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

      {/* Floating Particles */}
      {particles.map((particle, index) => (
        <div
          key={index}
          className="absolute w-1 h-1 bg-green-400 rounded-full pointer-events-none"
          style={{
            left: particle.x,
            top: particle.y,
            opacity: particle.life / particle.maxLife,
          }}
        />
      ))}

      <div className="relative z-10 max-w-2xl w-full mx-auto p-8">
        <div className={`transition-all duration-200 ${glitchActive ? 'animate-pulse' : ''}`}>
          <h1 className="text-6xl font-bold text-green-400 mb-4 text-center tracking-wider">
            STACK<span className="text-yellow-400">STORI</span>
          </h1>
          
          <div className="text-center mb-8">
            <div className="text-gray-300 text-lg mb-2">INITIALIZING PLAYER PROFILE</div>
            <div className="flex justify-center space-x-2">
              {Array.from({ length: 20 }, (_, i) => (
                <div
                  key={i}
                  className="w-2 h-1 bg-green-400"
                  style={{
                    opacity: Math.random() > 0.5 ? 1 : 0.3,
                    animationDelay: `${i * 0.1}s`
                  }}
                />
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="relative">
              <label className="block text-sm font-bold text-green-400 mb-4 uppercase tracking-widest">
                ENTER_PLAYER_NAME:
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  className="w-full bg-gray-900/50 border-2 border-green-400 text-white p-4 text-xl font-mono focus:outline-none focus:border-yellow-400 focus:bg-gray-800/50 transition-all duration-300"
                  placeholder="YOUR_HANDLE"
                  maxLength={20}
                  disabled={isLoading}
                  style={{
                    textShadow: '0 0 10px rgba(0, 255, 0, 0.3)',
                  }}
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <div className="w-3 h-6 bg-green-400 animate-pulse" />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={!playerName.trim() || isLoading}
              className={`
                w-full py-4 text-xl font-bold tracking-widest uppercase transition-all duration-300
                ${isLoading 
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-green-600 to-yellow-600 text-black hover:from-green-500 hover:to-yellow-500 hover:shadow-lg hover:shadow-green-400/25'
                }
                ${!playerName.trim() ? 'opacity-50' : ''}
              `}
              style={{
                boxShadow: isLoading ? 'none' : '0 0 20px rgba(0, 255, 0, 0.3)',
              }}
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-400" />
                  <span>CREATING_PROFILE...</span>
                </div>
              ) : (
                'INITIALIZE_GAME'
              )}
            </button>
          </form>

          <div className="mt-8 text-center text-gray-500 text-sm space-y-2">
            <div>RISK_LEVEL: <span className="text-yellow-400">MODERATE</span></div>
            <div>STARTING_CAPITAL: <span className="text-green-400">$50,000</span></div>
            <div>AGE: <span className="text-blue-400">22_YEARS</span></div>
          </div>
        </div>
      </div>

      {glitchActive && (
        <div className="absolute inset-0 bg-green-400/5 animate-pulse pointer-events-none" />
      )}
    </div>
  );
};

export default CreateProfile;