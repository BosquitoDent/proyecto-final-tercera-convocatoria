import PropTypes from "prop-types"
import { TEXTS } from "../../config/texts"

const T = TEXTS.CANCIONES

export default function TablaCanciones({ lista, editId, editTitulo, editArtista, editMood, enviando, onEditTitulo, onEditArtista, onEditMood, onEditar, onGuardar, onCancelar, onBorrar }) {
  return (
    <div className="table">
      {lista.map(c => (
        <div key={c._id} className="tr">
          {editId === c._id ? (
            <>
              <input className="input" value={editTitulo} onChange={e => onEditTitulo(e.target.value)} />
              <input className="input" value={editArtista} onChange={e => onEditArtista(e.target.value)} />
              <input className="input" value={editMood} onChange={e => onEditMood(e.target.value)} />
              <div className="actions">
                <button className="btn btn-ok" disabled={enviando} onClick={() => onGuardar(c._id)}>{T.BTN_SAVE}</button>
                <button type="button" className="btn" onClick={onCancelar}>{T.BTN_CANCEL}</button>
              </div>
            </>
          ) : (
            <>
              <div>{c.titulo}</div>
              <div>{c.artista}</div>
              <div><span className="badge">{c.estadoDeAnimo || T.NO_MOOD}</span></div>
              <div className="actions">
                <button className="btn" disabled={enviando} onClick={() => onEditar(c)}>{T.BTN_EDIT}</button>
                <button className="btn btn-danger" disabled={enviando} onClick={() => onBorrar(c._id)}>{T.BTN_DELETE}</button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  )
}

TablaCanciones.propTypes = {
  lista: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    titulo: PropTypes.string.isRequired,
    artista: PropTypes.string.isRequired,
    estadoDeAnimo: PropTypes.string,
  })).isRequired,
  editId: PropTypes.string,
  editTitulo: PropTypes.string.isRequired,
  editArtista: PropTypes.string.isRequired,
  editMood: PropTypes.string.isRequired,
  enviando: PropTypes.bool.isRequired,
  onEditTitulo: PropTypes.func.isRequired,
  onEditArtista: PropTypes.func.isRequired,
  onEditMood: PropTypes.func.isRequired,
  onEditar: PropTypes.func.isRequired,
  onGuardar: PropTypes.func.isRequired,
  onCancelar: PropTypes.func.isRequired,
  onBorrar: PropTypes.func.isRequired,
}
