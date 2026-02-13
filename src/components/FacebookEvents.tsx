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
    name: "An evening with Terry Lee Goffee featuring Nick's Garage Pizza",
    date: "February 13",
    day: "Friday",
    time: "4:30 PM - 10 PM",
    description: "The man in black is back!!! Come join us for an evening of traditional country & some Johnny Cash, some originals & covers. Terry Lee takes the stage at 7pm. Nick's Garage Pizza will be here serving mouthwatering Pizza pies & pillow bread from 4:30-9pm.",
    image: "/hero.webp",
    link: "https://www.facebook.com/events/1547094499854121/",
    badge: { month: "FEB", day: "13" }
  },
  {
    id: '2',
    name: "Valentine's Day Jamboree with The Whiskey Drinks featuring Big House BBQ",
    date: "February 14",
    day: "Saturday",
    time: "7:00 PM",
    description: "Roses are red. Whiskey is brown. Love is complicated. Good music is not. This Valentine's Day, skip the crowded restaurants and stiff prix fixe menus and bring your sweetheart, your longtime partner, or your favorite drinking buddy to a night that goes down smooth and leaves a warm finish.",
    image: "/hero.webp",
    link: "https://www.facebook.com/events/1619372999379096/",
    badge: { month: "FEB", day: "14" }
  },
  {
    id: '3',
    name: "Sunday Funday with Pack of Strays Trio featuring Smashby's Food Truck",
    date: "February 15",
    day: "Sunday",
    time: "1:30 PM - 6 PM",
    description: "Join us this Sunday for a special set with Pack of Strays Trio 🎶 Chase Franklin, Drew Rochotte & Bryan Redinger will be jamming out your favorite Grateful Dead classics, with some country & western tunes sprinkled in for good measure 🤠🌹",
    image: "/hero.webp",
    link: "https://www.facebook.com/events/3641707175971828/",
    badge: { month: "FEB", day: "15" }
  },
  {
    id: '4',
    name: "Line Dancing with Bre & Smashby's Food Truck",
    date: "February 19",
    day: "Thursday",
    time: "4:30 PM",
    description: "Get your boots ready! Join us for an energetic evening of line dancing with Bre. Great moves, cold brews, and delicious eats from Smashby's Food Truck.",
    image: "/hero.webp",
    link: "https://www.facebook.com/events/883052754319890/",
    badge: { month: "FEB", day: "19" }
  },
  {
    id: '5',
    name: "An evening with Jimbo Float Acoustic featuring Big House BBQ",
    date: "February 20",
    day: "Friday",
    time: "4:30 PM - 10 PM",
    description: "Join us for an evening of live music with Jimbo, playing all your favorite tunes from 7-10pm. Big House BBQ is back with their mouthwatering menu from 4:30-9:30pm.",
    image: "/hero.webp",
    link: "https://www.facebook.com/events/1475142010699571/",
    badge: { month: "FEB", day: "20" }
  },
  {
    id: '6',
    name: "An evening with Gild the Lily featuring Nick's Garage Pizza",
    date: "February 21",
    day: "Saturday",
    time: "4:30 PM",
    description: "Enjoy smooth harmonies and folk-inspired tunes with Gild the Lily. A perfect Saturday evening paired with fresh wood-fired pizza from Nick's Garage.",
    image: "/hero.webp",
    link: "https://www.facebook.com/events/1888582781758463/",
    badge: { month: "FEB", day: "21" }
  },
  {
    id: '7',
    name: "Sunday Funday Bluegrass Jam featuring Smashby's",
    date: "February 22",
    day: "Sunday",
    time: "1:30 PM",
    description: "Close out your weekend with toe-tapping bluegrass rhythms and craft beer. Smashby's will be serving up their famous comfort food to keep you fueled.",
    image: "/hero.webp",
    link: "https://www.facebook.com/events/783684584746834/",
    badge: { month: "FEB", day: "22" }
  },
  {
    id: '8',
    name: "Pressed Flower Flickering Lantern | Unplugged Brewing Co., Elyria",
    date: "February 25",
    day: "Wednesday",
    time: "6:30 PM",
    description: "Event by Grass Root Designs. Create your own beautiful flickering lantern with pressed flowers. Ticket required.",
    image: "/hero.webp",
    link: "https://www.facebook.com/events/1442152203909609/",
    badge: { month: "FEB", day: "25" }
  },
  {
    id: '9',
    name: "An evening with Brent Hopper featuring Nick's Garage Pizza",
    date: "February 27",
    day: "Friday",
    time: "4:30 PM",
    description: "Kick off the weekend with the acoustic stylings of Brent Hopper and delicious slices from Nick's Garage Pizza.",
    image: "/hero.webp",
    link: "https://www.facebook.com/events/2047803689399355/",
    badge: { month: "FEB", day: "27" }
  },
  {
    id: '10',
    name: "An evening with Drew Rochotte featuring Big House BBQ",
    date: "February 28",
    day: "Saturday",
    time: "4:30 PM",
    description: "End February on a high note with live music from Drew Rochotte and savory BBQ from Big House. Great vibes guaranteed.",
    image: "/hero.webp",
    link: "https://www.facebook.com/events/1393502255739214/",
    badge: { month: "FEB", day: "28" }
  },
  {
    id: '11',
    name: "Grateful Kev @ Unplugged Brewing Co",
    date: "March 6",
    day: "Friday",
    time: "7:00 PM",
    description: "Event by GratefulKev. A night of Dead tunes and good vibes. Come unplug with us.",
    image: "/hero.webp",
    link: "https://www.facebook.com/events/1426801329074342/",
    badge: { month: "MAR", day: "06" }
  },
  {
    id: '12',
    name: "Blooms and Bugs - Cookie Decorating Class",
    date: "March 11",
    day: "Wednesday",
    time: "7:00 PM",
    description: "Event by Val's Cookie Corner. Learn professional cookie decorating techniques in this fun spring-themed class!",
    image: "/hero.webp",
    link: "https://www.facebook.com/events/1404648357862556/",
    badge: { month: "MAR", day: "11" }
  },
  {
    id: '13',
    name: "All-Levels Yoga Class at Unplugged Brewing Company",
    date: "March 14",
    day: "Saturday",
    time: "10:00 AM",
    description: "Event by Bottoms Up! Yoga & Brew. Start your Saturday with a stretch and a sip. All skill levels welcome.",
    image: "/hero.webp",
    link: "https://www.facebook.com/events/2243693876122953/",
    badge: { month: "MAR", day: "14" }
  },
  {
    id: '14',
    name: "Hoppy Hues Easter Paint Your Own Pottery Fest",
    date: "April 1",
    day: "Wednesday",
    time: "6:00 PM",
    description: "Event by The Art Shack. Unleash your creativity and paint your own pottery pieces just in time for Easter.",
    image: "/hero.webp",
    link: "https://www.facebook.com/events/1880523885924904/",
    badge: { month: "APR", day: "01" }
  },
  {
    id: '15',
    name: "The Naughty Lobstah BACK at Unplugged Brewing!",
    date: "April 12",
    day: "Sunday",
    time: "11:00 AM",
    description: "Event by The Naughty Lobstah. The famous lobster truck returns! Don't miss out on the freshest rolls in town.",
    image: "/hero.webp",
    link: "https://www.facebook.com/events/4265415053678851/",
    badge: { month: "APR", day: "12" }
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