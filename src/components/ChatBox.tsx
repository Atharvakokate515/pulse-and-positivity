import React, { useState, useRef, useEffect } from 'react';
import { useUser } from '@/context/UserContext';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/enhanced-button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageCircle, Send, Bot, User } from 'lucide-react';
import { ChatMessage } from '@/types/user';

export const ChatBox: React.FC = () => {
  const { chatMessages, addChatMessage, userProfile } = useUser();
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const motivationalResponses = [
    "That's amazing! Keep up the great work! 💪",
    "You're doing fantastic! Every step forward is progress! 🌟",
    "I believe in you! Your dedication will pay off! 🚀",
    "That's the spirit! You're stronger than you think! 💯",
    "Awesome progress! Remember, consistency is key! 🎯",
    "You're on fire! Keep that momentum going! 🔥",
    "Great mindset! Small steps lead to big changes! ✨",
    "You've got this! Your future self will thank you! 🙌"
  ];

  const questions = [
    "How was your workout today?",
    "What's your favorite healthy meal?",
    "How are you feeling about your progress?",
    "What motivates you to stay active?",
    "Any challenges you're facing this week?"
  ];

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('tired') || lowerMessage.includes('exhausted')) {
      return "Rest is just as important as activity! Listen to your body and get the recovery you need. 💤";
    }
    
    if (lowerMessage.includes('good') || lowerMessage.includes('great') || lowerMessage.includes('awesome')) {
      return motivationalResponses[Math.floor(Math.random() * motivationalResponses.length)];
    }
    
    if (lowerMessage.includes('help') || lowerMessage.includes('advice')) {
      return "I'm here to support you! Remember: progress over perfection. Focus on building healthy habits one day at a time! 🌱";
    }
    
    if (lowerMessage.includes('goal') || lowerMessage.includes('target')) {
      return "Goals are dreams with deadlines! Break them down into smaller, achievable steps. You're closer than you think! 🎯";
    }
    
    // Default responses
    const responses = [
      ...motivationalResponses,
      ...questions.map(q => `${motivationalResponses[Math.floor(Math.random() * motivationalResponses.length)]} ${q}`)
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: newMessage,
      sender: 'user',
      timestamp: new Date()
    };

    addChatMessage(userMessage);
    setNewMessage('');
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: generateBotResponse(newMessage),
        sender: 'bot',
        timestamp: new Date()
      };
      
      addChatMessage(botResponse);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <Card className="h-full flex flex-col shadow-lg border-0 bg-card/95 backdrop-blur-sm animate-slide-in-right">
      <CardHeader className="pb-4 flex-shrink-0">
        <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-primary" />
          Fitness Coach
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-4">
        <ScrollArea className="flex-1 pr-4 mb-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {chatMessages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start gap-3 animate-fade-in ${
                  message.sender === 'user' ? 'flex-row-reverse' : ''
                }`}
              >
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  message.sender === 'user' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-secondary text-secondary-foreground'
                }`}>
                  {message.sender === 'user' ? (
                    <User className="h-4 w-4" />
                  ) : (
                    <Bot className="h-4 w-4" />
                  )}
                </div>
                
                <div className={`max-w-[80%] p-3 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-primary text-primary-foreground ml-auto'
                    : 'bg-secondary text-secondary-foreground'
                }`}>
                  <p className="text-sm">{message.text}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="bg-secondary text-secondary-foreground p-3 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        
        <div className="flex gap-2 flex-shrink-0">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Share your progress or ask for motivation..."
            className="flex-1"
          />
          <Button 
            onClick={handleSendMessage}
            variant="motivational"
            size="icon"
            disabled={!newMessage.trim() || isTyping}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};