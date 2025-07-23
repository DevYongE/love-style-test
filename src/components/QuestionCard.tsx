import { motion } from 'framer-motion';
import { Heart, Sparkles, ChevronLeft } from 'lucide-react';
import { Question } from '@/types';

interface QuestionCardProps {
  question: Question;
  onAnswer: (selectedOption: 'A' | 'B') => void;
  onPrevious?: () => void;
  questionNumber: number;
}

export default function QuestionCard({ question, onAnswer, onPrevious, questionNumber }: QuestionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, type: "spring", stiffness: 150 }}
      className="love-card rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute top-4 right-4 text-pink-200 text-3xl animate-float opacity-50">💕</div>
      <div className="absolute bottom-4 left-4 text-purple-200 text-2xl animate-sparkle opacity-40">✨</div>
      <div className="absolute top-1/2 right-8 text-rose-200 text-lg animate-gentle-bounce opacity-30">💖</div>

      {/* 이전 문항 버튼 */}
      {onPrevious && (
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.1, x: -5 }}
          whileTap={{ scale: 0.9 }}
          onClick={onPrevious}
          className="absolute top-6 left-6 w-12 h-12 rounded-full white-bg-80 shadow-lg flex items-center justify-center text-gray-600 hover:text-pink-500 transition-colors z-20"
        >
          <ChevronLeft className="w-6 h-6" />
        </motion.button>
      )}

      <div className="text-center mb-12 relative z-10">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          className="relative mb-8"
        >
          <div className="w-24 h-24 rounded-full flex items-center justify-center text-white font-bold text-3xl mx-auto shadow-2xl animate-pulse-glow" 
               style={{background: 'linear-gradient(135deg, #f472b6, #ec4899, #8b5cf6)'}}>
            {questionNumber}
          </div>
          <div className="absolute -top-2 -right-2 text-2xl animate-sparkle">✨</div>
          <div className="absolute -bottom-2 -left-2 text-xl animate-sparkle" style={{animationDelay: '1s'}}>🌟</div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <Heart className="text-pink-400 w-7 h-7 animate-heartbeat" />
          <h3 className="font-bold gradient-text leading-relaxed text-center" style={{fontSize: '1.8rem'}}>
            {question.question}
          </h3>
          <Sparkles className="text-purple-400 w-7 h-7 animate-pulse" />
        </motion.div>
      </div>

      <div className="grid gap-8 md:gap-10 relative z-10">
        <motion.button
          initial={{ opacity: 0, x: -100, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 120 }}
          whileHover={{ scale: 1.03, x: 8, rotateY: 5, y: -8 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => onAnswer('A')}
          className="group w-full rounded-3xl text-left transition-all duration-300 shadow-xl hover:shadow-2xl love-card relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #fdf2f8, #fce7f3, #fce7f3)',
            padding: '2rem 1.5rem',
            minHeight: '100px',
            border: '3px solid #fce7f3',
            cursor: 'pointer'
          }}
        >
          <div className="absolute top-4 right-4 text-pink-300 text-3xl opacity-0 group-hover:opacity-100 transition-opacity animate-sparkle">💕</div>
          <div className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-br from-pink-400 to-pink-500 rounded-full opacity-0 group-hover:opacity-100 animate-bounce"></div>
          
          <div className="flex items-center gap-6">
            <motion.div 
              className="w-20 h-20 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg"
              style={{background: 'linear-gradient(135deg, #f472b6, #ec4899)'}}
              whileHover={{ scale: 1.15, rotate: 10 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              A
            </motion.div>
            <span className="text-gray-800 font-semibold flex-1 leading-relaxed" style={{fontSize: '1.2rem'}}>
              {question.optionA}
            </span>
          </div>
        </motion.button>

        <motion.button
          initial={{ opacity: 0, x: 100, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ delay: 0.6, type: "spring", stiffness: 120 }}
          whileHover={{ scale: 1.03, x: 8, rotateY: -5, y: -8 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => onAnswer('B')}
          className="group w-full rounded-3xl text-left transition-all duration-300 shadow-xl hover:shadow-2xl love-card relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #f3e8ff, #e0e7ff, #e0e7ff)',
            padding: '2rem 1.5rem',
            minHeight: '100px',
            border: '3px solid #e0e7ff',
            cursor: 'pointer'
          }}
        >
          <div className="absolute top-4 right-4 text-purple-300 text-3xl opacity-0 group-hover:opacity-100 transition-opacity animate-sparkle">💜</div>
          <div className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 animate-bounce"></div>
          
          <div className="flex items-center gap-6">
            <motion.div 
              className="w-20 h-20 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg"
              style={{background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)'}}
              whileHover={{ scale: 1.15, rotate: -10 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              B
            </motion.div>
            <span className="text-gray-800 font-semibold flex-1 leading-relaxed" style={{fontSize: '1.2rem'}}>
              {question.optionB}
            </span>
          </div>
        </motion.button>
      </div>

      {/* Bottom decoration */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="text-center mt-10 relative z-10"
      >
        <div className="flex items-center justify-center gap-2 text-gray-400 text-sm">
          <Heart className="w-4 h-4 animate-heartbeat" />
          <span>솔직한 답변이 가장 정확한 결과를 만들어요</span>
          <Heart className="w-4 h-4 animate-heartbeat" style={{animationDelay: '0.5s'}} />
        </div>
      </motion.div>
    </motion.div>
  );
} 