// @components/animations/SlideIn.tsx

import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

interface SlideInProps {
    children: React.ReactNode;
    direction?: "up" | "down" | "left" | "right";
    delay?: number;
    distance?: number;
    duration?: number;
    once?: boolean;
}

const SlideIn = ({
    children,
    direction = "up",
    delay = 0.1,
    distance = 50,
    duration = 0.5,
    once = true,
}: SlideInProps) => {
    const controls = useAnimation();
    const [ref, inView] = useInView({ triggerOnce: once, threshold: 0.2 });

    const getOffset = () => {
        switch (direction) {
            case "up": return { y: distance, x: 0 };
            case "down": return { y: -distance, x: 0 };
            case "left": return { x: distance, y: 0 };
            case "right": return { x: -distance, y: 0 };
            default: return { y: distance, x: 0 };
        }
    };

    useEffect(() => {
        if (inView) {
            controls.start({ opacity: 1, x: 0, y: 0, transition: { duration, delay } });
        }
    }, [controls, inView, delay, duration]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, ...getOffset() }}
            animate={controls}
        >
            {children}
        </motion.div>
    );
};

export default SlideIn;
