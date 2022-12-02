import { useEffect } from "react";
import styles from "./Carousel.module.css";

interface myProps {
  state: number;
  setState: (arg:number) => void;
}
const Carousel: React.FC<myProps & React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  state,
  setState,
  ...props
}) => {
  useEffect(() => {
    const timeout2 = setTimeout(() => {
      setState(state + 1);
    }, 4000);
    return () => clearTimeout(timeout2);
  }, [state]);
  return (
    <div className={styles.carousel} {...props}>
      {children}
      {/* <div className={styles.left}>
        <IconButton
          aria-label="Left"
          bg="#fff"
          borderRadius="full"
          icon={<ChevronLeftIcon color="#000" h={7} w={7} />}
          onClick={() => setState((prv) => prv - 1)}
        />
      </div>
      <div className={styles.right}>
        <IconButton
          aria-label="Right"
          bg="#fff"
          borderRadius="full"
          icon={<ChevronRightIcon color="#000" h={7} w={7} />}
          onClick={() => setState((prv) => prv + 1)}
        />
      </div> */}
    </div>
  );
};

export default Carousel;
