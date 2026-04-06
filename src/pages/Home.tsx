import { useState, useEffect } from 'react';
import { api } from '../api';
import bgVideo from '../assets/artGirl_30fps.mp4';

function Home() {
  const [title, setTitle] = useState('Paul Friedman');
  const [description, setDescription] = useState(
    "Hi I'm Paul, I'm a TouchDesigner artist that brings together multiple mediums like dance and light, translating them into immersive digital environments.",
  );

  useEffect(() => {
    api.content.get().then((c) => {
      setTitle(c.home_title);
      setDescription(c.home_description);
    });
  }, []);

  return (
    <section className='relative h-dvh w-full overflow-hidden'>
      <video
        className='absolute inset-0 w-full h-full object-cover'
        src={bgVideo}
        autoPlay
        muted
        loop
        playsInline
      />
      <div className='absolute inset-0 bg-black/25' />
      <div className='absolute inset-0 flex flex-col justify-end px-12 pb-16'>
        <h1 className='text-6xl font-light tracking-wide text-beige mb-4'>
          {title}
        </h1>
        <p className='text-sm tracking-wider text-silver/70 max-w-md leading-relaxed'>
          {description}
        </p>
      </div>
    </section>
  );
}

export default Home;
