import React, { useState, useEffect, useRef } from 'react';
import './Job.css';

function Job() {
  const images = [
    {
      src: "1.jpeg",
      text: "El amor ya no se lleva. Es demasiado lento demasiado arriesgado, excesivamente costoso y ordenado."
    },
    {
        src: "2.jpeg",
        text: "La vida es un misterio que hay que vivir, no un problema que hay que resolver."
    },
    {
        src: "3.jpeg",
        text: "El amor es la única fuerza capaz de transformar a un enemigo en un amigo."
    },
    {
        src: "4.jpeg",
        text: "Si no puedes volar, corre. Si no puedes correr, camina. Si no puedes caminar, gatea. Pero hagas lo que hagas, sigue moviéndote hacia adelante."
    },
    {
        src: "5.jpeg",
        text: "La vida es lo que te pasa mientras estás ocupado haciendo otros planes."
    },
    {
        src: "6.jpeg",
        text: "La vida es un 10% lo que me pasa y un 90% cómo reacciono a ello."
    },
    {
        src: "7.jpeg",
        text: "si la vida te da limones, haz limonada."
    },
    {
        src: "8.jpeg",
        text: "yo no soy un producto de mis circunstancias. Soy un producto de mis decisiones."
    },
    {
        src: "9.jpeg",
        text: "juzga a un hombre por sus preguntas en lugar de por sus respuestas."
    },
    {
        src: "10.jpeg",
        text: "recuerda que no conseguir lo que quieres es a veces un maravilloso golpe de suerte."
    }
  ];
  
  // Preguntas absurdas con sus respuestas
  const absurdQuestions = [
    {
      question: "Si la luna está a 384.400 km de la Tierra y el sol es amarillo, ¿de qué color es la manzana no verde?",
      answer: "roja"
    },
    {
      question: "Si los gatos tienen 4 patas y las hormigas tienen 6, ¿cuántas ruedas tiene una bicicleta?",
      answer: "2"
    },
    {
      question: "Si el cielo es azul y el césped es verde, ¿cuál es el resultado de 2+2?",
      answer: "4"
    },
    {
      question: "Si un tren viaja a 100 km/h y los peces nadan en el mar, ¿qué día es hoy?",
      answer: "sábado"
    },
    {
      question: "Si los árboles tienen hojas y los libros tienen páginas, ¿cuál es la capital de Francia?",
      answer: "parís"
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
  
  const lastActivityTime = useRef(Date.now());
  
  const allKeys = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
    'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
    'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    '.', ',', ':', ';', '!', '¡', '?', '¿', '"', "'", ' ', '-', '_'
  ];
  
  // Función para registrar actividad del usuario
  const recordActivity = () => {
    lastActivityTime.current = Date.now();
    setIdleTime(0);
  };
  
  // Función para generar una pregunta aleatoria
  const generateRandomQuestion = () => {
    const randomIndex = Math.floor(Math.random() * absurdQuestions.length);
    return absurdQuestions[randomIndex];
  };
  
  // Función para mostrar una pregunta aleatoria
  const showRandomQuestion = () => {
    const question = generateRandomQuestion();
    setCurrentQuestion(question);
    setUserAnswer('');
    setShowQuestion(true);
    
    // Iniciar temporizador para eliminar letras si no responde
    const interval = setInterval(() => {
      setUserDescription(prev => {
        if (prev.length > 0) {
          return prev.slice(0, -1);
        }
        return prev;
      });
    }, 5000);
    
    setLetterRemovalInterval(interval);
  };
  
  // Verificar la respuesta del usuario
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
  };
  
  const deleteLastChar = () => {
    setUserDescription(prev => prev.slice(0, -1));
    recordActivity();
  };

  const changeImage = () => {
    const randomIndex = Math.floor(Math.random() * images.length);
    setCurrentImageIndex(randomIndex);
    setUserDescription('');
    randomizeKeyboard();
    recordActivity();
    console.log("Imagen cargada: " + images[randomIndex].src);
  };

  const theJobIsDone = () => {
    if (userDescription.trim() === '') {
      alert("Por favor, ingrese una transcripcion antes de guardar.");
      return;
    }
    if (userDescription === images[currentImageIndex].text) {
      alert("✔️");
    } else {
      alert("✖️");
    }
    changeImage();
    recordActivity();
  };

  // Comprobar inactividad cada segundo
  useEffect(() => {
    const idleCheck = setInterval(() => {
      const currentTime = Date.now();
      const timeDiff = (currentTime - lastActivityTime.current) / 1000;
      setIdleTime(timeDiff);
      
      // Si han pasado 5 segundos de inactividad y no hay pregunta activa
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
    console.log("Página cargada - intentando mostrar imagen");
  }, []);

  return (
    <div className="container">
      <header>
        <h1>Transcribe</h1>
      </header>
      
      <div className="image-container">
        <img 
          id="randomImage" 
          src={images[currentImageIndex].src} 
          alt="Imagen aleatoria" 
        />
      </div>
      
      <div className="text-container">
        <h3>Descripción de la imagen:</h3>
        <textarea 
          id="imageDescription" 
          placeholder="Usa el teclado virtual para escribir..."
          value={userDescription}
          readOnly 
        />
      </div>
      
      {/* Modal de pregunta */}
      {showQuestion && (
        <div className="question-modal">
          <div className="question-content">
            <h2>¡Responde rápido!</h2>
            <p>{currentQuestion.question}</p>
            <input 
              type="text" 
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Escribe tu respuesta..."
            />
            <button onClick={checkAnswer}>Responder</button>
            <p className="warning">⚠️ Si no respondes correctamente, perderás letras de tu transcripción.</p>
          </div>
        </div>
      )}
      
      <div className="virtual-keyboard">
        <div className="keyboard-container">
          {keyboard.map((key, index) => (
            <button 
              key={index} 
              className="key-button"
              onClick={() => addKey(key)}
              disabled={showQuestion}
            >
              {key === ' ' ? 'Espacio' : key}
            </button>
          ))}
          <button 
            className="key-button delete-key"
            onClick={deleteLastChar}
            disabled={showQuestion}
          >
            Borrar
          </button>
        </div>
      </div>
      
      <div className="controls">
        <button 
          className="action-button" 
          onClick={changeImage}
          disabled={showQuestion}
        >
          Cambiar texto
        </button>
        <button 
          className="action-button" 
          onClick={theJobIsDone}
          disabled={showQuestion}
        >
          Guardar transcripcion
        </button>
      </div>
      
      <footer>
        <p>© 2025 Sistema de Análisis de Imágenes. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export default Job;