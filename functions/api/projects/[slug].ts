interface Env {
  DB: D1Database
}

export const onRequest: PagesFunction<Env> = async ({ request, env, params }) => {
  const slug = params.slug as string

  if (request.method === 'GET') {
    const project = await env.DB.prepare(
      'SELECT * FROM projects WHERE slug = ?'
    ).bind(slug).first()
    if (!project) return new Response('Not found', { status: 404 })
    return Response.json(project)
  }

  if (request.method === 'PUT') {
    const body = await request.json() as {
      title: string
      description: string
      youtube_id: string
      tags: string
      sort_order: number
    }
    await env.DB.prepare(
      'UPDATE projects SET title = ?, description = ?, youtube_id = ?, tags = ?, sort_order = ? WHERE slug = ?'
    ).bind(body.title, body.description, body.youtube_id, body.tags, body.sort_order, slug).run()
    return Response.json({ success: true })
  }

  if (request.method === 'DELETE') {
    await env.DB.prepare('DELETE FROM projects WHERE slug = ?').bind(slug).run()
    return Response.json({ success: true })
  }

  return new Response('Method not allowed', { status: 405 })
}
