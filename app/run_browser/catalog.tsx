import type { Route } from "./+types/home";
import {
    QueryClient,
    QueryClientProvider,
} from  '@tanstack/react-query';
import RunList from "./run_list";
import Navbar from "../navbar";


const queryClient = new QueryClient();


export default function RunBrowser() {
    return (
        <QueryClientProvider client={queryClient}>
          <Navbar />
          <RunList />
	</QueryClientProvider>
    );
}
