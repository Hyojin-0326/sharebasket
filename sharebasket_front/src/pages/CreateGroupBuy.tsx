import api from "@/lib/axios";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Upload, MapPin, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { tagCategories } from '@/data/tagData';

const CreateGroupBuy = () => {
  const navigate = useNavigate();

  // 카테고리/태그 선택 상태
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<string>('');

  // 위치(예시로 기본값 지정)
  const [location, setLocation] = useState('Seoul Gwanak-gu Sillim-dong');

  // 백에서 받은 이미지 URL을 저장
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  // --- 이미지 업로드 핸들러: 파일을 선택하면 백으로 전송하고, 돌아온 URL을 imageUrl에 저장 ---
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      console.warn("파일이 선택되지 않았습니다.");
      return;
    }

    try {
      // FormData에 file을 담아 POST
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("http://localhost:8080/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("이미지 업로드 실패");
      }

      // 백에서 “/images/filename.png” 같은 문자열을 텍스트로 내려준다고 가정
      const uploadedPath = await res.text();
      setImageUrl(uploadedPath); // ex: "/images/filename.png"
      console.log("🌐 업로드된 이미지 URL:", uploadedPath);
    } catch (err) {
      console.error(err);
      alert("이미지 업로드 중 오류가 발생했습니다.");
    }
  };

  // --- 선택된 이미지 제거(이미지 URL 초기화) ---
  const removeImage = () => {
    setImageUrl(null);
  };

  // --- 그룹구매 등록 핸들러: 입력값을 모아서 백으로 POST ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 각 input 값을 DOM에서 직접 가져오기
    const title = (document.getElementById('productName') as HTMLInputElement).value;
    const description = (document.getElementById('description') as HTMLTextAreaElement).value;
    const quantity = Number((document.getElementById('quantity') as HTMLInputElement).value);
    const totalPrice = Number((document.getElementById('totalPrice') as HTMLInputElement).value);
    const maxParticipants = Number((document.getElementById('targetParticipants') as HTMLInputElement).value);
    const deadline = (document.getElementById('deadline') as HTMLInputElement).value;

    if (!imageUrl) {
      alert("상품 이미지를 먼저 업로드해주세요.");
      return;
    }

    // pricePerPerson 계산 (총가격 ÷ 목표인원)
    const pricePerPerson = Math.floor(totalPrice / maxParticipants);

    try {
      const res = await fetch("http://localhost:8080/api/groupbuy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          location,
          quantity,
          totalPrice,
          maxParticipants,
          pricePerPerson,
          deadline,
          imageUrl,
          category: selectedCategory,
          tag: selectedTag
        }),
      });

      if (!res.ok) {
        throw new Error("공구 등록 실패");
      }

      // 등록 성공 시 메인 페이지로 이동
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("공동구매 등록 중 오류가 발생했습니다.");
    }
  };

  // 카테고리 선택 시 해당 카테고리의 태그 목록을 반환
  const getSelectedCategoryTags = () => {
    if (!selectedCategory) return [];
    const category = tagCategories.find(cat => cat.value === selectedCategory);
    return category ? category.tags : [];
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 상단 헤더 */}
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
          <h1 className="text-lg font-semibold text-purple-400">Create Group Buy</h1>
          <div className="w-8" />
        </div>
      </div>

      <div className="max-w-lg mx-auto p-4">
        {/* 위치 설정 카드 */}
        <Card className="border-purple-100">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-purple-400" />
              Location Setting
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Select>
                  <SelectTrigger className="border-purple-100 focus:ring-purple-300">
                    <SelectValue placeholder="Select State" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="seoul">Seoul</SelectItem>
                    <SelectItem value="busan">Busan</SelectItem>
                    <SelectItem value="incheon">Incheon</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select>
                  <SelectTrigger className="border-purple-100 focus:ring-purple-300">
                    <SelectValue placeholder="Select District" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gangnam">Gangnam-gu</SelectItem>
                    <SelectItem value="gwanak">Gwanak-gu</SelectItem>
                    <SelectItem value="mapo">Mapo-gu</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="text-sm text-gray-600">
                Current setting: {location}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 상품 정보 카드 */}
        <Card className="mt-4 border-purple-100">
          <CardHeader>
            <CardTitle className="text-purple-400">Product Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* 상품명 */}
              <div>
                <Label htmlFor="productName" className="text-gray-700">Product Name</Label>
                <Input
                  id="productName"
                  placeholder="e.g. Nongshim Shin Ramyun 30 Pack"
                  required
                  className="border-purple-100 focus:ring-purple-300 focus:border-purple-300"
                />
              </div>

              {/* 상품 이미지 업로드 */}
              <div>
                <Label htmlFor="productImage" className="text-gray-700">Product Image</Label>
                  {imageUrl ? (
                    <div className="relative aspect-square border-2 border-purple-200 rounded-lg overflow-hidden">
                      <img
                        src={`http://localhost:8080${imageUrl}`}
                        alt="Uploaded product image"
                        className="w-full h-full object-cover"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 bg-white bg-opacity-80 hover:bg-opacity-100"
                        onClick={removeImage}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                ) : (
                  // 업로드 전, 파일 선택 UI
                  <div className="aspect-square border-2 border-dashed border-purple-200 rounded-lg p-6 text-center flex flex-col items-center justify-center">
                    <Upload className="h-8 w-8 mx-auto text-purple-300 mb-2" />
                    <p className="text-sm text-gray-600 mb-2">Upload a photo</p>
                    <p className="text-xs text-gray-500 mb-3">(Will be auto-adjusted to square)</p>
                    <Input
                      type="file"
                      className="hidden"
                      id="productImage"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById('productImage')?.click()}
                      className="border-purple-200 text-purple-400 hover:bg-purple-50"
                    >
                      Choose File
                    </Button>
                  </div>
                )}
              </div>

              {/* 상품 설명 */}
              <div>
                <Label htmlFor="description" className="text-gray-700">Product Description (Optional)</Label>
                <Textarea
                  id="description"
                  placeholder="Enter a brief description of the product"
                  className="min-h-[80px] border-purple-100 focus:ring-purple-300 focus:border-purple-300"
                />
              </div>

              {/* 수량 & 총 가격 */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="quantity" className="text-gray-700">Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    placeholder="30"
                    required
                    className="border-purple-100 focus:ring-purple-300 focus:border-purple-300"
                  />
                </div>
                <div>
                  <Label htmlFor="totalPrice" className="text-gray-700">Total Price (₩)</Label>
                  <Input
                    id="totalPrice"
                    type="number"
                    placeholder="40000"
                    required
                    className="border-purple-100 focus:ring-purple-300 focus:border-purple-300"
                  />
                </div>
              </div>

              {/* 목표 인원 & 마감 시간 */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="targetParticipants" className="text-gray-700">Target Participants</Label>
                  <Input
                    id="targetParticipants"
                    type="number"
                    placeholder="5"
                    required
                    className="border-purple-100 focus:ring-purple-300 focus:border-purple-300"
                  />
                </div>
                <div>
                  <Label htmlFor="deadline" className="text-gray-700">Deadline</Label>
                  <Input
                    id="deadline"
                    type="datetime-local"
                    required
                    className="border-purple-100 focus:ring-purple-300 focus:border-purple-300"
                  />
                </div>
              </div>

              {/* 카테고리 & 태그 */}
              <div className="space-y-2">
                <Label className="text-gray-700">Category & Tags</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Select
                    value={selectedCategory}
                    onValueChange={(value) => {
                      setSelectedCategory(value);
                      setSelectedTag('');
                    }}
                  >
                    <SelectTrigger className="border-purple-100 focus:ring-purple-300">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {tagCategories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          <span className="flex items-center gap-2">
                            <span>{category.emoji}</span>
                            <span>{category.label}</span>
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select
                    value={selectedTag}
                    onValueChange={setSelectedTag}
                    disabled={!selectedCategory}
                  >
                    <SelectTrigger className="border-purple-100 focus:ring-purple-300">
                      <SelectValue placeholder="Detailed Tag" />
                    </SelectTrigger>
                    <SelectContent>
                      {getSelectedCategoryTags().map((tag) => (
                        <SelectItem key={tag.value} value={tag.value}>
                          <span className="flex items-center gap-2">
                            <span>{tag.emoji}</span>
                            <span>{tag.label}</span>
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* 제출 버튼 */}
              <Button
                type="submit"
                className="w-full bg-purple-400 hover:bg-purple-500 text-white py-3 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                Create Group Buy
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateGroupBuy;
