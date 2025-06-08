// src/pages/Home.tsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Bell, User, Search, Plus } from 'lucide-react';
import { tagCategories } from '@/data/tagData';
import { fetchGroupBuys, GroupBuy } from '@/api/groupbuyApi';

const Home = () => {
  const navigate = useNavigate();

  const [groupBuys, setGroupBuys] = useState<GroupBuy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const hasNewNotifications = true;

  useEffect(() => {
    fetchGroupBuys()
      .then(data => setGroupBuys(data))
      .catch(err => {
        console.error(err);
        setError('데이터 불러오는 중 에러남 ㅠ');
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-4 text-center">로딩 중...</div>;
  if (error)   return <div className="p-4 text-center text-red-500">{error}</div>;

  const filtered = groupBuys.filter(item => {
    const textMatch = item.title.toLowerCase().includes(searchTerm.toLowerCase())
                   || item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const catMatch  = !selectedCategory || item.category === selectedCategory;
    return textMatch && catMatch;
  });

  return (
    <div className="min-h-screen bg-white font-poppins">
      {/* Header */}
      <div className="bg-white sticky top-0 z-10 p-4 border-b shadow-sm">
        <div className="flex items-center justify-between max-w-lg mx-auto">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-300 to-purple-400 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
              <span className="text-lg">🧺</span>
            </div>
            <h1 className="text-xl font-bold text-purple-400">ShareBasket</h1>
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" size="icon"
              onClick={() => navigate('/notifications')}
              className="relative transition-all duration-300 hover:scale-110 hover:bg-purple-50"
            >
              <Bell className="h-5 w-5 text-purple-400" />
              {hasNewNotifications && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-purple-400 rounded-full animate-pulse" />
              )}
            </Button>
            <Button 
              variant="ghost" size="icon"
              onClick={() => navigate('/profile')}
              className="transition-all duration-300 hover:scale-110 hover:bg-purple-50"
            >
              <User className="h-5 w-5 text-purple-400" />
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto p-4 space-y-6">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search group buys..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 transition-all duration-300"
          />
        </div>

        {/* Create Group Buy Button */}
        <Button 
          onClick={() => navigate('/create')}
          className="w-full bg-purple-400 hover:bg-purple-500 text-white py-4 rounded-lg font-semibold shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-xl"
        >
          <Plus className="w-5 h-5 mr-2" />
          Create Group Buy
        </Button>

        {/* Category Filter */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-800">Categories</h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === null
                  ? 'bg-purple-400 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-purple-50 hover:text-purple-400'
              }`}
            >
              All
            </button>
            {tagCategories.map(cat => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === cat.value
                    ? 'bg-purple-400 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-purple-50 hover:text-purple-400'
                }`}
              >
                {cat.emoji} {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Group Buy List */}
        <div className="space-y-4">
          {filtered.map(gb => (
            <Card
              key={gb.id}
              className="cursor-pointer transition-all duration-300 hover:scale-102 hover:shadow-lg border-purple-100 hover:border-purple-200"
              onClick={() => navigate(`/groupbuy/${gb.id}`)}
            >
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-lg overflow-hidden shadow-md">
                  <img src={`http://localhost:8080${gb.imageUrl}`} alt={gb.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800">{gb.title}</h3>
                    <p className="text-gray-500">{gb.description}</p>
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

export default Home;
