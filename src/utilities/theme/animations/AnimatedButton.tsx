import React from 'react';
import { Button, ButtonProps } from '@mui/material';
import { motion } from 'framer-motion';
// import { useThemeStore } from '@store/themeStore';

const MotionButton = motion(Button as any);

const AnimatedButton: React.FC<ButtonProps> = (props) => {
    // const { isHovering, setIsHovering } = useThemeStore();
    return (
        <MotionButton
            {...props}
            variant="outlined"
            sx={{
                position: 'relative',
                overflow: 'hidden',
                borderRadius: 2,
                px: 3,
                py: 1,
                fontWeight: 'bold',
                color: 'primary.main',
                borderColor: 'primary.light',
                '&::before': {
                    content: "'content'".replace('content', props.children as string),
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'primary.light',
                    color: '#333',
                    transform: 'translateX(-100%)',
                    transition: 'transform 0.4s ease',
                    zIndex: 0
                },
                '&:hover::before': {
                    transform: 'translateX(0)'
                },
                '& .MuiButton-label': {
                    position: 'relative',
                    zIndex: 1,
                }
            }}
            // onMouseEnter={() => setIsHovering(false)}
            // onMouseLeave={() => setIsHovering(true)}
        >
            {props.children}
        </MotionButton>
    );
};

export default AnimatedButton;
