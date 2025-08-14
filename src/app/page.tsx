// Arquivo: src/app/page.tsx
import UnimedMagazine from "@/app/components/magazine/UnimedMagazine";

export default function HomePage() {
  return (
    <main className="w-full h-full flex items-start justify-center pt-[60px]">
      <UnimedMagazine />
    </main>
  );
}