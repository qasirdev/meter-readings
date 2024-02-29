'use client';

interface HeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
}

const Heading  = ({ 
  title, 
  subtitle,
  center
}:{
  title: string;
  subtitle?: string;
  center?: boolean;
}) => {
  return ( 
    <div data-testid="heading-wrapper" className={center ? 'text-center' : 'text-start'}>
      <div className="text-2xl font-bold">
        {title}
      </div>
      <div className="font-light text-neutral-500 mt-2">
        {subtitle}
      </div>
    </div>
   );
}
 
export default Heading;