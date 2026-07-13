import React from "react";

const MenuCard = ({ meal, food }) => {
  return (
    <div>

      <h3>{meal}</h3>

      <p>{food}</p>

      <hr />

    </div>
  );
};

export default MenuCard;