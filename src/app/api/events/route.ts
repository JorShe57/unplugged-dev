import { sanityClient, urlFor } from '@/lib/sanity'

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
        image
      }
    `)
    
    // Process images with proper URL formatting
    const processedEvents = events.map((event: any) => ({
      ...event,
      image: event.image ? {
        asset: {
          url: urlFor(event.image).url()
        }
      } : null
    }))
    
    return Response.json(processedEvents)
  } catch (error) {
    console.error('Error fetching events:', error)
    return Response.json({ error: 'Failed to fetch events' }, { status: 500 })
  }
}