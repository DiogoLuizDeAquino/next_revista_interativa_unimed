"use client";

import React, { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";

// Dados da revista (ajuste conforme necessário)
const magazineData = [
  {
    type: 'cover',
    photo: '/dr-sergio_image.jpeg',
    management: 'Gestão 2023 - 2027',
    name: 'Presidente Sérgio Malburg Filho',
  },
  {
    type: 'page',
    title: 'Homenagem ao Diretor 1',
    biography: 'Texto completo da biografia do Diretor 1...',
  },
  {
    type: 'page',
    title: 'Homenagem ao Diretor 2',
    biography: 'Texto completo da biografia do Diretor 2...',
  },
];

export default function UnimedMagazine() {
  const [emblaRef, emblaApi] = useEmblaCarousel();

  const handleNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-200 p-4">
      <div className="overflow-hidden w-full h-full max-w-none" ref={emblaRef}>
        <div className="flex">
          {magazineData.map((page, index) => (
            <div key={index} className="relative flex-[0_0_100%] aspect-[3/4] overflow-hidden">
              
              {/* Renderiza a Capa com o novo Design */}
              {page.type === 'cover' && (
                <div className="w-full h-full bg-[#00995D] flex flex-col items-center justify-center relative p-8">
                  
                  {/* Elemento branco diagonal no fundo */}
                  <div className="absolute bottom-0 right-0 w-[150%] h-1/3 bg-white origin-bottom-right -skew-y-[35deg] z-0" />
                  
                  {/* AJUSTE: Imagem com borda, cantos arredondados e sombra */}
                  <div className="relative z-10 w-4/5">
                    <Image
                      src={page.photo!}
                      alt={page.name!}
                      width={400}
                      height={500}
                      className="w-full h-auto object-contain rounded-xl border-2 border-white shadow-2xl"
                    />
                  </div>
                  
                  <p className="mt-2 text-white font-bold text-xs z-10">teste imagem</p>

                  {/* AJUSTE: Bloco de texto e botão no canto inferior direito */}
                  <div className="absolute bottom-6 right-6 w-auto max-w-[280px] h-auto flex flex-row bg-white rounded-lg shadow-2xl overflow-hidden z-20">
                    <div className="p-3 flex flex-col justify-center flex-1">
                      <h2 className="font-bold text-sm text-black whitespace-nowrap">{page.management}</h2>
                      <p className="text-xs text-gray-600 whitespace-nowrap">{page.name}</p>
                    </div>
                    <button onClick={handleNext} className="bg-[#00995D] hover:bg-[#007a4a] transition-colors flex items-center justify-center px-4">
                      <p className="text-white font-bold text-xs">Próximo</p>
                    </button>
                  </div>
                </div>
              )}

              {/* Renderiza as Páginas de Conteúdo (design diferente) */}
              {page.type === 'page' && (
                <div className="w-full h-full bg-white flex flex-col items-center justify-center p-8 shadow-lg">
                  <h1 className="text-xl md:text-2xl font-bold ...">Título</h1>
                  <p className="text-gray-600 text-center">{page.biography}</p>
                  <Button onClick={handleNext} className="mt-8 bg-[#00995D] hover:bg-[#007a4a]">
                    Próximo
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}