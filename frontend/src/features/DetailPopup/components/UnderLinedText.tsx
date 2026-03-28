import type React from "react";

const UnderLinedText = ({
  children,
  color,
}: {
  children: React.ReactNode;
  color: string;
}) => {
  return (
    <span className="relative inline-block w-fit">
      <span className="relative z-10">{children}</span>
      <span
        className="absolute left-0 top-1/2 z-0 h-1/2 w-full"
        style={{
          backgroundImage: `repeating-linear-gradient(135deg, transparent, ${color} 0px 5px, transparent 5px 10px)`,
        }}
      />
    </span>
  );
};

export default UnderLinedText;
