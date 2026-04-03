import { Link } from 'react-router-dom'

export const PROJECTS = [
  { id: '01', slug: 'project-01', title: 'Project Title', description: 'Project description coming soon.', youtubeId: '' },
  { id: '02', slug: 'project-02', title: 'Project Title', description: 'Project description coming soon.', youtubeId: '' },
  { id: '03', slug: 'project-03', title: 'Project Title', description: 'Project description coming soon.', youtubeId: '' },
  { id: '04', slug: 'project-04', title: 'Project Title', description: 'Project description coming soon.', youtubeId: '' },
]

function Projects() {
  return (
    <section className="min-h-screen px-12 pt-32 pb-16">
      {/* Top — label */}
      <span className="text-xs tracking-widest uppercase text-silver/50">
        Projects
      </span>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        {PROJECTS.map((project) => (
          <Link
            to={`/projects/${project.slug}`}
            key={project.id}
            className="group"
          >
            {/* Video block placeholder — 16:9 */}
            <div className="relative w-full aspect-video bg-charcoal overflow-hidden">
              <div className="absolute inset-0 bg-silver/5 group-hover:bg-silver/10 transition-colors duration-500" />
            </div>

            {/* Project info */}
            <div className="flex justify-between items-baseline mt-3 px-1">
              <span className="text-xs tracking-widest uppercase text-silver/30">
                {project.id}
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
