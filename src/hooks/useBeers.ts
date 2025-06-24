'use client'
import { useState, useEffect } from 'react'

type BeerType = 'IPA' | 'Lager' | 'Stout' | 'Wheat' | 'Sour' | 'Pilsner' | 'Other'

interface Beer {
  _id: string
  name: string
  abv?: number
  ibu?: number
  description?: string
  type?: BeerType
  price?: number
  available?: boolean
  featured?: boolean
  beerImage?: {
    asset: {
      _id: string
      url: string
    }
  }
}

export function useBeers() {
  const [beers, setBeers] = useState<Beer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchBeers() {
      try {
        const response = await fetch('/api/beers')
        if (!response.ok) throw new Error('Failed to fetch beers')
        const data = await response.json()
        setBeers(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchBeers()
  }, [])

  return { beers, loading, error }
}