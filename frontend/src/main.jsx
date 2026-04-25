import React, { lazy, Suspense } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider, useAuthContext } from "./context/AuthContext"
import { ROUTES } from "./config/config"
import "./index.css"

// Lazy loading de páginas
const LoginPage = lazy(() => import("./pages/LoginPage"))
const AppLayout = lazy(() => import("./pages/AppLayout"))
const HomePage = lazy(() => import("./pages/HomePage"))
const CancionesPage = lazy(() => import("./pages/CancionesPage"))
const AboutPage = lazy(() => import("./pages/AboutPage"))

// Ruta protegida: redirige al login si no hay sesión
function Guard({ children }) {
  const { sesion } = useAuthContext()
  return sesion ? children : <Navigate to={ROUTES.LOGIN} replace />
}

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <Suspense fallback={<div className="help">Cargando...</div>}>
        <Routes>
          <Route path="/" element={<Navigate to={ROUTES.LOGIN} replace />} />
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          {/* Rutas protegidas */}
          <Route
            path={ROUTES.HOME}
            element={
              <Guard>
                <AppLayout />
              </Guard>
            }
          >
            <Route index element={<HomePage />} />
            <Route path="canciones" element={<CancionesPage />} />
            <Route path="about" element={<AboutPage />} />
          </Route>
          <Route path="*" element={<Navigate to={ROUTES.LOGIN} replace />} />
        </Routes>
      </Suspense>
    </AuthProvider>
  </BrowserRouter>
)
