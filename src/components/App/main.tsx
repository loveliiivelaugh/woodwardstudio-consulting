import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { AppRouter } from "@components/routes/AppRouter.tsx";
import "@fontsource/plus-jakarta-sans/latin.css";

const queryClient = new QueryClient();

ReactDOM
	.createRoot(document.getElementById("root") as HTMLElement)
	.render(
		<React.StrictMode>
			{/* <QueryClientProvider client={queryClient}> */}
				<AppRouter />
			{/* </QueryClientProvider> */}
		</React.StrictMode>
	);
