import { useState, useEffect } from 'react';
import { api } from '../api';

function About() {
  const [title, setTitle] = useState(
    'Circus artist turned\ndigital environment builder.',
  );
  const [description, setDescription] = useState(
    "Hi I'm Paul. I started my career as a circus artist and gradually transitioned into interactive and immersive art. I'm interested in taking people out of their normal perception of the world and placing them into augmented environments through tools like interactive particle systems, distorted point clouds, and projection mapping. My work blends physical movement with digital systems to create responsive, experiential pieces.",
  );
  const [tags, setTags] = useState([
    'Movement',
    'Interaction',
    'Perception',
    'Light',
    'Space',
  ]);

  useEffect(() => {
    api.content.get().then((c) => {
      setTitle(c.about_title);
      setDescription(c.about_description);
      setTags(c.about_tags.split(',').map((t) => t.trim()));
    });
  }, []);

  return (
    <section className='min-h-screen px-12 pt-32 pb-16 flex flex-col justify-between'>
      <span className='text-xs tracking-widest uppercase text-silver/50'>
        About
      </span>

      <div className='max-w-2xl'>
        <h1 className='text-5xl font-light tracking-wide text-beige mb-10 leading-tight whitespace-pre-line'>
          {title}
        </h1>
        <p className='text-sm text-silver/70 leading-loose tracking-wide'>
          {description}
        </p>
      </div>

      <div className='flex items-center justify-between flex-wrap gap-6'>
        <div className='flex gap-6 flex-wrap'>
          {tags.map((tag) => (
            <span
              key={tag}
              className='text-xs tracking-widest uppercase text-silver/30'
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export default About;
