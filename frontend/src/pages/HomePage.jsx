import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getCanciones } from "../services/api"
import { TEXTS } from "../config/texts"
import { ROUTES } from "../config/config"
import "./HomePage.css"

const T = TEXTS.HOME

export default function HomePage() {
  const nav = useNavigate()
  const [stats, setStats] = useState({ total: 0, moods: [], ultima: null })

  // Cargar estadísticas al montar
  useEffect(() => {
    getCanciones().then(data => {
      const lista = Array.isArray(data) ? data : []

      // Contar moods
      const moodCount = {}
      lista.forEach(c => {
        if (c.estadoDeAnimo) {
          moodCount[c.estadoDeAnimo] = (moodCount[c.estadoDeAnimo] || 0) + 1
        }
      })

      // Top 5 moods
      const moods = Object.entries(moodCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([nombre, count]) => ({ nombre, count }))

      setStats({
        total: lista.length,
        moods,
        ultima: lista.length > 0 ? lista[0] : null
      })
    }).catch(() => {})
  }, [])

  return (
    <div className="home">
      <div className="home-hero">
        <div className="home-icon">🎵</div>
        <h1 className="home-title">{T.WELCOME}</h1>
        <p className="home-subtitle">{T.SUBTITLE}</p>
        <button className="btn btn-primary home-cta" onClick={() => nav(ROUTES.CANCIONES)}>
          {T.CTA}
        </button>
      </div>

      <div className="home-stats">
        <div className="stat-card">
          <div className="stat-number">{stats.total}</div>
          <div className="stat-label">{stats.total === 1 ? "canción guardada" : "canciones guardadas"}</div>
        </div>

        {stats.ultima && (
          <div className="stat-card ultima-card">
            <div className="stat-label">Última canción añadida</div>
            <div className="ultima-titulo">{stats.ultima.titulo}</div>
            <div className="ultima-artista">{stats.ultima.artista}</div>
            {stats.ultima.estadoDeAnimo && (
              <span className="badge">{stats.ultima.estadoDeAnimo}</span>
            )}
          </div>
        )}

        {stats.moods.length > 0 && (
          <div className="stat-card">
            <div className="stat-label">Tus moods</div>
            <div className="moods-list">
              {stats.moods.map(m => (
                <span key={m.nombre} className="mood-chip">
                  {m.nombre} <span className="mood-count">{m.count}</span>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="home-features">
        <div className="feature-card">
          <div className="feature-icon">🎶</div>
          <h3>{T.FEATURE_1_TITLE}</h3>
          <p>{T.FEATURE_1_DESC}</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">😊</div>
          <h3>{T.FEATURE_2_TITLE}</h3>
          <p>{T.FEATURE_2_DESC}</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🔍</div>
          <h3>{T.FEATURE_3_TITLE}</h3>
          <p>{T.FEATURE_3_DESC}</p>
        </div>
      </div>
    </div>
  )
}
