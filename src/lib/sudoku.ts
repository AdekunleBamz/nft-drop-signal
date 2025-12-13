/**
 * Sudoku Game Logic
 * Generates and validates Sudoku puzzles
 */

export type SudokuGrid = (number | null)[][];
export type Difficulty = 'easy' | 'medium' | 'hard';

/**
 * Generate a complete valid Sudoku solution
 */
function generateSolution(): number[][] {
  const grid: number[][] = Array(9).fill(0).map(() => Array(9).fill(0));
  fillGrid(grid);
  return grid;
}

/**
 * Check if a number is valid at a position
 */
function isValid(grid: number[][], row: number, col: number, num: number): boolean {
  // Check row
  for (let x = 0; x < 9; x++) {
    if (grid[row][x] === num) return false;
  }
  
  // Check column
  for (let x = 0; x < 9; x++) {
    if (grid[x][col] === num) return false;
  }
  
  // Check 3x3 box
  const startRow = row - (row % 3);
  const startCol = col - (col % 3);
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (grid[i + startRow][j + startCol] === num) return false;
    }
  }
  
  return true;
}

/**
 * Fill the grid with a valid solution using backtracking
 */
function fillGrid(grid: number[][]): boolean {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col] === 0) {
        // Randomize number order for variety
        const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => Math.random() - 0.5);
        
        for (const num of numbers) {
          if (isValid(grid, row, col, num)) {
            grid[row][col] = num;
            
            if (fillGrid(grid)) {
              return true;
            }
            
            grid[row][col] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}

/**
 * Remove numbers from a complete grid to create a puzzle
 */
function createPuzzle(solution: number[][], difficulty: Difficulty): SudokuGrid {
  const puzzle = solution.map(row => [...row]);
  
  const cellsToRemove: Record<Difficulty, number> = {
    easy: 35,
    medium: 45,
    hard: 55,
  };
  
  const toRemove = cellsToRemove[difficulty];
  let removed = 0;
  
  while (removed < toRemove) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);
    
    if (puzzle[row][col] !== 0) {
      puzzle[row][col] = 0;
      removed++;
    }
  }
  
  return puzzle.map(row => row.map(cell => cell === 0 ? null : cell));
}

/**
 * Generate a new Sudoku puzzle with solution
 */
export function generateSudoku(difficulty: Difficulty = 'medium'): {
  puzzle: SudokuGrid;
  solution: number[][];
  difficulty: Difficulty;
} {
  const solution = generateSolution();
  const puzzle = createPuzzle(solution, difficulty);
  
  return { puzzle, solution, difficulty };
}

/**
 * Validate if current grid state is valid (no conflicts)
 */
export function isValidGrid(grid: SudokuGrid): boolean {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const num = grid[row][col];
      if (num !== null) {
        // Temporarily remove the number to check if it's valid
        grid[row][col] = null;
        const valid = isValidPlacement(grid, row, col, num);
        grid[row][col] = num;
        
        if (!valid) return false;
      }
    }
  }
  return true;
}

/**
 * Check if a number can be placed at a position
 */
export function isValidPlacement(grid: SudokuGrid, row: number, col: number, num: number): boolean {
  // Check row
  for (let x = 0; x < 9; x++) {
    if (grid[row][x] === num) return false;
  }
  
  // Check column
  for (let x = 0; x < 9; x++) {
    if (grid[x][col] === num) return false;
  }
  
  // Check 3x3 box
  const startRow = row - (row % 3);
  const startCol = col - (col % 3);
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (grid[i + startRow][j + startCol] === num) return false;
    }
  }
  
  return true;
}

/**
 * Check if the puzzle is completely solved
 */
export function isSolved(grid: SudokuGrid, solution: number[][]): boolean {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col] !== solution[row][col]) {
        return false;
      }
    }
  }
  return true;
}

/**
 * Calculate completion percentage
 */
export function getCompletionPercentage(grid: SudokuGrid): number {
  let filled = 0;
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col] !== null) filled++;
    }
  }
  return Math.round((filled / 81) * 100);
}

/**
 * Get hint for next move
 */
export function getHint(grid: SudokuGrid, solution: number[][]): { row: number; col: number; value: number } | null {
  const emptyCells: { row: number; col: number }[] = [];
  
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col] === null) {
        emptyCells.push({ row, col });
      }
    }
  }
  
  if (emptyCells.length === 0) return null;
  
  const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  return {
    row: randomCell.row,
    col: randomCell.col,
    value: solution[randomCell.row][randomCell.col],
  };
}
