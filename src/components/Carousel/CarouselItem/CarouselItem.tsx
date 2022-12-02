import React from "react";
import styles from "./CarouselItem.module.css";
interface myProps {
  state: number;
  index: number;
  length: number;
}

const CarouselItem: React.FC<myProps> = ({
  state,
  index,
  length,
  children
}) => {
  const getClassName = () => {
    if (Math.abs(state % length) === index) return styles.currentItem;
    else if (
      Math.abs(state % length) > index ||
      (index === length - 1 && Math.abs(state % length) === 0)
    ) {
      return styles.previousItem;
    } else if (
      Math.abs(state % length) < index ||
      (index === 0 && Math.abs(state % length) === length - 1)
    ) {
      return styles.nextItem;
    } else {
      return "";
    }
  };
  return (
    <div className={`${styles.carouselItem} ${getClassName()}`}>
      <div
        style={{
          height: "150px",
          padding: "15px 65px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        className={styles.glassCard}
      >
        {children}
      </div>
    </div>
  );
};

export default CarouselItem;
