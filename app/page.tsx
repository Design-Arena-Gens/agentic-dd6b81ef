'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const scenes = [
  {
    id: 1,
    title: 'परिचय (Introduction)',
    text: 'यह हैं गोलू और मोलू। यह पक्के दोस्त हैं!',
    content: 'scene1'
  },
  {
    id: 2,
    title: 'खेल शुरू (Game Begins)',
    goluText: 'पकड़ो पकड़ो! मोलू, पकड़ के दिखाओ!',
    moluText: 'रुकोऽऽऽ! मैं आ रहा हूँ!',
    content: 'scene2'
  },
  {
    id: 3,
    title: 'खतरा! (Danger!)',
    moluText: 'Whoaaaa!',
    content: 'scene3'
  },
  {
    id: 4,
    title: 'मदद के लिए पुकार (Call for Help)',
    content: 'scene4'
  }
];

export default function GoluMoluStory() {
  const [currentScene, setCurrentScene] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showText, setShowText] = useState(true);

  const scene = scenes[currentScene];

  const nextScene = () => {
    if (currentScene < scenes.length - 1) {
      setCurrentScene(currentScene + 1);
    }
  };

  const prevScene = () => {
    if (currentScene > 0) {
      setCurrentScene(currentScene - 1);
    }
  };

  const resetStory = () => {
    setCurrentScene(0);
    setIsPlaying(false);
  };

  return (
    <div className="story-container">
      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .story-container {
          width: 100%;
          max-width: 900px;
          min-height: 600px;
          background: white;
          border-radius: 20px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          overflow: hidden;
          margin: 20px;
        }

        .header {
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          color: white;
          padding: 25px;
          text-align: center;
        }

        .header h1 {
          font-size: 2.2rem;
          margin-bottom: 5px;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
        }

        .header p {
          font-size: 1.1rem;
          opacity: 0.95;
        }

        .scene-content {
          position: relative;
          min-height: 450px;
          background: linear-gradient(to bottom, #ffeaa7 0%, #fdcb6e 100%);
          padding: 30px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .kitchen-floor {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 80px;
          background: repeating-linear-gradient(
            90deg,
            #e0e0e0,
            #e0e0e0 50px,
            #c8c8c8 50px,
            #c8c8c8 100px
          );
          border-top: 3px solid #999;
        }

        .potato {
          width: 80px;
          height: 70px;
          background: radial-gradient(circle at 30% 30%, #d4a574, #8b6f47);
          border-radius: 45% 55% 50% 50% / 55% 50% 50% 45%;
          position: relative;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        }

        .potato-eye {
          width: 12px;
          height: 18px;
          background: white;
          border-radius: 50%;
          position: absolute;
          top: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid #333;
        }

        .potato-eye:before {
          content: '';
          width: 8px;
          height: 8px;
          background: #333;
          border-radius: 50%;
        }

        .eye-left {
          left: 18px;
        }

        .eye-right {
          right: 18px;
        }

        .potato-mouth {
          position: absolute;
          bottom: 15px;
          left: 50%;
          transform: translateX(-50%);
          width: 30px;
          height: 15px;
          border: 2px solid #333;
          border-top: none;
          border-radius: 0 0 30px 30px;
        }

        .potato-spots {
          position: absolute;
          width: 8px;
          height: 6px;
          background: #6b5434;
          border-radius: 50%;
          opacity: 0.6;
        }

        .spot-1 { top: 10px; left: 25px; }
        .spot-2 { top: 35px; right: 15px; }
        .spot-3 { bottom: 25px; left: 15px; }

        .potatoes-container {
          display: flex;
          gap: 60px;
          margin: 40px 0;
          z-index: 10;
        }

        .basket {
          position: absolute;
          top: 30px;
          left: 30px;
          width: 100px;
          height: 80px;
          background: #8B4513;
          border-radius: 10px;
          border: 3px solid #654321;
          z-index: 5;
        }

        .basket:before {
          content: '';
          position: absolute;
          top: -5px;
          left: -5px;
          right: -5px;
          height: 10px;
          background: #654321;
          border-radius: 10px 10px 0 0;
        }

        .basket-handle {
          position: absolute;
          top: -25px;
          left: 20px;
          right: 20px;
          height: 30px;
          border: 3px solid #654321;
          border-bottom: none;
          border-radius: 30px 30px 0 0;
        }

        .bucket {
          width: 100px;
          height: 90px;
          background: linear-gradient(to bottom, #4a90e2, #357abd);
          border-radius: 10px 10px 15px 15px;
          position: relative;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
          margin-top: 20px;
        }

        .bucket:before {
          content: '';
          position: absolute;
          top: 10px;
          left: 10px;
          right: 10px;
          height: 5px;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 50%;
        }

        .water-splash {
          position: absolute;
          top: -20px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 3rem;
        }

        .speech-bubble {
          background: white;
          border-radius: 20px;
          padding: 15px 20px;
          margin: 10px;
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
          position: relative;
          max-width: 400px;
          font-size: 1.1rem;
          z-index: 20;
        }

        .speech-bubble:after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 30px;
          width: 0;
          height: 0;
          border-left: 10px solid transparent;
          border-right: 10px solid transparent;
          border-top: 10px solid white;
        }

        .text-box {
          background: rgba(255, 255, 255, 0.95);
          border-radius: 15px;
          padding: 20px;
          margin: 20px;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
          font-size: 1.3rem;
          font-weight: 600;
          color: #333;
          text-align: center;
          z-index: 20;
        }

        .controls {
          display: flex;
          justify-content: center;
          gap: 15px;
          padding: 25px;
          background: #f8f9fa;
          border-top: 2px solid #dee2e6;
        }

        .btn {
          padding: 12px 30px;
          font-size: 1rem;
          border: none;
          border-radius: 25px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
        }

        .btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        }

        .btn:active {
          transform: translateY(0);
        }

        .btn-primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .btn-secondary {
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          color: white;
        }

        .btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .scene-indicator {
          text-align: center;
          padding: 10px;
          background: #e9ecef;
          font-weight: 600;
          color: #495057;
        }

        @keyframes roll {
          0% { transform: translateX(0) rotate(0deg); }
          100% { transform: translateX(100px) rotate(360deg); }
        }

        .rolling {
          animation: roll 2s ease-in-out infinite;
        }

        @keyframes splash {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-10px) scale(1.1); }
        }

        .splashing {
          animation: splash 0.5s ease-in-out;
        }

        @keyframes wave {
          0%, 100% { transform: rotate(-10deg); }
          50% { transform: rotate(10deg); }
        }

        .waving {
          animation: wave 0.5s ease-in-out infinite;
        }

        @media (max-width: 768px) {
          .story-container {
            margin: 10px;
          }

          .header h1 {
            font-size: 1.5rem;
          }

          .header p {
            font-size: 0.9rem;
          }

          .potato {
            width: 60px;
            height: 55px;
          }

          .potatoes-container {
            gap: 40px;
          }

          .text-box {
            font-size: 1rem;
          }

          .speech-bubble {
            font-size: 0.9rem;
          }

          .controls {
            flex-wrap: wrap;
          }

          .btn {
            padding: 10px 20px;
            font-size: 0.9rem;
          }
        }
      `}</style>

      <div className="header">
        <h1>गोलू और मोलू की कहानी</h1>
        <p>Golu aur Molu ki Kahani</p>
      </div>

      <div className="scene-indicator">
        Scene {currentScene + 1} of {scenes.length}: {scene.title}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentScene}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="scene-content"
        >
          <div className="kitchen-floor"></div>

          {scene.content === 'scene1' && (
            <>
              <div className="basket">
                <div className="basket-handle"></div>
              </div>
              <div className="text-box">
                {scene.text}
              </div>
              <div className="potatoes-container">
                <motion.div
                  className="potato"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className="potato-eye eye-left"></div>
                  <div className="potato-eye eye-right"></div>
                  <div className="potato-mouth"></div>
                  <div className="potato-spots spot-1"></div>
                  <div className="potato-spots spot-2"></div>
                  <div className="potato-spots spot-3"></div>
                </motion.div>
                <motion.div
                  className="potato"
                  animate={{ rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                >
                  <div className="potato-eye eye-left"></div>
                  <div className="potato-eye eye-right"></div>
                  <div className="potato-mouth"></div>
                  <div className="potato-spots spot-1"></div>
                  <div className="potato-spots spot-2"></div>
                  <div className="potato-spots spot-3"></div>
                </motion.div>
              </div>
            </>
          )}

          {scene.content === 'scene2' && (
            <>
              <div className="speech-bubble" style={{ position: 'absolute', top: '50px', left: '50px' }}>
                {scene.goluText}
              </div>
              <motion.div
                className="potato"
                style={{ position: 'absolute', top: '150px', left: '100px' }}
                animate={{
                  x: [0, 200, 400],
                  rotate: [0, 360, 720]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <div className="potato-eye eye-left"></div>
                <div className="potato-eye eye-right"></div>
                <div className="potato-mouth"></div>
                <div className="potato-spots spot-1"></div>
                <div className="potato-spots spot-2"></div>
                <div className="potato-spots spot-3"></div>
              </motion.div>
              <div className="speech-bubble" style={{ position: 'absolute', top: '280px', right: '50px' }}>
                {scene.moluText}
              </div>
              <motion.div
                className="potato"
                style={{ position: 'absolute', top: '150px', right: '200px' }}
                animate={{
                  x: [0, 100, 200],
                  rotate: [0, 180, 360]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 0.5 }}
              >
                <div className="potato-eye eye-left"></div>
                <div className="potato-eye eye-right"></div>
                <div className="potato-mouth"></div>
                <div className="potato-spots spot-1"></div>
                <div className="potato-spots spot-2"></div>
                <div className="potato-spots spot-3"></div>
              </motion.div>
            </>
          )}

          {scene.content === 'scene3' && (
            <>
              <div className="speech-bubble" style={{ position: 'absolute', top: '80px', right: '100px' }}>
                {scene.moluText}
              </div>
              <motion.div
                style={{ position: 'absolute', bottom: '100px', right: '150px' }}
                initial={{ x: -200, y: -100 }}
                animate={{ x: 0, y: 0 }}
                transition={{ duration: 1.5 }}
              >
                <div className="bucket">
                  <motion.div
                    initial={{ scale: 0, y: -50 }}
                    animate={{ scale: 1, y: 0 }}
                    transition={{ delay: 1.5, duration: 0.3 }}
                  >
                    <div className="water-splash">💦</div>
                  </motion.div>
                </div>
              </motion.div>
              <motion.div
                className="potato"
                style={{ position: 'absolute', top: '150px', left: '100px' }}
                animate={{
                  x: [0, 400],
                  y: [0, 100],
                  rotate: [0, 360]
                }}
                transition={{ duration: 1.5 }}
              >
                <div className="potato-eye eye-left"></div>
                <div className="potato-eye eye-right"></div>
                <div className="potato-mouth"></div>
                <div className="potato-spots spot-1"></div>
                <div className="potato-spots spot-2"></div>
                <div className="potato-spots spot-3"></div>
              </motion.div>
            </>
          )}

          {scene.content === 'scene4' && (
            <>
              <div className="text-box" style={{ position: 'absolute', top: '50px' }}>
                मोलू पानी में हाथ-पैर मार रहा है...
              </div>
              <div style={{ position: 'absolute', bottom: '100px', left: '50%', transform: 'translateX(-50%)' }}>
                <div className="bucket">
                  <div className="water-splash">💧💧💧</div>
                  <motion.div
                    className="potato"
                    style={{
                      position: 'absolute',
                      top: '20px',
                      left: '10px',
                      width: '60px',
                      height: '55px'
                    }}
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                  >
                    <div className="potato-eye eye-left"></div>
                    <div className="potato-eye eye-right"></div>
                    <div className="potato-mouth"></div>
                    <div className="potato-spots spot-1"></div>
                    <div className="potato-spots spot-2"></div>
                  </motion.div>
                </div>
              </div>
              <motion.div
                className="potato"
                style={{ position: 'absolute', top: '150px', left: '100px' }}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <div className="potato-eye eye-left"></div>
                <div className="potato-eye eye-right"></div>
                <div className="potato-mouth"></div>
                <div className="potato-spots spot-1"></div>
                <div className="potato-spots spot-2"></div>
                <div className="potato-spots spot-3"></div>
              </motion.div>
              <div className="speech-bubble" style={{ position: 'absolute', top: '100px', left: '200px' }}>
                गोलू देख रहा है! 😱
              </div>
            </>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="controls">
        <button
          className="btn btn-secondary"
          onClick={prevScene}
          disabled={currentScene === 0}
        >
          ← पिछला (Previous)
        </button>
        <button
          className="btn btn-secondary"
          onClick={resetStory}
        >
          🔄 फिर से शुरू (Restart)
        </button>
        <button
          className="btn btn-primary"
          onClick={nextScene}
          disabled={currentScene === scenes.length - 1}
        >
          अगला (Next) →
        </button>
      </div>
    </div>
  );
}
