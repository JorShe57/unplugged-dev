import { sanityClient } from '@/lib/sanity'

export async function GET() {
  try {
    const events = await sanityClient.fetch(`
      *[_type == "event" && active == true] | order(date asc) {
        _id,
        title,
        description,
        date,
        location,
        featured,
        active,
        image { asset->{url} }
      }
    `)
    return Response.json(events)
  } catch (error) {
    console.error('Error fetching events:', error)
    return Response.json({ error: 'Failed to fetch events' }, { status: 500 })
  }
}