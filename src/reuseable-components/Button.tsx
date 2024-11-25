interface ButtonProps {
  children: React.ReactNode;
  px: string;
  py: string;
  bgColour: string;
  textColour: string;
  fontSize: string;
  fontWeight: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  px,
  py,
  bgColour,
  textColour,
  fontSize,
  fontWeight,
}) => {
  return (
    <button
      className={`px-${px} py-${py} bg-${bgColour} text-${textColour} text-${fontSize} font-${fontWeight} flex justify-center items-center rounded-lg`}
    >
      {children}
    </button>
  );
};

export default Button;
