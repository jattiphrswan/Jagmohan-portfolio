import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-slate-100">
      <Header />
      <main className="mx-auto w-full max-w-[1600px] px-6 py-5">
        {children}
      </main>
      <Footer />
    </div>
  );
}

