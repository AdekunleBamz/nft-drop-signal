// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * @title MiniSudoku
 * @notice A Sudoku game where players pay 30 cents USDC to play
 * @dev 10 cents goes to pool, 20 cents to creator. Winner takes pool after 24 hours
 */
contract MiniSudoku is Ownable, ReentrancyGuard {
    IERC20 public immutable usdc;
    
    uint256 public constant ENTRY_FEE = 300000; // 0.30 USDC (6 decimals)
    uint256 public constant POOL_AMOUNT = 100000; // 0.10 USDC
    uint256 public constant CREATOR_AMOUNT = 200000; // 0.20 USDC
    uint256 public constant ROUND_DURATION = 24 hours;
    
    struct GameRound {
        uint256 startTime;
        uint256 poolBalance;
        address currentLeader;
        uint256 highestWins;
        mapping(address => uint256) playerWins;
        mapping(address => bool) hasPlayed;
        address[] players;
    }
    
    uint256 public currentRoundId;
    mapping(uint256 => GameRound) public rounds;
    
    event GamePlayed(address indexed player, uint256 roundId, uint256 wins);
    event RoundEnded(uint256 indexed roundId, address winner, uint256 prize);
    event PaymentReceived(address indexed player, uint256 amount);
    
    constructor(address _usdc) {
        usdc = IERC20(_usdc);
        _startNewRound();
    }
    
    /**
     * @notice Play a game by paying entry fee
     * @param wins Number of games won in this session
     */
    function playGame(uint256 wins) external nonReentrant {
        GameRound storage round = rounds[currentRoundId];
        
        // Check if round has expired
        if (block.timestamp >= round.startTime + ROUND_DURATION) {
            _finalizeRound();
            round = rounds[currentRoundId];
        }
        
        // Transfer USDC from player
        require(
            usdc.transferFrom(msg.sender, address(this), ENTRY_FEE),
            "USDC transfer failed"
        );
        
        emit PaymentReceived(msg.sender, ENTRY_FEE);
        
        // Add to pool
        round.poolBalance += POOL_AMOUNT;
        
        // Send creator fee
        require(
            usdc.transfer(owner(), CREATOR_AMOUNT),
            "Creator payment failed"
        );
        
        // Track first-time players
        if (!round.hasPlayed[msg.sender]) {
            round.hasPlayed[msg.sender] = true;
            round.players.push(msg.sender);
        }
        
        // Update player wins
        round.playerWins[msg.sender] += wins;
        
        // Update leaderboard
        if (round.playerWins[msg.sender] > round.highestWins) {
            round.highestWins = round.playerWins[msg.sender];
            round.currentLeader = msg.sender;
        }
        
        emit GamePlayed(msg.sender, currentRoundId, wins);
    }
    
    /**
     * @notice Finalize current round and distribute prize
     */
    function finalizeRound() external nonReentrant {
        GameRound storage round = rounds[currentRoundId];
        require(
            block.timestamp >= round.startTime + ROUND_DURATION,
            "Round not finished"
        );
        _finalizeRound();
    }
    
    function _finalizeRound() private {
        GameRound storage round = rounds[currentRoundId];
        
        if (round.poolBalance > 0 && round.currentLeader != address(0)) {
            uint256 prize = round.poolBalance;
            address winner = round.currentLeader;
            
            require(
                usdc.transfer(winner, prize),
                "Prize transfer failed"
            );
            
            emit RoundEnded(currentRoundId, winner, prize);
        }
        
        currentRoundId++;
        _startNewRound();
    }
    
    function _startNewRound() private {
        GameRound storage newRound = rounds[currentRoundId];
        newRound.startTime = block.timestamp;
        newRound.poolBalance = 0;
        newRound.highestWins = 0;
    }
    
    /**
     * @notice Get current round information
     */
    function getCurrentRound() external view returns (
        uint256 roundId,
        uint256 startTime,
        uint256 endTime,
        uint256 poolBalance,
        address currentLeader,
        uint256 highestWins,
        uint256 timeRemaining
    ) {
        GameRound storage round = rounds[currentRoundId];
        roundId = currentRoundId;
        startTime = round.startTime;
        endTime = round.startTime + ROUND_DURATION;
        poolBalance = round.poolBalance;
        currentLeader = round.currentLeader;
        highestWins = round.highestWins;
        timeRemaining = block.timestamp >= endTime ? 0 : endTime - block.timestamp;
    }
    
    /**
     * @notice Get player's wins in current round
     */
    function getPlayerWins(address player) external view returns (uint256) {
        return rounds[currentRoundId].playerWins[player];
    }
    
    /**
     * @notice Get all players in current round
     */
    function getCurrentPlayers() external view returns (address[] memory) {
        return rounds[currentRoundId].players;
    }
    
    /**
     * @notice Get leaderboard for current round
     */
    function getLeaderboard() external view returns (
        address[] memory players,
        uint256[] memory wins
    ) {
        GameRound storage round = rounds[currentRoundId];
        uint256 playerCount = round.players.length;
        
        players = new address[](playerCount);
        wins = new uint256[](playerCount);
        
        for (uint256 i = 0; i < playerCount; i++) {
            players[i] = round.players[i];
            wins[i] = round.playerWins[round.players[i]];
        }
    }
}
