import { useState, useEffect } from 'react';

export function InteractiveBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      const x = (clientX / window.innerWidth) * 100;
      const y = (clientY / window.innerHeight) * 100;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const backgroundStyle = {
    background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(120, 119, 198, 0.25), rgba(0,0,0,0) 40%)`,
  };

  return (
    <>
      <div 
        className="absolute inset-0 -z-20 transition-all duration-300" 
        style={backgroundStyle}
      ></div>
      <div 
        className="absolute inset-0 -z-10 h-full w-full bg-slate-900 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"
      ></div>
    </>
  );
}