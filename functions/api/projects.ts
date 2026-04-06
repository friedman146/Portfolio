interface Env {
  DB: D1Database
}

export const onRequest: PagesFunction<Env> = async ({ request, env }) => {
  if (request.method === 'GET') {
    const { results } = await env.DB.prepare(
      'SELECT * FROM projects ORDER BY sort_order ASC'
    ).all()
    return Response.json(results)
  }

  if (request.method === 'POST') {
    const body = await request.json() as {
      slug: string
      title: string
      description: string
      youtube_id: string
      sort_order: number
    }
    await env.DB.prepare(
      'INSERT INTO projects (slug, title, description, youtube_id, sort_order) VALUES (?, ?, ?, ?, ?)'
    ).bind(body.slug, body.title, body.description, body.youtube_id, body.sort_order).run()
    return Response.json({ success: true })
  }

  return new Response('Method not allowed', { status: 405 })
}
