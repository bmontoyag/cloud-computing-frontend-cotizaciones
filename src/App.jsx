
import { useEffect, useState } from 'react'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'https://<api-id>.execute-api.us-east-1.amazonaws.com/api/cotizaciones/proyectos'

export default function App(){
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    axios.get(API_URL)
      .then(r => setItems(r.data))
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div style={{maxWidth:900, margin:'2rem auto', fontFamily:'system-ui'}}>
      <h1>Proyectos y Cotizaciones</h1>
      <p>Fuente: API Gateway (Lambda → RDS)</p>
      {loading && <p>Cargando...</p>}
      {error && <p style={{color:'crimson'}}>Error: {error}</p>}
      <ul>
        {items.map((p) => (
          <li key={p.id_proyecto}>
            <b>{p.nombre_proyecto}</b> — Cliente: {p.cliente || '-'} — Total: {p.total_proyecto || 0}
          </li>
        ))}
      </ul>
    </div>
  )
}
