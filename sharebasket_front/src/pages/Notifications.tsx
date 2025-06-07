
import api from "@/lib/axios";
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell, MessageSquare, Users } from 'lucide-react';

const Notifications = () => {
  const navigate = useNavigate();
  
  const notifications = [
    {
      id: '1',
      type: 'comment',
      title: 'New comment posted',
      message: 'A new comment was posted on Nongshim Shin Ramyun 30 Pack group buy',
      user: 'Neighbor House',
      time: '5 minutes ago',
      isNew: true
    },
    {
      id: '2',
      type: 'join',
      title: 'New participant',
      message: 'Park Neighbor joined Samdasoo 2L 24 Bottles group buy',
      user: 'Park Neighbor',
      time: '1 hour ago',
      isNew: true
    },
    {
      id: '3',
      type: 'comment',
      title: 'New comment posted',
      message: 'A new comment was posted on Nongshim Shin Ramyun 30 Pack group buy',
      user: 'Kim Student',
      time: '2 hours ago',
      isNew: false
    }
  ];

  return (
    <div className="min-h-screen bg-white font-poppins">
      <div className="bg-white sticky top-0 z-10 p-4 border-b shadow-sm">
        <div className="flex items-center justify-between max-w-lg mx-auto">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate('/')}
            className="hover:bg-purple-50"
          >
            <ArrowLeft className="h-5 w-5 text-purple-400" />
          </Button>
          <h1 className="text-lg font-semibold text-purple-400">Notifications</h1>
          <div className="w-8" />
        </div>
      </div>

      <div className="max-w-lg mx-auto p-4">
        <div className="space-y-3">
          {notifications.map((notification) => (
            <Card key={notification.id} className={`cursor-pointer transition-colors border-purple-100 ${notification.isNew ? 'bg-purple-50 border-purple-200' : ''}`}>
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <div className={`rounded-full p-2 ${notification.type === 'comment' ? 'bg-purple-100' : 'bg-purple-100'}`}>
                    {notification.type === 'comment' ? (
                      <MessageSquare className="h-4 w-4 text-purple-400" />
                    ) : (
                      <Users className="h-4 w-4 text-purple-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-sm">{notification.title}</h3>
                      {notification.isNew && (
                        <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                    <p className="text-xs text-gray-500 mt-2">{notification.time}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
