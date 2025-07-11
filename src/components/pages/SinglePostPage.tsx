import React, { useEffect } from "react";
import { useLocation, useNavigate } from 'react-router';
import {
    Container, Box, Typography, Button,
    Divider,
    Chip,
    useTheme,
    Stack,
    Toolbar,
    Skeleton,
} from "@mui/material";
import { motion } from "framer-motion";
import moment from "moment";
import { useQuery } from "@tanstack/react-query";
import MarkdownWrapper from "@custom/wrappers/MarkdownWrapper/MarkdownWrapper";
import { useWordpressCategoriesQuery } from "@api/wordpress";
import { queries } from "@api/index";
import hljs from 'highlight.js';
import typescript from 'highlight.js/lib/languages/typescript';
import BlogSignature from "@components/Custom/BlogSignature";
import { useWindowSize } from "usehooks-ts";
import { trackAnalyticsEvent } from "@utilities/lib/useAnalytics";

import 'highlight.js/styles/github-dark.css';
// import BlogPostRenderer from "@components/Custom/wrappers/MarkdownWrapper/BlogContentWrapper";


type Post = {
    title: string | {
        rendered: string;
    };
    subtitle: string;
    publishedDate: string;
    topic: string;
    coverImageUrl: string;
    content: string | {
        rendered: string;
    };
    [key: string]: any;
};

type SinglePostPageProps = {
    post?: Post;
    onBack?: () => void;
};

const SinglePostPage: React.FC<SinglePostPageProps> = ({ post, onBack }: SinglePostPageProps) => {
    const landingTime = Date.now();

    const theme = useTheme();
    const location = useLocation();
    const navigate = useNavigate();
    const windowSize = useWindowSize();
    const wordpressQuery: any = useQuery(queries.wordpressQuery());
    const wordpressPosts = wordpressQuery?.data || [];
    const wordpressPost = wordpressPosts.find(({ slug }: { slug: string }) => slug.includes(location.pathname.split("/post/")[1]));
    const wordpressCategoriesQuery = useWordpressCategoriesQuery();
    const wordpressCategories = wordpressCategoriesQuery.data?.data;
    const isLoading = (wordpressQuery.isLoading || wordpressCategoriesQuery.isLoading);

    const codeContainerRef = React.useRef<HTMLDivElement>(null);


    if (!post) {
        if (location?.state?.post) post = location.state.post as Post;
        if (!post && wordpressPost) post = wordpressPost as Post;
    };

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

    // ANALYTICS
    useEffect(() => {
        trackAnalyticsEvent({
            page: `/post/${post?.slug || "404-post-not-found"}`,
            type: "page_view",
            description: "User reached post",
            metadata: { referrer: document.referrer, title: document.title }
        });


        let readPingFired = false;
        const timeout = setTimeout(() => {
            readPingFired = true;
            trackAnalyticsEvent({
                page: `/post/${post?.slug || "404-post-not-found"}`,
                type: "read_ping",
                description: "User stayed on post for 60 seconds",
                metadata: {
                    landingTime,
                    referrer: document.referrer,
                    title: document.title,
                }
            });
        }, 60000);

        return () => {
            clearTimeout(timeout);
            const leaveTime = Date.now();
            const timeOnPage = leaveTime - landingTime;
            trackAnalyticsEvent({
                page: `/post/${post?.slug || "404-post-not-found"}`,
                type: "leave_ping",
                description: "User left post",
                metadata: {
                    landingTime,
                    leaveTime,
                    timeOnPage,
                    referrer: document.referrer,
                    title: document.title,
                }
            });
        }
    }, []);
    useEffect(() => {
        const onScroll = () => {
            if (
                window.innerHeight + window.scrollY >=
                document.body.offsetHeight - 10
            ) {
                trackAnalyticsEvent({
                    page: `/post/${post?.slug || "404-post-not-found"}`,
                    type: "scroll_depth",
                    description: "User scrolled to bottom",
                    metadata: {
                        referrer: document.referrer,
                        title: document.title,
                    }
                });
                window.removeEventListener("scroll", onScroll);
            }
        };

        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {

        hljs.registerLanguage('ts', typescript);
        hljs.registerLanguage('typescript', typescript);

        if (!codeContainerRef.current) return;

        const anchors = codeContainerRef.current.querySelectorAll('a');

        anchors.forEach((anchor) => {
            const href = anchor.getAttribute('href');
            if (!href) return;

            const url = new URL(href, window.location.origin);

            const isInternal =
                url.hostname === window.location.hostname //&&
            // url.pathname.startsWith('/post/');

            if (isInternal) {

                anchor.onclick = (e) => {
                    let path = url.pathname.replace("/blog/", "/post/");
                    e.preventDefault();
                    const clickTime = Date.now();
                    const timeOnPage = clickTime - landingTime;
                    trackAnalyticsEvent({
                        page: path,
                        type: "click",
                        description: "Internal Link Clicked",
                        metadata: {
                            referrer: document.referrer,
                            title: document.title,
                            clickTime,
                            timeOnPage,
                        }
                    });
                    navigate(path); // useNavigate from react-router
                };

                // Optional: style them like internal links
                anchor.style.cursor = 'pointer';
            } else {
                // Force external links to open in a new tab safely
                anchor.setAttribute('target', '_blank');
                anchor.setAttribute('rel', 'noopener noreferrer');

                anchor.onclick = () => {
                    const clickTime = Date.now();
                    const timeOnPage = clickTime - landingTime;

                    trackAnalyticsEvent({
                        page: url.href,
                        type: "click",
                        description: "External Link Clicked",
                        metadata: {
                            referrer: document.referrer,
                            title: document.title,
                            clickTime,
                            timeOnPage,
                        }
                    });

                    // No need to prevent default — browser opens in new tab
                };
            }
        });

        const codeBlocks = codeContainerRef.current.querySelectorAll('pre code');
        codeBlocks.forEach((block) => {
            const el = block as HTMLElement;
            const code = el.querySelector('code');

            if (!code) return;

            // Skip if already has copy button
            if (el.querySelector('.copy-btn')) return;

            // Create copy button
            const button = document.createElement('button');
            button.textContent = '📋 Copy';
            button.className = 'copy-btn';
            button.style.cssText = `
                position: absolute;
                top: 0.5rem;
                right: 0.5rem;
                background: #333;
                color: white;
                border: none;
                padding: 4px 8px;
                font-size: 0.75rem;
                border-radius: 4px;
                cursor: pointer;
                opacity: 0.7;
                z-index: 10;
            `;

            // Copy logic
            button.onclick = () => {
                navigator.clipboard.writeText(code.textContent || '');
                button.textContent = '✅ Copied!';
                setTimeout(() => (button.textContent = '📋 Copy'), 2000);

                const clickTime = Date.now();
                trackAnalyticsEvent({
                    page: location.pathname,
                    type: "click",
                    description: "Code Copy Clicked",
                    metadata: {
                        referrer: document.referrer,
                        title: document.title,
                        clickTime
                    }
                });
            };

            // Wrap in relative container
            el.style.position = 'relative';
            el.appendChild(button);

            if (el.dataset.highlighted) {
                // Remove previous highlight state so we can re-highlight
                delete el.dataset.highlighted;
                el.classList.remove('hljs');
            }
            hljs.highlightElement(el);
        });
    }, [post]);

    return !post ? (
        <Container maxWidth="md">
            <Box
                component={motion.div}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                sx={{
                    maxWidth: windowSize.width < 600 ? "100%" : 800,
                    mx: "auto",
                    px: 2,
                    py: { xs: 4, md: 6 },
                }}
            >
                <Button
                    onClick={onBack ? onBack : () => navigate('/posts')}
                    sx={{ mb: 3, color: theme.palette.text.secondary }}
                    startIcon={<span>←</span>}
                >
                    All posts
                </Button>


                {isLoading
                    ? <Skeleton style={{ height: 148, width: "100%" }} />
                    : (
                        <Typography variant="h4" fontWeight={600} gutterBottom>
                            404 Post Not Found
                        </Typography>
                    )
                }


                <Typography variant="subtitle1" color="text.secondary" gutterBottom>

                </Typography>

                <Divider />

                <Box sx={{ mb: 2 }}>
                    <BlogSignature />
                </Box>
            </Box>
        </Container>
    ) : (
        <Container maxWidth="md">
            <Box
                component={motion.div}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                sx={{
                    maxWidth: windowSize.width < 600 ? "100%" : 800,
                    mx: "auto",
                    px: 2,
                    py: { xs: 4, md: 6 },
                }}
            >
                <Button
                    onClick={onBack ? onBack : () => navigate('/posts')}
                    sx={{ mb: 3, color: theme.palette.text.secondary }}
                    startIcon={<span>←</span>}
                >
                    All posts
                </Button>

                <Typography variant="h4" fontWeight={600} gutterBottom>
                    {(post.title as any).rendered.replace("&#8217;", "'").replace("&amp;", "&")}
                </Typography>

                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                    {post.slug.startsWith("%") ? post.slug.split("-").slice(1).join("-") : post.slug}
                </Typography>

                <Divider sx={{ my: 3 }} />

                <Box display="flex" justifyContent="space-between" flexWrap="wrap" mb={4}>
                    <Box>
                        <Typography variant="body2" color="text.secondary">
                            Published
                        </Typography>
                        <Typography variant="body1" fontWeight={500}>
                            {moment(post.date).format("MMMM Do YYYY")}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant="body2" color="text.secondary">
                            Topic
                        </Typography>
                        <Stack direction="row" spacing={1}>
                            {post.categories.map((categoryID: number) => (
                                <Chip
                                    label={getCategoryLabel(categoryID)}
                                    size="small"
                                    sx={{
                                        fontWeight: 500,
                                        mt: 0.5,
                                        backgroundColor: "#444",// ||theme.palette.primary.main,
                                        color: theme.palette.primary.contrastText,
                                    }}
                                />
                            ))}
                        </Stack>
                    </Box>
                </Box>
                <Box sx={{ textAlign: "center", mx: "auto" }}>
                    <Box
                        component={motion.img}
                        src={post.jetpack_featured_media_url}
                        alt="Post cover"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        sx={{
                            width: "100%",
                            height: windowSize.width < 600 ? "auto" : "auto",
                            // maxHeight: 800,
                            borderRadius: 2,
                            // mb: 4,
                            boxShadow: 3
                        }}
                    /></Box>
            </Box>
            <Box sx={{ mb: 2 }}>
                {/* @ts-ignore */}
            {/* ) : 
        } */}
        {/* <BlogPostRenderer content={(post.content as any).markdown} /> */}
                {(post?.content as any)?.rendered.startsWith("#")
                    ? (
                        <MarkdownWrapper>
                            {(post.content as any).rendered}
                        </MarkdownWrapper>
                    ) : (
                        <Box
                            component="div"
                            ref={codeContainerRef}
                            dangerouslySetInnerHTML={{
                                __html: (post.content as any).rendered.replace(
                                    /<pre class="wp-block-code"><code>/g,
                                    '<pre class="wp-block-code"><code class="language-ts">'
                                )
                            }}
                            className="blog-post-content"
                            sx={{
                                "& pre": {
                                    backgroundColor: "#1e1e1e",
                                    padding: "1rem",
                                    borderRadius: 2,
                                    overflowX: "auto",
                                    fontFamily: "'Fira Code', Menlo, monospace",
                                    fontSize: "1rem",  // bumped from 0.9rem
                                    lineHeight: 1.6,
                                },
                                "& code": {
                                    display: "block",
                                    color: "#ddd",
                                    whiteSpace: "pre"
                                },
                                "& a": {
                                    color: "primary.main",
                                    textDecoration: "underline",
                                    wordBreak: "break-word",
                                    "&:hover": {
                                        textDecoration: "none",
                                        opacity: 0.85,
                                    },
                                },
                                "& img": {
                                    maxWidth: "100%",
                                    height: "auto",
                                    borderRadius: 2,
                                    display: "block",
                                    margin: "1rem auto",
                                    boxShadow: 2,
                                },

                                // Heading adjustments
                                "& h1": { fontSize: "2rem", fontWeight: 700, mt: 5, mb: 3 },
                                "& h2": { fontSize: "1.75rem", fontWeight: 700, mt: 4, mb: 2 },
                                "& h3": { fontSize: "1.4rem", fontWeight: 600, mt: 3, mb: 2 },
                                "& h4": { fontSize: "1.2rem", fontWeight: 600, mt: 2, mb: 1 },
                                "& h5, & h6": { fontSize: "1rem", fontWeight: 600, mt: 2, mb: 1 },

                                "& p": { fontSize: "1.05rem", lineHeight: 1.7, mb: 2 },

                                "& ul": {
                                    pl: 3,
                                    mb: 2,
                                    fontSize: "1.05rem",
                                },
                                "& li": {
                                    mb: 1,
                                },

                                // Table styles
                                "& table": {
                                    width: "100%",
                                    borderCollapse: "collapse",
                                    margin: "1.5rem 0",
                                    boxShadow: 2,
                                },
                                "& th, & td": {
                                    border: "1px solid #444",
                                    padding: "0.75rem 1rem",
                                    textAlign: "left",
                                    verticalAlign: "top",
                                    fontSize: "1rem",
                                },
                                "& th": {
                                    backgroundColor: "rgba(0, 0, 0, 0.2)",
                                    fontWeight: 700,
                                    color: "#fff",
                                },
                                "& td": {
                                    backgroundColor: "#111",
                                    color: "#ddd",
                                },
                            }}

                        // sx={{
                        //     "& pre": {
                        //         backgroundColor: "#1e1e1e",
                        //         padding: "1rem",
                        //         borderRadius: 2,
                        //         overflowX: "auto",
                        //         fontFamily: "'Fira Code', Menlo, monospace",
                        //         fontSize: "0.9rem",
                        //         lineHeight: 1.6,
                        //     },
                        //     "& code": {
                        //         display: "block",
                        //         color: "#ddd",
                        //         whiteSpace: "pre",
                        //     },
                        //     "& a": {
                        //         color: "primary.main",
                        //         textDecoration: "underline",
                        //         wordBreak: "break-word",
                        //         "&:hover": {
                        //             textDecoration: "none",
                        //             opacity: 0.85,
                        //         },
                        //     },
                        //     "& img": {
                        //         maxWidth: "100%",
                        //         height: "auto",
                        //         borderRadius: 2,
                        //         display: "block",
                        //         margin: "1rem auto",
                        //         boxShadow: 2,
                        //     },
                        //     "& h1, & h2, & h3, & h4, & h5, & h6": {
                        //         fontWeight: 600,
                        //         mt: 4,
                        //         mb: 2,
                        //     },
                        //     "& ul": {
                        //         pl: 3,
                        //         mb: 2,
                        //     },
                        //     "& li": {
                        //         mb: 1,
                        //     },
                        //     "& table": {
                        //         width: "100%",
                        //         borderCollapse: "collapse",
                        //         margin: "1.5rem 0",
                        //         boxShadow: 2,
                        //     },
                        //     "& th, & td": {
                        //         border: "1px solid #333",
                        //         padding: "0.75rem 1rem",
                        //         textAlign: "left",
                        //         verticalAlign: "top",
                        //         fontSize: "0.9rem"
                        //     },
                        //     "& th": {
                        //         backgroundColor: "rgba(0, 0, 0, 0.2)",
                        //         fontWeight: 600,
                        //         color: "#fff"
                        //     },
                        //     "& td": {
                        //         backgroundColor: "#111",
                        //         color: "#ddd"
                        //     },

                        // }}
                        />
                    )
                }
                <BlogSignature />
                {/* <Toolbar /> */}
            </Box>
        </Container>
    );
};

export default SinglePostPage;
