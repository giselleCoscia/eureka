import React, { useState } from "react";
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

  const handleSeleccion = (obra) => {
    if (obra === obraSeleccionada) return;
    if (telonAbierto) {
      setTelonAbierto(false);
      setTimeout(() => {
        setObraSeleccionada(obra);
        setTelonAbierto(true);
        setActorSeleccionado(null); // Reset actor seleccionado
      }, 2000);
    } else {
      setObraSeleccionada(obra);
      setTelonAbierto(true);
    }
  };

  const handleClick = () => {
    window.open(
      "https://alternativa.ar/d3414-2025-muestras-fin-de-ano--grupo-sabados-11-h-intermedios-camila",
      "_blank"
    );
  };

  const handleActorClick = (index) => {
    if (deviceType === "mobile") {
      setActorSeleccionado(actorSeleccionado === index ? null : index);
    }
  };

  return (
    <div className={`escenario ${deviceType}`}>
      <button
        onClick={handleClick}
        className="fixed top-2 left-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 z-50 flex items-center gap-2"
      >
        <span>Comprar Entrada</span>
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          />
        </svg>
      </button>
      {/* Reflectores */}
      <div className="reflector reflector-left"></div>
      <div className="reflector reflector-right"></div>

      {/* Telón */}
      <div className={`telon ${telonAbierto ? "abierto" : ""}`}>
        <div className="cortina izquierda"></div>
        <div className="cortina derecha"></div>
      </div>

      {/* Obra */}
      <div className="w-screen h-screen flex items-center justify-center bg-blue-950/10">
        <img className="h-5/6 " src={img} alt="" />
      </div>
      {obraSeleccionada && (
        <div className="obra relative px-7 w-full">
          <div className="flex flex-col items-center justify-start text-center text-amber-50">
            <h1 className="text-xl md:text-3xl lg:text-5xl font-bold mb-4 text-amber-400">
              {obraSeleccionada.titulo}
            </h1>

            <div className="text-sm md:text-lg lg:text-lg bg-black/60 rounded-lg p-4 m-4 max-w-2xl">
              {obraSeleccionada.descripcion}
            </div>
          </div>
        </div>
      )}

      {obraSeleccionada && (
        <div className="actores-container">
          {obraSeleccionada.actores.map((a, i) => {
            const min = 20;
            const max = 65;
            const total = obraSeleccionada.actores.length - 1;
            const left = total === 0 ? 50 : min + ((max - min) / total) * i;
            const isActive = deviceType === "mobile" && actorSeleccionado === i;

            return (
              <div
                key={a.actor}
                className={`actor-item group ${isActive ? "active" : ""}`}
                style={{ left: `${left}%` }}
                onClick={() => handleActorClick(i)}
              >
                <img
                  className={`grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-300 ease-in-out cursor-pointer object-scale-down ${
                    deviceType === "desktop"
                      ? "h-[300px] w-[250px]"
                      : "h-[130px] w-[30px]"
                  }`}
                  src={`${
                    a.img ||
                    "https://sm.ign.com/t/ign_latam/screenshot/default/45120a-evangelion-asukasoryulangley-pop-glam-web-ead71898438_5g21.960.png"
                  }`}
                  alt={a.actor}
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
