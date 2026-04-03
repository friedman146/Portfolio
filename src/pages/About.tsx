const THEMES = ['Movement', 'Interaction', 'Perception', 'Light', 'Space']

function About() {
  return (
    <section className="min-h-screen px-12 pt-32 pb-16 flex flex-col justify-between">
      {/* Top — label */}
      <span className="text-xs tracking-widest uppercase text-silver/50">
        About
      </span>

      {/* Middle — bio */}
      <div className="max-w-2xl">
        <h1 className="text-5xl font-light tracking-wide text-beige mb-10 leading-tight">
          Circus artist turned<br />digital environment builder.
        </h1>
        <p className="text-sm text-silver/70 leading-loose tracking-wide">
          Hi I'm Paul. I started my career as a circus artist and gradually
          transitioned into interactive and immersive art. I'm interested in
          taking people out of their normal perception of the world and placing
          them into augmented environments through tools like interactive particle
          systems, distorted point clouds, and projection mapping. My work blends
          physical movement with digital systems to create responsive,
          experiential pieces.
        </p>
      </div>

      {/* Bottom — themes */}
      <div className="flex gap-6">
        {THEMES.map((theme) => (
          <span
            key={theme}
            className="text-xs tracking-widest uppercase text-silver/30"
          >
            {theme}
          </span>
        ))}
      </div>
    </section>
  )
}

export default About
