import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { api, type Project } from '../api'

function Projects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.projects.list().then((data) => {
      setProjects(data)
      setLoading(false)
    })
  }, [])

  return (
    <section className="min-h-screen px-12 pt-32 pb-16">
      <span className="text-xs tracking-widest uppercase text-silver/50">Projects</span>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="group">
                <div className="w-full aspect-video bg-charcoal animate-pulse" />
                <div className="flex justify-between mt-3 px-1">
                  <div className="h-3 w-6 bg-charcoal animate-pulse" />
                  <div className="h-3 w-24 bg-charcoal animate-pulse" />
                </div>
              </div>
            ))
          : projects.map((project) => (
              <Link to={`/projects/${project.slug}`} key={project.slug} className="group">
                <div className="relative w-full aspect-video bg-charcoal overflow-hidden">
                  <div className="absolute inset-0 bg-silver/5 group-hover:bg-silver/10 transition-colors duration-500" />
                </div>
                <div className="flex justify-between items-baseline mt-3 px-1">
                  <span className="text-xs tracking-widest uppercase text-silver/30">
                    {String(project.sort_order).padStart(2, '0')}
                  </span>
                  <span className="text-xs tracking-widest uppercase text-silver/50 group-hover:text-beige transition-colors duration-300">
                    {project.title}
                  </span>
                </div>
              </Link>
            ))}
      </div>
    </section>
  )
}

export default Projects
