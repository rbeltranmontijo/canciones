import React from "react";

function Cancion({ letra }) {
  if (letra.length === 0) return null;
  return (
    <React.Fragment>
      <h2>Letra Cancion</h2>
      <p className="letra">{letra}</p>
    </React.Fragment>
  );
}

export default Cancion;
