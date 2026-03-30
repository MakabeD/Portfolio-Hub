import Link from 'next/link'

interface PlaygroundCardProps
{
    title:string,
    description:string,
    slug:string
}

export default function PlaygroundCard({title, description, slug}:PlaygroundCardProps) {
    return (
        <Link href={`/mlp_services/${slug}`} style={{ color: 'inherit', textDecoration: 'none' }} >
            <article style={{ border: '1px solid' }}>
                <h3>{title}</h3>
                <small>Type <strong>MLP services</strong></small>
                <p>{description} </p>
            </article>
        </Link>
    )
}
