"use client";

import React, { useState, useRef, useCallback, useMemo } from 'react';
import OriginalHTMLFlipBook from 'react-pageflip';
import { Button } from "@/components/ui/button";

const HTMLFlipBook = OriginalHTMLFlipBook as any;

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
  const flipBookRef = useRef<any>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [currentPage, setCurrentPage] = useState(0);

  const containerRef = useCallback((node: HTMLElement | null) => {
    if (node !== null) {
      const width = node.getBoundingClientRect().width;
      const height = width / (3 / 4);
      setSize({ width, height });
    }
  }, []);

  const onFlip = useCallback((e: any) => {
    setCurrentPage(e.data);
  }, []);

  const turnNextPage = () => {
    flipBookRef.current?.pageFlip()?.flipNext();
  };

  const turnPrevPage = () => {
    flipBookRef.current?.pageFlip()?.flipPrev();
  };

  // useMemo para criar a lista de páginas apenas uma vez.
  const pages = useMemo(() => {
    return [
      // Página de Capa
      <div key="cover" className="w-full h-full bg-[#00995D] flex flex-col items-center justify-center relative p-8 overflow-hidden">
        <div className="absolute bottom-0 right-0 w-[150%] h-1/3 bg-white origin-bottom-right -skew-y-[35deg] z-0" />
        <div className="relative z-10 w-4/5">
          <img
            src={magazineData[0].photo!}
            alt={magazineData[0].name!}
            className="w-full h-auto object-contain rounded-xl border-4 border-white shadow-2xl"
          />
        </div>
        <div className="absolute bottom-6 right-6 w-auto max-w-[280px] h-auto flex flex-row bg-white rounded-lg shadow-2xl overflow-hidden z-20">
          <div className="p-3 flex flex-col justify-center flex-1">
            <h2 className="font-bold text-sm text-black whitespace-nowrap">{magazineData[0].management}</h2>
            <p className="text-xs text-gray-600 whitespace-nowrap">{magazineData[0].name}</p>
          </div>
        </div>
      </div>,
      
      // Mapeia o resto das páginas
      ...magazineData.slice(1).map((page, index) => (
        <div key={index} className="w-full h-full bg-white flex flex-col items-center justify-center p-8 shadow-inner">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">{page.title}</h1>
          <p className="text-gray-600 text-center">{page.biography}</p>
        </div>
      )),

      // Contra-capa
      <div key="back-cover" className="w-full h-full bg-gray-200 flex items-center justify-center">
        <p className="text-gray-500">Fim</p>
      </div>
    ];
  }, []); // O array vazio [] garante que isso só rode uma vez

  return (
    <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl">
      <div ref={containerRef} className="w-full">
        {size.width > 0 && (
          <>
            <HTMLFlipBook
              width={size.width}
              height={size.height}
              ref={flipBookRef}
              onFlip={onFlip}
              className="shadow-2xl mx-auto"
              showCover={true}
            >
              {pages}
            </HTMLFlipBook>
            
            <div className="flex items-center justify-center gap-4 mt-8">
              <Button onClick={turnPrevPage} variant="outline" disabled={currentPage === 0}>Anterior</Button>
              <span className="text-gray-600 font-medium">Página {currentPage + 1} de {pages.length}</span>
              <Button onClick={turnNextPage} variant="outline" disabled={currentPage >= pages.length - 1}>Próximo</Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}