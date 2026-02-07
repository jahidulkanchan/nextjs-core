import connectDB from "./lib/db";
import HeroSection from "./components/HeroSection";

export default async function Home() {
  await connectDB();
  return (
    <main className="min-h-screen bg-stone-50 text-stone-900">
      {/* Hero Section */}
      <HeroSection/>
    </main>
  );
}
