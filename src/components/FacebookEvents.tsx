// components/FacebookEvents.tsx
'use client';
import React from 'react';
import { Calendar, MapPin, ExternalLink, Clock } from 'lucide-react';

interface StaticEvent {
  id: string;
  name: string;
  date: string;       // e.g. "February 13"
  day: string;        // e.g. "Today", "Fri", "Sat"
  time: string;       // e.g. "4:30 PM - 10 PM"
  description: string;
  image: string;      // path to local asset
  link: string;       // generic link or specific if available
  badge: {
    month: string;
    day: string;
  };
}

const STATIC_EVENTS: StaticEvent[] = [
  {
    id: '1',
    name: "Line Dancing with Bre featuring Smashby's Food Truck",
    date: "April 16",
    day: "Thursday",
    time: "4:30 PM",
    description: "Smashby's Food Truck serving 4:30–9 PM. Line Dancing with Bre runs 6–8:30 PM. Get your boots on and join us for a fun night of line dancing and great eats!",
    image: "/hero.webp",
    link: "https://www.facebook.com/unplugbrew/events",
    badge: { month: "APR", day: "16" }
  },
  {
    id: '2',
    name: "An evening with Model 611 featuring Touch of Grey Café",
    date: "April 17",
    day: "Friday",
    time: "4:30 PM - 10 PM",
    description: "Touch of Grey Café will be serving from 4:30–9:30 PM. From 7–10 PM, Model 611 is back for another evening of bluegrass tunes.",
    image: "/hero.webp",
    link: "https://www.facebook.com/unplugbrew/events",
    badge: { month: "APR", day: "17" }
  },
  {
    id: '3',
    name: "Rust Bucket Pluckers return to Unplugged featuring Kind Tapas & Creations",
    date: "April 18",
    day: "Saturday",
    time: "4:30 PM - 10 PM",
    description: "Kind Tapas & Creations Food Truck serving 4:30–9:30 PM. Rust Bucket Pluckers performing 7–10 PM. More details & menu to be added soon.",
    image: "/hero.webp",
    link: "https://www.facebook.com/unplugbrew/events",
    badge: { month: "APR", day: "18" }
  },
  {
    id: '4',
    name: "420 pre-party with Gild the Lily featuring Touch of Grey Café",
    date: "April 19",
    day: "Sunday",
    time: "1:30 PM - 5:30 PM",
    description: "Touch of Grey Café serving 1:30–5:30 PM. Live music with Gild the Lily 2–5 PM. A perfect Sunday afternoon to kick back and enjoy.",
    image: "/hero.webp",
    link: "https://www.facebook.com/unplugbrew/events",
    badge: { month: "APR", day: "19" }
  },
  {
    id: '5',
    name: "An evening with Austin Hamilton featuring Nick's Garage Pizza",
    date: "April 24",
    day: "Friday",
    time: "4:30 PM - 10 PM",
    description: "Nick's Garage Pizza serving 4:30–9 PM. Austin Hamilton performing 7–10 PM. Kick off the weekend with great music and mouthwatering pizza.",
    image: "/hero.webp",
    link: "https://www.facebook.com/unplugbrew/events",
    badge: { month: "APR", day: "24" }
  },
  {
    id: '6',
    name: "An evening with Lea Marra & The Riverboys featuring Island City Food Truck",
    date: "April 25",
    day: "Saturday",
    time: "5 PM - 10 PM",
    description: "Island City Food Truck serving 5–10 PM. Lea Marra & The Riverboys performing 7–10 PM. A fantastic Saturday night of live music and great food.",
    image: "/hero.webp",
    link: "https://www.facebook.com/unplugbrew/events",
    badge: { month: "APR", day: "25" }
  },
  {
    id: '7',
    name: "Springtime Bluegrass Jam",
    date: "April 26",
    day: "Sunday",
    time: "2 PM - 5 PM",
    description: "Shake off the winter blues and welcome spring the best way we know how — with great beer, great friends, and great music! A free/open jam. Bring your instrument or just yourself for an afternoon of live bluegrass picking, toe-tapping tunes, and laid-back brewery vibes. All skill levels welcome.",
    image: "/hero.webp",
    link: "https://www.facebook.com/unplugbrew/events",
    badge: { month: "APR", day: "26" }
  },
  {
    id: '8',
    name: "Owl Planter Paint + Sip at Unplugged Brewing Co.",
    date: "April 29",
    day: "Wednesday",
    time: "6:30 PM - 8:30 PM",
    description: "Join artist Cory at Unplugged Brewing Co. to make your own adorable ceramic owl planter complete with a living plant inside. Choose from 4 different owl types and paint using acrylics. Cory will demonstrate techniques. Owls are sealed after painting. Dimensions: 3\"x3\"x4\". Tickets: $50.93. Hosted by Grass Root Designs.",
    image: "/hero.webp",
    link: "https://www.facebook.com/unplugbrew/events",
    badge: { month: "APR", day: "29" }
  },
  {
    id: '9',
    name: "Line Dancing with Bre featuring Smashby's Food Truck",
    date: "April 30",
    day: "Thursday",
    time: "4:30 PM",
    description: "Smashby's Food Truck serving 4:30–9 PM. Line Dancing with Bre runs 6–8:30 PM. Co-hosted by Unplugged Brewing Co. and Smashby's.",
    image: "/hero.webp",
    link: "https://www.facebook.com/unplugbrew/events",
    badge: { month: "APR", day: "30" }
  },
  {
    id: '10',
    name: "Roll into Summer – Retro Cookie Decorating Class",
    date: "May 13",
    day: "Wednesday",
    time: "7 PM - 9 PM",
    description: "A fun, beginner-friendly cookie decorating class hosted by Val's Cookie Corner. Learn step-by-step techniques while decorating 6 vanilla-almond sugar cookies. All supplies provided. Ages 12 and up (ages 12–15 must attend with an adult). Take-Home Kits available as an add-on. Tickets at valscookiecorner.com/classes.",
    image: "/hero.webp",
    link: "https://www.facebook.com/unplugbrew/events",
    badge: { month: "MAY", day: "13" }
  },
  {
    id: '11',
    name: "Spring Open House – Downtown Shopping Event",
    date: "May 16",
    day: "Saturday",
    time: "12 PM - 4 PM",
    description: "Explore Downtown Elyria at ECP's Spring Open House. Pick up a passport and swag bag at the ECP table at the Shoppes on Broad, then visit participating shops to collect stamps, discover special promotions, and connect with local businesses. Enjoy a downtown scavenger hunt, raffle prizes, local cuisine, and exclusive deals. Hosted by Elyria Community Partnership.",
    image: "/hero.webp",
    link: "https://www.facebook.com/unplugbrew/events",
    badge: { month: "MAY", day: "16" }
  },
  {
    id: '12',
    name: "Living Moss Globe | Unplugged Brewing Co.",
    date: "May 27",
    day: "Wednesday",
    time: "6:30 PM - 7:30 PM",
    description: "Create a custom-designed living moss terrarium glass globe at Unplugged Brewing Co. Artist Cory (Grass Root Designs) provides all materials. Design your own landscape with fun miniatures, sand, crystals, and live mosses. Feel free to bring a personal trinket to add in. Your ticket includes all materials, instructions, and your first drink from Unplugged. Tickets: $53.07 via Eventbrite.",
    image: "/hero.webp",
    link: "https://www.facebook.com/unplugbrew/events",
    badge: { month: "MAY", day: "27" }
  },
  {
    id: '13',
    name: "Bosco Jigs HALLOWEEN at Unplugged Brewing Co. featuring Bangin BBQ",
    date: "October 31",
    day: "Saturday",
    time: "7 PM",
    description: "Save the date! Bosco Jigs is a Grateful Dead tribute band that emulates the sounds and vibe of a Grateful Dead show. The same setlist is never repeated — musical improvisation fused with rock, blues, jazz, folk, country, bluegrass, gospel, reggae, and world music. Bangin BBQ will be serving from about 4–10 PM.",
    image: "/hero.webp",
    link: "https://www.facebook.com/unplugbrew/events",
    badge: { month: "OCT", day: "31" }
  }
];

export default function FacebookEvents() {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {STATIC_EVENTS.map((event) => (
          <div
            key={event.id}
            className="group relative bg-[#1A120E]/30 backdrop-blur-xl rounded-3xl overflow-hidden border border-[#E6B325]/10 hover:border-[#E6B325]/40 transition-all duration-500 hover:-translate-y-2 flex flex-col shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)]"
          >
            {/* Liquid Glow Hover Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#E6B325]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Event Image */}
            <div className="relative h-56 w-full overflow-hidden bg-[#1A120E]">
              <img
                src={event.image}
                alt={event.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Date Badge */}
              <div className="absolute top-4 left-4 bg-[#120A07]/80 backdrop-blur-md text-[#E6B325] border border-[#E6B325]/20 rounded-2xl p-3 text-center min-w-[65px] shadow-2xl">
                <div className="text-[10px] font-body font-bold uppercase tracking-widest mb-1">{event.badge.month}</div>
                <div className="text-2xl font-hero font-bold leading-none">{event.badge.day}</div>
              </div>
            </div>

            {/* Event Content */}
            <div className="p-7 flex flex-col flex-grow relative z-10">
              <h3 className="text-xl font-hero font-bold text-[#FDF5E6] mb-4 line-clamp-2 min-h-[3rem] group-hover:text-[#E6B325] transition-colors">
                {event.name}
              </h3>

              <div className="space-y-3 mb-6 flex-grow">
                <div className="flex items-start gap-3 text-[#C68642]">
                  <Calendar className="w-4 h-4 flex-shrink-0 mt-1 opacity-60" />
                  <div className="text-xs font-body tracking-wider uppercase">
                    {event.day}, {event.date}
                  </div>
                </div>

                <div className="flex items-start gap-3 text-[#C68642]">
                  <Clock className="w-4 h-4 flex-shrink-0 mt-1 opacity-60" />
                  <div className="text-xs font-body tracking-wider uppercase">
                    {event.time}
                  </div>
                </div>

                <div className="flex items-start gap-3 text-[#C68642]">
                  <MapPin className="w-4 h-4 flex-shrink-0 mt-1 opacity-60" />
                  <div className="text-xs font-body tracking-wider line-clamp-1">
                    Unplugged Brewing Co.
                  </div>
                </div>

                <p className="text-[#FDF5E6]/60 text-sm font-body leading-relaxed line-clamp-3 mt-4">
                  {event.description}
                </p>
              </div>

              {/* Action Button */}
              <a
                href={event.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#E6B325]/10 hover:bg-[#E6B325] text-[#E6B325] hover:text-[#120A07] border border-[#E6B325]/30 font-body font-bold text-[10px] tracking-[0.2em] uppercase px-6 py-4 rounded-xl transition-all duration-300 w-full"
              >
                View Details
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <a
          href="https://www.facebook.com/unplugbrew/events"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-3 text-[#C68642]/60 hover:text-[#E6B325] transition-all duration-300 font-body uppercase tracking-[0.3em] text-[10px]"
        >
          <div className="w-8 h-[1px] bg-[#C68642]/20 group-hover:bg-[#E6B325]/40 transition-colors" />
          More Events on Facebook
          <div className="w-8 h-[1px] bg-[#C68642]/20 group-hover:bg-[#E6B325]/40 transition-colors" />
        </a>
      </div>
    </div>
  );
}