import React, { useState, useEffect, useRef } from 'react';
import './Job.css';

function Job() {
  const images = [
    {
      src: "ala.png",
      text: "Johanna Calle"
    },
    {
      src: "alo.png",
      text: "Alvaro Barrios"
    },
    {
      src: "ali.png",
      text: "Doris Salcedo"
    },
    {
      src: "alu.png",
      text: "Wilson Diaz"
    }
  ];
  
  const absurdQuestions = [
    {
      question: "Si el Museo de Arte Moderno de Bogotá está en la capital y fue diseñado por Rogelio Salmona, ¿en qué ciudad queda?",
      answer: "bogota"
    },
    {
      question: "Si el arte denuncia y la historia duele, ¿qué conflicto ha marcado a muchos artistas colombianos contemporáneos?",
      answer: "armado"
    },
    {
      question: "Si Álvaro Barrios crea historietas y collages pop, ¿qué técnica usa para unir imágenes?",
      answer: "collage"
    },
    {
      question: "Si Johanna Calle usa el dibujo como reflexión social, ¿sobre qué material escribe y dibuja frecuentemente?",
      answer: "papel"
    },
    {
      question: "¿Por qué Doris Salcedo trabaja con muebles rotos y no con gritos?",
      answer: "dolor silencioso"
    },
    {
      question: "Si el dolor pudiera tocarse, ¿sería como una silla vacía?",
      answer: "ausencia"
    },
    {
      question: "¿Guardar silencio es su manera de hacer que el mundo escuche?",
      answer: "si"
    },
    {
      question: "¿Por qué Óscar Muñoz dibuja con agua si sabe que se va a secar?",
      answer: "fragilidad"
    },
    {
      question: "¿Las fotos borradas son recuerdos que se fueron o que nunca llegaron?",
      answer: "se fueron"
    },
    {
      question: "Si el polvo tiene memoria, ¿por qué lo barremos?",
      answer: "olvido"
    },
    {
      question: "¿Por qué ponerle una máscara indígena a Mickey Mouse?",
      answer: "apropiacion"
    },
    {
      question: "Si el arte es un espejo, ¿por qué nos muestra lo que no queremos ser?",
      answer: "contradiccion"
    },
    {
      question: "¿Las pantallas muestran la herida o la tapan?",
      answer: "muestran"
    },
    {
      question: "¿Por qué filmar cirugías como si fueran rituales?",
      answer: "violencia"
    },
    {
      question: "¿El barro que usa llora?",
      answer: "sí"
    },
    {
      question: "¿Por qué trabaja con tierra y no con palabras?",
      answer: "memoria muda"
    }
  ];
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [userDescription, setUserDescription] = useState('');
  const [keyboard, setKeyboard] = useState([]);
  const [showQuestion, setShowQuestion] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [idleTime, setIdleTime] = useState(0);
  const [letterRemovalInterval, setLetterRemovalInterval] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isCorrect, setIsCorrect] = useState(null);
  
  const lastActivityTime = useRef(Date.now());
  
  const allKeys = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
    'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
    'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    '.', ',', ':', ';', '!', '¡', '?', '¿', '"', "'", ' ', '-', '_'
  ];
  
  const recordActivity = () => {
    lastActivityTime.current = Date.now();
    setIdleTime(0);
  };
  
  const generateRandomQuestion = () => {
    const randomIndex = Math.floor(Math.random() * absurdQuestions.length);
    return absurdQuestions[randomIndex];
  };
  
  const showRandomQuestion = () => {
    const question = generateRandomQuestion();
    setCurrentQuestion(question);
    setUserAnswer('');
    setShowQuestion(true);
    
    const interval = setInterval(() => {
      setUserDescription(prev => {
        if (prev.length > 0) {
          return prev.slice(0, -1);
        }
        return prev;
      });
    }, 10000);
    
    setLetterRemovalInterval(interval);
  };
  
  const checkAnswer = () => {
    if (userAnswer.trim().toLowerCase() === currentQuestion.answer.toLowerCase()) {
      setShowQuestion(false);
      setCurrentQuestion(null);
      clearInterval(letterRemovalInterval);
      recordActivity();
    } else {
      alert("Respuesta incorrecta. Intenta de nuevo.");
    }
  };
  
  const randomizeKeyboard = () => {
    const shuffled = [...allKeys].sort(() => Math.random() - 0.5);
    setKeyboard(shuffled);
    recordActivity();
  };
  
  const addKey = (key) => {
    setUserDescription(prev => prev + key);
    randomizeKeyboard();
    recordActivity();
    calculateProgress(userDescription + key);
  };
  
  const deleteLastChar = () => {
    setUserDescription(prev => prev.slice(0, -1));
    recordActivity();
    calculateProgress(userDescription.slice(0, -1));
  };

  const calculateProgress = (text) => {
    const targetText = images[currentImageIndex].text;
    let matchingChars = 0;
    
    for (let i = 0; i < Math.min(text.length, targetText.length); i++) {
      if (text[i] === targetText[i]) {
        matchingChars++;
      }
    }
    
    const progressValue = (matchingChars / targetText.length) * 100;
    setProgress(progressValue);
  };

  const changeImage = () => {
    const randomIndex = Math.floor(Math.random() * images.length);
    setCurrentImageIndex(randomIndex);
    setUserDescription('');
    setProgress(0);
    setIsCorrect(null);
    randomizeKeyboard();
    recordActivity();
  };

  const theJobIsDone = () => {
    if (userDescription.trim() === '') {
      alert("Por favor, ingrese una transcripción antes de guardar.");
      return;
    }
    
    const isCorrectAnswer = userDescription === images[currentImageIndex].text;
    setIsCorrect(isCorrectAnswer);
    
    setTimeout(() => {
      changeImage();
    }, 1500);
    
    recordActivity();
  };

  useEffect(() => {
    const idleCheck = setInterval(() => {
      const currentTime = Date.now();
      const timeDiff = (currentTime - lastActivityTime.current) / 1000;
      setIdleTime(timeDiff);
      
      if (timeDiff > 5 && !showQuestion) {
        showRandomQuestion();
      }
    }, 1000);
    
    return () => {
      clearInterval(idleCheck);
      if (letterRemovalInterval) {
        clearInterval(letterRemovalInterval);
      }
    };
  }, [showQuestion]);
  
  useEffect(() => {
    changeImage();
    randomizeKeyboard();
    recordActivity();
  }, []);

  return (
    <div className="job-container">
      <header className="job-header">
        <h1>Transcribe</h1>
        <p className="job-subtitle">Sistema de transcripción de imágenes</p>
      </header>
      
      <div className="job-content">
        <div className="image-section">
          <div className="image-container">
            <img 
              src={images[currentImageIndex].src} 
              alt="Imagen para transcribir" 
              className="job-image"
            />
          </div>
          
          <div className="progress-container">
            <div 
              className="progress-bar"
              style={{ width: `${progress}%`, backgroundColor: progress === 100 ? '#2ecc71' : '#3498db' }}
            ></div>
            <span className="progress-text">{Math.round(progress)}%</span>
          </div>
        </div>
        
        <div className="text-section">
          <div className="text-container">
            <label htmlFor="imageDescription" className="input-label">
              Descripción de la imagen:
            </label>
            <textarea 
              id="imageDescription" 
              placeholder="Escribe el nombre del autor"
              value={userDescription}
              readOnly 
              className="job-textarea"
            />
            
            {isCorrect !== null && (
              <div className={`result-feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
                {isCorrect ? '✔️ Transcripción correcta' : '✖️ Transcripción incorrecta'}
              </div>
            )}
          </div>
          
          <div className="controls">
            <button 
              className="action-button secondary"
              onClick={changeImage}
              disabled={showQuestion}
            >
              Cambiar imagen
            </button>
            <button 
              className="action-button primary"
              onClick={theJobIsDone}
              disabled={showQuestion}
            >
              Verificar transcripción
            </button>
          </div>
        </div>
        
        <div className="keyboard-section">
          <div className="keyboard-container">
            {keyboard.map((key, index) => (
              <button 
                key={index} 
                className={`key-button ${key === ' ' ? 'space-key' : ''}`}
                onClick={() => addKey(key)}
                disabled={showQuestion}
              >
                {key === ' ' ? '␣' : key}
              </button>
            ))}
            <button 
              className="key-button delete-key"
              onClick={deleteLastChar}
              disabled={showQuestion}
            >
              ⌫
            </button>
          </div>
        </div>
      </div>
      
      {showQuestion && (
        <div className="question-modal">
          <div className="question-content">
            <h2>¡Concentrate de nuevo!</h2>
            <p className="question-text">{currentQuestion.question}</p>
            <input 
              type="text" 
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Escribe tu respuesta..."
              className="answer-input"
              onKeyPress={(e) => e.key === 'Enter' && checkAnswer()}
            />
            <div className="question-buttons">
              <button 
                onClick={checkAnswer}
                className="action-button primary"
              >
                Responder
              </button>
            </div>
            <p className="warning-text">
              ⚠️ La página no funciona correctamente por lo que se pueden perder algunas palabras ya escritas
            </p>
          </div>
        </div>
      )}
      
      <footer className="job-footer">
        <p>© {new Date().getFullYear()} Sistema de Análisis de Imágenes. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export default Job;
