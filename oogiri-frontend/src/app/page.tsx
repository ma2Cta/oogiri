"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Game } from '@/types/game';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';

export default function Home() {
  const [gameId, setGameId] = useState<string>('');
  const router = useRouter();

  const createGame = async (): Promise<void> => {
    try {
      const response = await axios.post<Game>(`${API_BASE_URL}/api/create_game`);
      const newGameId = response.data.id;
      router.push(`/game/${newGameId}/preparation`);
    } catch (error) {
      console.error('ゲーム作成エラー:', error);
      alert('ゲームの作成に失敗しました。');
    }
  };

  const joinGame = async (): Promise<void> => {
    if (gameId) {
      try {
        const response = await axios.post<Game>(`${API_BASE_URL}/api/join_game`, { game_id: gameId });
        router.push(`/game/${response.data.id}/preparation`);
      } catch (error) {
        console.error('ゲーム参加エラー:', error);
        alert('ゲームの参加に失敗しました。');
      }
    } else {
      alert('ゲームIDを入力してください。');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <main className="flex flex-col gap-8 items-center text-center">
        <h1 className="text-4xl font-bold mb-8">大喜利アプリへようこそ！</h1>
        <div className="space-y-4 w-full max-w-md">
          <Button onClick={createGame} className="w-full">
            新しいゲームを作成
          </Button>
          <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
            <Input
              type="text"
              placeholder="ゲームIDを入力"
              value={gameId}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGameId(e.target.value)}
              className="flex-grow"
            />
            <Button onClick={joinGame} className="w-full sm:w-auto">参加</Button>
          </div>
        </div>
      </main>
    </div>
  );
}
