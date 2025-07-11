import {Typography, Button, Grid2 as Grid, Box, Card, Chip, Avatar, ListItem, ListItemAvatar, ListItemText} from "@mui/material";
import RightChevronArrowIcon from "@mui/icons-material/ChevronRight"
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import MarkdownWrapper from "@components/Custom/wrappers/MarkdownWrapper/MarkdownWrapper";
import coverImage from "@assets/cover.png";
import { useQuery } from '@tanstack/react-query';
import { queries } from '@api/index';


const fadeInVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.1, duration: 0.4 }
    })
};

const FeaturedPostsSection: React.FC = () => {
    const navigate = useNavigate();
    const wordpressQuery: any = useQuery(queries.wordpressQuery());
    const posts = wordpressQuery?.data;

    console.log(posts);
    return (
        <Box component="section" sx={{ mx: "auto" }}>
            <Typography variant="h4" fontWeight={400} mb={4}>
                Featured Posts
            </Typography>

            {posts && posts.map((post: any, i: number) => (
                <motion.div
                    key={post.slug}
                    variants={fadeInVariant}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={i}
                >
                    <Card elevation={0} sx={{ p: 4, px: 4, m: 1, borderRadius: 6, mb: 8 }}>
                        <Grid container columnSpacing={2}>
                            <Grid size={12} mb={2}>
                                <Chip label="category" />
                            </Grid>
                            <Grid size={{ sm: 12, md: 6 }}>
                                <Typography variant="h6" fontWeight={600}>
                                    {post.title.rendered}
                                </Typography>
                                
                                {/* Authors */}
                                <Grid container>
                                    {["Michael Woodward", "OpenAI ChatGPT Pro"].map((author, index) => (
                                        <Grid key={index} size={{ sm: 12, md: 6 }}>
                                            <ListItem>
                                                <ListItemAvatar>
                                                    <Avatar src={author}>
                                                        {author.charAt(0)}
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText primary={<b>{author}</b>} secondary={!index ? "Engineering" : "AI"} />
                                            </ListItem>
                                        </Grid>
                                    ))}
                                </Grid>

                                <Typography variant="body2" color="text.secondary">
                                    {new Date(post.date || "").toLocaleDateString()}
                                </Typography>
                                <MarkdownWrapper isRawHtml>
                                    {post.excerpt?.rendered ?? ""}
                                </MarkdownWrapper>
                                <Box sx={{ display: "flex", justifyContent: "end", px: 2 }}>
                                    <Button
                                        // variant="contained"
                                        size="small"
                                        onClick={() => navigate(`/posts/${post.slug}`, { state: { post } })}
                                        sx={{ textTransform: "none" }}
                                    >
                                        Read More <RightChevronArrowIcon fontSize="small" />
                                    </Button>
                                </Box>
                            </Grid>

                            <Grid size={{ sm: 12, md: 6 }}>
                                <Box sx={{ textAlign: "center", mx: "auto", p: 2 }}>
                                    <Box
                                        component={motion.img}
                                        src={coverImage || post.featured_media}
                                        alt="Post cover"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.6 }}
                                        sx={{
                                            height: 365,
                                            borderRadius: 2
                                        }}
                                    />
                                </Box>
                            </Grid>

                        </Grid>
                    </Card>
                </motion.div>
            ))}
        </Box>
    );
};

export default FeaturedPostsSection;
