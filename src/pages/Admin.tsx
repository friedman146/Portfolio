import { useState, useEffect } from 'react'
import { api, type Project } from '../api'

// ── Reusable field components ────────────────────────────────────────────────

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-xs tracking-widest uppercase text-silver/40 mb-1 block">
      {children}
    </span>
  )
}

function Input({ value, onChange, placeholder }: {
  value: string
  onChange: (v: string) => void
  placeholder?: string
}) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-charcoal border border-silver/10 text-beige text-sm px-4 py-2 focus:outline-none focus:border-silver/30 placeholder:text-silver/20 transition-colors"
    />
  )
}

function Textarea({ value, onChange, placeholder, rows = 4 }: {
  value: string
  onChange: (v: string) => void
  placeholder?: string
  rows?: number
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full bg-charcoal border border-silver/10 text-beige text-sm px-4 py-2 focus:outline-none focus:border-silver/30 placeholder:text-silver/20 transition-colors resize-none"
    />
  )
}

function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xs tracking-widest uppercase text-silver/50 pb-3 border-b border-silver/10 mb-6">
      {children}
    </h2>
  )
}

function SaveButton({ onClick, saving, label = 'Save' }: {
  onClick: () => void
  saving: boolean
  label?: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={saving}
      className="text-xs tracking-widest uppercase px-5 py-2 bg-beige text-black hover:bg-silver transition-colors duration-300 disabled:opacity-40"
    >
      {saving ? 'Saving...' : label}
    </button>
  )
}

function GhostButton({ onClick, children, disabled }: {
  onClick: () => void
  children: React.ReactNode
  disabled?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="text-xs tracking-widest uppercase px-4 py-2 border border-silver/15 text-silver/50 hover:text-beige hover:border-silver/40 transition-colors duration-300 disabled:opacity-20"
    >
      {children}
    </button>
  )
}

function Spinner() {
  return (
    <div className="flex items-center gap-2 text-silver/40 text-xs tracking-widest uppercase">
      <div className="w-3 h-3 border border-silver/30 border-t-silver/70 rounded-full animate-spin" />
      Loading...
    </div>
  )
}

// ── Admin page ───────────────────────────────────────────────────────────────

function Admin() {
  const [loading, setLoading] = useState(true)

  // Home
  const [homeTitle, setHomeTitle] = useState('')
  const [homeDesc, setHomeDesc] = useState('')
  const [savingHome, setSavingHome] = useState(false)

  // Projects
  const [projects, setProjects] = useState<Project[]>([])
  const [newProject, setNewProject] = useState({ title: '', description: '', youtube_id: '' })
  const [savingProjects, setSavingProjects] = useState(false)

  // About
  const [aboutTitle, setAboutTitle] = useState('')
  const [aboutDesc, setAboutDesc] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState('')
  const [savingAbout, setSavingAbout] = useState(false)

  // Contact
  const [contactTitle, setContactTitle] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [contactFooter, setContactFooter] = useState('')
  const [savingContact, setSavingContact] = useState(false)

  // Load all data on mount
  useEffect(() => {
    Promise.all([api.content.get(), api.projects.list()]).then(([content, projs]) => {
      setHomeTitle(content.home_title)
      setHomeDesc(content.home_description)
      setAboutTitle(content.about_title)
      setAboutDesc(content.about_description)
      setTags(content.about_tags.split(',').map((t) => t.trim()))
      setContactTitle(content.contact_title)
      setContactEmail(content.contact_email)
      setContactFooter(content.contact_footer)
      setProjects(projs)
      setLoading(false)
    })
  }, [])

  // ── Project helpers ──
  const moveUp = (i: number) => {
    if (i === 0) return
    const updated = [...projects]
    ;[updated[i - 1], updated[i]] = [updated[i], updated[i - 1]]
    setProjects(updated)
  }

  const moveDown = (i: number) => {
    if (i === projects.length - 1) return
    const updated = [...projects]
    ;[updated[i], updated[i + 1]] = [updated[i + 1], updated[i]]
    setProjects(updated)
  }

  const deleteProject = async (slug: string) => {
    await api.projects.delete(slug)
    setProjects(projects.filter((p) => p.slug !== slug))
  }

  const addProject = async () => {
    if (!newProject.title.trim()) return
    setSavingProjects(true)
    const sort_order = projects.length + 1
    const slug = newProject.title.trim().toLowerCase().replace(/\s+/g, '-')
    await api.projects.create({ slug, sort_order, ...newProject })
    const updated = await api.projects.list()
    setProjects(updated)
    setNewProject({ title: '', description: '', youtube_id: '' })
    setSavingProjects(false)
  }

  const updateProjectField = (slug: string, field: keyof Omit<Project, 'id' | 'slug'>, value: string | number) => {
    setProjects(projects.map((p) => (p.slug === slug ? { ...p, [field]: value } : p)))
  }

  const saveProjects = async () => {
    setSavingProjects(true)
    await Promise.all(
      projects.map((p, i) =>
        api.projects.update(p.slug, {
          title: p.title,
          description: p.description,
          youtube_id: p.youtube_id,
          sort_order: i + 1,
        })
      )
    )
    setSavingProjects(false)
  }

  // ── Tag helpers ──
  const addTag = () => {
    const trimmed = tagInput.trim()
    if (!trimmed || tags.length >= 5) return
    setTags([...tags, trimmed])
    setTagInput('')
  }

  // ── Save helpers ──
  const saveHome = async () => {
    setSavingHome(true)
    await api.content.update({ home_title: homeTitle, home_description: homeDesc })
    setSavingHome(false)
  }

  const saveAbout = async () => {
    setSavingAbout(true)
    await api.content.update({
      about_title: aboutTitle,
      about_description: aboutDesc,
      about_tags: tags.join(','),
    })
    setSavingAbout(false)
  }

  const saveContact = async () => {
    setSavingContact(true)
    await api.content.update({
      contact_title: contactTitle,
      contact_email: contactEmail,
      contact_footer: contactFooter,
    })
    setSavingContact(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen px-12 pt-32 flex">
        <Spinner />
      </div>
    )
  }

  return (
    <div className="min-h-screen px-12 pt-32 pb-24 max-w-3xl">
      <span className="text-xs tracking-widest uppercase text-silver/30 mb-12 block">Admin</span>

      {/* ── Home ── */}
      <section className="mb-16">
        <SectionHeader>Home Page</SectionHeader>
        <div className="flex flex-col gap-5">
          <div>
            <Label>Title</Label>
            <Input value={homeTitle} onChange={setHomeTitle} />
          </div>
          <div>
            <Label>Description</Label>
            <Textarea value={homeDesc} onChange={setHomeDesc} rows={3} />
          </div>
          <div>
            <SaveButton onClick={saveHome} saving={savingHome} />
          </div>
        </div>
      </section>

      {/* ── Projects ── */}
      <section className="mb-16">
        <SectionHeader>Projects</SectionHeader>

        <div className="flex flex-col gap-6 mb-10">
          {projects.map((project, i) => (
            <div key={project.slug} className="border border-silver/10 p-5 flex flex-col gap-4">
              {/* Thumbnail + controls row */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  {project.youtube_id ? (
                    <img
                      src={`https://img.youtube.com/vi/${project.youtube_id}/hqdefault.jpg`}
                      alt={project.title}
                      className="w-20 aspect-video object-cover shrink-0"
                    />
                  ) : (
                    <div className="w-20 aspect-video bg-charcoal shrink-0" />
                  )}
                  <span className="text-xs tracking-widest uppercase text-silver/30">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <GhostButton onClick={() => moveUp(i)} disabled={i === 0}>↑</GhostButton>
                  <GhostButton onClick={() => moveDown(i)} disabled={i === projects.length - 1}>↓</GhostButton>
                  <button
                    type="button"
                    onClick={() => deleteProject(project.slug)}
                    className="text-xs tracking-widest uppercase px-4 py-2 border border-red-900/40 text-red-400/50 hover:text-red-400 hover:border-red-400/40 transition-colors duration-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div>
                <Label>Title</Label>
                <Input value={project.title} onChange={(v) => updateProjectField(project.slug, 'title', v)} />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea value={project.description} onChange={(v) => updateProjectField(project.slug, 'description', v)} rows={3} />
              </div>
              <div>
                <Label>YouTube ID</Label>
                <Input value={project.youtube_id} onChange={(v) => updateProjectField(project.slug, 'youtube_id', v)} placeholder="dQw4w9WgXcQ" />
              </div>
            </div>
          ))}
        </div>

        {/* Add new project */}
        <div className="border border-silver/10 border-dashed p-5 flex flex-col gap-4">
          <span className="text-xs tracking-widest uppercase text-silver/30">Add Project</span>
          <div>
            <Label>Title</Label>
            <Input value={newProject.title} onChange={(v) => setNewProject({ ...newProject, title: v })} placeholder="Project title" />
          </div>
          <div>
            <Label>Description</Label>
            <Textarea value={newProject.description} onChange={(v) => setNewProject({ ...newProject, description: v })} placeholder="Project description" rows={3} />
          </div>
          <div>
            <Label>YouTube ID</Label>
            <Input value={newProject.youtube_id} onChange={(v) => setNewProject({ ...newProject, youtube_id: v })} placeholder="dQw4w9WgXcQ" />
          </div>
          <div>
            <GhostButton onClick={addProject} disabled={savingProjects}>
              {savingProjects ? 'Adding...' : '+ Add Project'}
            </GhostButton>
          </div>
        </div>

        <div className="mt-6">
          <SaveButton onClick={saveProjects} saving={savingProjects} label="Save Projects" />
        </div>
      </section>

      {/* ── About ── */}
      <section className="mb-16">
        <SectionHeader>About Page</SectionHeader>
        <div className="flex flex-col gap-5">
          <div>
            <Label>Title</Label>
            <Textarea value={aboutTitle} onChange={setAboutTitle} rows={2} />
          </div>
          <div>
            <Label>Description</Label>
            <Textarea value={aboutDesc} onChange={setAboutDesc} rows={5} />
          </div>
          <div>
            <Label>Themes / Tags (max 5)</Label>
            <div className="flex flex-wrap gap-2 mb-3">
              {tags.map((tag) => (
                <div key={tag} className="flex items-center gap-2 border border-silver/15 px-3 py-1">
                  <span className="text-xs tracking-widest uppercase text-silver/60">{tag}</span>
                  <button
                    type="button"
                    onClick={() => setTags(tags.filter((t) => t !== tag))}
                    className="text-silver/30 hover:text-red-400 transition-colors text-xs"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
            {tags.length < 5 && (
              <div className="flex gap-2">
                <input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addTag()}
                  placeholder="New tag"
                  className="flex-1 bg-charcoal border border-silver/10 text-beige text-sm px-4 py-2 focus:outline-none focus:border-silver/30 placeholder:text-silver/20 transition-colors"
                />
                <GhostButton onClick={addTag}>+ Add</GhostButton>
              </div>
            )}
          </div>
          <div><SaveButton onClick={saveAbout} saving={savingAbout} /></div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section className="mb-16">
        <SectionHeader>Contact Page</SectionHeader>
        <div className="flex flex-col gap-5">
          <div>
            <Label>Title</Label>
            <Textarea value={contactTitle} onChange={setContactTitle} rows={2} />
          </div>
          <div>
            <Label>Email</Label>
            <Input value={contactEmail} onChange={setContactEmail} placeholder="email@example.com" />
          </div>
          <div>
            <Label>Footer Line</Label>
            <Input value={contactFooter} onChange={setContactFooter} />
          </div>
          <div><SaveButton onClick={saveContact} saving={savingContact} /></div>
        </div>
      </section>
    </div>
  )
}

export default Admin
