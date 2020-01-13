import React, { useState, useEffect } from "react";
import axios from "axios";

import Formulario from "./components/Formulario";
import Cancion from "./components/Cancion";
import Informacion from "./components/Informacion";

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

    // almacenar el resultadodel artista que se busco
    agregarArtista(artista);

    //Almacena la letra en el state
    agregarLetra(resultado.data.lyrics);
  };

  // Metodo para consultar la API de informacion
  const consultarAPIinfo = async () => {
    if (artista) {
      const url = `https://theaudiodb.com/api/v1/json/1/search.php?s=${artista}`;

      const resultado = await axios(url);
      // console.log(resultado);
      agregarInfo(resultado.data.artists[0]);
    }
  };

  useEffect(() => {
    consultarAPIinfo();
  }, [artista]);

  return (
    <React.Fragment>
      <Formulario consultarApiLetra={consultarApiLetra} />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <Informacion info={info} />
          </div>
          <div className="col-md-6">
            <Cancion letra={letra} />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
