'use client';
import Heading from "./Heading";

const EmptyState = ({
  title = "No account found",
  subtitle = "Try again by refreshing page to load latest data."
}:{
  title?: string;
  subtitle?: string;
}) => {

  return ( 
    <div 
      className="
        h-[60vh]
        flex 
        flex-col 
        gap-2 
        justify-center 
        items-center 
      "
    >
      <Heading
        center
        title={title}
        subtitle={subtitle}
      />
    </div>
   );
}
 
export default EmptyState;