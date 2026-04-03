import { useParams, Link } from 'react-router-dom';
import { PROJECTS } from './Projects';

function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    return (
      <section className='min-h-screen px-12 pt-32 pb-16 flex items-center'>
        <p className='text-silver/50 text-sm tracking-widest uppercase'>
          Project not found
        </p>
      </section>
    );
  }

  return (
    <section className='min-h-screen px-12 pt-32 pb-16 flex flex-col'>
      {/* Back link */}
      <Link
        to='/projects'
        className='text-xs tracking-widest uppercase text-silver/40 hover:text-beige transition-colors duration-300 mb-10'
      >
        ← Projects
      </Link>

      {/* Row layout — video left, info right */}
      <div className='flex flex-col lg:flex-row gap-10 items-start'>
        {/* Video — YouTube embed or placeholder */}
        <div className='w-full lg:w-3/5 aspect-video bg-charcoal overflow-hidden shrink-0'>
          {project.youtubeId ? (
            <iframe
              className='w-full h-full'
              src={`https://www.youtube.com/embed/${project.youtubeId}`}
              title={project.title}
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen
            />
          ) : (
            <div className='w-full h-full bg-silver/5' />
          )}
        </div>

        {/* Info */}
        <div className='flex flex-col gap-4'>
          <span className='text-xs tracking-widest uppercase text-silver/30'>
            {project.id}
          </span>
          <h1 className='text-3xl font-light tracking-wide text-beige'>
            {project.title}
          </h1>
          <p className='text-sm text-silver/60 leading-loose tracking-wide'>
            {project.description}
          </p>
        </div>
      </div>
    </section>
  );
}

export default ProjectDetail;
