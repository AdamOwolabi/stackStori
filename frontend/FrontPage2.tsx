import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { DollarSign, TrendingUp, Landmark, Sparkles, Gem, Play } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen p-4 flex items-center justify-center" 
         style={{ 
           background: 'linear-gradient(45deg, #16a34a 25%, transparent 25%), linear-gradient(-45deg, #16a34a 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #16a34a 75%), linear-gradient(-45deg, transparent 75%, #16a34a 75%)',
           backgroundSize: '30px 30px',
           backgroundPosition: '0 0, 0 15px, 15px -15px, -15px 0px',
           backgroundColor: '#22c55e',
           imageRendering: 'pixelated'
         }}>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
          
          @keyframes titleGlow {
            0%, 100% { 
              text-shadow: 2px 2px 0px rgba(0,0,0,0.8), 0px 0px 10px rgba(255,255,0,0.3);
            }
            50% { 
              text-shadow: 2px 2px 0px rgba(0,0,0,0.8), 0px 0px 20px rgba(255,255,0,0.6);
            }
          }
          
          @keyframes floatMoney {
            0%, 100% { 
              transform: translateY(0px) rotate(0deg);
            }
            25% { 
              transform: translateY(-5px) rotate(5deg);
            }
            75% { 
              transform: translateY(-2px) rotate(-5deg);
            }
          }
          
          @keyframes buttonPulse {
            0%, 100% { 
              transform: scale(1);
              box-shadow: 4px 4px 0px 0px #000000;
            }
            50% { 
              transform: scale(1.05);
              box-shadow: 6px 6px 0px 0px #000000;
            }
          }
          
          .text-shadow-pixel {
            text-shadow: 2px 2px 0px rgba(0,0,0,0.8);
          }
          
          .pixel-font {
            font-family: 'Press Start 2P', cursive;
          }
          
          * {
            image-rendering: pixelated;
            image-rendering: -moz-crisp-edges;
            image-rendering: crisp-edges;
          }
        `}
      </style>

      <div className="w-full max-w-3xl mx-auto relative">
        <Card className="border-8 border-black bg-gray-200 shadow-[12px_12px_0px_0px_#000000] overflow-hidden">
          {/* Rainbow header */}
          <div className="h-6 bg-gradient-to-r from-red-500 via-orange-500 via-yellow-500 via-green-500 via-blue-500 via-indigo-500 to-purple-500 border-b-4 border-black"></div>
          
          <CardHeader className="relative text-center py-12 px-8 bg-gray-100">
            {/* Floating money icons */}
            <div className="absolute top-6 left-8">
              <DollarSign className="w-6 h-6 text-yellow-600" style={{ animation: 'floatMoney 3s ease-in-out infinite' }} />
            </div>
            <div className="absolute top-12 right-12">
              <TrendingUp className="w-5 h-5 text-green-600" style={{ animation: 'floatMoney 2.5s ease-in-out infinite', animationDelay: '0.5s' }} />
            </div>
            <div className="absolute bottom-8 left-16">
              <Gem className="w-4 h-4 text-purple-600" style={{ animation: 'floatMoney 2.8s ease-in-out infinite', animationDelay: '1s' }} />
            </div>
            <div className="absolute bottom-12 right-8">
              <Sparkles className="w-5 h-5 text-blue-600" style={{ animation: 'floatMoney 3.2s ease-in-out infinite', animationDelay: '1.5s' }} />
            </div>

            {/* Main logo/icon */}
            <div className="flex items-center justify-center mb-8">
              <div className="relative">
                <div className="w-24 h-24 bg-yellow-500 border-6 border-black flex items-center justify-center shadow-[6px_6px_0px_0px_#000000]" 
                     style={{ animation: 'floatMoney 2s ease-in-out infinite' }}>
                  <DollarSign className="w-12 h-12 text-black" />
                </div>
              </div>
            </div>
            
            {/* Title */}
            <h1 
              className="text-4xl md:text-6xl font-bold text-black mb-4 pixel-font text-shadow-pixel uppercase tracking-wider"
              style={{ animation: 'titleGlow 2s ease-in-out infinite' }}
            >
              Stack Story
            </h1>
            
            {/* Subtitle */}
            <div className="bg-white border-4 border-black p-4 inline-block shadow-[4px_4px_0px_0px_#000000] mb-8">
              <p className="text-black font-bold pixel-font text-sm uppercase tracking-wide">
                Learn Finance in this Life Simulator
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 max-w-xl mx-auto">
              <div className="bg-blue-400 border-4 border-black p-3 shadow-[4px_4px_0px_0px_#000000]">
                <Landmark className="w-6 h-6 text-white mx-auto mb-2" />
                <p className="text-white pixel-font text-xs uppercase">Manage Debt</p>
              </div>
              <div className="bg-green-400 border-4 border-black p-3 shadow-[4px_4px_0px_0px_#000000]">
                <TrendingUp className="w-6 h-6 text-white mx-auto mb-2" />
                <p className="text-white pixel-font text-xs uppercase">Invest Smart</p>
              </div>
              <div className="bg-purple-400 border-4 border-black p-3 shadow-[4px_4px_0px_0px_#000000]">
                <Sparkles className="w-6 h-6 text-white mx-auto mb-2" />
                <p className="text-white pixel-font text-xs uppercase">Start Business</p>
              </div>
              <div className="bg-red-400 border-4 border-black p-3 shadow-[4px_4px_0px_0px_#000000]">
                <Gem className="w-6 h-6 text-white mx-auto mb-2" />
                <p className="text-white pixel-font text-xs uppercase">Buy Luxuries</p>
              </div>
            </div>

            {/* Play button */}
            <Link to={createPageUrl("SelectionPage")}>
              <Button
                className="bg-red-500 hover:bg-red-600 text-white border-4 border-black pixel-font text-lg px-8 py-4 uppercase shadow-[4px_4px_0px_0px_#000000] hover:shadow-[6px_6px_0px_0px_#000000] hover:translate-x-[-2px] hover:translate-y-[-2px] active:shadow-[2px_2px_0px_0px_#000000] active:translate-x-[2px] active:translate-y-[2px] transition-all duration-100"
                style={{ animation: 'buttonPulse 2s ease-in-out infinite' }}
              >
                <Play className="w-6 h-6 mr-3" />
                Play Game
              </Button>
            </Link>
          </CardHeader>

          <CardContent className="relative px-8 py-6 bg-gray-200">
            {/* Game stats preview */}
            <div className="flex justify-center items-center gap-6">
              <div className="bg-black text-green-400 px-4 py-2 border-2 border-green-400 pixel-font text-sm">
                STARTING NET WORTH: $0
              </div>
              <div className="bg-black text-yellow-400 px-4 py-2 border-2 border-yellow-400 pixel-font text-sm">
                STARTING AGE: 18
              </div>
            </div>

            {/* Decorative pixel elements */}
            <div className="flex justify-center mt-4 gap-2">
              {[1,2,3,4,5,6,7].map(i => (
                <div 
                  key={i}
                  className="w-2 h-2 bg-yellow-400 border border-black animate-pulse"
                  style={{ 
                    animationDelay: `${i * 0.15}s`,
                    animationDuration: '1.2s'
                  }}
                ></div>
              ))}
            </div>
          </CardContent>

          {/* Rainbow footer */}
          <div className="h-6 bg-gradient-to-r from-purple-500 via-indigo-500 via-blue-500 via-green-500 via-yellow-500 via-orange-500 to-red-500 border-t-4 border-black"></div>
        </Card>
      </div>
    </div>
  );
}
