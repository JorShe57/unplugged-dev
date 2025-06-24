'use client'
import { useState, useEffect } from 'react'

interface Event {
  _id: string
  title: string
  description: string
  date: string
  location: string
  featured: boolean
  active: boolean
  image?: {
    asset: {
      url: string
    }
  }
}

export function useEvents() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchEvents() {
      setLoading(true)
      try {
        const response = await fetch('/api/events')
        if (!response.ok) {
          throw new Error(`Failed to fetch events: ${response.status}`)
        }
        const data = await response.json()
        setEvents(data)
      } catch (err) {
        console.error('Error fetching events:', err)
        setError('Failed to load events.')
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  return { events, loading, error }
}

// Helper hook for upcoming events only
export function useUpcomingEvents() {
  const { events, loading, error } = useEvents()
  
  const upcomingEvents = events.filter(event => {
    const eventDate = new Date(event.date)
    const now = new Date()
    return eventDate >= now
  })
  
  return { events: upcomingEvents, loading, error }
}