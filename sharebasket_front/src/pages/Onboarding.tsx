import api from "@/lib/axios";
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const OnboardingSlide = ({ title, description, image, isLast, onNext, onPrev, showPrev, currentSlide }: {
  title: string;
  description: string;
  image: string;
  isLast?: boolean;
  onNext: () => void;
  onPrev: () => void;
  showPrev: boolean;
  currentSlide: number;
}) => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-white p-6 font-poppins">
    <div className="w-full max-w-screen-sm mx-auto text-center space-y-8">
      <div className="relative w-64 h-64 mx-auto mb-8 transform transition-all duration-500 hover:scale-105">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover rounded-3xl shadow-lg transition-shadow duration-300 hover:shadow-xl"
        />
      </div>
      
      <div className="space-y-4 animate-fade-in">
        <h1 className="text-2xl font-bold text-gray-800 leading-tight">
          {title}
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed">
          {description}
        </p>
      </div>
      
      <div className="flex justify-between items-center pt-8">
        <Button
          variant="ghost"
          size="icon"
          onClick={onPrev}
          className={`rounded-full transition-all duration-300 hover:scale-110 active:scale-95 hover:shadow-md hover:bg-purple-50 ${!showPrev ? 'invisible' : ''}`}
        >
          <ChevronLeft className="h-6 w-6 text-purple-400" />
        </Button>
        
        <div className="flex space-x-2">
          {[0, 1, 2].map((index) => (
            <div 
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-purple-400 scale-125' 
                  : 'bg-purple-200 hover:bg-purple-300'
              }`}
            ></div>
          ))}
        </div>
        
        {isLast ? (
          <Button 
            onClick={onNext}
            className="bg-purple-400 hover:bg-purple-500 text-white px-8 py-3 rounded-md font-semibold shadow-md transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-lg"
          >
            Get Started
          </Button>
        ) : (
          <Button
            variant="ghost"
            size="icon"
            onClick={onNext}
            className="rounded-full transition-all duration-300 hover:scale-110 active:scale-95 hover:shadow-md hover:bg-purple-50"
          >
            <ChevronRight className="h-6 w-6 text-purple-400" />
          </Button>
        )}
      </div>
    </div>
  </div>
);

const Onboarding = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const navigate = useNavigate();

  const slides = [
    {
      title: "Share Life, Share Savings",
      description: "Living alone doesn't mean you have to do it alone. Join your neighbors for more economical and enjoyable shared living.",
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=400&fit=crop"
    },
    {
      title: "Buy Together, Save Together!",
      description: "Purchase daily essentials in bulk to reduce costs and share shipping fees. From ramen to cleaning supplies, everything's cheaper when we buy together.",
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=400&fit=crop"
    },
    {
      title: "Start ShareBasket Now",
      description: "Create group purchases and invite your neighbors to buy together.",
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=400&fit=crop"
    }
  ];

  const handleNext = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      if (currentSlide < slides.length - 1) {
        setCurrentSlide(currentSlide + 1);
      } else {
        navigate('/');
      }
      setIsTransitioning(false);
    }, 150);
  };

  const handlePrev = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      if (currentSlide > 0) {
        setCurrentSlide(currentSlide - 1);
      }
      setIsTransitioning(false);
    }, 150);
  };

  return (
    <div className="relative overflow-hidden">
      <div 
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="w-full flex-shrink-0">
            <OnboardingSlide
              {...slide}
              isLast={index === slides.length - 1}
              onNext={handleNext}
              onPrev={handlePrev}
              showPrev={index > 0}
              currentSlide={currentSlide}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Onboarding;
