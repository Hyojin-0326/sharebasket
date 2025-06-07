import api from "@/lib/axios";
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, ShoppingBag, LogOut } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

const Profile = () => {
  const navigate = useNavigate();
  
  // User info (retrieved from login state in practice)
  const user = {
    name: 'Kim Student',
    trustScore: 85,
    reviewCount: 12
  };
  
  // Joined group buys
  const joinedGroupBuys = [
    {
      id: '1',
      title: 'Nongshim Shin Ramyun 30 Pack',
      image: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=80&h=80&fit=crop',
      date: '2025.05.20',
      status: 'Completed'
    },
    {
      id: '2',
      title: 'Samdasoo 2L 24 Bottles',
      image: 'https://images.unsplash.com/photo-1564419429381-98dbcf916478?w=80&h=80&fit=crop',
      date: '2025.05.15',
      status: 'In Progress'
    }
  ];
  
  // Reviews written by others about me (limited to 3 most recent)
  const receivedReviews = [
    {
      id: '1',
      reviewer: 'Neighbor House',
      content: 'Always on time and reliable',
      rating: 5,
      date: '2025.05.18'
    },
    {
      id: '2',
      reviewer: 'Park Neighbor',
      content: 'Kind and well-mannered',
      rating: 4,
      date: '2025.05.10'
    },
    {
      id: '3',
      reviewer: 'Choi Groupbuy',
      content: 'Quick response and accurate transaction',
      rating: 5,
      date: '2025.05.05'
    }
  ].slice(0, 3);
  
  const handleLogout = () => {
    localStorage.removeItem('user');
    toast({
      title: "Logout Complete",
      description: "You have been safely logged out.",
    });
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-white pb-6 font-poppins">
      {/* Header */}
      <div className="bg-purple-50 pb-6">
        <div className="max-w-lg mx-auto p-4">
          <div className="flex items-center mb-6">
            <Button 
              variant="ghost" 
              className="p-0 mr-2 hover:bg-purple-100"
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="h-5 w-5 text-purple-600" />
            </Button>
            <h1 className="text-xl font-bold text-purple-800">My Profile</h1>
          </div>
          
          <div className="flex items-center">
            <div className="h-16 w-16 border-4 border-white bg-purple-200 text-purple-700 text-xl rounded-full flex items-center justify-center font-semibold">
              {user.name.charAt(0)}
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-bold text-purple-800">{user.name}</h2>
            </div>
          </div>
          
          <div className="flex mt-6">
            <div className="flex-1 bg-white rounded-lg p-3 mr-2 shadow-sm border border-purple-100">
              <div className="text-sm text-purple-600 mb-1">Trust Score</div>
              <div className="flex items-baseline">
                <span className="text-xl font-bold text-purple-500">{user.trustScore}</span>
                <span className="text-sm text-purple-400 ml-1">/ 100</span>
              </div>
              <div className="mt-2 bg-purple-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-purple-500 h-full rounded-full" style={{ width: `${user.trustScore}%` }}></div>
              </div>
            </div>
            <div className="flex-1 bg-white rounded-lg p-3 ml-2 shadow-sm border border-purple-100">
              <div className="text-sm text-purple-600 mb-1">Reviews</div>
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-400 mr-1" fill="#FBBF24" />
                <span className="text-xl font-bold text-purple-800">{user.reviewCount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="max-w-lg mx-auto p-4">
        <Card className="mb-6 border-purple-100">
          <CardHeader className="pb-3">
            <div className="flex items-center">
              <ShoppingBag className="h-5 w-5 mr-2 text-purple-500" />
              <h3 className="font-medium text-purple-800">Joined Group Purchases</h3>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            {joinedGroupBuys.map((item) => (
              <div 
                key={item.id} 
                className="flex items-center py-3 border-t border-purple-100 cursor-pointer hover:bg-purple-50 transition-colors rounded-md px-2"
                onClick={() => navigate(`/groupbuy/${item.id}`)}
              >
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-12 h-12 rounded object-cover"
                />
                <div className="ml-3">
                  <div className="font-medium text-purple-800">{item.title}</div>
                  <div className="text-sm text-purple-500">{item.date}</div>
                </div>
                <div className="ml-auto">
                  <span className={`text-sm px-2 py-1 rounded-full ${
                    item.status === 'Completed' ? 'bg-purple-100 text-purple-600' : 'bg-purple-200 text-purple-700'
                  }`}>
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
        
        <Card className="mb-6 border-purple-100">
          <CardHeader className="pb-3">
            <div className="flex items-center">
              <Star className="h-5 w-5 mr-2 text-purple-500" />
              <h3 className="font-medium text-purple-800">Received Reviews</h3>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            {receivedReviews.map((review) => (
              <div key={review.id} className="py-3 border-t border-purple-100">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-purple-800">{review.reviewer}</span>
                  <span className="text-xs text-purple-500">{review.date}</span>
                </div>
                <div className="flex items-center my-1">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="h-3 w-3 text-yellow-400" fill="#FBBF24" />
                  ))}
                </div>
                <p className="text-sm text-purple-600">{review.content}</p>
              </div>
            ))}
          </CardContent>
        </Card>
        
        <Button
          variant="outline"
          className="w-full border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Profile;
