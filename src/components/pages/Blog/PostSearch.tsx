import { useState, useMemo } from "react";
import { useNavigate } from "react-router";
import { useFuse } from '@helpers/fuse';
import { Autocomplete, Avatar, Box, TextField, Typography } from '@mui/material';
import { postsData } from "./postsData";

const fuseOptions = {
    keys: ["title", "subtitle", "content"],
    threshold: 0.3,
    ignoreLocation: true,
};

export default function PostSearch() {
    const navigate = useNavigate();
    const { fuse } = useFuse({ list: postsData, fuseOptions });
    const [input, setInput] = useState("");

    const filteredPosts = useMemo(() => {
        if (!input) return [];
        return fuse.search(input).map((result: { item: any }) => result.item);
    }, [input, fuse]);

    return (
        <Autocomplete
            freeSolo
            options={filteredPosts}
            getOptionLabel={(option: any) => option.title}
            onInputChange={(_, value) => setInput(value)}
            renderInput={(params) => (
                <TextField {...params} label="Search for a post" variant="outlined" fullWidth />
            )}
            renderOption={(props, option) => (
                <Box
                    component="li"
                    sx={{ display: "flex", alignItems: "center", gap: 2, p: 1 }}
                    {...props}
                >
                    <Avatar
                        src={option.coverImageUrl}
                        alt={option.title}
                        variant="rounded"
                        sx={{ width: 48, height: 48 }}
                    />
                    <Box>
                        <Typography fontWeight={500}>{option.title}</Typography>
                        <Typography variant="body2" color="text.secondary">
                            {option.subtitle}
                        </Typography>
                    </Box>
                </Box>
            )}
            onChange={(_, selected) => {
                if (selected) {
                    navigate(`/posts/${selected.id}`, { state: {post: selected}});
                    // You can route to the blog post or display its content
                    console.log("Selected post:", selected);
                }
            }}
        />
    );
}