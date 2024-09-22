"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import GameRoom from '@/components/GameRoom';

export default function GamePage() {
  const { gameId } = useParams();
  const [userId, setUserId] = useState('');
  const [gameData, setGameData] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }

    const fetchGameData = async () => {
      try {
        const response = await fetch(`/api/games/${gameId}`);
        if (!response.ok) throw new Error('ゲームデータの取得に失敗しました');
        const data = await response.json();
        setGameData(data);
      } catch (error) {
        console.error('ゲームデータ取得エラー:', error);
        alert('ゲームデータの取得に失敗しました。');
      }
    };

    fetchGameData();
  }, [gameId]);

  if (!gameData) {
    return <div>ゲームデータを読み込み中...</div>;
  }

  return (
    <GameRoom gameId={gameId as string} userId={userId} gameData={gameData} />
  );
}