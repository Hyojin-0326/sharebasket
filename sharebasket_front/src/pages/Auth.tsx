import api from "@/lib/axios";
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';
import { toast } from "@/hooks/use-toast";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (isLogin) {
    if (email && password) {
      try {
        const res = await fetch("http://localhost:8080/api/user/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        if (!res.ok) throw new Error("Login failed");

        const user = await res.json();
        localStorage.setItem("user", JSON.stringify(user));
        toast({ title: "Welcome!", description: "You have successfully signed in to ShareBasket." });
        navigate("/");
      } catch (err) {
        toast({ title: "Error", description: "Login failed. Please try again.", variant: "destructive" });
      }
    } else {
      toast({ title: "Error", description: "Please fill in all required fields.", variant: "destructive" });
    }
  } else {
    if (email && password && name) {
      try {
        const res = await fetch("http://localhost:8080/api/user/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, name }),
        });

        if (!res.ok) throw new Error("Signup failed");

        const user = await res.json();
        localStorage.setItem("user", JSON.stringify(user));
        toast({ title: "Account created!", description: "Welcome to the ShareBasket community." });
        navigate("/Onboarding");
      } catch (err) {
        toast({ title: "Error", description: "Signup failed. Please try again.", variant: "destructive" });
      }
    } else {
      toast({ title: "Error", description: "Please fill in all required fields.", variant: "destructive" });
    }
  }
};

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg border border-purple-100">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto w-16 h-16 bg-purple-300 rounded-full flex items-center justify-center mb-4">
            <span className="text-2xl">🧺</span>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-800">
            {isLogin ? 'Sign In' : 'Sign Up'}
          </CardTitle>
          <CardDescription className="text-gray-600">
            {isLogin 
              ? 'Sign in to your account and start group buying' 
              : 'Create an account and join our community'
            }
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Name</label>
                <Input
                  type="text"
                  placeholder="Real name or nickname"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="rounded-md border-purple-100 focus:ring-purple-300 focus:border-purple-300"
                />
              </div>
            )}
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <Input
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-md border-purple-100 focus:ring-purple-300 focus:border-purple-300"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Password</label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-md border-purple-100 focus:ring-purple-300 focus:border-purple-300"
              />
            </div>
            
            <Button
              type="submit"
              className="w-full bg-purple-300 hover:bg-purple-400 text-white rounded-md py-2 font-medium shadow-md transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-purple-400 hover:text-purple-500 font-medium transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              {isLogin 
                ? "Don't have an account? Sign Up" 
                : "Already have an account? Sign In"
              }
            </button>
          </div>
          
          {isLogin && (
            <div className="mt-4 text-center">
              <button className="text-gray-500 hover:text-gray-600 text-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]">
                Forgot Password?
              </button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
