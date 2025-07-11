import { Box, IconButton, Tooltip } from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn, YouTube, GitHub } from "@mui/icons-material";

const socialLinks = [
    { label: "Facebook", icon: <Facebook />, link: "https://www.facebook.com" },
    { label: "Twitter", icon: <Twitter />, link: "https://www.twitter.com" },
    { label: "Instagram", icon: <Instagram />, link: "https://www.instagram.com" },
    { label: "LinkedIn", icon: <LinkedIn />, link: "https://www.linkedin.com/in/michaelanthonywoodward" },
    { label: "YouTube", icon: <YouTube />, link: "https://www.youtube.com" },
    { label: "GitHub", icon: <GitHub />, link: "https://github.com/loveliiivelaugh" },
];

const SocialBar = () => {
    return (
        <Box>
            {socialLinks.map((social, index) => (
                <Tooltip title={social.label}>
                    <IconButton key={index} component="a" href={social.link} target="_blank" rel="noopener noreferrer" color="primary">
                        {social.icon}
                    </IconButton>
                </Tooltip>
            ))}
        </Box>
    );
};

export default SocialBar
