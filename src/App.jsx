import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [seleccionadas, setSeleccionadas] = useState([]);
  const [presentacionElegida, setPresentacionElegida] = useState(null);

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

  return (
    <div className="d-flex flex-column align-items-center w-100" style={{ minHeight: '100vh' }}>
  <header className="w-100 p-4 text-center text-white shadow" style={{ backgroundColor: '#10621A' }}>
        <h1 style={{ fontWeight: 'bold' }}>alimentos pronalfrut</h1>
        <p className="mb-0">Propuesta de Rediseño - Mockup Funcional</p>
      </header>

      <main className="container text-center py-5" style={{ maxWidth: '1200px' }}>
        
        <div className="alert shadow-sm mb-4" style={{ 
          fontSize: '1.5rem', 
          color: '#10621A', 
          backgroundColor: seleccionadas.length > 0 ? '#e8f5e9' : '#ffebee',
          border: seleccionadas.length > 0 ? '1px solid #c8e6c9' : '1px solid #ffcdd2'
        }}>
          {obtenerEstadoEmoji()}
          {presentacionElegida && <div style={{ fontSize: '1rem', marginTop: '5px' }}>📍 Presentación: {presentaciones.find(p => p.id === presentacionElegida).tamano} seleccionada</div>}
        </div>

        <div className="mb-5">
          <button className="btn btn-success me-3 shadow-sm" onClick={seleccionarTodas}>
            Seleccionar Todas las Frutas ✅
          </button>
          <button className="btn btn-danger shadow-sm" onClick={eliminarSeleccion}>
            Limpiar Todo 🗑️
          </button>
        </div>

        <h2 className="mb-4" style={{ color: '#10621A' }}>Nuestras Frutas y Beneficios</h2>

        <div className="row g-4 justify-content-center">
          {frutas.map((fruta) => (
            <div key={fruta.id} className="col-md-4">
              <div 
                className="card h-100 shadow-sm border-0"
                style={{
                  cursor: 'pointer',
                  transition: '0.3s',
                  backgroundColor: seleccionadas.includes(fruta.id) ? '#dcedc8' : 'white',
                  border: seleccionadas.includes(fruta.id) ? '3px solid #10621A' : '1px solid #eee',
                  transform: seleccionadas.includes(fruta.id) ? 'scale(1.05)' : 'scale(1)'
                }}
                onClick={() => toggleFruta(fruta.id)}
              >
                <div className="card-body">
                  <div className="mb-3" style={{ fontSize: '4rem' }}>{fruta.emoji}</div>
                  <h3 className="card-title h4" style={{ color: '#10621A' }}>{fruta.nombre}</h3>
                  <div className="text-start small">
                    <p className="mb-1"><strong>Remedio:</strong> {fruta.remedio}</p>
                    <p className="mb-1"><strong>Beneficios:</strong> {fruta.beneficios}</p>
                    <p><strong>Uso:</strong> {fruta.uso}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* SECCIÓN DE PRESENTACIONES INTERACTIVAS */}
        <div className="mt-5 pt-4">
          <h2 className="mb-4" style={{ color: '#10621A' }}>Presentaciones Disponibles</h2>
          <div className="row justify-content-center g-3">
            {presentaciones.map((pres) => (
              <div key={pres.id} className="col-6 col-md-2">
                <div 
                  className="p-3 border rounded shadow-sm" 
                  style={{ 
                    cursor: 'pointer',
                    transition: '0.2s',
                    backgroundColor: presentacionElegida === pres.id ? '#10621A' : '#f1f8e9',
                    color: presentacionElegida === pres.id ? 'white' : 'black',
                    border: presentacionElegida === pres.id ? '2px solid #084111' : '1px solid #c8e6c9'
                  }}
                  onClick={() => setPresentacionElegida(pres.id)}
                >
                  <div className="fw-bold" style={{ fontSize: '1.2rem' }}>{pres.tamano}</div>
                  <div className={presentacionElegida === pres.id ? 'text-white-50 small' : 'text-muted small'}>
                    {pres.uso}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5 p-4 border rounded shadow-sm bg-white border-primary">
          <p className="fw-bold" style={{ color: '#10621A' }}>¿Deseas ver el reporte detallado?</p>
          <a href="/sprint 2.docx" download="Sprint_2_Reporte.docx" style={{ textDecoration: 'none' }}>
            <button className="btn btn-lg text-white" style={{ backgroundColor: '#6a1b9a', borderRadius: '50px', padding: '12px 40px', fontWeight: 'bold' }}>
              Descargar Sprint 2 📄🚀
            </button>
          </a>
        </div>

      </main>

      <footer className="w-100 p-3 text-center text-white mt-auto" style={{ backgroundColor: '#10621A' }}>
        <p className="mb-0">© 2026 alimentos pronalfrut - Dashboard Mockup</p>
      </footer>
    </div>
  );
}


export default App;