import { createBrowserRouter, RouterProvider, Outlet, useLocation } from "react-router";
// import { Container, Grid2 as Grid, Typography } from '@mui/material';
import DashboardLayoutBasic from "@components/Mui/Dashboard/Dashboard";
import Providers from "@components/Custom/providers/Providers";
import { Navbar } from '@components/Custom/ReusableNavbar/ReusableNavbar';
import PostsPage from '@components/pages/PostsPage';
import ContactPage from '@components/pages/Contact';
import SinglePostPage from "../pages/SinglePostPage"
import ServicesPage, { ServicesPage2 } from "../pages/Services";
import { PageTransitionWrapper } from "@theme/ThemeProvider";
import { Box, Container, Grid2 as Grid, IconButton, Typography, Button, Stack } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Link } from "react-router"; // or next/link depending on your stack
import Consulting from "@components/pages/Consulting";
import BookingPage, { StepForm } from "@components/pages/BookingPage";

const Footer = () => {
  const location = useLocation();

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "transparent",
        backdropFilter: "blur(8px)",
        mt: 4,
        py: 6,
        borderTop: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      <Container maxWidth="md">
        <Grid container spacing={3}>
          {/* CTA */}
          {location.pathname.includes("/consulting")
            ? <></> 
            : (
              <Grid size={12} textAlign="center">
                <Typography variant="h6" sx={{ mb: 1 }}>
                  Need help with automation, AI infra, or self-hosting?
                </Typography>
                <Button
                  variant="outlined"
                  color="secondary"
                  size="small"
                  component={Link}
                  to="/consulting"
                  sx={{ px: 3, fontWeight: 500 }}
                >
                  Work with Me
                </Button>
                <Typography variant="caption" sx={{ mt: 1, display: "block" }}>
                  I help teams build sovereign AI-powered developer systems.
                </Typography>
              </Grid>
            )
          }

          {/* Social and Copyright */}
          <Grid size={6} order={2}>
            <Stack direction="row" spacing={1} justifyContent={{ xs: "flex-start", sm: "flex-end" }}>
                <IconButton
                  component="a"
                  href="https://github.com/loveliiivelaugh"
                  target="_blank"
                  rel="noopener"
                  size="small"
                  color="primary"
                >
                  <GitHubIcon fontSize="small" />
                </IconButton>
                <IconButton
                  component="a"
                  href="https://x.com/LoveLiiiveLaugh"
                  target="_blank"
                  rel="noopener"
                  size="small"
                  color="primary"
                >
                  <TwitterIcon fontSize="small" />
                </IconButton>
                <IconButton
                  component="a"
                  href="https://www.linkedin.com/in/michaelanthonywoodward/"
                  target="_blank"
                  rel="noopener"
                  size="small"
                  color="primary"
                >
                  <LinkedInIcon fontSize="small" />
                </IconButton>
              </Stack>
          </Grid>

          {/* Back to Posts */}
          <Grid size={6} order={1}>
            {location.pathname.includes("/post/") ? (
                <Button
                    variant="outlined"
                    color="primary"
                    component={Link}
                    to="/posts"
                    size="small"
                >
                    ← Back to All Posts
                </Button>
            ) : <Box></Box>}
          </Grid>

          <Grid size={12} order={3}>
            <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
                <Typography variant="body2">From Chicago with ❤️</Typography>
                <Typography variant="body2">Ⓒ 2025 Michael Woodward</Typography>
            </Stack>
          </Grid>

        </Grid>
      </Container>
    </Box>
  );
};

const routes = [
    {
        path: "",
        // element: (<BookingPage />)
        element: (<Consulting />)
    },
    {
        path: "/post/:postId",
        element: (<SinglePostPage />)
    },
    {
        path: "/posts/:postId",
        element: (<SinglePostPage />)
    },
    {
        path: "/posts",
        label: "All Posts",
        element: (<PostsPage />)
    },
    {
        path: "/contact",
        label: "Contact",
        element: (<ContactPage />)
    },
    {
        path: "/services",
        label: "Services",
        element: (<ServicesPage2 />)
    },
    {
        path: "/consulting",
        label: "Consulting",
        element: (<ServicesPage2 />)
    },
    {
        path: "/qr",
        element: (<ServicesPage2 />)
    },
    {
        path: "/booking/:id",
        element: (<BookingPage />)
    },
    {
        path: "/booking",
        element: (<StepForm />)
        // element: (<BookingPage />)
    },
    // TODO -- Add 404 catchall page
];

// Layout.tsx
export default function Layout() {
    const location = useLocation();
    return (
        <Providers>
            {() => (
                <main style={{ overscrollBehaviorX: 'none', overflowX: 'hidden' }}>
                    <Navbar />
                    <Container maxWidth={location.pathname.includes("/consulting") ? "lg" : "md"} sx={{ 
                        mt: { xs: 20, sm: 10 }, // 20 on mobile (xs), 10 on sm and up
                    }}>
                        <Outlet />
                    </Container>
                    <Footer />
                </main>
            )}
        </Providers>
    );
};


export function AppRouter() {
    const appRoutes = [
        {
            path: "/",
            id: "root",
            element: (<Layout />),
            children: routes
        }
    ];
    const appRouter = createBrowserRouter(appRoutes);
    return (
        <PageTransitionWrapper>
            <RouterProvider router={appRouter} />
        </PageTransitionWrapper>
    )
};