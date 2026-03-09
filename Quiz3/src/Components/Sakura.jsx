import { useEffect, useState } from 'react';
import '../Styles/sakura.css';

export const Sakura = () => {
  const [petals, setPetals] = useState([]);

  useEffect(() => {
    const newPetals = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100 + 'vw',
      animationDuration: Math.random() * 3 + 4 + 's',
      animationDelay: Math.random() * 5 + 's',
      width: Math.random() * 10 + 10 + 'px',
      height: Math.random() * 10 + 10 + 'px',
    }));
    setPetals(newPetals);
  }, []);

  return (
    <div className="sakura-container">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="petal"
          style={{
            left: petal.left,
            animationDuration: petal.animationDuration,
            animationDelay: petal.animationDelay,
            width: petal.width,
            height: petal.height,
          }}
        ></div>
      ))}
    </div>
  );
};