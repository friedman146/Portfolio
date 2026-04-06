import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { api, type Project } from '../api'

// Module-level cache — survives remounts, prevents skeleton flash on back-navigation
let cache: Project[] | null = null

function Projects() {
  const [projects, setProjects] = useState<Project[]>(cache ?? [])
  const [loading, setLoading] = useState(cache === null)

  useEffect(() => {
    if (cache !== null) return
    api.projects.list().then((data) => {
      cache = data
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
                <div className="relative w-full aspect-video bg-charcoal overflow-hidden" style={{ boxShadow: '0px 0 6px 0px #e8e2d9' }}>
                  {project.youtube_id ? (
                    <img
                      src={`https://img.youtube.com/vi/${project.youtube_id}/maxresdefault.jpg`}
                      onError={(e) => {
                        e.currentTarget.src = `https://img.youtube.com/vi/${project.youtube_id}/hqdefault.jpg`
                      }}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-silver/5" />
                  )}

                  {/* Hover overlay — dims thumbnail and shows VIEW */}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition-colors duration-400 flex items-center justify-center">
                    <span className="text-xs tracking-widest uppercase text-beige opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                      View
                    </span>
                  </div>
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
