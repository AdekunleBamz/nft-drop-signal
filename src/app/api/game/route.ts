import { NextRequest, NextResponse } from 'next/server';
import { generateSudoku, isSolved } from '@/lib/sudoku';
import { GameSession, Difficulty } from '@/types/game';

// In-memory storage (use Redis or database in production)
const gameSessions = new Map<string, GameSession>();

export async function POST(request: NextRequest) {
  try {
    const { action, sessionId, difficulty, grid, playerAddress } = await request.json();

    switch (action) {
      case 'new': {
        const { puzzle, solution } = generateSudoku((difficulty as Difficulty) || 'medium');
        const newSession: GameSession = {
          id: crypto.randomUUID(),
          puzzle,
          solution,
          currentGrid: puzzle.map(row => [...row]),
          difficulty: difficulty || 'medium',
          startTime: Date.now(),
          wins: 0,
          isCompleted: false,
          playerAddress,
        };
        
        gameSessions.set(newSession.id, newSession);
        
        return NextResponse.json({
          sessionId: newSession.id,
          puzzle: newSession.puzzle,
          difficulty: newSession.difficulty,
        });
      }

      case 'validate': {
        if (!sessionId || !grid) {
          return NextResponse.json({ error: 'Missing sessionId or grid' }, { status: 400 });
        }

        const session = gameSessions.get(sessionId);
        if (!session) {
          return NextResponse.json({ error: 'Session not found' }, { status: 404 });
        }

        const solved = isSolved(grid, session.solution);
        
        if (solved && !session.isCompleted) {
          session.isCompleted = true;
          session.endTime = Date.now();
          session.wins += 1;
          session.currentGrid = grid;
          gameSessions.set(sessionId, session);
        }

        return NextResponse.json({
          solved,
          wins: session.wins,
          timeSpent: session.endTime ? session.endTime - session.startTime : 0,
        });
      }

      case 'get': {
        if (!sessionId) {
          return NextResponse.json({ error: 'Missing sessionId' }, { status: 400 });
        }

        const session = gameSessions.get(sessionId);
        if (!session) {
          return NextResponse.json({ error: 'Session not found' }, { status: 404 });
        }

        return NextResponse.json({
          puzzle: session.puzzle,
          currentGrid: session.currentGrid,
          difficulty: session.difficulty,
          wins: session.wins,
          isCompleted: session.isCompleted,
        });
      }

      case 'save': {
        if (!sessionId || !grid) {
          return NextResponse.json({ error: 'Missing sessionId or grid' }, { status: 400 });
        }

        const session = gameSessions.get(sessionId);
        if (!session) {
          return NextResponse.json({ error: 'Session not found' }, { status: 404 });
        }

        session.currentGrid = grid;
        gameSessions.set(sessionId, session);

        return NextResponse.json({ success: true });
      }

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('Game API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get('sessionId');
  
  if (!sessionId) {
    return NextResponse.json({ error: 'Missing sessionId' }, { status: 400 });
  }

  const session = gameSessions.get(sessionId);
  if (!session) {
    return NextResponse.json({ error: 'Session not found' }, { status: 404 });
  }

  return NextResponse.json({
    puzzle: session.puzzle,
    currentGrid: session.currentGrid,
    difficulty: session.difficulty,
    wins: session.wins,
    isCompleted: session.isCompleted,
  });
}
