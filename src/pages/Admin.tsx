import { useState } from 'react'
import { PROJECTS as INITIAL_PROJECTS } from './Projects'

type Project = {
  id: string
  slug: string
  title: string
  description: string
  youtubeId: string
}

const INITIAL_TAGS = ['Movement', 'Interaction', 'Perception', 'Light', 'Space']

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

function SaveButton({ label = 'Save' }: { label?: string }) {
  return (
    <button
      type="button"
      className="text-xs tracking-widest uppercase px-5 py-2 bg-beige text-black hover:bg-silver transition-colors duration-300"
    >
      {label}
    </button>
  )
}

function GhostButton({ onClick, children }: {
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-xs tracking-widest uppercase px-4 py-2 border border-silver/15 text-silver/50 hover:text-beige hover:border-silver/40 transition-colors duration-300"
    >
      {children}
    </button>
  )
}

// ── Admin page ───────────────────────────────────────────────────────────────

function Admin() {
  // Home
  const [homeTitle, setHomeTitle] = useState('Paul Friedman')
  const [homeDesc, setHomeDesc] = useState(
    "Hi I'm Paul, I'm a TouchDesigner artist that brings together multiple mediums like dance and light, translating them into immersive digital environments."
  )

  // Projects
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS)
  const [newProject, setNewProject] = useState({ title: '', description: '', youtubeId: '' })

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

  const deleteProject = (slug: string) => {
    setProjects(projects.filter((p) => p.slug !== slug))
  }

  const addProject = () => {
    if (!newProject.title.trim()) return
    const id = String(projects.length + 1).padStart(2, '0')
    const slug = newProject.title.trim().toLowerCase().replace(/\s+/g, '-')
    setProjects([...projects, { id, slug, ...newProject }])
    setNewProject({ title: '', description: '', youtubeId: '' })
  }

  const updateProject = (slug: string, field: keyof Omit<Project, 'id' | 'slug'>, value: string) => {
    setProjects(projects.map((p) => (p.slug === slug ? { ...p, [field]: value } : p)))
  }

  // About
  const [aboutTitle, setAboutTitle] = useState('Circus artist turned\ndigital environment builder.')
  const [aboutDesc, setAboutDesc] = useState(
    "Hi I'm Paul. I started my career as a circus artist and gradually transitioned into interactive and immersive art. I'm interested in taking people out of their normal perception of the world and placing them into augmented environments through tools like interactive particle systems, distorted point clouds, and projection mapping. My work blends physical movement with digital systems to create responsive, experiential pieces."
  )
  const [tags, setTags] = useState<string[]>(INITIAL_TAGS)
  const [tagInput, setTagInput] = useState('')

  const addTag = () => {
    const trimmed = tagInput.trim()
    if (!trimmed || tags.length >= 5) return
    setTags([...tags, trimmed])
    setTagInput('')
  }

  const removeTag = (tag: string) => setTags(tags.filter((t) => t !== tag))

  // Contact
  const [contactTitle, setContactTitle] = useState('Available for collaborations, performances & installations.')
  const [contactDesc, setContactDesc] = useState('friedman146@gmail.com')
  const [contactFooter, setContactFooter] = useState("Let's build something together")

  return (
    <div className="min-h-screen px-12 pt-32 pb-24 max-w-3xl">
      <span className="text-xs tracking-widest uppercase text-silver/30 mb-12 block">
        Admin
      </span>

      {/* ── Home ── */}
      <section className="mb-16">
        <SectionHeader>Home Page</SectionHeader>
        <div className="flex flex-col gap-5">
          <div>
            <Label>Title</Label>
            <Input value={homeTitle} onChange={setHomeTitle} placeholder="Page title" />
          </div>
          <div>
            <Label>Description</Label>
            <Textarea value={homeDesc} onChange={setHomeDesc} placeholder="One-line bio" rows={3} />
          </div>
          <div><SaveButton /></div>
        </div>
      </section>

      {/* ── Projects ── */}
      <section className="mb-16">
        <SectionHeader>Projects</SectionHeader>

        {/* Existing projects */}
        <div className="flex flex-col gap-6 mb-10">
          {projects.map((project, i) => (
            <div key={project.slug} className="border border-silver/10 p-5 flex flex-col gap-4">
              {/* Project header — index + order controls + delete */}
              <div className="flex items-center justify-between">
                <span className="text-xs tracking-widest uppercase text-silver/30">{project.id}</span>
                <div className="flex items-center gap-2">
                  <GhostButton onClick={() => moveUp(i)}>↑</GhostButton>
                  <GhostButton onClick={() => moveDown(i)}>↓</GhostButton>
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
                <Input
                  value={project.title}
                  onChange={(v) => updateProject(project.slug, 'title', v)}
                  placeholder="Project title"
                />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea
                  value={project.description}
                  onChange={(v) => updateProject(project.slug, 'description', v)}
                  placeholder="Project description"
                  rows={3}
                />
              </div>
              <div>
                <Label>YouTube ID</Label>
                <Input
                  value={project.youtubeId}
                  onChange={(v) => updateProject(project.slug, 'youtubeId', v)}
                  placeholder="dQw4w9WgXcQ"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Add new project */}
        <div className="border border-silver/10 border-dashed p-5 flex flex-col gap-4">
          <span className="text-xs tracking-widest uppercase text-silver/30">Add Project</span>
          <div>
            <Label>Title</Label>
            <Input
              value={newProject.title}
              onChange={(v) => setNewProject({ ...newProject, title: v })}
              placeholder="Project title"
            />
          </div>
          <div>
            <Label>Description</Label>
            <Textarea
              value={newProject.description}
              onChange={(v) => setNewProject({ ...newProject, description: v })}
              placeholder="Project description"
              rows={3}
            />
          </div>
          <div>
            <Label>YouTube ID</Label>
            <Input
              value={newProject.youtubeId}
              onChange={(v) => setNewProject({ ...newProject, youtubeId: v })}
              placeholder="dQw4w9WgXcQ"
            />
          </div>
          <div>
            <GhostButton onClick={addProject}>+ Add Project</GhostButton>
          </div>
        </div>

        <div className="mt-6"><SaveButton label="Save Projects" /></div>
      </section>

      {/* ── About ── */}
      <section className="mb-16">
        <SectionHeader>About Page</SectionHeader>
        <div className="flex flex-col gap-5">
          <div>
            <Label>Title</Label>
            <Textarea value={aboutTitle} onChange={setAboutTitle} placeholder="Page title" rows={2} />
          </div>
          <div>
            <Label>Description</Label>
            <Textarea value={aboutDesc} onChange={setAboutDesc} placeholder="Full bio" rows={5} />
          </div>
          <div>
            <Label>Themes / Tags (max 5)</Label>
            <div className="flex flex-wrap gap-2 mb-3">
              {tags.map((tag) => (
                <div key={tag} className="flex items-center gap-2 border border-silver/15 px-3 py-1">
                  <span className="text-xs tracking-widest uppercase text-silver/60">{tag}</span>
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
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
          <div><SaveButton /></div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section className="mb-16">
        <SectionHeader>Contact Page</SectionHeader>
        <div className="flex flex-col gap-5">
          <div>
            <Label>Title</Label>
            <Textarea value={contactTitle} onChange={setContactTitle} placeholder="Page title" rows={2} />
          </div>
          <div>
            <Label>Email / Description</Label>
            <Input value={contactDesc} onChange={setContactDesc} placeholder="email@example.com" />
          </div>
          <div>
            <Label>Footer Line</Label>
            <Input value={contactFooter} onChange={setContactFooter} placeholder="Footer tagline" />
          </div>
          <div><SaveButton /></div>
        </div>
      </section>
    </div>
  )
}

export default Admin
