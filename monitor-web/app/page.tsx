"use client";

import { useEffect, useState } from "react";

interface Item {
  id: string;
  subject: string;
  signboard: string;
  price: string;
  quantity: string;
  minPrice: string;
  premium: boolean;
  regDate: string;
}

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);
  const [lastUpdate, setLastUpdate] = useState("");

  const fetchItems = async () => {
    const res = await fetch("/api/items");
    const data = await res.json();
    setItems(data.items);
    setLastUpdate(new Date().toLocaleTimeString("ko-KR"));
  };

  useEffect(() => {
    fetchItems();
    const interval = setInterval(fetchItems, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">
            🎮 메이플랜드 시세 모니터링
          </h1>
          <div className="text-sm text-gray-400">
            갱신: {lastUpdate} | 10초 간격
            <span className="ml-2 inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-700">
              <tr>
                <th className="text-left p-3">간판</th>
                <th className="text-right p-3 w-48">수량</th>
                <th className="text-right p-3 w-36">단가</th>
                <th className="text-right p-3 w-32">최소금액</th>
                <th className="text-right p-3 w-20">시간</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr
                  key={item.id}
                  className="border-t border-gray-700 hover:bg-gray-750"
                >
                  <td className="p-3">
                    {item.premium && (
                      <span className="text-yellow-400 mr-1">★</span>
                    )}
                    {item.signboard !== "-" ? item.signboard : item.subject.slice(0, 20)}
                  </td>
                  <td className="p-3 text-right text-gray-300">
                    {item.quantity}
                  </td>
                  <td className="p-3 text-right text-green-400 font-mono">
                    {item.price}
                  </td>
                  <td className="p-3 text-right text-gray-300">
                    {item.minPrice ? `${item.minPrice}원` : "-"}
                  </td>
                  <td className="p-3 text-right text-gray-500">
                    {item.regDate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-center text-gray-500 text-xs mt-4">
          총 {items.length}건
        </p>
      </div>
    </main>
  );
}
