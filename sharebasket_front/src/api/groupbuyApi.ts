// src/api/groupbuyApi.ts

export interface GroupBuy {
    id: string;
    title: string;
    description: string;
    category: string;
    imageUrl: string;
  }
  
  const API_BASE = 'http://localhost:8080/api/groupbuys';

    export const createGroupBuy = async (body: any): Promise<any> => {
    const res = await fetch('http://localhost:8080/api/groupbuys', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error('공구 등록 실패');
    return res.json();
  };
  
  async function handleResponse<T>(res: Response): Promise<T> {
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`API error: ${res.status} ${text}`);
    }
    return res.json();
  }
  
  export const fetchGroupBuys = (): Promise<GroupBuy[]> => {
    return fetch(API_BASE)
      .then(res => handleResponse<GroupBuy[]>(res));
  };
  
  export const fetchGroupBuyById = (id: string): Promise<GroupBuy> => {
    return fetch(`${API_BASE}/${id}`)
      .then(res => handleResponse<GroupBuy>(res));
  };
  