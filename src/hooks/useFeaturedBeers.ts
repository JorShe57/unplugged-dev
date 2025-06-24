'use client'
import { useBeers } from './useBeers'

export function useFeaturedBeers() {
  const { beers, loading, error } = useBeers()
  
  const featuredBeers = beers.filter(beer => beer.featured === true)
  
  return { beers: featuredBeers, loading, error }
}