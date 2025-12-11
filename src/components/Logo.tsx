export default function Logo({ className = "h-8" }: { className?: string }) {
  return (
    <div className={`flex items-center ${className}`}>
      {/* 
        Refined Geometric Typography 
        Style: Thinner, Tighter, Distinctive "1"
      */}
      <svg height="100%" viewBox="0 0 84 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-auto h-full text-white">
        
        {/* n: Thinner & Tighter */}
        <path d="M10 16V30" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        <path d="M10 21C10 18 12 16 17 16H18C23 16 25 18 25 21V30" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        
        {/* 1: Distinctive with a top beak to look like '1', not 'l' */}
        <path d="M42 14V30" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M37 18L42 14" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />

        {/* n: Second one */}
        <path d="M54 16V30" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        <path d="M54 21C54 18 56 16 61 16H62C67 16 69 18 69 21V30" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        
      </svg>
    </div>
  );
}
