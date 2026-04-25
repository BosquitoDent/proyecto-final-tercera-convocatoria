import { TEXTS } from "../config/texts"
import "./AboutPage.css"

const T = TEXTS.ABOUT

export default function AboutPage() {
  return (
    <div className="about">
      <h1 className="about-title">{T.TITLE}</h1>
      <p className="about-intro">{T.INTRO}</p>

      <div className="about-section">
        <h2>{T.HOW_TITLE}</h2>
        <ol className="about-steps">
          {T.HOW_STEPS.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
      </div>

      <div className="about-section">
        <h2>{T.TECH_TITLE}</h2>
        <div className="tech-grid">
          <div className="tech-item">
            <span className="tech-icon">⚛️</span>
            <span>{T.TECH_FRONTEND}</span>
          </div>
          <div className="tech-item">
            <span className="tech-icon">🚀</span>
            <span>{T.TECH_BACKEND}</span>
          </div>
          <div className="tech-item">
            <span className="tech-icon">🗄️</span>
            <span>{T.TECH_DB}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
