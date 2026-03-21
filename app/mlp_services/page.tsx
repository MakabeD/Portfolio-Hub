import Link from "next/link";

import PlaygroundCard from "@/components/PlaygroundCard";

import { projectsData } from "../../data/projects";
import { playgroundsData } from "../../data/playgrounds"
export default function Mlpservices() {

    const project = projectsData.find(p => p.slug === "mlp_services");

    if (!project) {
        return <h1>Project did not find </h1>;
    }

    return (
        <main style={{ padding: '2rem' }}>

            <h1 style={{ border: '1px solid black', padding: '1rem' }}>
                {project.title}
            </h1>

            <p style={{ border: '1px solid black', padding: '1rem', marginTop: '1rem' }}>
                {project.description_large}
            </p>

            <div style={{ border: '1px solid black', padding: '1rem', marginTop: '1rem' }}>
                <h3>Technologies & Stack:</h3>
                <ul>
                    {project.technologies.map((tech, index) => (
                        <li key={index}>{tech}</li>
                    ))}
                </ul>

            </div>

            <div style={{ marginTop: '2rem' }}>
                <h2 style={{ borderBottom: '2px solid black', paddingBottom: '0.5rem' }}>
                    Our services (Playgrounds)
                </h2>
                <div>
                    {playgroundsData.map((info) => (
                        <PlaygroundCard
                            key={info.id}
                            title={info.tilte}
                            description={info.description}
                        />
                    ))}
                </div>
            </div>

        </main>
    );
}