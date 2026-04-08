export type Project = {
  id: number
  slug: string
  title: string
  description: string
  youtube_id: string
  sort_order: number
  tags: string
}

export type Content = {
  home_title: string
  home_description: string
  about_title: string
  about_description: string
  about_tags: string
  contact_title: string
  contact_email: string
  contact_footer: string
  social_youtube: string
  social_instagram: string
  about_image: string
}

const JSON_HEADERS = { 'Content-Type': 'application/json' }

export const api = {
  projects: {
    list: (): Promise<Project[]> =>
      fetch('/api/projects').then((r) => r.json()),

    create: (data: Omit<Project, 'id'>): Promise<{ success: boolean }> =>
      fetch('/api/projects', {
        method: 'POST',
        headers: JSON_HEADERS,
        body: JSON.stringify(data),
      }).then((r) => r.json()),

    update: (
      slug: string,
      data: Omit<Project, 'id' | 'slug'>
    ): Promise<{ success: boolean }> =>
      fetch(`/api/projects/${slug}`, {
        method: 'PUT',
        headers: JSON_HEADERS,
        body: JSON.stringify(data),
      }).then((r) => r.json()),

    delete: (slug: string): Promise<{ success: boolean }> =>
      fetch(`/api/projects/${slug}`, { method: 'DELETE' }).then((r) => r.json()),
  },

  content: {
    get: (): Promise<Content> =>
      fetch('/api/content').then((r) => r.json()),

    update: (data: Partial<Content>): Promise<{ success: boolean }> =>
      fetch('/api/content', {
        method: 'PUT',
        headers: JSON_HEADERS,
        body: JSON.stringify(data),
      }).then((r) => r.json()),
  },
}
