
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { Link } from "react-router";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import RssFeedIcon from "@mui/icons-material/RssFeed";

const BlogSignature = () => {
    return (
        <Box
            component="section"
            sx={{
                mt: 10,
                pt: 4,
                borderTop: "1px solid rgba(255,255,255,0.1)",
                textAlign: "center",
                opacity: 0.85,
                mb: 2,
            }}
        >

            <Typography variant="body1" sx={{ mb: 1 }}>
                Thanks for reading — I’m <strong>Michael Woodward</strong>, a senior engineer and system architect building
                agentic infrastructure for the future of autonomous software.
            </Typography>

            <Typography variant="body2" sx={{ mb: 2 }}>
                I publish tutorials, research, and build logs on AI-powered development systems.
                If you're interested in setting up your own local-first AI engine, check out my{' '}
                <Link to="/services" style={{ textDecoration: 'underline', color: "inherit" }}>
                    consulting services
                </Link>{' '}
                or follow along for new posts.
            </Typography>

            {/* <Stack direction="row" spacing={2} justifyContent="center">
                <IconButton href="https://github.com/loveliiivelaugh" target="_blank" size="small" color="primary">
                    <GitHubIcon fontSize="small" />
                </IconButton>
                <IconButton href="https://x.com/LoveLiiiveLaugh" target="_blank" size="small" color="primary">
                    <TwitterIcon fontSize="small" />
                </IconButton>
                <IconButton href="https://www.linkedin.com/in/michaelanthonywoodward/" target="_blank" size="small" color="primary">
                    <LinkedInIcon fontSize="small" />
                </IconButton>
                <IconButton href="/rss.xml" target="_blank" size="small" color="primary">
                    <RssFeedIcon fontSize="small" />
                </IconButton>
            </Stack> */}
        </Box>
    )
}

export default BlogSignature;
