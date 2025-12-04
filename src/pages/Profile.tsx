import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/context/UserContext';
import { NavBar } from '@/components/NavBar';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/enhanced-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, Target, Activity, Save } from 'lucide-react';
import { UserProfile, NutritionGoals } from '@/types/user';
import { useToast } from '@/hooks/use-toast';

export const Profile: React.FC = () => {
  const { userProfile, updateProfile, nutritionGoals, updateNutritionGoals } = useUser();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [formData, setFormData] = useState<UserProfile>({
    name: '',
    email: '',
    age: 22,
    weight: 76,
    height: 170,
    activityLevel: 'moderate',
    fitnessGoals: ''
  });

  const [goals, setGoals] = useState<NutritionGoals>(nutritionGoals);

  useEffect(() => {
    if (userProfile) {
      setFormData(userProfile);
    }
  }, [userProfile]);

  const handleInputChange = (field: keyof UserProfile, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleGoalChange = (field: keyof NutritionGoals, value: string) => {
    setGoals(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculateNutritionGoals = () => {
    const { weight, height, age, activityLevel } = formData;
    
    // Basic BMR calculation (Mifflin-St Jeor Equation for average)
    const bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    
    // Activity multipliers
    const activityMultipliers = {
      'sedentary': 1.2,
      'light': 1.375,
      'moderate': 1.55,
      'active': 1.725,
      'very-active': 1.9
    };
    
    const calories = Math.round(bmr * activityMultipliers[activityLevel]);
    const protein = Math.round(weight * 2.2); // 2.2g per kg body weight
    const fat = Math.round(calories * 0.25 / 9); // 25% of calories from fat
    const carbs = Math.round((calories - (protein * 4) - (fat * 9)) / 4); // Remaining calories from carbs
    
    setGoals({
      calories: `${calories}`,
      protein: `${protein}g`,
      fat: `${fat}g`,
      carbs: `${carbs}g`
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    updateProfile(formData);
    updateNutritionGoals(goals);
    
    toast({
      title: "Profile Updated! 🎉",
      description: "Your fitness profile has been saved successfully.",
    });
    
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-gradient-background">
      <NavBar />
      
      <div className="max-w-4xl mx-auto p-4 space-y-6 animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Your Fitness Profile</h1>
          <p className="text-muted-foreground">
            Tell us about yourself to get personalized recommendations
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <Card className="shadow-lg border-0 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      type="number"
                      value={formData.age}
                      onChange={(e) => handleInputChange('age', parseInt(e.target.value) || 0)}
                      placeholder="Age"
                      min="16"
                      max="100"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight (kg)</Label>
                    <Input
                      id="weight"
                      type="number"
                      value={formData.weight}
                      onChange={(e) => handleInputChange('weight', parseInt(e.target.value) || 0)}
                      placeholder="Weight"
                      min="30"
                      max="300"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="height">Height (cm)</Label>
                    <Input
                      id="height"
                      type="number"
                      value={formData.height}
                      onChange={(e) => handleInputChange('height', parseInt(e.target.value) || 0)}
                      placeholder="Height"
                      min="100"
                      max="250"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="activityLevel">Activity Level</Label>
                  <Select
                    value={formData.activityLevel}
                    onValueChange={(value) => handleInputChange('activityLevel', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select activity level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sedentary">Sedentary (office job)</SelectItem>
                      <SelectItem value="light">Light (1-3 days/week)</SelectItem>
                      <SelectItem value="moderate">Moderate (3-5 days/week)</SelectItem>
                      <SelectItem value="active">Active (6-7 days/week)</SelectItem>
                      <SelectItem value="very-active">Very Active (2x/day)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fitnessGoals">Fitness Goals</Label>
                  <Textarea
                    id="fitnessGoals"
                    value={formData.fitnessGoals}
                    onChange={(e) => handleInputChange('fitnessGoals', e.target.value)}
                    placeholder="Describe your fitness goals and what motivates you..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Nutrition Goals */}
            <Card className="shadow-lg border-0 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-success" />
                  Nutrition Goals
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="mb-4">
                  <Button
                    type="button"
                    variant="success"
                    onClick={calculateNutritionGoals}
                    className="w-full"
                  >
                    <Activity className="h-4 w-4 mr-2" />
                    Calculate Recommended Goals
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="calories">Daily Calories</Label>
                    <Input
                      id="calories"
                      value={goals.calories}
                      onChange={(e) => handleGoalChange('calories', e.target.value)}
                      placeholder="2000"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="protein">Protein</Label>
                    <Input
                      id="protein"
                      value={goals.protein}
                      onChange={(e) => handleGoalChange('protein', e.target.value)}
                      placeholder="120g"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fat">Fat</Label>
                    <Input
                      id="fat"
                      value={goals.fat}
                      onChange={(e) => handleGoalChange('fat', e.target.value)}
                      placeholder="65g"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="carbs">Carbohydrates</Label>
                    <Input
                      id="carbs"
                      value={goals.carbs}
                      onChange={(e) => handleGoalChange('carbs', e.target.value)}
                      placeholder="250g"
                    />
                  </div>
                </div>

                <div className="p-4 bg-secondary/20 rounded-lg border border-secondary/30">
                  <p className="text-sm text-muted-foreground">
                    💡 Our calculator provides baseline recommendations. Adjust based on your specific needs and consult a nutritionist for personalized advice.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-center">
            <Button type="submit" variant="motivational" size="lg" className="px-12">
              <Save className="h-4 w-4 mr-2" />
              Save Profile & Continue
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
