import React from "react";

export default function Card({
  name,
  image,
  temperament,
  weight_min,
  weight_max,
}) {
  return (
    <div>
      <h3>{name}</h3>
      <img src={image} alt="img not found 😞" width="200px" height="250px" />
      <h5>{temperament}</h5>
      <h3>Peso:</h3> <h5>MIN: {weight_min} KG</h5> <h5>MAX: {weight_max} KG</h5>
    </div>
  );
}
