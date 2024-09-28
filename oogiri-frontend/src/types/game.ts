export interface Game {
  id: string;
  status: 'waiting' | 'in_progress' | 'finished';
  playerIds: string[];
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

export interface JoinGameRequest {
  gameId: string;
  username: string;
}