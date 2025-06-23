'use client';

import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

const stats = [
  { label: 'Beers Brewed', value: 120 },
  { label: 'Happy Customers', value: 3500 },
  { label: 'Awards', value: 15 },
];

function useCountUp(target: number, duration = 1500) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const increment = target / (duration / 16);
    let frame: number;
    function animate() {
      start += increment;
      if (start < target) {
        setCount(Math.floor(start));
        frame = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    }
    animate();
    return () => cancelAnimationFrame(frame);
  }, [target, duration]);
  return count;
}

export default function Counter() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section
      id="counter"
      ref={ref}
      className={`py-16 bg-brewery-gold bg-opacity-10 ${inView ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`}
    >
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-brewery-primary mb-8 text-center">Our Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {stats.map((stat) => {
            const count = useCountUp(stat.value);
            return (
              <div key={stat.label} className="bg-white dark:bg-brewery-dark rounded-lg shadow-md p-8 flex flex-col items-center border border-brewery-gold">
                <span className="text-4xl font-extrabold text-brewery-gold mb-2">{count}</span>
                <span className="text-lg text-brewery-primary font-semibold">{stat.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
} 