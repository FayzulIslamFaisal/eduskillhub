import Image from "next/image";
import { cn } from "@/lib/utils";
export const Logo = ({ className = "" }) => {
  return (
    <Image className={cn("max-w-[100px]", className)} src={"/assets/images/logo.png"} alt="logo" />
  );
};
