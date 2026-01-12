import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Home } from "@/pages/Home";
import { ProjectDetail } from "@/pages/ProjectDetail";
import { Admin } from "@/pages/Admin";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b shadow-sm">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link to="/" className="text-xl font-bold text-gray-900">我的作品集</Link>
                <Link to="/admin" className="text-sm font-medium text-gray-600 hover:text-blue-600">管理后台</Link>
            </div>
        </header>
        <main>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/project/:slug" element={<ProjectDetail />} />
                <Route path="/admin" element={<Admin />} />
            </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
