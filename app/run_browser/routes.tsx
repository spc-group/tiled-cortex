import type { Route } from "./+types/home";
import {
    QueryClient,
    QueryClientProvider,
} from  '@tanstack/react-query';
import RunList from "./run_list";
import Navbar from "../navbar";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "Run Browser | Cortex" },
    { name: "description", content: "Browse past scans at the spectroscopy beamlines" },
  ];
}

const queryClient = new QueryClient();


export default function RunBrowser() {
    return (
        <QueryClientProvider client={queryClient}>
          <Navbar />
          <RunList />
	</QueryClientProvider>
    );
}
