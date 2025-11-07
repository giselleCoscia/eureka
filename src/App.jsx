import React, { useEffect, useState,useCallback  } from "react";
import "./App.css";
import { ListaDeObras } from "./components/ListaDeObras";
import { datosObras } from "./Datos/Data";
import img from "./img/—Pngtree—theatrical stage under three focused_16534428.jpg";
import { useDeviceType } from "./hooks/useDeviceType";

export default function App() {
  const [obraSeleccionada, setObraSeleccionada] = useState(null);
  const [telonAbierto, setTelonAbierto] = useState(false);
  const [actorSeleccionado, setActorSeleccionado] = useState(null);
  const deviceType = useDeviceType();

  const handleClick = () => {
    window.open(
      "https://alternativa.ar/d3414-2025-muestras-fin-de-ano--grupo-sabados-11-h-intermedios-camila",
      "_blank"
    );
  };

useEffect(() => {
    if (deviceType !== "mobile") return;

    const handleOutsideInteraction = (e) => {
      if (!e.target.closest('.actor-item') && 
          !e.target.closest('.tooltip')) {
        setActorSeleccionado(null);
      }
    };

    // Usar múltiples eventos para mejor compatibilidad móvil
    document.addEventListener('touchstart', handleOutsideInteraction);
    document.addEventListener('click', handleOutsideInteraction);
    
    return () => {
      document.removeEventListener('touchstart', handleOutsideInteraction);
      document.removeEventListener('click', handleOutsideInteraction);
    };
  }, [deviceType]);

  const handleSeleccion = (obra) => {
    if (obra === obraSeleccionada) return;
    if (telonAbierto) {
      setTelonAbierto(false);
      setTimeout(() => {
        setObraSeleccionada(obra);
        setTelonAbierto(true);
        setActorSeleccionado(null);
      }, 2000);
    } else {
      setObraSeleccionada(obra);
      setTelonAbierto(true);
    }
  };

const handleActorInteraction = useCallback((a, e) => {
    if (deviceType === "mobile") {
      e.preventDefault();
      e.stopPropagation();
      
      setActorSeleccionado(a);

    }
  }, [deviceType, actorSeleccionado]);

  // Cerrar tooltip al tocar fuera
  React.useEffect(() => {
    if (deviceType === "mobile") {
      const handleClickOutside = (e) => {
        if (!e.target.closest('.actor-item')) {
          setActorSeleccionado(null);
        }
      };
      document.addEventListener('touchstart', handleClickOutside);
      return () => document.removeEventListener('touchstart', handleClickOutside);
    }
  }, [deviceType]);

  return (
    <div className={`escenario ${deviceType}`}>
      <button
        onClick={handleClick}
        className="fixed top-4 left-4 md:top-6 md:left-6 bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 text-white px-4 py-2 md:px-8 md:py-4 rounded-full font-bold shadow-[0_0_30px_rgba(219,39,119,0.6)] hover:shadow-[0_0_50px_rgba(219,39,119,0.8)] transform hover:scale-110 active:scale-95 transition-all duration-300 z-50 flex items-center gap-2 text-sm md:text-base border-2 border-pink-400/50 hover:border-pink-300"
      >
        <svg
          className="w-4 h-4 md:w-5 md:h-5 animate-pulse"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 100 4v2a2 2 0 01-2 2H4a2 2 0 01-2-2v-2a2 2 0 100-4V6z" />
        </svg>
        <span className="hidden md:inline">Comprar Entrada</span>
        <span className="md:hidden">Entradas</span>
      </button>

      {/* Reflectores */}
      {/* <div className="reflector reflector-left"></div>
      <div className="reflector reflector-right"></div> */}

      {/* Telón */}
      <div className={`telon ${telonAbierto ? "abierto" : ""}`}>
        <div className="cortina izquierda"></div>
        <div className="cortina derecha"></div>
      </div>

      {/* Obra */}
      <div className="w-screen h-screen flex items-center justify-center bg-blue-950/10">
        <img className="h-full object-cover" src={img} alt="" />
      </div>
      {obraSeleccionada && (
        <div className="obra relative px-7 w-full">
          <div className="flex flex-col items-center justify-start text-center text-amber-50">
            <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 drop-shadow-[0_0_15px_rgba(251,191,36,0.5)] animate-pulse-slow">
              {obraSeleccionada.titulo}
            </h1>

            <div className="text-sm md:text-base lg:text-xl bg-gradient-to-br from-black/80 to-black/60 backdrop-blur-sm rounded-xl p-6 m-4 max-w-3xl border border-amber-500/30 shadow-2xl shadow-amber-500/20">
              <p className="leading-relaxed">{obraSeleccionada.descripcion}</p>
            </div>
          </div>
        </div>
      )}

       {obraSeleccionada && (
        <div className="actores-container">
          {obraSeleccionada.actores.map((a, i) => {
            console.log({a,actorSeleccionado});
            
            const min = 20;
            const max = 65;
            const total = obraSeleccionada.actores.length - 1;
            const left = total === 0 ? 50 : min + ((max - min) / total) * i;
            const isActive = actorSeleccionado?.actor == a?.actor;
            
            return (
              <div
                key={a.actor}
                className={`actor-item group ${isActive ? "active" : ""}`}
                style={{ left: `${left}%` }}
                // Eventos unificados para móvil y escritorio
                onClick={deviceType === "desktop" ? undefined : (e) => handleActorInteraction(a, e)}
                onTouchStart={deviceType === "mobile" ? (e) => handleActorInteraction(a, e) : undefined}
              >
                <img
                  className={`transition-all duration-300 ease-in-out cursor-pointer object-scale-down ${
                    isActive 
                      ? "grayscale-0 scale-110 drop-shadow-md" 
                      : "grayscale hover:grayscale-0 hover:scale-110"
                  } ${
                    deviceType === "desktop"
                      ? "h-[300px] w-[250px]"
                      : "h-[130px] w-[30px] active:scale-125"
                  }`}
                  src={a.img || "https://sm.ign.com/t/ign_latam/screenshot/default/45120a-evangelion-asukasoryulangley-pop-glam-web-ead71898438_5g21.960.png"}
                  alt={a.actor}
                  // Prevenir eventos de imagen en móvil
                  onTouchStart={deviceType === "mobile" ? (e) => e.stopPropagation() : undefined}
                />
                <div className={`tooltip ${isActive ? "mobile-active" : ""}`}>
                  <div className="bg-black/90 text-amber-50 px-3 py-2 rounded-lg text-sm shadow-lg">
                    <div className="font-bold text-amber-400">{a.actor}</div>
                    <div className="text-xs">"{a.papel}"</div>
                  </div>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                    <div className="border-8 border-transparent border-t-black/90"></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <ListaDeObras datosObras={datosObras} handleSeleccion={handleSeleccion} />
    </div>
  );
}