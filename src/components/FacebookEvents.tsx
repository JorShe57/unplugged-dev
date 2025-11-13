// components/FacebookEvents.tsx
'use client';
import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, ExternalLink } from 'lucide-react';

interface FacebookEvent {
  name: string;
  start_date: string;
  start_time: string;
  start_time_raw?: string;
  end_date: string;
  end_time: string;
  start_day: string;
  location: string;
  location_text: string;
  description: string;
  html_link: string;
  image: string;
  thumbnail_url: string;
  badge_day: string;
  badge_month: string;
  event_id: string;
  start_time_display?: string;
}

export default function FacebookEvents() {
  const [events, setEvents] = useState<FacebookEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    async function fetchEvents() {
      try {
        setIsLoading(true);
        setHasError(false);
        
        // Fetch through our API route to avoid CORS issues
        const response = await fetch('/api/facebook-events', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.events && Array.isArray(data.events)) {
          // Filter to only show upcoming events
          const now = new Date();
          const upcomingEvents = data.events.filter((event: FacebookEvent) => {
            const eventDate = new Date(event.start_time_raw || event.start_date);
            return eventDate >= now;
          });
          
          setEvents(upcomingEvents.slice(0, 6)); // Show up to 6 upcoming events
        } else {
          throw new Error('Invalid data format');
        }
      } catch (error) {
        console.error('Error fetching Facebook events:', error);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchEvents();
  }, []);

  const formatDate = (dateStr: string, timeStr: string) => {
    try {
      const date = new Date(dateStr);
      const month = date.toLocaleDateString('en-US', { month: 'short' });
      const day = date.getDate();
      return `${month} ${day}`;
    } catch {
      return dateStr;
    }
  };

  const stripHtml = (html: string) => {
    if (!html) return '';
    return html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-brewery-dark"></div>
        <span className="ml-3 text-brewery-dark font-semibold">Loading events...</span>
      </div>
    );
  }

  if (hasError || events.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-brewery-dark mb-4 font-semibold text-lg">Unable to load Facebook events</p>
        <a 
          href="https://www.facebook.com/unplugbrew/events" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-brewery-dark underline hover:text-brewery-primary transition-colors font-medium"
        >
          View events on Facebook
        </a>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div
            key={event.event_id}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border-2 border-brewery-gold/20"
          >
            {/* Event Image */}
            {event.image && (
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src={event.image}
                  alt={event.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
                {/* Date Badge */}
                <div className="absolute top-4 left-4 bg-brewery-dark/90 text-white rounded-lg p-2 text-center min-w-[60px]">
                  <div className="text-xs font-semibold uppercase tracking-wide">{event.badge_month}</div>
                  <div className="text-2xl font-bold">{event.badge_day}</div>
                </div>
              </div>
            )}

            {/* Event Content */}
            <div className="p-5">
              <h3 className="text-xl font-bold text-brewery-dark mb-3 line-clamp-2 min-h-[3.5rem]">
                {event.name}
              </h3>

              {/* Date & Time */}
              <div className="space-y-2 mb-4">
                <div className="flex items-start gap-2 text-brewery-dark">
                  <Calendar className="w-5 h-5 text-brewery-gold flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <div className="font-semibold">{event.start_day}, {formatDate(event.start_date, event.start_time)}</div>
                    {event.start_time_display === 'true' && (
                      <div className="flex items-center gap-1 mt-1">
                        <Clock className="w-4 h-4 text-brewery-gold" />
                        <span>{event.start_time}</span>
                        {event.end_time && event.end_time !== event.start_time && (
                          <span> - {event.end_time}</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Location */}
                {event.location && (
                  <div className="flex items-start gap-2 text-brewery-dark">
                    <MapPin className="w-5 h-5 text-brewery-gold flex-shrink-0 mt-0.5" />
                    <div className="text-sm">{event.location_text || event.location}</div>
                  </div>
                )}
              </div>

              {/* Description Preview */}
              {event.description && (
                <div className="text-sm text-brewery-dark/80 mb-4 line-clamp-3">
                  {stripHtml(event.description).substring(0, 150)}
                  {stripHtml(event.description).length > 150 && '...'}
                </div>
              )}

              {/* View Event Button */}
              <a
                href={event.html_link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-brewery-gold text-brewery-dark font-bold px-6 py-2 rounded-lg hover:bg-brewery-primary hover:text-white transition-colors duration-300 w-full justify-center"
              >
                View Event
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* View All Events Link */}
      <div className="text-center mt-8">
        <a
          href="https://www.facebook.com/unplugbrew/events"
          target="_blank"
          rel="noopener noreferrer"
          className="text-brewery-dark underline hover:text-brewery-primary transition-colors font-semibold"
        >
          View all events on Facebook
        </a>
      </div>
    </div>
  );
}