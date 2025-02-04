import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';

const BirthdayCountdown = () => {
  // Estado para controlar o slide atual
  const [currentSlide, setCurrentSlide] = useState(0);
  // Estado para a contagem regressiva
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Array de fotos placeholder (substitua pelos seus URLs de fotos)
  const photos = [
    { id: 1, alt: "Foto 1" },
    { id: 2, alt: "Foto 2" },
    { id: 3, alt: "Foto 3" },
    { id: 4, alt: "Foto 4" },
    { id: 5, alt: "Foto 5" }
  ];

  // Data do aniversário (exemplo: 25 de dezembro)
  const birthdayDate = new Date('2024-12-25');

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = birthdayDate - new Date();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    // Atualiza a cada segundo
    const timer = setInterval(calculateTimeLeft, 1000);

    // Limpa o intervalo
    return () => clearInterval(timer);
  }, []);

  // Função para navegar entre os slides
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  // Troca automática de slides a cada 5 segundos
  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 5000);
    return () => clearInterval(slideInterval);
  }, []);

  return (
    <div className="min-h-screen bg-pink-50 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        {/* Cabeçalho */}
        <div className="bg-pink-500 p-6 text-white text-center">
          <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
            Contagem para o Aniversário <Heart className="fill-current" />
          </h1>
        </div>

        {/* Carrossel de Fotos */}
        <div className="relative h-96">
          <img
            src={`/api/placeholder/800/400`}
            alt={photos[currentSlide].alt}
            className="w-full h-full object-cover"
          />
          
          {/* Botões de navegação */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white"
          >
            <ChevronLeft className="w-6 h-6 text-pink-500" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white"
          >
            <ChevronRight className="w-6 h-6 text-pink-500" />
          </button>

          {/* Indicadores de slide */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {photos.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full ${
                  currentSlide === index ? 'bg-pink-500' : 'bg-white/80'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Contagem Regressiva */}
        <div className="p-8">
          <div className="grid grid-cols-4 gap-4 text-center">
            <div className="bg-pink-100 p-4 rounded-lg">
              <div className="text-4xl font-bold text-pink-600">{timeLeft.days}</div>
              <div className="text-pink-500">Dias</div>
            </div>
            <div className="bg-pink-100 p-4 rounded-lg">
              <div className="text-4xl font-bold text-pink-600">{timeLeft.hours}</div>
              <div className="text-pink-500">Horas</div>
            </div>
            <div className="bg-pink-100 p-4 rounded-lg">
              <div className="text-4xl font-bold text-pink-600">{timeLeft.minutes}</div>
              <div className="text-pink-500">Minutos</div>
            </div>
            <div className="bg-pink-100 p-4 rounded-lg">
              <div className="text-4xl font-bold text-pink-600">{timeLeft.seconds}</div>
              <div className="text-pink-500">Segundos</div>
            </div>
          </div>
        </div>

        {/* Mensagem */}
        <div className="p-8 text-center">
          <p className="text-xl text-gray-700">
            Contando os momentos até o dia especial! ❤️
          </p>
        </div>
      </div>
    </div>
  );
};

export default BirthdayCountdown;
