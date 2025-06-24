import { sanityClient } from '@/lib/sanity'

export async function GET() {
  try {
    const beers = await sanityClient.fetch(`
      *[_type == "beer"] | order(name asc) {
        _id,
        name,
        abv,
        ibu,
        description,
        type,
        price,
        available,
        featured,
        beerImage {
          asset -> {
            _id,
            url
          }
        }
      }
    `)
    return Response.json(beers)
  } catch (error) {
    console.error('Error fetching beers:', error)
    return Response.json({ error: 'Failed to fetch beers' }, { status: 500 })
  }
}