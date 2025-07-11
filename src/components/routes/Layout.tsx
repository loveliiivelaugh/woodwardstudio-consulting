// src/components/Layout/Layout.tsx
import { Outlet } from "react-router-dom";
import { Container, Typography, Grid2 as Grid } from "@mui/material";
import Providers from "@components/Custom/providers/Providers";
import { Navbar } from "@components/Custom/ReusableNavbar/ReusableNavbar";

const Footer = () => (
  <Grid size={12} sx={{ bgcolor: "transparent", backdropFilter: "blur(8px)" }} mt={2} mb={2}>
    <Container maxWidth="md" sx={{ justifyContent: "space-between", display: "flex" }}>
      <Typography variant="body1">From Chicago with ❤️</Typography>
      <Typography variant="body1">Ⓒ 2025 Michael Woodward</Typography>
    </Container>
  </Grid>
);

export default function Layout() {
  return (
    <Providers>
      {() => (
        <main>
          <Navbar />
          <Container maxWidth="md" sx={{ mt: 10 }}>
            <Outlet />
          </Container>
          <Footer />
        </main>
      )}
    </Providers>
  );
}
