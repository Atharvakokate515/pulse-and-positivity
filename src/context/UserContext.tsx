import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, NutritionGoals, ChatMessage } from '@/types/user';

interface UserContextType {
  isAuthenticated: boolean;
  userProfile: UserProfile | null;
  nutritionGoals: NutritionGoals;
  chatMessages: ChatMessage[];
  login: (email: string) => void;
  logout: () => void;
  updateProfile: (profile: UserProfile) => void;
  updateNutritionGoals: (goals: NutritionGoals) => void;
  addChatMessage: (message: ChatMessage) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [nutritionGoals, setNutritionGoals] = useState<NutritionGoals>({
    protein: '120g',
    calories: '2000',
    fat: '65g',
    carbs: '250g'
  });
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: 'Welcome to your fitness journey! I\'m here to help you stay motivated and reach your goals. How are you feeling today?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);

  useEffect(() => {
    const savedAuth = localStorage.getItem('isAuthenticated');
    const savedProfile = localStorage.getItem('userProfile');
    const savedGoals = localStorage.getItem('nutritionGoals');
    const savedMessages = localStorage.getItem('chatMessages');

    if (savedAuth === 'true') {
      setIsAuthenticated(true);
    }
    if (savedProfile) {
      setUserProfile(JSON.parse(savedProfile));
    }
    if (savedGoals) {
      setNutritionGoals(JSON.parse(savedGoals));
    }
    if (savedMessages) {
      setChatMessages(JSON.parse(savedMessages));
    }
  }, []);

  const login = (email: string) => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserProfile(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userProfile');
  };

  const updateProfile = (profile: UserProfile) => {
    setUserProfile(profile);
    localStorage.setItem('userProfile', JSON.stringify(profile));
  };

  const updateNutritionGoals = (goals: NutritionGoals) => {
    setNutritionGoals(goals);
    localStorage.setItem('nutritionGoals', JSON.stringify(goals));
  };

  const addChatMessage = (message: ChatMessage) => {
    setChatMessages(prev => {
      const updated = [...prev, message];
      localStorage.setItem('chatMessages', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <UserContext.Provider value={{
      isAuthenticated,
      userProfile,
      nutritionGoals,
      chatMessages,
      login,
      logout,
      updateProfile,
      updateNutritionGoals,
      addChatMessage
    }}>
      {children}
    </UserContext.Provider>
  );
};