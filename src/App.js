import React, { useState, useEffect } from "react";
import axios from "axios";

import Formulario from "./components/Formulario";
import Cancion from "./components/Cancion";

function App() {
  // Utilizar useState con tres states
  const [artista, agregarArtista] = useState("");
  const [letra, agregarLetra] = useState([]);
  const [info, agregarInfo] = useState({});

  //Metodo para consiltar la API de letras de canciones
  const consultarApiLetra = async busqueda => {
    const { artista, cancion } = busqueda;
    const url = `https://api.lyrics.ovh/v1/${artista}/${cancion}`;

    // Consultar la api
    const resultado = await axios(url);
    // console.log(resultado.data.lyrics)
    agregarLetra(resultado.data.lyrics);
  };

  return (
    <React.Fragment>
      <Formulario consultarApiLetra={consultarApiLetra} />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6"></div>
          <div className="col-md-6">
            <Cancion letra={letra} />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
