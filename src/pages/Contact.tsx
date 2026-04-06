import { useState, useEffect } from 'react'
import { api } from '../api'

function Contact() {
  const [title, setTitle] = useState('Available for collaborations,\nperformances & installations.')
  const [email, setEmail] = useState('friedman146@gmail.com')
  const [footer, setFooter] = useState("Let's build something together")

  useEffect(() => {
    api.content.get().then((c) => {
      setTitle(c.contact_title)
      setEmail(c.contact_email)
      setFooter(c.contact_footer)
    })
  }, [])

  return (
    <section className="min-h-screen px-12 pt-32 pb-16 flex flex-col justify-between">
      <span className="text-xs tracking-widest uppercase text-silver/50">Contact</span>

      <div className="max-w-2xl">
        <h1 className="text-5xl font-light tracking-wide text-beige mb-10 leading-tight whitespace-pre-line">
          {title}
        </h1>
        <a
          href={`mailto:${email}`}
          className="text-sm tracking-widest uppercase text-silver/60 hover:text-beige transition-colors duration-300 border-b border-silver/20 hover:border-beige pb-1"
        >
          {email}
        </a>
      </div>

      <span className="text-xs tracking-widest uppercase text-silver/30">{footer}</span>
    </section>
  )
}

export default Contact
