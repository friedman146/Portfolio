import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { type Project } from '../api'

function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>()
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!slug) return
    fetch(`/api/projects/${slug}`)
      .then((r) => {
        if (r.status === 404) { setNotFound(true); setLoading(false); return null }
        return r.json()
      })
      .then((data) => {
        if (data) { setProject(data); setLoading(false) }
      })
  }, [slug])

  if (loading) {
    return (
      <section className="min-h-screen px-12 pt-32 pb-16 flex flex-col">
        <div className="h-3 w-16 bg-charcoal animate-pulse mb-10" />
        <div className="flex flex-col lg:flex-row gap-10 items-start">
          <div className="w-full lg:w-3/5 aspect-video bg-charcoal animate-pulse shrink-0" />
          <div className="flex flex-col gap-4 w-full">
            <div className="h-3 w-8 bg-charcoal animate-pulse" />
            <div className="h-8 w-48 bg-charcoal animate-pulse" />
            <div className="h-3 w-full bg-charcoal animate-pulse" />
            <div className="h-3 w-3/4 bg-charcoal animate-pulse" />
          </div>
        </div>
      </section>
    )
  }

  if (notFound || !project) {
    return (
      <section className="min-h-screen px-12 pt-32 pb-16 flex items-center">
        <p className="text-silver/50 text-sm tracking-widest uppercase">Project not found</p>
      </section>
    )
  }

  return (
    <section className="min-h-screen px-12 pt-32 pb-16 flex flex-col">
      <Link
        to="/projects"
        className="text-xs tracking-widest uppercase text-silver/40 hover:text-beige transition-colors duration-300 mb-10"
      >
        ← Projects
      </Link>

      <div className="flex flex-col lg:flex-row gap-10 items-start">
        <div className="w-full lg:w-3/5 aspect-video bg-charcoal overflow-hidden shrink-0">
          {project.youtube_id ? (
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${project.youtube_id}`}
              title={project.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="w-full h-full bg-silver/5" />
          )}
        </div>

        <div className="flex flex-col gap-4">
          <span className="text-xs tracking-widest uppercase text-silver/30">
            {String(project.sort_order).padStart(2, '0')}
          </span>
          <h1 className="text-3xl font-light tracking-wide text-beige">{project.title}</h1>
          <p className="text-sm text-silver/60 leading-loose tracking-wide">{project.description}</p>
        </div>
      </div>
    </section>
  )
}

export default ProjectDetail
