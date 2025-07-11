import { Divider, Grid2 as Grid, List, ListItem, ListItemIcon, ListItemText, Tooltip, IconButton } from '@mui/material';
import MediumIcon from '@mui/icons-material/Article';
import SubstackIcon from '@mui/icons-material/LibraryBooks';
import TwitterIcon from '@mui/icons-material/Twitter';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import useUtilityStore from '@store/utilityStore';

const socialItems = [
    {
        label: 'Subscribe',
        icon: <EmailIcon />,
        url: '/subscribe'
    },
    {
        label: 'Medium',
        icon: <MediumIcon />,
        url: 'https://medium.com/@yourprofile'
    },
    {
        label: 'Substack',
        icon: <SubstackIcon />,
        url: 'https://yoursubstack.substack.com'
    },
    {
        label: 'X',
        icon: <TwitterIcon />,
        url: 'https://x.com/yourhandle'
    },
    { 
        label: "LinkedIn", 
        icon: <LinkedInIcon />, 
        url: "https://www.linkedin.com/in/michaelanthonywoodward" 
    }
];

const SocialLinks = () => {
    const { colorMode } = useUtilityStore();
    return (
        <Grid size={12}>
            <Divider />
            <List sx={{ my: 0, display: 'flex', textAlign: 'left' }}>
                {socialItems.map((item, index) => (
                    <Tooltip title={item.label} key={index} arrow>
                        <ListItem disablePadding>
                            <ListItemIcon>
                                <IconButton
                                    color="inherit"
                                    component="a"
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    sx={{ color: colorMode === "dark" ? "#ccc" : "#444" }}
                                >
                                    {item.icon}
                                </IconButton>
                            </ListItemIcon>
                            <ListItemText secondary={item.label} />
                        </ListItem>
                    </Tooltip>
                ))}
            </List>
            <Divider />
        </Grid>
    );
};

export default SocialLinks;