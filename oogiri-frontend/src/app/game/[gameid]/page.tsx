"use client";

import { useState, useEffect } from 'react';
import GameRoom from '@/components/GameRoom';
import { Game } from '@/types/game';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton'; // 追加

export default function GamePage({ params }: { params: { gameId: string } }) {
  const { gameId } = params;
  const [userId, setUserId] = useState<string>('');
  const [game, setGame] = useState<Game | null>(null);
  const [username, setUsername] = useState('');

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
        const data: Game = await response.json();
        setGame(data);
      } catch (error) {
        console.error('ゲームデータ取得エラー:', error);
        alert('ゲームデータの取得に失敗しました。');
      }
    };

    fetchGameData();
  }, [gameId]);

  const handleJoinGame = async () => {
    try {
      await joinGame(gameId, username);
      alert('ゲームに参加しました');
    } catch (error) {
      console.error('ゲーム参加エラー:', error);
      alert('ゲームに参加できませんでした。');
    }
  };

  if (!game) {
    return (
      <div className="flex flex-col items-center p-6 space-y-4">
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-6 space-y-4">
      <GameRoom gameId={gameId as string} userId={userId} gameData={game} />
      <div className="flex flex-col items-center space-y-2 w-full max-w-md">
        <Input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="ユーザー名を入力してください"
          className="p-2 border border-gray-300 rounded w-full"
        />
        <Button onClick={handleJoinGame} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 w-full">
          ゲームに参加
        </Button>
      </div>
    </div>
  );
}