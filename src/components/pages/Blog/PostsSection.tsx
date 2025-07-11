import moment from 'moment';
import { Grid2 as Grid, ListItemText, Skeleton } from '@mui/material';
import { List, ListItem, ListItemAvatar, ListItemButton } from '@mui/material';
import { useNavigate } from "react-router";
import { useQuery } from '@tanstack/react-query';
import { queries } from '@api/index';
import SlideIn from '@theme/animations/SlideIn';
import { trackAnalyticsEvent } from '@utilities/lib/useAnalytics';

const PostsSection = ({ posts }: any) => {
    const wordpressQuery: any = useQuery(queries.wordpressQuery())
    const navigate = useNavigate();

    if (!posts) posts = wordpressQuery?.data;

    const handlePostClick = (post: { slug: string }) => {
        navigate("/post/" + post.slug, { state: { post } });
        trackAnalyticsEvent({
            project: 'blog',
            page: '/posts',
            type: 'click',
            description: 'Post Clicked',
            metadata: {
                slug: post.slug,
                post: post
            }
        })
    };
    return (
        <Grid size={12}>
            <List>
                {!posts
                    ? <Skeleton variant="text" width={210} height={40} />
                    : posts?.map((listItem: any, index: number) => {
                        const title = listItem.title.rendered.replace("&#8217;", "'").replace("&amp;", "&")
                        const slug = listItem?.slug.startsWith("%") 
                            ? listItem?.slug.split("-").slice(1).join("-") 
                            : listItem?.slug;
                        return (
                            <SlideIn>
                                <ListItem
                                    key={index} 
                                    component={ListItemButton} 
                                    onClick={() => handlePostClick({ ...listItem, slug })}
                                >
                                    <ListItemText 
                                        primary={title} 
                                        secondary={slug}
                                    />
                                    <ListItemAvatar>{moment(listItem.date).format("ddd MMM, D YYYY")}</ListItemAvatar>
                                </ListItem>
                            </SlideIn>
                    )}
                ).reverse()}
            </List>
        </Grid>
    )
}

export default PostsSection