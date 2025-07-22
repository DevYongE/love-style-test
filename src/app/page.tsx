'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Star } from 'lucide-react';
import { questions } from '@/data/questions';
import { results } from '@/data/results';
import { Answer } from '@/types';
import QuestionCard from '@/components/QuestionCard';
import ResultCard from '@/components/ResultCard';

export default function Home() {
  const [currentStep, setCurrentStep] = useState<'start' | 'test' | 'result'>('start');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [result, setResult] = useState<string | null>(null);

  const startTest = () => {
    setCurrentStep('test');
    setCurrentQuestionIndex(0);
    setAnswers([]);
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      // Remove the last answer when going back
      setAnswers(prev => prev.slice(0, -1));
    }
  };

  const handleAnswer = (selectedOption: 'A' | 'B') => {
    const newAnswer: Answer = {
      questionId: questions[currentQuestionIndex].id,
      selectedOption,
    };

    const newAnswers = [...answers, newAnswer];
    setAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // 마지막 문항 - 결과 계산 후 결과 페이지로 이동
      const resultType = calculateResult(newAnswers);
      setResult(resultType);
      setCurrentStep('result');
    }
  };

  const calculateResult = (answers: Answer[]): string => {
    const scores: Record<string, number> = {
      secure: 0,
      anxious: 0,
      avoidant: 0,
      'fearful-avoidant': 0,
    };

    answers.forEach((answer) => {
      const question = questions.find(q => q.id === answer.questionId);
      if (question) {
        // 각 질문의 카테고리에 따라 점수 배정
        if (question.category === 'secure') {
          scores.secure += answer.selectedOption === 'A' ? 2 : 1;
        } else if (question.category === 'anxious') {
          scores.anxious += answer.selectedOption === 'A' ? 2 : 1;
        } else if (question.category === 'avoidant') {
          scores.avoidant += answer.selectedOption === 'A' ? 2 : 1;
        } else if (question.category === 'fearful-avoidant') {
          scores['fearful-avoidant'] += answer.selectedOption === 'A' ? 2 : 1;
        }
      }
    });

    // 가장 높은 점수의 타입 반환
    return Object.entries(scores).reduce((a, b) => scores[a[0]] > scores[b[0]] ? a : b)[0];
  };

  const resetTest = () => {
    setCurrentStep('start');
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setResult(null);
  };

  // 연애스타일 간단 소개 데이터
  const stylePreview = {
    secure: {
      title: "안정형",
      emoji: "💚",
      description: "감정 표현이 자연스럽고 균형 잡힌 관계를 추구해요",
      keywords: ["신뢰", "소통", "안정감"]
    },
    anxious: {
      title: "불안형",
      emoji: "💙", 
      description: "사랑에 깊이 몰입하며 애정 확인을 중요하게 여겨요",
      keywords: ["열정", "공감", "관심"]
    },
    avoidant: {
      title: "회피형",
      emoji: "🤍",
      description: "독립성을 중시하며 자신만의 공간이 필요해요",
      keywords: ["독립", "자율", "실용"]
    },
    'fearful-avoidant': {
      title: "양가형",
      emoji: "💜",
      description: "사랑을 원하면서도 상처받는 것을 두려워해요",
      keywords: ["복합", "신중", "보호"]
    }
  };

  return (
    <div className="min-h-screen heart-bg relative overflow-hidden" style={{background: 'var(--gradient-bg)'}}>
      {/* Floating hearts background */}
      <div className="floating-hearts"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 text-pink-300 text-6xl animate-float opacity-30">💕</div>
      <div className="absolute top-40 right-20 text-purple-300 text-4xl animate-float-reverse opacity-40">💖</div>
      <div className="absolute bottom-40 left-20 text-rose-300 text-5xl animate-heartbeat opacity-35">💝</div>
      <div className="absolute bottom-60 right-10 text-pink-200 text-3xl animate-gentle-bounce opacity-30">💗</div>
      
      {/* Sparkle elements */}
      <div className="absolute top-32 left-1/4 text-yellow-400 text-2xl animate-sparkle">✨</div>
      <div className="absolute top-3/4 right-1/3 text-yellow-300 text-xl animate-sparkle" style={{animationDelay: '1s'}}>⭐</div>
      <div className="absolute top-1/2 left-10 text-pink-400 text-xl animate-sparkle" style={{animationDelay: '2s'}}>🌟</div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <AnimatePresence mode="wait">
          {currentStep === 'start' && (
            <motion.div
              key="start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center max-w-6xl mx-auto"
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="mb-8 relative"
              >
                <div className="relative">
                  <Heart className="w-24 h-24 mx-auto text-pink-500 mb-6 animate-heartbeat drop-shadow-lg" />
                  <div className="absolute -top-2 -right-2 text-2xl animate-sparkle">✨</div>
                  <div className="absolute -bottom-2 -left-2 text-xl animate-sparkle" style={{animationDelay: '0.5s'}}>💫</div>
                </div>
                
                <h1 className="text-5xl md:text-7xl font-bold gradient-text mb-6 drop-shadow-sm">
                  연애스타일 테스트
                </h1>
                <div className="flex items-center justify-center gap-2 mb-8">
                  <Sparkles className="text-pink-400 w-6 h-6 animate-pulse" />
                  <p className="text-gray-600 text-xl md:text-2xl font-medium">
                    12개의 질문으로 알아보는 나의 연애 패턴
                  </p>
                  <Star className="text-purple-400 w-6 h-6 animate-pulse" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, type: "spring" }}
                className="glass-card-strong rounded-3xl p-8 md:p-12 shadow-2xl mb-8 love-card"
              >
                <div className="flex items-center justify-center gap-3 mb-8">
                  <div className="text-3xl animate-gentle-bounce">💖</div>
                  <h2 className="text-2xl md:text-3xl font-bold gradient-text-soft">
                    어떤 연애스타일인지 확인해보세요!
                  </h2>
                  <div className="text-3xl animate-gentle-bounce" style={{animationDelay: '0.3s'}}>💕</div>
                </div>
                
                {/* 연애스타일 카드들 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {Object.entries(stylePreview).map(([key, style], index) => (
                    <motion.div
                      key={key}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + index * 0.1, type: "spring" }}
                      className="love-card rounded-2xl p-6 hover-scale"
                      style={{
                        background: key === 'secure' ? 'linear-gradient(135deg, #ecfdf5, #d1fae5)' :
                                  key === 'anxious' ? 'linear-gradient(135deg, #eff6ff, #dbeafe)' :
                                  key === 'avoidant' ? 'linear-gradient(135deg, #f9fafb, #f3f4f6)' :
                                  'linear-gradient(135deg, #f5f3ff, #ede9fe)'
                      }}
                    >
                      <div className="flex items-start gap-4">
                        <motion.div
                          className="flex-shrink-0"
                          whileHover={{ scale: 1.1, rotate: 10 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl shadow-lg"
                               style={{
                                 background: key === 'secure' ? 'linear-gradient(135deg, #10b981, #059669)' :
                                           key === 'anxious' ? 'linear-gradient(135deg, #3b82f6, #2563eb)' :
                                           key === 'avoidant' ? 'linear-gradient(135deg, #6b7280, #4b5563)' :
                                           'linear-gradient(135deg, #8b5cf6, #7c3aed)'
                               }}>
                            {style.emoji}
                          </div>
                        </motion.div>
                        
                        <div className="flex-1 text-left">
                          <h3 className="text-xl font-bold text-gray-800 mb-2 gradient-text-soft">
                            {style.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                            {style.description}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {style.keywords.map((keyword, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1 text-xs font-medium rounded-full white-bg-60"
                                style={{
                                  color: key === 'secure' ? '#059669' :
                                        key === 'anxious' ? '#2563eb' :
                                        key === 'avoidant' ? '#4b5563' :
                                        '#7c3aed'
                                }}
                              >
                                #{keyword}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <div className="rounded-2xl p-6" style={{background: 'linear-gradient(to right, #fdf2f8, #f3e8ff)', border: '1px solid rgba(236, 72, 153, 0.2)'}}>
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <div className="text-2xl">⏰</div>
                    <p className="text-gray-600 font-medium">총 12개의 질문</p>
                    <div className="text-2xl">💝</div>
                    <p className="text-gray-600 font-medium">약 3분 소요</p>
                  </div>
                  <p className="text-gray-500 text-sm">
                    솔직하게 답변할수록 더 정확한 결과를 얻을 수 있어요! 💕
                  </p>
                </div>
              </motion.div>

              <motion.button
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={startTest}
                className="btn-romantic text-white font-bold py-12 px-20 rounded-full shadow-2xl flex items-center gap-6 mx-auto text-3xl md:text-4xl love-card animate-pulse-glow relative overflow-hidden"
              >
                <div className="absolute top-2 right-4 text-3xl animate-sparkle opacity-70">✨</div>
                <Heart className="w-10 h-10 animate-heartbeat" />
                💕 테스트 시작하기 💕
                <Sparkles className="w-10 h-10 animate-pulse" />
              </motion.button>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-gray-400 text-sm mt-6 flex items-center justify-center gap-1"
              >
                <span>Made with</span>
                <Heart className="w-4 h-4 text-pink-400 animate-heartbeat" />
                <span>for love</span>
              </motion.p>
            </motion.div>
          )}

          {currentStep === 'test' && (
            <motion.div
              key="test"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-4xl mx-auto"
            >
              <div className="mb-10">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-3">
                    <Heart className="text-pink-500 w-8 h-8 animate-heartbeat" />
                    <h2 className="text-3xl font-bold gradient-text">
                      연애스타일 테스트
                    </h2>
                  </div>
                  <div className="flex items-center gap-2 white-bg-80 rounded-full px-4 py-2 shadow-lg">
                    <span className="text-gray-600 font-bold text-lg">
                      {currentQuestionIndex + 1}
                    </span>
                    <span className="text-gray-400">/</span>
                    <span className="text-gray-500 font-medium">
                      {questions.length}
                    </span>
                    <div className="text-xl">💖</div>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="w-full rounded-full h-4 shadow-inner" style={{background: 'linear-gradient(to right, #fce7f3, #f3e8ff)'}}>
                    <motion.div
                      className="h-4 rounded-full shadow-lg"
                      style={{background: 'linear-gradient(to right, #ec4899, #f472b6, #8b5cf6)'}}
                      initial={{ width: 0 }}
                      animate={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    />
                  </div>
                  <div className="absolute -right-2 -top-1 text-2xl animate-gentle-bounce">
                    🌟
                  </div>
                </div>
              </div>

              <QuestionCard
                question={questions[currentQuestionIndex]}
                onAnswer={handleAnswer}
                onPrevious={currentQuestionIndex > 0 ? goToPreviousQuestion : undefined}
                questionNumber={currentQuestionIndex + 1}
              />
            </motion.div>
          )}

          {currentStep === 'result' && result && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="max-w-4xl mx-auto"
            >
              <ResultCard result={results[result]} onRestart={resetTest} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
