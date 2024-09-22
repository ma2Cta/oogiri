import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface GameRoomProps {
  gameId: string;
  userId: string;
  gameData: GameData;
}

interface GameData {
  // ゲームデータの具体的なプロパティをここに定義
  id: string;
  players: string[];
  currentRound: number;
  gameStatus: string; // または適切な型（例：'waiting' | 'active' | 'finished'）
  theme: string;
  // 他の必要なプロパティを追加
}

export default function GameRoom({ gameId, userId, gameData }: GameRoomProps) {
  const [answer, setAnswer] = useState('');
  const [answers, setAnswers] = useState([]);
  const [gameStatus, setGameStatus] = useState(gameData.gameStatus);

  useEffect(() => {
    // ゲームの状態を監視し、更新する
    const updateGameStatus = async () => {
      try {
        const response = await fetch(`/api/games/${gameId}/status`);
        if (!response.ok) throw new Error('ゲーム状態の取得に失敗しました');
        const { status } = await response.json();
        setGameStatus(status);
      } catch (error) {
        console.error('ゲーム状態取得エラー:', error);
      }
    };

    const intervalId = setInterval(updateGameStatus, 5000); // 5秒ごとに更新

    return () => clearInterval(intervalId);
  }, [gameId]);

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
      {gameStatus === 'voting' && (
        <div>
          <h2 className="text-xl font-semibold mb-2">回答一覧</h2>
          <ul>
            {answers.map((answer: any) => (
              <li key={answer.id} className="mb-2">
                {answer.content}
                <Button onClick={() => voteForAnswer(answer.id)} className="ml-2">
                  投票
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
      {gameStatus === 'finished' && (
        <div>
          <h2 className="text-xl font-semibold mb-2">結果発表</h2>
          {/* 結果表示のロジックを実装 */}
        </div>
      )}
    </div>
  );
}