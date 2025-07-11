import { Grid2 as Grid, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import NewsletterSection from './Blog/NewsletterSection';
import PostsSection from './Blog/PostsSection';
import { ScrollToTop } from '@components/Custom/providers/Providers';

const topics = ["AI", "Design", "Engineering", "Automation", "Architecture"];

const PostsPage = () => {
    return (
        <ScrollToTop>
            <Grid size={12}>
                <Typography variant="h5">
                    Topics
                </Typography>
                <List sx={{ pl: 4, display: "flex" }}>
                    {topics.map((topic, index) => (
                        <ListItem key={index}>
                            <ListItemIcon sx={{ color: "inherit" }}>{"→"}</ListItemIcon>
                            <ListItemText secondary={topic} />
                        </ListItem>
                    ))}
                </List>
            </Grid>
            <PostsSection />
            {/* <NewsletterSection /> */}
        </ScrollToTop>
    )
};

export default PostsPage;