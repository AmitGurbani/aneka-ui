import { Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MaterialPage from "./pages/MaterialPage";
import HIGPage from "./pages/HIGPage";
import OneUIPage from "./pages/OneUIPage";
import ComparisonPage from "./pages/ComparisonPage";

function App() {
  return (
    <div className="bg-background min-h-screen">
      <nav className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold">
              Aneka UI
            </Link>
            <div className="flex gap-6">
              <Link
                to="/material"
                className="hover:text-primary transition-colors"
              >
                Material Design
              </Link>
              <Link to="/hig" className="hover:text-primary transition-colors">
                Apple HIG
              </Link>
              <Link
                to="/oneui"
                className="hover:text-primary transition-colors"
              >
                Samsung One UI
              </Link>
              <Link
                to="/comparison"
                className="hover:text-primary transition-colors"
              >
                Comparison
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/material" element={<MaterialPage />} />
          <Route path="/hig" element={<HIGPage />} />
          <Route path="/oneui" element={<OneUIPage />} />
          <Route path="/comparison" element={<ComparisonPage />} />
        </Routes>
      </main>

      <footer className="mt-20 border-t">
        <div className="text-muted-foreground container mx-auto px-4 py-8 text-center text-sm">
          <p>Aneka UI - Design system patterns with YOUR brand colors</p>
          <p className="mt-2">Built with React, TypeScript, and Tailwind CSS</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
