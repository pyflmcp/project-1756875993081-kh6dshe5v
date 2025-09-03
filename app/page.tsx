'use client';

import React, { useState, useEffect } from 'react';

interface GameState {
  currentGame: 'menu' | 'recognize' | 'count' | 'sort';
  score: number;
  level: number;
}

export default function SealFeedingGame() {
  const [gameState, setGameState] = useState<GameState>({
    currentGame: 'menu',
    score: 0,
    level: 1
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-cyan-500 to-teal-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full min-h-[600px] p-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-600 mb-2">
            🦭 海豹喂食游戏 🐟
          </h1>
          <p className="text-lg text-gray-600">帮助饲养员给可爱的海豹喂鱼 - 学习数字 5 到 9</p>
          <div className="flex justify-center items-center gap-6 mt-4">
            <div className="bg-blue-100 px-4 py-2 rounded-full">
              <span className="font-semibold text-blue-800">🐟 收集鱼儿: {gameState.score}</span>
            </div>
            <div className="bg-teal-100 px-4 py-2 rounded-full">
              <span className="font-semibold text-teal-800">🏆 饲养员等级: {gameState.level}</span>
            </div>
          </div>
        </header>

        {gameState.currentGame === 'menu' && (
          <GameMenu setGameState={setGameState} />
        )}
        
        {gameState.currentGame === 'recognize' && (
          <NumberRecognition setGameState={setGameState} />
        )}
        
        {gameState.currentGame === 'count' && (
          <CountingGame setGameState={setGameState} />
        )}
        
        {gameState.currentGame === 'sort' && (
          <SortingGame setGameState={setGameState} />
        )}
      </div>
    </div>
  );
}

function GameMenu({ setGameState }: { setGameState: React.Dispatch<React.SetStateAction<GameState>> }) {
  const games = [
    {
      id: 'recognize',
      title: '🦭 认识数字牌',
      description: '海豹想知道这是几号鱼桶',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'count',
      title: '🐟 数鱼喂食',
      description: '数一数要喂几条鱼给海豹',
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'sort',
      title: '📋 鱼桶排序',
      description: '把鱼桶按大小顺序排好',
      color: 'from-purple-500 to-violet-500'
    }
  ];

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {games.map((game) => (
        <div
          key={game.id}
          onClick={() => setGameState(prev => ({ ...prev, currentGame: game.id as 'recognize' | 'count' | 'sort' }))}
          className={`bg-gradient-to-br ${game.color} rounded-2xl p-6 text-white cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-xl`}
        >
          <h3 className="text-2xl font-bold mb-3">{game.title}</h3>
          <p className="text-lg opacity-90">{game.description}</p>
          <div className="mt-4 flex justify-center">
            <div className="bg-white bg-opacity-20 rounded-full px-4 py-2">
              <span className="text-sm font-semibold">开始训练</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function NumberRecognition({ setGameState }: { 
  setGameState: React.Dispatch<React.SetStateAction<GameState>> 
}) {
  const [currentNumber, setCurrentNumber] = useState<number>(5);
  const [options, setOptions] = useState<number[]>([]);
  const [feedback, setFeedback] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState<boolean>(false);

  useEffect(() => {
    generateQuestion();
  }, []);

  const generateQuestion = () => {
    const numbers = [5, 6, 7, 8, 9];
    const target = numbers[Math.floor(Math.random() * numbers.length)];
    setCurrentNumber(target);
    
    const wrongOptions = numbers.filter(n => n !== target);
    const shuffledOptions = [target, ...wrongOptions.slice(0, 2)].sort(() => Math.random() - 0.5);
    setOptions(shuffledOptions);
    setShowFeedback(false);
  };

  const handleAnswer = (selectedNumber: number) => {
    if (selectedNumber === currentNumber) {
      setFeedback('🦭 海豹很开心！你认对了鱼桶号码！');
      setGameState(prev => ({ ...prev, score: prev.score + 1 }));
    } else {
      setFeedback('🐟 海豹说：再看看鱼桶上的号码吧！');
    }
    setShowFeedback(true);
    
    setTimeout(() => {
      if (selectedNumber === currentNumber) {
        generateQuestion();
      } else {
        setShowFeedback(false);
      }
    }, 2000);
  };

  return (
    <div className="text-center">
      <div className="mb-8">
        <button
          onClick={() => setGameState(prev => ({ ...prev, currentGame: 'menu' }))}
          className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-full mb-6 transition-colors"
        >
          🏠 回到海洋馆
        </button>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">🦭 海豹想知道这是几号鱼桶？</h2>
        <p className="text-gray-600">帮助海豹认识鱼桶上的数字</p>
      </div>
      
      <div className="bg-gradient-to-br from-blue-200 to-cyan-200 rounded-2xl p-12 mb-8 mx-auto max-w-md relative">
        <div className="text-8xl mb-4">🪣</div>
        <div className="text-9xl font-bold text-blue-600 animate-pulse">
          {currentNumber}
        </div>
        <div className="text-2xl mt-2">🐟</div>
      </div>
      
      <div className="flex justify-center gap-4 mb-6">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => handleAnswer(option)}
            className="bg-orange-500 hover:bg-orange-600 text-white text-2xl font-bold px-8 py-4 rounded-2xl transform hover:scale-110 transition-all duration-200 shadow-lg"
          >
            {option}
          </button>
        ))}
      </div>
      
      <div className="text-6xl mb-4">🦭</div>
      
      {showFeedback && (
        <div className={`text-xl font-bold p-4 rounded-2xl max-w-md mx-auto ${
          feedback.includes('开心') ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'
        } animate-bounce`}>
          {feedback}
        </div>
      )}
    </div>
  );
}

function CountingGame({ setGameState }: { 
  setGameState: React.Dispatch<React.SetStateAction<GameState>> 
}) {
  const [targetCount, setTargetCount] = useState<number>(5);
  const [options, setOptions] = useState<number[]>([]);
  const [feedback, setFeedback] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState<boolean>(false);

  useEffect(() => {
    generateQuestion();
  }, []);

  const generateQuestion = () => {
    const counts = [5, 6, 7, 8, 9];
    const target = counts[Math.floor(Math.random() * counts.length)];
    setTargetCount(target);
    
    const wrongOptions = counts.filter(n => n !== target);
    const shuffledOptions = [target, ...wrongOptions.slice(0, 2)].sort(() => Math.random() - 0.5);
    setOptions(shuffledOptions);
    setShowFeedback(false);
  };

  const handleAnswer = (selectedCount: number) => {
    if (selectedCount === targetCount) {
      setFeedback('🦭 海豹吃饱了！你数鱼儿数得很准确！');
      setGameState(prev => ({ ...prev, score: prev.score + 2 }));
    } else {
      setFeedback('🐟 再数一数鱼儿，海豹还没吃饱呢！');
    }
    setShowFeedback(true);
    
    setTimeout(() => {
      if (selectedCount === targetCount) {
        generateQuestion();
      } else {
        setShowFeedback(false);
      }
    }, 2000);
  };

  const renderFishes = () => {
    return Array.from({ length: targetCount }, (_, i) => (
      <span key={i} className="text-5xl animate-bounce" style={{ animationDelay: `${i * 0.15}s` }}>
        🐟
      </span>
    ));
  };

  return (
    <div className="text-center">
      <div className="mb-8">
        <button
          onClick={() => setGameState(prev => ({ ...prev, currentGame: 'menu' }))}
          className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-full mb-6 transition-colors"
        >
          🏠 回到海洋馆
        </button>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">🦭 数一数要给海豹喂几条鱼？</h2>
        <p className="text-gray-600">海豹肚子饿了，数数看有多少条鱼</p>
      </div>
      
      <div className="bg-gradient-to-br from-cyan-200 to-blue-300 rounded-2xl p-8 mb-6 mx-auto max-w-2xl relative">
        <div className="text-4xl mb-4">🌊 鱼池 🌊</div>
        <div className="flex flex-wrap justify-center gap-6 min-h-[120px] items-center">
          {renderFishes()}
        </div>
      </div>
      
      <div className="text-6xl mb-4">🦭</div>
      <p className="text-lg text-gray-600 mb-6">&ldquo;好饿啊，有几条鱼呢？&rdquo;</p>
      
      <div className="flex justify-center gap-4 mb-6">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => handleAnswer(option)}
            className="bg-blue-500 hover:bg-blue-600 text-white text-2xl font-bold px-8 py-4 rounded-2xl transform hover:scale-110 transition-all duration-200 shadow-lg"
          >
            {option} 条
          </button>
        ))}
      </div>
      
      {showFeedback && (
        <div className={`text-xl font-bold p-4 rounded-2xl max-w-md mx-auto ${
          feedback.includes('吃饱了') ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'
        } animate-bounce`}>
          {feedback}
        </div>
      )}
    </div>
  );
}

function SortingGame({ setGameState }: { 
  setGameState: React.Dispatch<React.SetStateAction<GameState>> 
}) {
  const [numbers, setNumbers] = useState<number[]>([]);
  const [sortedNumbers, setSortedNumbers] = useState<number[]>([]);
  const [draggedNumber, setDraggedNumber] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [isComplete, setIsComplete] = useState<boolean>(false);

  useEffect(() => {
    generateQuestion();
  }, []);

  const generateQuestion = () => {
    const allNumbers = [5, 6, 7, 8, 9];
    const shuffled = [...allNumbers].sort(() => Math.random() - 0.5);
    setNumbers(shuffled);
    setSortedNumbers([]);
    setIsComplete(false);
    setShowFeedback(false);
  };

  const handleDragStart = (number: number) => {
    setDraggedNumber(number);
  };

  const handleDrop = (position: number) => {
    if (draggedNumber !== null) {
      const newSorted = [...sortedNumbers];
      newSorted[position] = draggedNumber;
      setSortedNumbers(newSorted);
      
      setNumbers(prev => prev.filter(n => n !== draggedNumber));
      setDraggedNumber(null);
      
      // Check if complete and correct
      if (newSorted.length === 5 && newSorted.every(num => num !== undefined)) {
        const isCorrect = newSorted.every((num, index) => num === index + 5);
        if (isCorrect) {
          setFeedback('🦭 太棒了！鱼桶排列整齐，海豹可以按顺序吃鱼了！');
          setGameState(prev => ({ ...prev, score: prev.score + 5 }));
          setIsComplete(true);
        } else {
          setFeedback('🐟 鱼桶顺序不对，海豹找不到鱼了！');
          // Reset after incorrect attempt
          setTimeout(() => {
            const allNums = [5, 6, 7, 8, 9];
            setNumbers(allNums.sort(() => Math.random() - 0.5));
            setSortedNumbers([]);
            setShowFeedback(false);
          }, 2500);
        }
        setShowFeedback(true);
      }
    }
  };

  return (
    <div className="text-center">
      <div className="mb-8">
        <button
          onClick={() => setGameState(prev => ({ ...prev, currentGame: 'menu' }))}
          className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-full mb-6 transition-colors"
        >
          🏠 回到海洋馆
        </button>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">🦭 帮海豹把鱼桶排好顺序</h2>
        <p className="text-gray-600">从最小的5号桶开始，按顺序排到9号桶</p>
      </div>
      
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">🪣 拖拽这些鱼桶：</h3>
        <div className="flex justify-center gap-4 mb-8">
          {numbers.map((number, index) => (
            <div
              key={`${number}-${index}`}
              draggable
              onDragStart={() => handleDragStart(number)}
              className="bg-gradient-to-br from-orange-400 to-red-500 text-white text-3xl font-bold w-20 h-20 rounded-2xl flex flex-col items-center justify-center cursor-move transform hover:scale-110 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <div className="text-lg">🪣</div>
              <div>{number}</div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="text-6xl mb-4">🦭</div>
      <p className="text-lg text-gray-600 mb-6">&ldquo;请帮我把鱼桶按大小顺序排好！&rdquo;</p>
      
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">📋 排序区域：</h3>
        <div className="flex justify-center gap-2">
          {[0, 1, 2, 3, 4].map((position) => (
            <div
              key={position}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(position)}
              className={`w-24 h-24 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center text-2xl font-bold transition-all duration-200 ${
                sortedNumbers[position] 
                  ? 'bg-green-200 border-green-400 text-green-800' 
                  : 'bg-blue-100 border-blue-400 text-blue-500 hover:bg-blue-200'
              }`}
            >
              {sortedNumbers[position] ? (
                <>
                  <div className="text-lg">🪣</div>
                  <div>{sortedNumbers[position]}</div>
                </>
              ) : (
                <div className="text-4xl">?</div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {showFeedback && (
        <div className="mb-6">
          <div className={`text-xl font-bold p-4 rounded-2xl max-w-lg mx-auto ${
            feedback.includes('太棒了') ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'
          } animate-bounce`}>
            {feedback}
          </div>
          {isComplete && (
            <button
              onClick={generateQuestion}
              className="mt-4 bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-full transition-colors"
            >
              🐟 再来帮海豹排序
            </button>
          )}
        </div>
      )}
      
      <div className="text-sm text-gray-600">
        💡 提示：从5号小桶开始，依次排到9号大桶
      </div>
    </div>
  );
}
