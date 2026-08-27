import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-[#f4f2ee] flex flex-col antialiased text-slate-900">
      <Header />
      <main className="mx-auto w-full max-w-6xl flex-1 px-3 sm:px-6 py-4 sm:py-6">
        {children}
      </main>
      <Footer />
    </div>
  );
}

