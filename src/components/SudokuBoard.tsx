'use client';

import { useState, useEffect } from 'react';
import { SudokuGrid } from '@/lib/sudoku';
import { isValidPlacement } from '@/lib/sudoku';

interface SudokuBoardProps {
  puzzle: SudokuGrid;
  onGridChange: (grid: SudokuGrid) => void;
  onComplete: () => void;
  disabled?: boolean;
}

export default function SudokuBoard({ puzzle, onGridChange, onComplete, disabled = false }: SudokuBoardProps) {
  const [grid, setGrid] = useState<SudokuGrid>(puzzle);
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
  const [initialPuzzle] = useState<SudokuGrid>(puzzle.map(row => [...row]));

  useEffect(() => {
    setGrid(puzzle.map(row => [...row]));
  }, [puzzle]);

  const handleCellClick = (row: number, col: number) => {
    if (disabled || initialPuzzle[row][col] !== null) return;
    setSelectedCell({ row, col });
  };

  const handleNumberInput = (num: number | null) => {
    if (!selectedCell || disabled) return;
    
    const { row, col } = selectedCell;
    if (initialPuzzle[row][col] !== null) return;

    const newGrid = grid.map(r => [...r]);
    newGrid[row][col] = num;
    
    setGrid(newGrid);
    onGridChange(newGrid);

    // Check if puzzle is complete
    const isComplete = newGrid.every(row => row.every(cell => cell !== null));
    if (isComplete) {
      onComplete();
    }
  };

  const isCellValid = (row: number, col: number): boolean => {
    const num = grid[row][col];
    if (num === null) return true;
    
    const tempGrid = grid.map(r => [...r]);
    tempGrid[row][col] = null;
    return isValidPlacement(tempGrid, row, col, num);
  };

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Sudoku Grid */}
      <div className="bg-gradient-to-br from-green-900/40 to-green-800/40 p-3 rounded-xl border-2 border-green-500/50 shadow-2xl backdrop-blur-sm">
        <div className="grid grid-cols-9 gap-0 bg-black/30 p-1 rounded-lg">
          {grid.map((row, rowIndex) =>
            row.map((cell, colIndex) => {
              const isInitial = initialPuzzle[rowIndex][colIndex] !== null;
              const isSelected = selectedCell?.row === rowIndex && selectedCell?.col === colIndex;
              const isInvalid = cell !== null && !isCellValid(rowIndex, colIndex);
              const isBoxBorder = {
                right: (colIndex + 1) % 3 === 0 && colIndex !== 8,
                bottom: (rowIndex + 1) % 3 === 0 && rowIndex !== 8,
              };

              return (
                <button
                  key={`${rowIndex}-${colIndex}`}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                  disabled={disabled || isInitial}
                  className={`
                    w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12
                    flex items-center justify-center
                    text-base sm:text-lg md:text-xl font-bold
                    border border-green-700/30
                    transition-all duration-200
                    ${isBoxBorder.right ? 'border-r-2 border-r-green-400' : ''}
                    ${isBoxBorder.bottom ? 'border-b-2 border-b-green-400' : ''}
                    ${isInitial 
                      ? 'bg-green-950/60 text-green-300 font-extrabold cursor-not-allowed metallic-text' 
                      : 'bg-green-900/20 text-green-100 hover:bg-green-700/40 cursor-pointer'
                    }
                    ${isSelected && !isInitial ? 'ring-2 ring-green-400 bg-green-600/30 scale-105 shadow-lg shadow-green-500/50' : ''}
                    ${isInvalid ? 'text-red-400 bg-red-900/30' : ''}
                    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
                  `}
                >
                  {cell || ''}
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Number Pad */}
      {!disabled && (
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-5 gap-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
              <button
                key={num}
                onClick={() => handleNumberInput(num)}
                disabled={!selectedCell}
                className="
                  w-12 h-12 sm:w-14 sm:h-14
                  rounded-lg font-bold text-lg
                  bg-gradient-to-br from-green-600 to-green-700
                  hover:from-green-500 hover:to-green-600
                  disabled:from-gray-700 disabled:to-gray-800
                  text-white metallic-text
                  border-2 border-green-400/50
                  shadow-lg hover:shadow-green-500/50
                  transition-all duration-200
                  hover:scale-105 active:scale-95
                  disabled:opacity-40 disabled:cursor-not-allowed
                  disabled:hover:scale-100
                "
              >
                {num}
              </button>
            ))}
            <button
              onClick={() => handleNumberInput(null)}
              disabled={!selectedCell}
              className="
                w-12 h-12 sm:w-14 sm:h-14
                rounded-lg font-bold text-sm
                bg-gradient-to-br from-red-600 to-red-700
                hover:from-red-500 hover:to-red-600
                disabled:from-gray-700 disabled:to-gray-800
                text-white metallic-text
                border-2 border-red-400/50
                shadow-lg hover:shadow-red-500/50
                transition-all duration-200
                hover:scale-105 active:scale-95
                disabled:opacity-40 disabled:cursor-not-allowed
                disabled:hover:scale-100
              "
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
