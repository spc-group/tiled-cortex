import type { Route } from "./+types/home";
import RunList from "./run_list";
import Navbar from "../navbar";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Run Browser | Cortex" },
    { name: "description", content: "Browse past scans at the spectroscopy beamlines" },
  ];
}

export default function RunBrowser() {
    return (
        <div>
          <Navbar />
          <RunList />
        </div>
    );
}
