// Arquivo: src/app/page.tsx

import UnimedMagazine from "@/app/components/magazine/UnimedMagazine";

export default function HomePage() {
  return (
    // As classes de layout e espaçamento agora ficam aqui, na página principal.
    <main className="w-full h-full flex items-center justify-center bg-gray-200 p-4 sm:p-6 md:p-8">
      <UnimedMagazine />
    </main>
  );
}