import React from "react";
import {
    Box,
    Grid,
    TextField,
    Typography,
    Button,
    useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import FormContainer from "@components/Custom/forms/FormContainer";

const ContactPage: React.FC = () => {
    const theme = useTheme();

    return (
        <Box
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            sx={{
                maxWidth: 800,
                mx: "auto",
                px: 2,
                py: { xs: 6, md: 10 },
            }}
        >
            <Typography variant="h4" gutterBottom fontWeight={600}>
                Let’s connect!
            </Typography>

            <Typography variant="body1" color="text.secondary" mb={3}>
                Have a question, want to collaborate, or discuss guest posts and backlinks?
                I’m always open to connecting with like-minded individuals.
            </Typography>

            <Typography variant="body1" color="text.secondary" mb={4}>
                Drop me a message, and let’s explore how we can work together or help
                each other grow. Looking forward to hearing from you!
            </Typography>

            {/* Custom FormContainer with schema */}
            <FormContainer
                schema={{
                    table: "contact",
                    columns: [
                        { name: "name", dataType: "text" },
                        { name: "topic", dataType: "text" },
                        { name: "message", dataType: "text" }
                    ]
                }}
            />
                {/* <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            name="name"
                            label="Name"
                            defaultValue=""
                            variant="outlined"
                            InputProps={{ sx: { bgcolor: theme.palette.background.default } }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            name="topic"
                            label="Topic"
                            defaultValue=""
                            variant="outlined"
                            InputProps={{ sx: { bgcolor: theme.palette.background.default } }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            name="message"
                            label="Message"
                            placeholder="Your message"
                            variant="outlined"
                            InputProps={{ sx: { bgcolor: theme.palette.background.default } }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            type="submit"
                            fullWidth
                            sx={{
                                bgcolor: theme.palette.common.white,
                                color: theme.palette.text.primary,
                                fontWeight: 600,
                                py: 1.5,
                                borderRadius: 2,
                                ":hover": {
                                    bgcolor: theme.palette.grey[200],
                                },
                            }}
                        >
                            Submit
                        </Button>
                    </Grid>
                </Grid> */}

            {/* Optional Links Section */}
            <Box mt={6}>
                <Typography variant="h6" gutterBottom>
                    Links
                </Typography>
                <Box display="flex" flexDirection="column" gap={1}>
                    <a href="https://medium.com" target="_blank" rel="noopener noreferrer">
                        Medium ↗
                    </a>
                    <a href="https://substack.com" target="_blank" rel="noopener noreferrer">
                        Substack ↗
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                        Twitter ↗
                    </a>
                </Box>
            </Box>
        </Box>
    );
};

export default ContactPage;
