import React, {
  useRef,
  useState,
  useLayoutEffect,
  useCallback,
  useEffect,
} from "react";
import ResizeObserver from "resize-observer-polyfill";
import {
  motion,
  useViewportScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "framer-motion";

import { useScrollPercentage } from "react-scroll-percentage";
import ScreenFourPointOne from "./ScreenFourPointOne";
import ScreenFourPointTwo from "./ScreenFourPointTwo";
import ScreenFourPointThree from "./ScreenFourPointThree";
import ScreenFourPointFour from "./ScreenFourPointFour";




const SmoothScroll = () => {
  const scrollRef = useRef(null);
  const ghostRef = useRef(null);
  const [scrollRange, setScrollRange] = useState(0);
  const [viewportW, setViewportW] = useState(0);

  const scrollPerc = useMotionValue(0);

  useLayoutEffect(() => {
    scrollRef && setScrollRange(scrollRef.current.scrollWidth);
  }, [scrollRef]);

  const onResize = useCallback((entries) => {
    for (let entry of entries) {
      setViewportW(entry.contentRect.width);
    }
  }, []);

  useLayoutEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => onResize(entries));
    resizeObserver.observe(ghostRef.current);
    return () => resizeObserver.disconnect();
  }, [onResize]);

  const [containerRef, percentage] = useScrollPercentage({
    /* Optional options */
    threshold: 0.1,
  });

  useEffect(() => {
    scrollPerc.set(percentage);
  }, [percentage]);

  const transform = useTransform(
    scrollPerc,
    [0, 1],
    [0, -scrollRange + viewportW]
  );
  const physics = { damping: 15, mass: 0.27, stiffness: 55 };
  const spring = useSpring(transform, physics);

  return (
    <div ref={containerRef}>
      <div className="scroll-container">
        {/* {viewportW} */}

        <motion.section
          ref={scrollRef}
          style={{ x: spring }}
          className="thumbnails-container"
        >
          <div className="thumbnails">
            <div className="thumbnail" >
            <ScreenFourPointOne/>
              </div>
            <div className="thumbnail" >
            <ScreenFourPointTwo/>
              </div>
            <div className="thumbnail" >
            <ScreenFourPointThree/>
              </div>
            <div className="thumbnail" >
            <ScreenFourPointFour/>
              </div>

          </div>
        </motion.section>
      </div>
      <div ref={ghostRef} style={{ height: scrollRange }} className="ghost" />
    </div>
  );
};

export default SmoothScroll;
