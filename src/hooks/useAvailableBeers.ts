'use client'
import { useBeers } from './useBeers'

export function useAvailableBeers() {
  const { beers, loading, error } = useBeers()
  
  const availableBeers = beers.filter(beer => beer.available === true)
  
  return { beers: availableBeers, loading, error }
}