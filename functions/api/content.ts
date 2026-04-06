interface Env {
  DB: D1Database
}

export const onRequest: PagesFunction<Env> = async ({ request, env }) => {
  if (request.method === 'GET') {
    const { results } = await env.DB.prepare(
      'SELECT key, value FROM content'
    ).all()
    const content = Object.fromEntries(
      results.map((r) => [r['key'], r['value']])
    )
    return Response.json(content)
  }

  if (request.method === 'PUT') {
    const body = await request.json() as Record<string, string>
    const stmts = Object.entries(body).map(([key, value]) =>
      env.DB.prepare('UPDATE content SET value = ? WHERE key = ?').bind(value, key)
    )
    await env.DB.batch(stmts)
    return Response.json({ success: true })
  }

  return new Response('Method not allowed', { status: 405 })
}
