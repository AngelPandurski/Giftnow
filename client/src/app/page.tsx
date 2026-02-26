/** Начална страница (/) – показва HomePage с Navbar */
import Navbar from "@/components/Navbar";
import HomePage from "@/components/HomePage";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Background image - fixed behind all content */}
      <div className="fixed inset-0" style={{ zIndex: -20 }}>
        <Image
          src="/login-bg.png"
          alt=""
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
      </div>
      <div className="fixed inset-0 bg-white/50" style={{ zIndex: -10 }} aria-hidden />
      <Navbar />
      <main
        className="min-h-screen flex w-full flex-col relative z-10"
        style={{ paddingTop: "96px" }}
      >
        <HomePage />
      </main>
    </div>
  );
}
