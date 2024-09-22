"use client";

import { useState, useEffect } from 'react';
import GameRoom from '@/components/GameRoom';
import { GameData } from '@/types/game';

export default function GamePage({ params }: { params: { gameId: string } }) {
  const { gameId } = params;
  const [userId, setUserId] = useState<string>('');
  const [gameData, setGameData] = useState<GameData | null>(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }

    const fetchGameData = async () => {
      try {
        // gameIdが存在することを確認
        if (!gameId) {
          throw new Error('ゲームIDが見つかりません');
        }
        const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';
        const response = await fetch(`${API_BASE_URL}/api/games/${gameId}`);
        if (!response.ok) throw new Error('ゲームデータの取得に失敗しました');
        const data: GameData = await response.json();
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