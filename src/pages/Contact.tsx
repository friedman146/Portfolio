const EMAIL = 'friedman146@gmail.com'

function Contact() {
  return (
    <section className="min-h-screen px-12 pt-32 pb-16 flex flex-col justify-between">
      {/* Top — label */}
      <span className="text-xs tracking-widest uppercase text-silver/50">
        Contact
      </span>

      {/* Middle — CTA */}
      <div className="max-w-2xl">
        <h1 className="text-5xl font-light tracking-wide text-beige mb-10 leading-tight">
          Available for collaborations,<br />performances & installations.
        </h1>
        <a
          href={`mailto:${EMAIL}`}
          className="text-sm tracking-widest uppercase text-silver/60 hover:text-beige transition-colors duration-300 border-b border-silver/20 hover:border-beige pb-1"
        >
          {EMAIL}
        </a>
      </div>

      {/* Bottom — tagline */}
      <span className="text-xs tracking-widest uppercase text-silver/30">
        Let's build something together
      </span>
    </section>
  )
}

export default Contact
