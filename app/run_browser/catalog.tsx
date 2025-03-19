import type { Route } from "./+types/home";
import RunList from "./run_list";
import Navbar from "../navbar";

export default function RunBrowser() {
    return (
        <>
          <Navbar />
          <RunList />
        </>
    );
}
