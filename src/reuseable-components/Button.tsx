interface ButtonProps {
  children?: React.ReactNode;
  px?: string;
  py?: string;
  bgColour?: string;
  textColour?: string;
  fontSize?: string;
  fontWeight?: string;
  borderWidth?: string;
  borderColour?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  px = "px-4",
  py = "py-2",
  bgColour = "bg-primary",
  textColour = "text-textSecondary",
  fontSize = "text-[14px]",
  fontWeight = "font-semibold",
  borderWidth,
  borderColour,
}) => {
  return (
    <button
      className={`${px} ${py} ${bgColour} ${textColour} ${fontSize} ${fontWeight} ${borderWidth} ${borderColour} flex justify-center items-center rounded-lg`}
    >
      {children}
    </button>
  );
};

export default Button;
