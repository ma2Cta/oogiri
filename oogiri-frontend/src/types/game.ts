export interface GameData {
  id: string;
  status: 'waiting' | 'in_progress' | 'finished';
  players: Player[];
  currentRound: number;
  totalRounds: number;
  theme: string;
  answers: Answer[];
}

export interface Player {
  id: string;
  name: string;
  score: number;
}

export interface Answer {
  id: string;
  content: string;
  playerId: string;
}