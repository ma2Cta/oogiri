"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [gameId, setGameId] = useState('');
  const router = useRouter();

  const createGame = async () => {
    // TODO: バックエンドAPIを呼び出してゲームを作成
    console.log('ゲームを作成');
    // 仮のゲームID生成（実際にはバックエンドから取得する）
    const newGameId = Math.random().toString(36).substring(7);
    router.push(`/game/${newGameId}`);
  };

  const joinGame = async () => {
    if (gameId) {
      // TODO: 入力されたゲームIDの有効性を確認
      console.log(`ゲームに参加: ${gameId}`);
      router.push(`/game/${gameId}`);
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
      <footer className="mt-8 text-center text-sm text-gray-500">
        © 2024 大喜利アプリ. All rights reserved.
      </footer>
    </div>
  );
}
