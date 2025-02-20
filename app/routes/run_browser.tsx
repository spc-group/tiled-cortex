import type { Route } from "./+types/home";
import { RunBrowser } from "../run_browser/run_browser";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "SPC Group Beamlines" },
    { name: "description", content: "Tools for managing spectroscopy group beamlines" },
  ];
}

export default function Runs() {
    return <RunBrowser />;
}
