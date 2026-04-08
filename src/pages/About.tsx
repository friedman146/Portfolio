import { useState, useEffect } from 'react';
import { api } from '../api';
import SocialIcons from '../components/SocialIcons';

function About() {
  const [title, setTitle] = useState('Circus artist turned\ndigital environment builder.');
  const [description, setDescription] = useState(
    "Hi I'm Paul. I started my career as a circus artist and gradually transitioned into interactive and immersive art. I'm interested in taking people out of their normal perception of the world and placing them into augmented environments through tools like interactive particle systems, distorted point clouds, and projection mapping. My work blends physical movement with digital systems to create responsive, experiential pieces."
  );
  const [tags, setTags] = useState(['Movement', 'Interaction', 'Perception', 'Light', 'Space']);
  const [youtube, setYoutube] = useState('');
  const [instagram, setInstagram] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    api.content.get().then((c) => {
      setTitle(c.about_title);
      setDescription(c.about_description);
      setTags(c.about_tags.split(',').map((t) => t.trim()));
      setYoutube(c.social_youtube ?? '');
      setInstagram(c.social_instagram ?? '');
      setImage(c.about_image ?? '');
    });
  }, []);

  return (
    <section className='min-h-screen px-12 pt-32 pb-16 flex flex-col justify-between'>
      <span className='text-xs tracking-widest uppercase text-silver/50'>About</span>

      {/* Main content row — text left, image right */}
      <div className='flex flex-col lg:flex-row gap-12 items-start'>
        <div className='max-w-2xl flex flex-col gap-6'>
          <h1 className='text-5xl font-light tracking-wide text-beige leading-tight whitespace-pre-line'>
            {title}
          </h1>
          <p className='text-sm text-silver/70 leading-loose tracking-wide'>
            {description}
          </p>
        </div>

        {image && (
          <div className='w-full lg:w-72 shrink-0'>
            <img
              src={image}
              alt='Paul Friedman'
              className='w-full aspect-3/4 object-cover'
            />
          </div>
        )}
      </div>

      <div className='mt-16 pt-8 border-t border-silver/10 flex items-center justify-between flex-wrap gap-6'>
        <div className='flex gap-6 flex-wrap'>
          {tags.map((tag) => (
            <span key={tag} className='text-xs tracking-widest uppercase text-silver/30'>
              {tag}
            </span>
          ))}
        </div>
        <SocialIcons youtube={youtube} instagram={instagram} />
      </div>
    </section>
  );
}

export default About;
