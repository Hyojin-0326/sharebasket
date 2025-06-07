import api from "@/lib/axios";
import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-white font-poppins">
      <div className="text-center space-y-8 p-6">
        <div className="space-y-4 animate-fade-in">
          <div className="mx-auto w-24 h-24 bg-gradient-to-br from-purple-300 to-purple-400 rounded-full flex items-center justify-center mb-6 shadow-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl">
            <span className="text-4xl">🧺</span>
          </div>
          <h1 className="text-5xl font-bold mb-4 text-purple-400 transition-all duration-300 hover:text-purple-500">
            ShareBasket
          </h1>
          <p className="text-xl text-gray-600 max-w-md mx-auto leading-relaxed">
            Buy daily essentials with friends and save money together!
          </p>
        </div>
        
        <div className="space-y-4">
          <Button 
            onClick={() => navigate('/onboarding')}
            className="bg-purple-400 hover:bg-purple-500 text-white px-8 py-4 rounded-md font-semibold shadow-lg text-lg transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-xl"
            size="lg"
          >
            Get Started
          </Button>
          
          <div>
            <Button 
              onClick={() => navigate('/auth')}
              variant="ghost"
              className="text-gray-600 hover:text-purple-400 underline transition-all duration-300 hover:scale-105 active:scale-95"
            >
              Already have an account? Sign In
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
