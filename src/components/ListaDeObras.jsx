import React from 'react'

export const ListaDeObras= ({datosObras, handleSeleccion}) => {
  return (
    <div className="w-full h-20  absolute z-30 flex gap-4 overflow-x-auto justify-center whitespace-nowrap px-6 py-2  bg-red-600/20 scrollbar-hide" >
        {datosObras.map((obra) => (
          <button className= "bg-black/30 rounded-xl px-4 py-2 text-amber-400 hover:bg-red-950 hover:text-white flex-shrink-0 " key={obra.titulo} onClick={() => handleSeleccion(obra)}>
            {obra.titulo}
          </button>
        ))}
      </div>
  )
}
