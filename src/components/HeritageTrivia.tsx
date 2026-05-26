import { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data';
import { CheckCircle, XCircle } from 'lucide-react';

export default function HeritageTrivia() {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  // Handle Quiz selection
  const handleAnswerOptionClick = (optionIdx: number) => {
    if (hasAnswered) return;
    setSelectedOptionIdx(optionIdx);
    setHasAnswered(true);
    
    if (optionIdx === QUIZ_QUESTIONS[currentQuestionIdx].correctAnswerIndex) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    const nextIdx = currentQuestionIdx + 1;
    if (nextIdx < QUIZ_QUESTIONS.length) {
      setCurrentQuestionIdx(nextIdx);
      setSelectedOptionIdx(null);
      setHasAnswered(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIdx(0);
    setSelectedOptionIdx(null);
    setHasAnswered(false);
    setScore(0);
    setQuizFinished(false);
  };

  return (
    <section aria-label="Heritage Trivia Quiz" className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white rounded-[28px] p-6 sm:p-8 border border-slate-800 shadow-2xl hover:translate-y-[-2px] hover:shadow-3xl transition-all duration-300">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <span className="stat-label text-slate-500">KNOWLEDGE BATTLE</span>
          <h2 className="text-2xl font-serif-display font-black text-white tracking-tight">Archipelago Heritage Trivia</h2>
          <p className="text-xs text-slate-400 mt-0.5">Test your understanding of cultural history and state statistics</p>
        </div>
        {!quizFinished && (
          <span className="text-xs bg-slate-800 border border-slate-700/50 text-slate-300 font-bold px-3 py-1 rounded-full">
            Question {currentQuestionIdx + 1} of {QUIZ_QUESTIONS.length}
          </span>
        )}
      </div>

      {quizFinished ? (
        /* Finished/Score Board */
        <div className="text-center py-10 space-y-4 max-w-md mx-auto animate-fadeIn">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-amber-400 text-slate-950 text-2xl font-black">
            {score === QUIZ_QUESTIONS.length ? '👑' : '🎉'}
          </div>
          <h4 className="text-2xl font-serif-display font-bold text-white">Quiz Completed!</h4>
          <p className="text-slate-300 text-sm">
            You scored <span className="font-bold text-amber-400 text-lg">{score}</span> out of {QUIZ_QUESTIONS.length} correct answers.
          </p>
          <div className="pt-2 bg-slate-900/60 p-4 rounded-xl border border-slate-850">
            <p className="text-xs text-slate-400">
              {score >= 5 
                ? "Exceptional! Devoted explorer. You know the Philippines inside-out!"
                : score >= 3 
                  ? "Awesome job! You've got an active interest in the islands' stories."
                  : "Great start! Play again or read our bento cells to learn more secrets!"}
            </p>
          </div>
          <button
            onClick={handleRestartQuiz}
            className="px-6 py-2.5 bg-amber-400 hover:bg-amber-350 text-slate-900 font-black rounded-lg text-xs uppercase tracking-wider shadow-sm transition-all"
          >
            Restart Heritage Quiz
          </button>
        </div>
      ) : (
        /* Active Question Panel */
        <div key={currentQuestionIdx} className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start animate-fade-in">
          {/* Question text & Progress bar */}
          <div className="md:col-span-6 space-y-4">
            <div className="h-1.5 w-full bg-slate-850 rounded-full overflow-hidden">
              <div 
                className="h-full bg-amber-400 transition-all duration-300"
                style={{ width: `${((currentQuestionIdx + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
              ></div>
            </div>

            <h4 className="text-xl font-bold leading-relaxed text-blue-50 font-serif-display">
              {QUIZ_QUESTIONS[currentQuestionIdx].question}
            </h4>

            {/* Explanation text on answer */}
            {hasAnswered && (
              <div className="p-4 bg-slate-900/80 border border-slate-800/80 rounded-xl space-y-1 animate-fadeIn">
                <p className="text-[9px] font-extrabold tracking-widest text-amber-400 uppercase">HERITAGE SECRETS</p>
                <p className="text-xs text-slate-300 leading-relaxed italic font-medium">
                  "{QUIZ_QUESTIONS[currentQuestionIdx].explanation}"
                </p>
              </div>
            )}
          </div>

          {/* Interactive choice options */}
          <div className="md:col-span-6 space-y-3">
            <div className="grid gap-2">
              {QUIZ_QUESTIONS[currentQuestionIdx].options.map((opt, idx) => {
                const isCorrect = idx === QUIZ_QUESTIONS[currentQuestionIdx].correctAnswerIndex;
                const isSelected = idx === selectedOptionIdx;
                
                let btnStyle = "bg-slate-900/60 text-slate-200 border border-slate-800 hover:bg-slate-800 hover:border-slate-700";
                if (hasAnswered) {
                  if (isCorrect) {
                    btnStyle = "bg-emerald-950/80 border-emerald-500 text-emerald-300 font-bold";
                  } else if (isSelected) {
                    btnStyle = "bg-red-950/80 border-red-500 text-red-350";
                  } else {
                    btnStyle = "bg-slate-900/40 opacity-40 text-slate-500 border-slate-900 pointer-events-none";
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleAnswerOptionClick(idx)}
                    disabled={hasAnswered}
                    className={`w-full text-left p-4 rounded-xl text-xs transition-all flex items-center justify-between gap-2 shadow-xs ${btnStyle}`}
                  >
                    <span className="font-semibold">{opt}</span>
                    {hasAnswered && (
                      isCorrect ? (
                        <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" />
                      ) : isSelected ? (
                        <XCircle className="h-4 w-4 text-red-400 shrink-0" />
                      ) : null
                    )}
                  </button>
                );
              })}
            </div>

            {hasAnswered && (
              <button
                onClick={handleNextQuestion}
                className="w-full text-center py-2.5 bg-[#0038A8] hover:bg-blue-800 hover:scale-102 font-bold text-xs uppercase tracking-widest text-white rounded-xl transition-all shadow-md"
              >
                {currentQuestionIdx === QUIZ_QUESTIONS.length - 1 ? "Finish and view score" : "Next Question"}
              </button>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
