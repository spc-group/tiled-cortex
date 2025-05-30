import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "SPC Group Beamlines" },
    { name: "description", content: "Tools for managing spectroscopy group beamlines" },
  ];
}

export default function Home() {
  return <Welcome />;
}
