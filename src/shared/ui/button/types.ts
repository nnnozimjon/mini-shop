export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "solid" | "outline" | "ghost";
  color?: "purple" | "blue" | "red" | "green";
  rounded?: boolean;
  children: React.ReactNode;
}
