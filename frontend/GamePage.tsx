import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { DollarSign, TrendingUp, Landmark, Sparkles, Gem } from 'lucide-react';
import OptionButton from '../components/OptionButton';

export default function SelectionPage() {
  const [selectedOption, setSelectedOption] = useState(null);

  const prompt = "MONEY QUEST: Choose Your Path!";
  const options = [
    { text: "Invest in Stocks", icon: TrendingUp },
    { text: "Pay Off Debt", icon: Landmark },
    { text: "Start Business", icon: Sparkles },
    { text: "Buy Luxuries", icon: Gem }
  ];

  const handleOptionClick = (option) => {
    setSelectedOption(option.text === selectedOption ? null : option.text);
  };

  return (
    <div className="min-h-screen p-4 flex items-center justify-center" 
         style={{ 
           background: 'linear-gradient(45deg, #2563eb 25%, transparent 25%), linear-gradient(-45deg, #2563eb 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #2563eb 75%), linear-gradient(-45deg, transparent 75%, #2563eb 75%)',
           backgroundSize: '20px 20px',
           backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
           backgroundColor: '#3b82f6',
           imageRendering: 'pixelated'
         }}>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
          
          @keyframes pixelSlideIn {
            0% {
              transform: translateX(-100px);
              opacity: 0;
            }
            70% {
              transform: translateX(10px);
              opacity: 1;
            }
            100% {
              transform: translateX(0px);
              opacity: 1;
            }
          }
          
          @keyframes pixelBounce {
            0%, 100% { 
              transform: translateY(0px) scale(1);
            }
            25% { 
              transform: translateY(-2px) scale(1.02);
            }
            75% { 
              transform: translateY(-1px) scale(1.01);
            }
          }
          
          @keyframes coinFlip {
            0% { transform: rotateY(0deg); }
            50% { transform: rotateY(180deg); }
            100% { transform: rotateY(360deg); }
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

      <div className="w-full max-w-2xl mx-auto relative">
        <Card className="border-8 border-black bg-gray-200 shadow-[8px_8px_0px_0px_#000000] overflow-hidden">
          {/* Pixel art header decoration */}
          <div className="h-4 bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 border-b-4 border-black"></div>
          
          <CardHeader className="relative text-center py-8 px-8 bg-gray-100">
            {/* Animated coin */}
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <div className="w-16 h-16 bg-yellow-500 border-4 border-black flex items-center justify-center shadow-[4px_4px_0px_0px_#000000] pixel-font animate-bounce" 
                     style={{ 
                       animation: 'coinFlip 2s infinite linear',
                       borderRadius: '0px' // Force square corners for pixel art
                     }}>
                  <DollarSign className="w-8 h-8 text-black" />
                </div>
              </div>
            </div>
            
            <h1 
              className="text-2xl md:text-3xl font-bold text-black mb-6 pixel-font text-shadow-pixel uppercase"
              style={{
                animation: 'pixelBounce 2s ease-in-out infinite',
                animationDelay: '0.5s'
              }}
            >
              {prompt}
            </h1>
            
            <div className="bg-white border-4 border-black p-3 inline-block shadow-[4px_4px_0px_0px_#000000]">
              <p className="text-black font-bold pixel-font text-xs uppercase tracking-widest">
                Click to Select • No Saving Required
              </p>
            </div>
          </CardHeader>

          <CardContent className="relative px-8 py-8 bg-gray-200">
            {/* Game UI elements */}
            <div className="flex justify-between items-center mb-6">
              <div className="bg-black text-green-400 px-3 py-1 border-2 border-green-400 pixel-font text-xs">
                NET WORTH: $25,000
              </div>
              <div className="bg-black text-yellow-400 px-3 py-1 border-2 border-yellow-400 pixel-font text-xs">
                CURRENT AGE: 25
              </div>
            </div>

            <div className="space-y-4">
              {options.map((option, index) => (
                <OptionButton
                  key={option.text}
                  option={option}
                  icon={option.icon}
                  isSelected={selectedOption === option.text}
                  onClick={() => handleOptionClick(option)}
                  index={index}
                />
              ))}
            </div>

            {selectedOption && (
              <div className="mt-6 bg-green-500 border-4 border-black p-4 text-center shadow-[4px_4px_0px_0px_#000000] animate-pulse">
                <div className="text-black font-bold pixel-font text-xs uppercase tracking-wide">
                  ✨ CHOICE SELECTED: {selectedOption.toUpperCase()} ✨
                </div>
              </div>
            )}

            {/* Decorative pixel elements */}
            <div className="flex justify-center mt-6 gap-2">
              {[1,2,3,4,5].map(i => (
                <div 
                  key={i}
                  className="w-3 h-3 bg-yellow-400 border border-black animate-pulse"
                  style={{ 
                    animationDelay: `${i * 0.2}s`,
                    animationDuration: '1s'
                  }}
                ></div>
              ))}
            </div>
          </CardContent>

          {/* Bottom pixel decoration */}
          <div className="h-4 bg-gradient-to-r from-purple-500 via-blue-500 via-green-500 via-yellow-500 to-red-500 border-t-4 border-black"></div>
        </Card>
      </div>
    </div>
  );
}
