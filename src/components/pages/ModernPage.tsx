import { useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { queries } from '@api/index';
import { Box, Typography, Container, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

// Props
interface Post {
    id: number;
    date: string;
    slug: string;
    title: { rendered: string };
    content: { rendered: string };
    excerpt: { rendered: string };
    link: string;
}

interface ModernPageProps {
    posts: Post[];
}

// Animation Variants
const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.15,
            duration: 0.6,
            ease: 'easeOut',
        },
    }),
};

const ModernPage: React.FC<ModernPageProps> = ({ posts }) => {
    // const navigate = useNavigate();
    // const wordpressQuery: any = useQuery(queries.wordpressQuery());
    // const posts: Post[] = wordpressQuery?.data;

    // console.log(posts);
    const theme = useTheme();
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Optional: Auto scroll or style enhancement
    useEffect(() => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, []);

    return (
        <Box
            ref={scrollContainerRef}
            sx={{
                height: '100vh',
                overflowY: 'scroll',
                scrollSnapType: 'y mandatory',
                background: theme.palette.background.default,
                pt: 10,
            }}
        >
            <Container maxWidth="md">
                {posts.map((post, i) => (
                    <motion.div
                        key={post.id}
                        custom={i}
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                        style={{
                            scrollSnapAlign: 'start',
                            marginBottom: theme.spacing(8),
                            padding: theme.spacing(4),
                            borderRadius: theme.shape.borderRadius * 2,
                            background: theme.palette.background.paper,
                            boxShadow: theme.shadows[4],
                        }}
                    >
                        <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
                            {post.title.rendered.replace(/&#8220;|&#8221;/g, '"')}
                        </Typography>
                        <Typography
                            variant="body1"
                            dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                            sx={{ opacity: 0.85, fontStyle: 'italic', mb: 2 }}
                        />
                        <Typography
                            variant="body2"
                            component="div"
                            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
                        />
                    </motion.div>
                ))}
            </Container>
        </Box>
    );
};

export default ModernPage;
