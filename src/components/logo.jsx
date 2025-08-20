import Image from "next/image";
import { cn } from "@/lib/utils";
export const Logo = ({ className = "" }) => {
  return (
    <Image className={cn("max-w-[300px]",  className)} width={200} height={100} src="/assets/images/logo.png" alt="logo" />
  );
};
