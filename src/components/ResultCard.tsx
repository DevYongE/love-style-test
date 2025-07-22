import { motion } from 'framer-motion';
import { RotateCcw, Share2, Heart, Sparkles, Star } from 'lucide-react';
import { TestResult } from '@/types';

interface ResultCardProps {
  result: TestResult;
  onRestart: () => void;
}

export default function ResultCard({ result, onRestart }: ResultCardProps) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: '연애스타일 테스트 결과',
          text: `나의 연애스타일은 ${result.title}! ${result.description}`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Share failed:', error);
      }
    } else {
      // Fallback: copy to clipboard
      const shareText = `나의 연애스타일은 ${result.title}!\n${result.description}\n\n${window.location.href}`;
      navigator.clipboard.writeText(shareText);
      alert('결과가 클립보드에 복사되었습니다! 💕');
    }
  };

  return (
    <div className="text-center relative">
      {/* Floating decorative elements */}
      <div className="absolute -top-10 left-10 text-pink-300 text-4xl animate-float opacity-40">💕</div>
      <div className="absolute -top-5 right-20 text-purple-300 text-3xl animate-sparkle opacity-50">✨</div>
      <div className="absolute top-20 -left-5 text-rose-300 text-2xl animate-gentle-bounce opacity-30">💖</div>
      <div className="absolute top-40 -right-10 text-pink-200 text-5xl animate-float-reverse opacity-25">💝</div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
        className="love-card rounded-3xl p-8 md:p-12 shadow-2xl mb-8 relative overflow-hidden"
      >
        {/* Background decorations */}
        <div className="absolute top-6 right-6 text-yellow-200 text-3xl animate-sparkle opacity-60">🌟</div>
        <div className="absolute bottom-6 left-6 text-pink-200 text-2xl animate-float opacity-50">💫</div>
        
        {/* Celebration animation */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.2, 1], opacity: 1 }}
          transition={{ duration: 1, times: [0, 0.6, 1] }}
          className="text-center mb-8"
        >
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-2xl md:text-3xl font-bold gradient-text mb-2">
            테스트 완료!
          </h1>
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="text-pink-400 w-5 h-5 animate-pulse" />
            <p className="text-gray-600 font-medium">당신의 연애스타일이 나왔어요</p>
            <Star className="text-purple-400 w-5 h-5 animate-pulse" />
          </div>
        </motion.div>

        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 150 }}
          className="relative mb-8"
        >
          <div className={`w-40 h-40 ${result.color} rounded-full flex items-center justify-center text-7xl mx-auto shadow-2xl animate-pulse-glow relative`}>
            {result.emoji}
            <div className="absolute -top-3 -right-3 text-3xl animate-sparkle">✨</div>
            <div className="absolute -bottom-3 -left-3 text-2xl animate-sparkle" style={{animationDelay: '1s'}}>💫</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-8"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4 gradient-text drop-shadow-sm">
            {result.title}
          </h2>
          <div className="flex items-center justify-center gap-2 mb-6">
            <Heart className="text-pink-400 w-6 h-6 animate-heartbeat" />
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-medium max-w-4xl">
              {result.description}
            </p>
            <Heart className="text-pink-400 w-6 h-6 animate-heartbeat" style={{animationDelay: '0.5s'}} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="rounded-3xl p-8 mb-10 shadow-inner"
          style={{
            background: 'linear-gradient(135deg, rgba(253, 242, 248, 0.8), rgba(253, 231, 243, 0.8), rgba(243, 232, 255, 0.8))',
            border: '1px solid rgba(236, 72, 153, 0.2)'
          }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="text-3xl animate-gentle-bounce">💖</div>
            <h3 className="text-2xl md:text-3xl font-bold gradient-text-soft">
              상세 분석 결과
            </h3>
            <div className="text-3xl animate-gentle-bounce" style={{animationDelay: '0.3s'}}>💕</div>
          </div>
          
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {result.characteristics.map((characteristic, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                className="flex items-start gap-4 text-left rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow white-bg-60"
              >
                <div className="w-3 h-3 rounded-full mt-2 flex-shrink-0 shadow-sm animate-pulse" 
                     style={{background: 'linear-gradient(45deg, #f472b6, #8b5cf6)'}} />
                <span className="text-gray-700 leading-relaxed font-medium text-base">
                  {characteristic}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleShare}
            className="btn-romantic text-white font-bold py-4 px-8 rounded-full shadow-2xl flex items-center gap-3 justify-center text-lg love-card relative overflow-hidden"
          >
            <Share2 className="w-6 h-6" />
            결과 공유하기
            <div className="absolute top-1 right-1 text-lg animate-sparkle opacity-70">✨</div>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={onRestart}
            className="text-white font-bold py-4 px-8 rounded-full shadow-2xl flex items-center gap-3 justify-center text-lg love-card transition-all duration-300"
            style={{background: 'linear-gradient(45deg, #6b7280, #4b5563)'}}
          >
            <RotateCcw className="w-6 h-6" />
            다시 테스트하기
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="rounded-2xl p-6"
          style={{
            background: 'linear-gradient(to right, #fce7f3, #f3e8ff)',
            border: '1px solid rgba(236, 72, 153, 0.2)'
          }}
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="text-2xl animate-heartbeat">💕</div>
            <p className="text-gray-600 font-semibold text-lg">친구들과도 함께 테스트해보세요!</p>
            <div className="text-2xl animate-heartbeat" style={{animationDelay: '0.5s'}}>💖</div>
          </div>
          <p className="text-gray-500 text-sm">
            연애스타일을 알면 더 건강한 관계를 만들어갈 수 있어요 ✨
          </p>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6 }}
        className="flex items-center justify-center gap-2 text-gray-400 text-sm"
      >
        <span>Made with</span>
        <Heart className="w-4 h-4 text-pink-400 animate-heartbeat" />
        <span>for love</span>
        <div className="text-lg animate-sparkle">✨</div>
      </motion.div>
    </div>
  );
} 