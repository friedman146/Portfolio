import bgVideo from '../assets/artGirl_30fps.mp4';

function Home() {
  return (
    <section className='relative h-screen w-full overflow-hidden'>
      {/* Background video */}
      <video
        className='absolute inset-0 w-full h-full object-cover'
        src={bgVideo}
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Dark overlay */}
      <div className='absolute inset-0 bg-black/50' />

      {/* Content */}
      <div className='absolute inset-0 flex flex-col justify-end px-12 pb-16'>
        <h1 className='text-6xl font-light tracking-wide text-beige mb-4'>
          Paul Friedman
        </h1>
        <p className='text-sm tracking-wider text-silver/70 max-w-md leading-relaxed'>
          Hi I'm Paul, I'm a TouchDesigner artist that brings together multiple
          mediums like dance and light, translating them into immersive digital
          environments.
        </p>
      </div>
    </section>
  );
}

export default Home;
