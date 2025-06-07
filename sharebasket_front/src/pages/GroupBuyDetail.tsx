import api from "@/lib/axios";
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Clock, Copy, Users, MessageSquare, Star, CreditCard, X } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import { Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

const GroupBuyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showProfileModal, setShowProfileModal] = useState(false);
  
  const groupBuy = {
    id: id || '1',
    title: '농심 신라면 30개입',
    description: '대량으로 구매하면 개당 가격이 더 저렴해요. 어차피 먹을 라면, 같이 사요!',
    image: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=600&h=600&fit=crop',
    price: 40000,
    currentParticipants: 3,
    targetParticipants: 5,
    timeRemaining: '2일 13시간',
    pricePerPerson: 8500,
    location: '서울 관악구 신림동',
    organizer: {
      id: 1,
      name: '김공구',
      avatar: 'K',
      trustScore: 87,
      reviewCount: 23,
      recentReviews: [
        { id: 1, reviewer: '이웃집', content: '약속을 잘 지키시고 친절해요', rating: 5, date: '2025.05.20' },
        { id: 2, reviewer: '박이웃', content: '빠른 응답 감사합니다', rating: 4, date: '2025.05.18' },
        { id: 3, reviewer: '최학생', content: '정확한 거래였습니다', rating: 5, date: '2025.05.15' }
      ]
    },
    participants: [
      { id: 1, name: '김학생', avatar: 'K' },
      { id: 2, name: '이웃집', avatar: 'L' },
      { id: 3, name: '박이웃', avatar: 'P' }
    ],
    comments: [
      { id: 1, author: '김학생', text: '마감 시간에 모두 만나서 나눠가져요!', time: '오늘 12:30' },
      { id: 2, author: '이웃집', text: '좋아요! 장소는 어디로 할까요?', time: '오늘 12:35' }
    ]
  };

  const handleJoin = () => {
    toast({
      title: "참여 신청 완료!",
      description: "공동구매에 참여하셨습니다. 마감 시간에 맞춰 픽업해주세요.",
    });
  };

  const handleCopyPayment = () => {
    navigator.clipboard.writeText('카카오페이/토스: 010-1234-5678');
    toast({
      title: "복사 완료!",
      description: "결제 정보가 클립보드에 복사되었습니다.",
    });
  };

  const handleOpenToss = () => {
    toast({
      title: "토스 결제",
      description: "토스 결제 페이지를 연동할 예정입니다.",
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 헤더 */}
      <div className="sticky top-0 z-20 bg-white p-4 border-b shadow-sm">
        <div className="flex items-center justify-between max-w-lg mx-auto">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold">공구 상세</h1>
          <div className="w-8" />
        </div>
      </div>

      {/* 상품 이미지 */}
      <div className="max-w-lg mx-auto p-4">
        <div className="w-full aspect-square bg-white flex items-center justify-center overflow-hidden rounded-lg border">
          <img 
            src={groupBuy.image} 
            alt={groupBuy.title}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* 상품 정보 카드 */}
        <div className="mt-4">
          <Card className="shadow-sm">
            <CardContent className="p-5">
              <div className="space-y-4">
                <div>
                  <h1 className="text-xl font-bold text-gray-800">{groupBuy.title}</h1>
                  <p className="text-sm text-gray-500">{groupBuy.location}</p>
                </div>
                
                <p className="text-gray-600">{groupBuy.description}</p>
                
                {/* 대표자 프로필 */}
                <div className="bg-gray-50 p-3 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">공구 대표자</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="bg-purple-500 text-white h-10 w-10 flex items-center justify-center text-lg font-semibold">
                        {groupBuy.organizer.avatar}
                      </Avatar>
                      <div>
                        <div className="font-medium">{groupBuy.organizer.name}</div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Star className="h-3 w-3 mr-1 text-yellow-400 fill-current" />
                          <span>신뢰도 {groupBuy.organizer.trustScore}% · 후기 {groupBuy.organizer.reviewCount}개</span>
                        </div>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white"
                      onClick={() => setShowProfileModal(true)}
                    >
                      프로필 보기
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between border-t border-b py-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{groupBuy.timeRemaining} 남음</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="h-4 w-4 mr-1" />
                    <span>{groupBuy.currentParticipants}/{groupBuy.targetParticipants}명</span>
                  </div>
                </div>
                
                <div className="bg-purple-50 p-3 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">총 금액</div>
                  <div className="text-xl font-bold text-gray-800">{groupBuy.price.toLocaleString()}원</div>
                  <div className="text-sm text-purple-500 mt-1">1인당 예상 금액: {groupBuy.pricePerPerson.toLocaleString()}원</div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">참여자 ({groupBuy.currentParticipants}명)</h3>
                  <div className="flex -space-x-2">
                    {groupBuy.participants.map((participant) => (
                      <Avatar key={participant.id} className="border-2 border-white bg-purple-100 text-purple-500 h-8 w-8">
                        {participant.avatar}
                      </Avatar>
                    ))}
                  </div>
                </div>
                
                <Button
                  className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 rounded transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                  onClick={handleJoin}
                >
                  참여하기
                </Button>
                
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    className="flex-1 border-purple-200 text-purple-500"
                    onClick={handleCopyPayment}
                  >
                    <Copy className="h-4 w-4 mr-1" />
                    결제 정보 복사
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 border-purple-200 text-purple-500"
                    onClick={handleOpenToss}
                  >
                    <CreditCard className="h-4 w-4 mr-1" />
                    토스로 결제
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* 댓글 섹션 */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-3">댓글</h2>
          <div className="space-y-4">
            {groupBuy.comments.map((comment) => (
              <div key={comment.id} className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-start justify-between">
                  <span className="font-medium">{comment.author}</span>
                  <span className="text-xs text-gray-500">{comment.time}</span>
                </div>
                <p className="text-sm mt-1">{comment.text}</p>
              </div>
            ))}
            
            <div className="flex space-x-2 mt-4">
              <Input 
                placeholder="댓글을 입력하세요" 
                className="border-gray-200 focus:ring-purple-500 focus:border-purple-500"
              />
              <Button 
                className="bg-purple-500 hover:bg-purple-600 text-white"
              >
                <MessageSquare className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* 프로필 모달 */}
      {showProfileModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">프로필</h3>
              <Button variant="ghost" size="icon" onClick={() => setShowProfileModal(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="text-center mb-4">
              <Avatar className="h-16 w-16 mx-auto mb-2 bg-purple-500 text-white text-xl">
                {groupBuy.organizer.avatar}
              </Avatar>
              <h4 className="font-medium">{groupBuy.organizer.name}</h4>
              <div className="flex items-center justify-center text-sm text-gray-600 mt-1">
                <Star className="h-3 w-3 mr-1 text-yellow-400 fill-current" />
                <span>신뢰도 {groupBuy.organizer.trustScore}% · 후기 {groupBuy.organizer.reviewCount}개</span>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="text-sm text-gray-600 mb-2">신뢰도</div>
              <div className="bg-gray-200 h-2 rounded-full overflow-hidden">
                <div className="bg-purple-500 h-full rounded-full" style={{ width: `${groupBuy.organizer.trustScore}%` }}></div>
              </div>
            </div>
            
            <div>
              <h5 className="text-sm font-medium mb-2">최근 후기 (3개)</h5>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {groupBuy.organizer.recentReviews.map((review) => (
                  <div key={review.id} className="text-xs bg-gray-50 p-2 rounded">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">{review.reviewer}</span>
                      <span className="text-gray-500">{review.date}</span>
                    </div>
                    <div className="flex items-center mb-1">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} className="h-2 w-2 text-yellow-400" fill="#FBBF24" />
                      ))}
                    </div>
                    <p className="text-gray-600">{review.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupBuyDetail;
