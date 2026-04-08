interface Env {
  DB: D1Database
  BUCKET: R2Bucket
}

const FIXED_KEY = 'about-profile.jpg'
const PUBLIC_BASE = 'https://pub-ea5c5af505474c55a7c4fe92c40d1a89.r2.dev'

export const onRequest: PagesFunction<Env> = async ({ request, env }) => {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  const formData = await request.formData()
  const file = formData.get('image') as File | null

  if (!file) {
    return new Response('No image provided', { status: 400 })
  }

  const buffer = await file.arrayBuffer()

  // Always write to the same key — overwrites previous photo
  await env.BUCKET.put(FIXED_KEY, buffer, {
    httpMetadata: { contentType: file.type },
  })

  // Append timestamp to bust browser cache
  const url = `${PUBLIC_BASE}/${FIXED_KEY}?v=${Date.now()}`

  // Save URL to D1 content table
  await env.DB.prepare('UPDATE content SET value = ? WHERE key = ?')
    .bind(url, 'about_image')
    .run()

  return Response.json({ url })
}
