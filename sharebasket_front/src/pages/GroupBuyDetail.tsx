import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '@/lib/axios';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Clock, Copy, Users, MessageSquare, Star, CreditCard, X } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import { Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

interface Organizer {
  id: number;
  name: string;
  avatar: string;
  trustScore: number;
  reviewCount: number;
  recentReviews: { id: number; reviewer: string; content: string; rating: number; date: string }[];
}

interface Participant {
  id: number;
  name: string;
  avatar: string;
}

interface Comment {
  id: number;
  author: string;
  text: string;
  time: string;
}

interface GroupBuyDetailData {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  currentParticipants: number;
  maxParticipants: number;
  timeRemaining: string;
  pricePerPerson: number;
  location: string;
  organizer: Organizer;
  participants: Participant[];
  comments: Comment[];
  totalPrice: number;
}

const GroupBuyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [data, setData] = useState<GroupBuyDetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showProfileModal, setShowProfileModal] = useState(false);

  useEffect(() => {
    if (!id) return;
    fetch(`http://localhost:8080/api/groupbuys/${id}`) 
      .then(res => {
        if (!res.ok) {
          console.log("result error");
          throw new Error(`${res.status} ${res.statusText}`);
        }
        return res.json() as Promise<GroupBuyDetailData>;
      })
      .then(gb => {
        gb.imageUrl = `http://localhost:8080${gb.imageUrl}`;
        console.log("gb setData", gb);
        setData(gb);
      })
      .catch(err => {
        console.error(err);
        toast({ title: 'Failed to load details', description: err.message });
      })
      .finally(() => setLoading(false));
  }, [id]);
  

  if (loading) return <div className="p-4 text-center">Loading...</div>;
  if (!data)  return <div className="p-4 text-center text-red-500">No data available.</div>;

  const handleJoin = () => toast({ title: "Joined successfully!", description: "You have joined the group." });
  const handleCopyPayment = () => {
    navigator.clipboard.writeText('카카오페이/토스: 010-1234-5678');
    toast({ title: "Copied!", description: "Payment information copied." });
  };
  const handleOpenToss = () => toast({ title: "Toss Payment", description: "Toss payment integration coming soon." });

  return (
    <div className="min-h-screen bg-white">
      {/* 헤더 */}
      <div className="sticky top-0 z-20 bg-white p-4 border-b shadow-sm">
        <div className="flex items-center justify-between max-w-lg mx-auto">
          <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold">Details</h1>
          <div className="w-8" />
        </div>
      </div>

      <div className="max-w-lg mx-auto p-4">
        {/* 상품 이미지 */}
        <div className="w-full aspect-square bg-white flex items-center justify-center overflow-hidden rounded-lg border">
          <img 
            src={data.imageUrl} 
            alt={data.title} 
            className="w-full h-full object-cover" 
          />
        </div>

        {/* 상품 정보 카드 */}
        <div className="mt-4">
          <Card className="shadow-sm">
            <CardContent className="p-5 space-y-4">
              <div>
                <h1 className="text-xl font-bold text-gray-800">{data.title}</h1>
                <p className="text-sm text-gray-500">{data.location}</p>
              </div>
              <p className="text-gray-600">{data.description}</p>

              {/* 대표자 프로필 */}
              <div className="bg-gray-50 p-3 rounded-lg">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Organizer</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {data.organizer ? (
                      <>
                        <Avatar className="bg-purple-500 text-white h-10 w-10 flex items-center justify-center text-lg font-semibold">
                          {data.organizer.avatar}
                        </Avatar>
                        <div>
                          <div className="font-medium">{data.organizer.name}</div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Star className="h-3 w-3 mr-1 text-yellow-400 fill-current" />
                            <span>신뢰도 {data.organizer.trustScore}% · 후기 {data.organizer.reviewCount}개</span>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="text-sm text-gray-400">Unable to load organizer info.</div>
                    )}
                  </div>
                  <Button 
                    variant="outline" size="sm"
                    className="border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white"
                    onClick={() => setShowProfileModal(true)}
                  >
                    View Profile
                  </Button>
                </div>
              </div>

              <div className="flex items-data.pricePerPersoncenter justify-between border-t border-b py-3">
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{data.timeRemaining} remaining</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="h-4 w-4 mr-1" />
                  <span>{data.currentParticipants}/{data.maxParticipants} participants</span>
                </div>
              </div>

              <div className="bg-purple-50 p-3 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">Total Price</div>
                <div className="text-xl font-bold text-gray-800">{data.totalPrice ? data.totalPrice.toLocaleString() : 0} KRW</div>
                  <div className="text-sm text-purple-500 mt-1">
                    Estimated per person: {
                      data.currentParticipants > 0
                        ? Math.floor(data.totalPrice / data.currentParticipants).toLocaleString()
                        : 0
                    } KRW
                  </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  participants ({data.currentParticipants})
                </h3>
                <div className="flex -space-x-2">
                  {data.participants.map(p => (
                    <Avatar key={p.id} className="border-2 border-white bg-purple-100 text-purple-500 h-8 w-8">
                      {p.avatar}
                    </Avatar>
                  ))}
                </div>
              </div>

              <Button
                className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 rounded transition-all duration-200"
                onClick={handleJoin}
              >
                Join
              </Button>

              <div className="flex space-x-2">
                <Button variant="outline" className="flex-1 border-purple-200 text-purple-500" onClick={handleCopyPayment}>
                  <Copy className="h-4 w-4 mr-1" /> Copy Payment Info
                </Button>
                <Button variant="outline" className="flex-1 border-purple-200 text-purple-500" onClick={handleOpenToss}>
                  <CreditCard className="h-4 w-4 mr-1" /> Pay with Toss
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 댓글 섹션 */}
        <div className="mt-6 space-y-4">
          <h2 className="text-lg font-semibold mb-3">Comments</h2>
          {data.comments.map(c => (
            <div key={c.id} className="bg-gray-50 p-3 rounded-lg">
              <div className="flex items-start justify-between">
                <span className="font-medium">{c.author}</span>
                <span className="text-xs text-gray-500">{c.time}</span>
              </div>
              <p className="text-sm mt-1">{c.text}</p>
            </div>
          ))}
          <div className="flex space-x-2 mt-4">
            <Input placeholder="댓글을 입력하세요" className="border-gray-200 focus:ring-purple-500" />
            <Button className="bg-purple-500 hover:bg-purple-600 text-white">
              <MessageSquare className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* 프로필 모달 */}
      {showProfileModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
            {/* ... 모달 내용은 기존 그대로 유지 ... */}
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupBuyDetail;
