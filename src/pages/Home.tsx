import React from 'react';
import { NavBar } from '@/components/NavBar';
import { GoalsBox } from '@/components/GoalsBox';
import { ChatBox } from '@/components/ChatBox';
import { useUser } from '@/context/UserContext';

export const Home: React.FC = () => {
  const { userProfile } = useUser();

  return (
    <div className="min-h-screen bg-gradient-background">
      <NavBar />
      
      <div className="max-w-7xl mx-auto p-4">
        <div className="mb-6 animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {userProfile?.name ? `Welcome back, ${userProfile.name}!` : 'Welcome to Your Dashboard!'}
          </h1>
          <p className="text-muted-foreground text-lg">
            Track your progress and stay motivated on your fitness journey
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 h-[calc(100vh-280px)] min-h-[600px]">
          {/* Goals Section */}
          <div className="lg:col-span-2 flex flex-col">
            <GoalsBox />
            
            {/* Motivational Quote Section */}
            <div className="mt-6 p-6 bg-gradient-primary text-primary-foreground rounded-lg shadow-lg animate-fade-in">
              <h2 className="text-xl font-bold mb-2">Daily Motivation</h2>
              <p className="text-lg italic">
                "The groundwork for all happiness is good health." - Leigh Hunt
              </p>
              <p className="text-sm mt-2 opacity-90">
                Remember: Every healthy choice you make today is an investment in your future self! 💪
              </p>
            </div>
          </div>

          {/* Chat Section */}
          <div className="lg:col-span-1 h-full">
            <ChatBox />
          </div>
        </div>
      </div>
    </div>
  );
};