import { useQuery } from '@tanstack/react-query';
import { useState, useMemo, useEffect } from 'react';
import { 
    Button, Chip, Box, Container, Grid2 as Grid, 
    Typography, Alert, Stack, TextField, useTheme 
} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import EmailIcon from '@mui/icons-material/Email';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { motion } from "framer-motion";
import Fuse from 'fuse.js';
import { FilterToggleGroup } from '@components/Custom/FilterToggleGroup';
import NewsletterSignupForm from '@components/Custom/forms/premade/Newsletter';
import PostsSection from '@components/pages/Blog/PostsSection';
import SlideIn from '@theme/animations/SlideIn';
import { useUtilityStore } from '@store/index';
import { queries } from '@api/index';
import { Link, useNavigate } from 'react-router';
import { useWordpressCategoriesQuery } from '@api/wordpress';
import { trackAnalyticsEvent } from '@utilities/lib/useAnalytics';

const recent = [
    { date: "June 1, 2025", label: "Guardian OSS Setup Wizard Launched" },
    { date: "May 31, 2025", label: "Supabase/Qdrant/Ollama Tutorial" },
    { date: "May 30, 2025", label: "Auto Bloggen Flow Live" },
    { date: "May 28, 2025", label: "Codegen + Testgen CLI Complete" },
];

const upcoming = [
    { emoji: "🚧", label: "Feature Generator CLI + PRD→Diagram Flow" },
    { emoji: "✍️", label: "Self-Hosting Tutorials for Local Infra" },
    { emoji: "🧠", label: "Prompt → Mermaid → Excalidraw → Code System" },
    { emoji: "📘", label: "Guardian OSS Docs & Dev UI Enhancements" },
];

const tags = [
    'TypeScript', 'React', 'Next.js', 'Bun', 'Vite',
    'MUI', 'Framer Motion', 'n8n', 'Supabase',
    'Qdrant', 'Ollama', 'OpenAI', 'Hono', 'Zod',
    'Zustand', 'Drizzle', 'Vitest', 'Markdown',
    'Automation', 'LLMs', 'CLI Tools', 'Dark Mode',
    'Docker', 'Supabase', 'PostgreSql', 'GraphQL', 'REST',
    'Grafana', 'Prometheus'
];

export function TechStackTags() {
    return (
        <SlideIn>
            <Stack spacing={2} py={4}>
                <Stack direction="row" alignItems="center" spacing={1}>
                    <RocketLaunchIcon fontSize="small" color="primary" />
                    <Typography variant="h6" fontWeight={600}>
                        Technologies I Build With
                    </Typography>
                </Stack>

                <Stack direction="row" flexWrap="wrap" gap={1}>
                    {tags.map((tag, i) => (
                        <Chip
                            key={i}
                            label={tag}
                            variant="outlined"
                            color="primary"
                            size="small"
                            sx={{
                                borderRadius: '8px',
                                bgcolor: 'background.paper',
                                fontWeight: 500,
                            }}
                        />
                    ))}
                </Stack>
            </Stack>
        </SlideIn>
    );
}

// import PostSearch from '@components/pages/Blog/PostSearch';
export default function Dashboard() {
    const navigate = useNavigate();
    const theme = useTheme();
    const utilityStore = useUtilityStore();
    const wordpressQuery: any = useQuery(queries.wordpressQuery());
    const posts: any[] = wordpressQuery?.data;

    const wordpressCategoriesQuery = useWordpressCategoriesQuery();
    const wordpressCategories = wordpressCategoriesQuery.data?.data;
    function getCategoryLabel(categoryId: number): string | null {
        if (!wordpressCategories) return null;
        try {
            const category = wordpressCategories.find((cat: any) => cat.id === categoryId);
            return category?.name || null;
        } catch (error) {
            console.error('Error fetching categories:', error);
            return null;
        }
    }

    const [filter, setFilter] = useState('all');
    const [filteredPosts, setFilteredPosts] = useState(posts);
    const [search, setSearch] = useState('');

    const fuse = useMemo(() => {
        return new Fuse(posts, {
            keys: ['title.rendered', 'excerpt.rendered', 'content.rendered'],
            threshold: 0.3,
            ignoreLocation: true,
        });
    }, [posts]);

    useEffect(() => {
        let results = posts;

        if (filter !== 'all') {
            results = results.filter((post) => {
                const includesTags = post.tags?.includes(filter);
                const includesCategories = post.categories?.map((cat: any) => getCategoryLabel(cat)).filter(Boolean);
                console.log("filtering: ", filter, includesTags, includesCategories);
                return includesTags || includesCategories?.some((cat: any) => cat.toLowerCase().includes(filter));
            });
        }

        if (search.trim().length > 1) {
            const fuseResults = fuse.search(search);
            results = fuseResults.map((r) => r.item);
        }

        setFilteredPosts(results);
    }, [filter, search, fuse, posts]);

    return (
        <Grid container spacing={2}>
            <Grid size={12}>
                <SlideIn>
                    <Stack spacing={3} px={{ xs: 1, sm: 2, md: 4 }} py={4}>
                        <Typography variant="h3" fontWeight={700}>
                            👋 Welcome to <Box component="span" color="primary.main">Michael Woodward's Dev Blog</Box>
                        </Typography>

                        <Typography variant="body1" sx={{ opacity: 0.9 }}>
                            I’m <strong>Michael</strong>, a full-stack AI engineer by day and a curious writer by night. I build intelligent tools, elegant UI, and automation systems. This blog is where I document my journey, from coding breakthroughs to reflections on engineering, design, and innovation.
                        </Typography>

                        <Typography variant="body1" sx={{ opacity: 0.85 }}>
                            Expect hands-on tutorials, dev tools, build-in-public updates, AI workflows, and notes from the bleeding edge of software development.
                        </Typography>

                        <Typography variant="body1" sx={{ opacity: 0.8 }}>
                            Visit my business blog <Link to="https://woodwardstudio.dev" target="_blank" rel="noopener" style={{ color: '#8af', textDecoration: 'none', fontWeight: 700 }}>WoodwardStudio.dev</Link>.
                        </Typography>

                        <Typography variant="body1" sx={{ opacity: 0.8 }}>
                            Subscribe below or connect on socials to follow along.
                        </Typography>

                        <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
                            <Button 
                                variant="outlined" 
                                color="primary" 
                                size="small"
                                startIcon={<EmailIcon />}
                                onClick={() => {
                                    trackAnalyticsEvent({
                                        project: 'blog',
                                        page: '/dashboard',
                                        type: 'click',
                                        description: 'Subscribe Button Clicked',
                                    })
                                    utilityStore.setModal({
                                        open: true,
                                        content: (<NewsletterSignupForm />)
                                    });
                                }}
                            >
                                Subscribe
                            </Button>
                            <Button
                                variant="text"
                                startIcon={<NewspaperIcon />}
                                href="https://github.com/loveliiivelaugh"
                                target="_blank"
                                rel="noopener"
                                onClick={() => {
                                    trackAnalyticsEvent({
                                        project: 'blog',
                                        page: '/dashboard',
                                        type: 'click',
                                        description: 'Github Button Clicked',
                                    })
                                }}
                            >
                                Github
                            </Button>
                            <Button
                                variant="text"
                                startIcon={<TwitterIcon />}
                                href="https://x.com/LoveLiiiveLaugh"
                                target="_blank"
                                rel="noopener"
                                onClick={() => {
                                    trackAnalyticsEvent({
                                        project: 'blog',
                                        page: '/dashboard',
                                        type: 'click',
                                        description: 'X Button Clicked',
                                    })
                                }}
                            >
                                X
                            </Button>
                            <Button
                                variant="text"
                                startIcon={<LinkedInIcon />}
                                href="https://www.linkedin.com/in/michaelanthonywoodward"
                                target="_blank"
                                rel="noopener"
                                onClick={() => {
                                    trackAnalyticsEvent({
                                        project: 'blog',
                                        page: '/dashboard',
                                        type: 'click',
                                        description: 'LinkedIn Button Clicked',
                                    })
                                }}
                            >
                                LinkedIn
                            </Button>
                        </Stack>

                        <TechStackTags />
                    </Stack>
                </SlideIn>
            </Grid>

            <Alert severity="success">
                <Stack spacing={1}>
                    <Typography variant="subtitle2" fontWeight="bold">
                        📚 Learn my tech stack
                    </Typography>
                    <Typography variant="body2">
                        Interested in following my learning path? 👉 <Link
                            to="/post/my-learning-journey-into-software-engineering-and-how-you-can-follow-it-too"
                        >
                            <Button 
                                variant="outlined" 
                                color="inherit"
                                onClick={() => {
                                    trackAnalyticsEvent({
                                        project: 'blog',
                                        page: '/dashboard',
                                        type: 'click',
                                        description: 'Learn Button Clicked',
                                    })
                                }}
                            >
                                Learn
                            </Button>
                        </Link>
                    </Typography>
                </Stack>
            </Alert>
            <Alert severity="info">
                <Stack spacing={1}>
                    <Typography variant="subtitle2" fontWeight="bold">
                        Announcements 🧙🏼‍♂️
                    </Typography>
                    <Typography variant="body2">
                        <b>[Sunday, June 1, 2025]</b>
                    </Typography>
                    <Typography variant="body2">
                        To follow these tutorials, you will need to have a basic understanding of TypeScript, React, Node.js, Git and Sql.
                        <br />
                        It will also be helpful to have some knowledge of AI tools, Wordpress, and n8n.
                        <br />
                        None of my tech stack is really "required" most of these things can be done in other languages and technologies. But I use an opinionated stack that consists of TypeScript end to end.
                        <br />
                        There are 100's of free resources online to learn these technologies so I will start assuming some basic knowledge of them.
                        <br />
                        I will also leave some resources to point to where you can learn more about the technologies I use.
                    </Typography>
                    <Typography variant="body2">
                        <b>[Sunday, July 4, 2025]</b>
                    </Typography>
                    <Typography variant="body2">
                        Happy 4th of July! 🎆
                    </Typography>
                </Stack>
            </Alert>

            <Alert
                severity="warning"
                icon={<InfoOutlinedIcon />}
                sx={{
                    mb: 3,
                    px: 3,
                    py: 2,
                    borderRadius: 2,
                    backgroundColor: 'rgba(255, 160, 0, 0.08)',
                    color: 'warning.main',
                }}
            >
                <Stack spacing={1}>
                    <Typography variant="subtitle2" fontWeight="bold">
                        Heads Up 🧙🏼
                    </Typography>
                    <Typography variant="body2">
                        This is still Beta. This blog is currently still in development and will be released soon.
                    </Typography>
                </Stack>
            </Alert>

            <Grid container
                component={motion.div}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                sx={{
                    my: 1,
                    px: 3,
                    py: 2,
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: 2,
                    backgroundColor: theme.palette.background.paper,
                }}
                >
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Typography variant="h6" gutterBottom>
                            📌 Recent Milestones
                        </Typography>
                        <Stack spacing={1} sx={{ mb: 3 }}>
                            {recent.map((item, idx) => (
                                <Typography key={idx} variant="body2" color="text.secondary">
                                    ✅ <strong>{item.date}</strong> — {item.label} <Link to="#" style={{ color: "#ddd" }}>#</Link>
                                </Typography>
                            ))}
                        </Stack>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Typography variant="h6" gutterBottom>
                            🔜 Next Up
                        </Typography>
                        <Stack spacing={1}>
                            {upcoming.map((item, idx) => (
                                <Typography key={idx} variant="body2" color="text.secondary">
                                    {item.emoji} {item.label}
                                </Typography>
                            ))}
                            <Box sx={{ textAlign: "right", p: 1 }}>
                                <Button onClick={() => {
                                    trackAnalyticsEvent({
                                        project: 'blog',
                                        page: '/dashboard',
                                        type: 'click',
                                        description: 'Roadmap Button Clicked',
                                    })
                                    navigate('/post/roadmap')
                                }} sx={{ color: "#ddd" }}>
                                    View Roadmap 🌈
                                </Button>
                            </Box>
                        </Stack>
                    </Grid>
                    <Grid size={12} textAlign={"right"}>
                        <Typography variant="subtitle1" sx={{ color: "#ddd" }}>
                            Last Updated at: {new Date().toLocaleDateString()}
                        </Typography>
                    </Grid>
            </Grid>

            <FilterToggleGroup value={filter} onChange={setFilter} />

            <TextField
                variant="outlined"
                fullWidth
                placeholder="Search posts..."
                value={search}
                onChange={(e: any) => setSearch(e.target.value)}
                sx={{
                    input: { color: 'white' },
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        bgcolor: 'rgba(255,255,255,0.05)',
                    },
                }}
            />

            <PostsSection posts={filteredPosts || []} />
            {/* <SlideIn>
            </SlideIn> */}
        </Grid>
    );
};
