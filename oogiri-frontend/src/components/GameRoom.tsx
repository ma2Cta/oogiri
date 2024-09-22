import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GameData, Answer } from '@/types/game';

interface GameRoomProps {
  gameId: string;
  userId: string;
  gameData: GameData;
}

export default function GameRoom({ gameId, userId, gameData }: GameRoomProps) {
  const [answer, setAnswer] = useState<string>('');
  const [answers, setAnswers] = useState<Answer[]>(gameData.answers || []);
  const [gameStatus, setGameStatus] = useState<GameData['status']>(gameData.status);

  useEffect(() => {
    setAnswers(gameData.answers || []);
    setGameStatus(gameData.status);
  }, [gameData]);

  const submitAnswer = async () => {
    try {
      const response = await fetch(`/api/games/${gameId}/answers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, answer }),
      });
      if (!response.ok) throw new Error('回答の送信に失敗しました');
      setAnswer('');
      // 回答後の処理（例：回答一覧の更新）
    } catch (error) {
      console.error('回答送信エラー:', error);
      alert('回答の送信に失敗しました。もう一度お試しください。');
    }
  };

  const voteForAnswer = async (answerId: string) => {
    try {
      const response = await fetch(`/api/games/${gameId}/votes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, answerId }),
      });
      if (!response.ok) throw new Error('投票に失敗しました');
      // 投票後の処理（例：投票結果の更新）
    } catch (error) {
      console.error('投票エラー:', error);
      alert('投票に失敗しました。もう一度お試しください。');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">ゲームルーム: {gameId}</h1>
      <p className="mb-4">お題: {gameData.theme}</p>
      {gameStatus === 'waiting' && <p>他のプレイヤーを待っています...</p>}
      {gameStatus === 'in_progress' && (
        <div className="mb-4">
          <Input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="回答を入力"
            className="mb-2"
          />
          <Button onClick={submitAnswer}>回答を送信</Button>
        </div>
      )}
      {gameStatus === 'finished' && (
        <div>
          <h2 className="text-xl font-semibold mb-2">結果発表</h2>
          <ul>
            {answers.map((ans) => (
              <li key={ans.id}>
                {ans.content}
                <Button onClick={() => voteForAnswer(ans.id)}>投票</Button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}