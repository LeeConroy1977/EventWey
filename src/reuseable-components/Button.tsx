interface ButtonProps {
  children: React.ReactNode;
  px: string;
  py: string;
  bgColour: string;
  textColour: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  px,
  py,
  bgColour,
  textColour,
}) => {
  return (
    <button
      className={`${px} ${py} ${bgColour} ${textColour} flex justify-center items-center`}
    >
      {children}
    </button>
  );
};

export default Button;
