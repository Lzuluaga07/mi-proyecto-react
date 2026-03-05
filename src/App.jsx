import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [seleccionadas, setSeleccionadas] = useState([]);
  const [presentacionElegida, setPresentacionElegida] = useState(null);
const [cantidades, setCantidades] = useState({});
  // Colores Pronalfrut: Verde (#10621A), Morado (#6a1b9a), Blanco (#FFFFFF), Negro (#212529)

  const frutas = [
    {
      id: 1, nombre: 'Naranja', emoji: '🍊',
      remedio: 'Infusión de cáscara para la digestión.',
      beneficios: 'Alta en Vitamina C y antioxidantes.',
      uso: 'Jugos, repostería y consumo directo.'
    },
    {
      id: 2, nombre: 'Níspero', emoji: '🍈',
      remedio: 'Té de hojas para desinflamar la garganta.',
      beneficios: 'Rico en potasio y fibra natural.',
      uso: 'Mermeladas, postres y almíbares.'
    },
    {
      id: 3, nombre: 'Guanábana', emoji: '🍏',
      remedio: 'Jugo natural para fortalecer las defensas.',
      beneficios: 'Propiedades hidratantes y antiinflamatorias.',
      uso: 'Batidos, helados y base para yogur.'
    }
  ];

  const presentaciones = [
    { id: 'p1', tamano: '100g', uso: 'Individual' },
    { id: 'p2', tamano: '130g', uso: 'Snack' },
    { id: 'p3', tamano: '250g', uso: 'Horeca' },
    { id: 'p4', tamano: '500g', uso: 'Catering' },
    { id: 'p5', tamano: '1000ml', uso: 'Industrial' },
    { id: 'p6', tamano: '2lt', uso: 'Familiar' }
  ];

  const toggleFruta = (id) => {
    if (seleccionadas.includes(id)) {
      setSeleccionadas(seleccionadas.filter(item => item !== id));
    } else {
      setSeleccionadas([...seleccionadas, id]);
    }
  };

  const seleccionarTodas = () => setSeleccionadas(frutas.map(f => f.id));
  const eliminarSeleccion = () => {
    setSeleccionadas([]);
    setPresentacionElegida(null);
  };

  const obtenerEstadoEmoji = () => {
    if (seleccionadas.length === 0) return '😢 No has seleccionado ninguna fruta...';
    if (seleccionadas.length === 1) return '😊 ¡Excelente elección de fruta!';
    return '🤩 ¡Wow! ¡Qué felicidad ver tantas frutas!';
  };
const modificarCantidad = (id, delta) => {
    setCantidades(prev => ({
      ...prev,
      [id]: Math.max(0, (prev[id] || 0) + delta)
    }));
  };

  return (
    <div className="d-flex flex-column align-items-center w-100" style={{ minHeight: '100vh', backgroundColor: '#FFFFFF', color: '#212529', fontFamily: '"Montserrat", sans-serif' }}>
      
      {/* HEADER: Verde Pronalfrut */}
      <header className="w-100 p-4 text-center text-white shadow" style={{ backgroundColor: '#10621A', borderBottom: '5px solid #6a1b9a' }}>
        <h1 style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>alimentos pronalfrut</h1>
        <p className="mb-0">Mockup - Responsive Design</p>
      </header>

      <main className="container text-center py-5" style={{ maxWidth: '1200px' }}>
        
        {/* ESTADO DINÁMICO */}
        <div className="alert shadow-sm mb-4" style={{ 
          fontSize: '1.3rem', 
          color: '#212529', 
          backgroundColor: seleccionadas.length > 0 ? '#f1f8e9' : '#fff3e0',
          border: '1px solid #10621A'
        }}>
          {obtenerEstadoEmoji()}
          {presentacionElegida && (
            <div className="mt-2 fw-bold" style={{ color: '#6a1b9a' }}>
              📍 Presentación: {presentaciones.find(p => p.id === presentacionElegida).tamano} seleccionada
            </div>
          )}
        </div>

        {/* BOTONES DE ACCIÓN */}
        <div className="mb-5">
          <button className="btn me-3 shadow-sm text-white" style={{ backgroundColor: '#10621A' }} onClick={seleccionarTodas}>
            Seleccionar Todas ✅
          </button>
          <button className="btn btn-outline-dark shadow-sm" onClick={eliminarSeleccion}>
            Limpiar Todo 🗑️
          </button>
        </div>

        <h2 className="mb-4 fw-bold" style={{ color: '#10621A' }}>Nuestras Frutas y Beneficios</h2>

        {/* CARDS DE FRUTAS: Responsive (1 col en móvil, 3 en PC) */}
        <div className="row g-4 justify-content-center">
          {frutas.map((fruta) => (
            <div key={fruta.id} className="col-12 col-md-4">
              <div 
                className="card h-100 shadow-sm"
                style={{
                  cursor: 'pointer',
                  transition: '0.3s',
                  backgroundColor: seleccionadas.includes(fruta.id) ? '#f1f8e9' : 'white',
                  border: seleccionadas.includes(fruta.id) ? '3px solid #6a1b9a' : '1px solid #eee',
                  borderRadius: '15px'
                }}
                onClick={() => toggleFruta(fruta.id)}
              >
                <div className="card-body">
                  <div className="mb-2" style={{ fontSize: '3.5rem' }}>{fruta.emoji}</div>
                  <h3 className="card-title h4 fw-bold" style={{ color: '#10621A' }}>{fruta.nombre}</h3>
                  <div className="text-start mt-3" style={{ color: '#212529' }}>
                    <p className="mb-1 small"><strong>Remedio:</strong> {fruta.remedio}</p>
                    <p className="mb-1 small"><strong>Beneficios:</strong> {fruta.beneficios}</p>
                    <p className="small"><strong>Uso:</strong> {fruta.uso}</p>
               {/* Selector de Unidades/Kilos */}
                    <div className="d-flex align-items-center justify-content-between mt-3 p-2 rounded border bg-light">
                      <span className="small fw-bold text-dark">Pedir (lb/kg):</span>
                      <div className="d-flex align-items-center">
                        <button 
                          className="btn btn-sm btn-outline-danger fw-bold shadow-sm"
                          onClick={(e) => { e.stopPropagation(); modificarCantidad(fruta.id, -1); }}
                          style={{ width: '30px' }}
                        > - </button>
                        
                        <span className="mx-3 fw-bold" style={{ minWidth: '20px', textAlign: 'center' }}>
                          {cantidades[fruta.id] || 0}
                        </span>
                        
                        <button 
                          className="btn btn-sm btn-outline-success fw-bold shadow-sm"
                          onClick={(e) => { e.stopPropagation(); modificarCantidad(fruta.id, 1); }}
                          style={{ width: '30px' }}
                        > + </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* PRESENTACIONES: Responsive Grid */}
        <div className="mt-5 pt-4">
          <h2 className="mb-4 fw-bold" style={{ color: '#10621A' }}>Presentaciones Disponibles</h2>
          <div className="row justify-content-center g-3">
            {presentaciones.map((pres) => (
              <div key={pres.id} className="col-6 col-md-2">
                <div 
                  className="p-3 border rounded shadow-sm" 
                  style={{ 
                    cursor: 'pointer',
                    transition: '0.2s',
                    backgroundColor: presentacionElegida === pres.id ? '#6a1b9a' : '#FFFFFF',
                    color: presentacionElegida === pres.id ? 'white' : '#212529',
                    border: presentacionElegida === pres.id ? '2px solid #6a1b9a' : '1px solid #10621A'
                  }}
                  onClick={() => setPresentacionElegida(pres.id)}
                >
                  <div className="fw-bold" style={{ fontSize: '1.1rem' }}>{pres.tamano}</div>
                  <div className="small opacity-75">{pres.uso}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECCIÓN DE DESCARGA: Morado Pronalfrut */}
        <div className="mt-5 p-5 border rounded shadow-sm bg-white" style={{ borderColor: '#10621A' }}>
          <p className="fw-bold fs-5" style={{ color: '#10621A' }}>¿Deseas ver el reporte detallado?</p>
          <a 
            href={`/Proyecto-react/sprint_2.docx?v=${new Date().getTime()}`} 
            download="sprint_2.docx" 
            style={{ textDecoration: 'none' }}
          >
            <button 
              className="btn btn-lg text-white shadow" 
              style={{ backgroundColor: '#6a1b9a', borderRadius: '50px', padding: '15px 50px', fontWeight: 'bold' }}
            >
              Descargar Sprint 2 📄🚀
            </button>
          </a>
        </div>

      </main>

      {/* FOOTER: Verde Pronalfrut */}
      <footer className="w-100 p-3 text-center text-white mt-auto" style={{ backgroundColor: '#10621A' }}>
        <p className="mb-0">© 2026 alimentos pronalfrut - Calidad Natural</p>
      </footer>
    </div>
  );
}

export default App;

