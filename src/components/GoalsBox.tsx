import React from 'react';
import { useUser } from '@/context/UserContext';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Target, Zap, Flame, Wheat } from 'lucide-react';

export const GoalsBox: React.FC = () => {
  const { nutritionGoals, userProfile } = useUser();

  const goalItems = [
    {
      label: 'Protein',
      value: nutritionGoals.protein,
      icon: Target,
      color: 'text-primary'
    },
    {
      label: 'Calories',
      value: nutritionGoals.calories,
      icon: Flame,
      color: 'text-accent'
    },
    {
      label: 'Fat',
      value: nutritionGoals.fat,
      icon: Zap,
      color: 'text-success'
    },
    {
      label: 'Carbs',
      value: nutritionGoals.carbs,
      icon: Wheat,
      color: 'text-secondary-foreground'
    }
  ];

  return (
    <Card className="w-full shadow-lg border-0 bg-gradient-background animate-fade-in">
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Target className="h-6 w-6 text-primary" />
          Your Daily Goals
          {userProfile?.name && (
            <span className="text-sm font-normal text-muted-foreground ml-2">
              for {userProfile.name}
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {goalItems.map((goal, index) => {
            const IconComponent = goal.icon;
            return (
              <div
                key={goal.label}
                className={`bg-card p-4 rounded-lg border border-border/50 hover:border-primary/30 transition-all duration-300 hover:scale-105 animate-fade-in`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {goal.label}
                    </p>
                    <p className={`text-xl font-bold ${goal.color}`}>
                      {goal.value || 'Not set'}
                    </p>
                  </div>
                  <IconComponent className={`h-6 w-6 ${goal.color}`} />
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-6 p-4 bg-secondary/30 rounded-lg border border-secondary/50">
          <p className="text-sm text-muted-foreground text-center">
            💪 Keep pushing towards your goals! Every step counts on your fitness journey.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
