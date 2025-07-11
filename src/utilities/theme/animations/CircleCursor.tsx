import { motion, AnimatePresence } from 'framer-motion';
// @ts-ignore
import { useMousePosition } from '@lib/useMousePosition';
// @ts-ignore
import { useThemeStore } from '@store/themeStore';

interface CursorProps {
    active: boolean;
}

const CustomCursor: React.FC<CursorProps> = ({ active }) => {
    const { x, y } = useMousePosition();
    const { cursorProps } = useThemeStore();
    const props = {
        ...cursorProps,
        animate: {
            ...cursorProps.animate,
            x: x - cursorProps.animate.x,
            y: y - cursorProps.animate.y
        }
    };
    return (
        <AnimatePresence>
            {active && <motion.div key="cursor" {...props} /> }
        </AnimatePresence>
    );
};

export default CustomCursor;