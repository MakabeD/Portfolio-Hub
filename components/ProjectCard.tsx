import Link from "next/link";

interface ProjectCardProps {
  title: string;
  type: string;
  description: string;
  href: string;
}

export default function ProjectCard({ title, type, description, href }: ProjectCardProps) {
  return (

    <Link href={href} style={{ textDecoration: 'none', color: 'inherit' }}>
      
      {}
      <article style={{ border: '1px solid black', padding: '1rem', marginBottom: '1rem', cursor: 'pointer' }}>
        <h3>{title}</h3>
        <small>Type: <strong>{type}</strong></small>
        <p>Description: {description}</p>
      </article>
      
    </Link>
  );
}