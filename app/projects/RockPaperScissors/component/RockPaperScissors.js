
'use client';

import { useState, useEffect, useRef } from 'react';
import '../RockPaperScissors.css';

export default function RockPaperScissors() {
const [playerScore, setPlayerScore] = useState(0);
const [computerScore, setComputerScore] = useState(0);
const [playerChoice, setPlayerChoice] = useState(null);
const [computerChoice, setComputerChoice] = useState(null);
const [result, setResult] = useState('Make your move!');
const [isAnimating, setIsAnimating] = useState(false);

// Refs for audio elements
const clickSoundRef = useRef(null);
const tieSoundRef = useRef(null);

const choices = [
	{ name: 'scissors', icon: 'fa-hand-scissors' },
	{ name: 'rock', icon: 'fa-hand-rock' },
	{ name: 'paper', icon: 'fa-hand-paper' }
];

useEffect(() => {
	
const audioSources = {
	click: '/audio/click5.wav',
	tie: '/audio/click2.mp3'
};

clickSoundRef.current = createAudioWithFallback(audioSources.click);
tieSoundRef.current = createAudioWithFallback(audioSources.tie);

[clickSoundRef.current, tieSoundRef.current].forEach(audio => 
{
	if (audio)
	{
		audio.preload = 'auto';
		audio.addEventListener('error', handleAudioError);
	}
});

}, []);

const createAudioWithFallback = (src) => {
try {
	const audio = new Audio(src);
	return audio;
} catch (error) {
	console.error("Audio creation failed:", error);
	return null;
}
};

const handleAudioError = (e) => {
	console.error("Audio loading error:", e);
};

const playSound = (soundRef) => {
if (soundRef.current) {
	soundRef.current.currentTime = 0;
	soundRef.current.play().catch(e => {
	console.log("Audio play failed:", e);
	});
}
};

const initGame = () => {
	setPlayerScore(0);
	setComputerScore(0);
	setPlayerChoice(null);
	setComputerChoice(null);
	setResult('Make your move!');
	setIsAnimating(false);
	playSound(tieSoundRef);
};

const determineWinner = (player, computer) => {
	if (player === computer) {
		return 'tie';
	}

	if ((player === 0 && computer === 2) || (player === 1 && computer === 0) || (player === 2 && computer === 1)) {
		return 'player';
	}
	return 'computer';
};

const handleChoice = (playerChoiceIndex) => {
	playSound(clickSoundRef);
	setIsAnimating(true);
	
	const computerChoiceIndex = Math.floor(Math.random() * choices.length);
	const result = determineWinner(playerChoiceIndex, computerChoiceIndex);
	
	// Reduced delay from 1000ms to 500ms
	setTimeout(() => {
	setPlayerChoice(playerChoiceIndex);
	setComputerChoice(computerChoiceIndex);
	setIsAnimating(false);
	
	if (result === 'player') {
		setPlayerScore(prev => prev + 1);
		setResult('You win!');
	} else if (result === 'computer') {
		setComputerScore(prev => prev + 1);
		setResult('Computer wins!');
	} else {
		setResult("It's a tie!");
	}
	}, 200); // Reduced from 1000ms to 500ms
};

const getResultClass = () => {
	if (result === 'You win!') return 'win';
	if (result === 'Computer wins!') return 'lose';
	if (result === "It's a tie!") return 'tie';
	return '';
};

return (
	<div className="rock-paper-scissors">
	<div className="game-container">
		<div className="game-header">
		<h1>ROCK PAPER SCISSORS</h1>
		<p>Make your choice and challenge the computer!</p>
		</div>
		
		<div className="choices-container">
		<button 
			className="choice-btn scissors" 
			onClick={() => handleChoice(0)}
			disabled={isAnimating}
		>
			<i className="fas fa-hand-scissors"></i>
		</button>
		<button 
			className="choice-btn rock" 
			onClick={() => handleChoice(1)}
			disabled={isAnimating}
		>
			<i className="fas fa-hand-rock"></i>
		</button>
		<button 
			className="choice-btn paper" 
			onClick={() => handleChoice(2)}
			disabled={isAnimating}
		>
			<i className="fas fa-hand-paper"></i>
		</button>
		</div>
		
		<div className="vs-container">
		<div className="player-section">
			<div className="player-label">YOU</div>
			<div className="player-score">{playerScore}</div>
			<div className="player-choice">
			{playerChoice !== null ? (
				<i className={`fas ${choices[playerChoice].icon}`}></i>
			) : (
				<i className="fas fa-question"></i>
			)}
			</div>
		</div>
		
		<div className="vs-text">VS</div>
		
		<div className="player-section">
			<div className="player-label">COMPUTER</div>
			<div className="player-score">{computerScore}</div>
			<div className="player-choice">
			{isAnimating ? (
				<i className={`fas ${choices[Math.floor(Math.random() * choices.length)].icon} animated`}></i>
			) : computerChoice !== null ? (
				<i className={`fas ${choices[computerChoice].icon}`}></i>
			) : (
				<i className="fas fa-question"></i>
			)}
			</div>
		</div>
		</div>
		
		<div className="result-container">
		<div className={`result-text ${getResultClass()}`}>{result}</div>
		</div>
		
		<button className="reset-btn" onClick={initGame}>
		<i className="fas fa-redo-alt"></i> Reset Game
		</button>
	</div>
	</div>
);
}