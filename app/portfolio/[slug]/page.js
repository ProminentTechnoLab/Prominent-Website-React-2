import ProjectDetailContent from '../../../components/ProjectDetailContent'
import { projects } from '../data'

export async function generateMetadata({ params }) {
    const { slug } = await params
    const project = projects.find(p => p.slug === slug)
    if (!project) return { title: 'Project Not Found' }

    return {
        title: `${project.title} — Case Study`,
        description: project.description,
        openGraph: {
            title: `${project.title} | Prominent TechnoLabs`,
            description: project.description,
            images: [{ url: project.image }],
        }
    }
}

export async function generateStaticParams() {
    return projects.map((project) => ({
        slug: project.slug,
    }))
}

export default async function ProjectPage({ params }) {
    const { slug } = await params
    const project = projects.find(p => p.slug === slug)
    
    if (!project) return <div>Project not found</div>

    return (
        <>
            <ProjectDetailContent project={project} />
        </>
    )
}
