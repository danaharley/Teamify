import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { customFont } from "@/lib/fonts";

export const Logo = () => {
  return (
    <Link href="/">
      <div className="hidden items-center gap-x-2 transition hover:opacity-75 md:flex">
        <Image
          src="/teamify.svg"
          alt="Logo"
          width={30}
          height={30}
          className="rotate-45"
        />
        <p
          className={cn("pb-1 text-lg text-neutral-700", customFont.className)}
        >
          Teamify
        </p>
      </div>
    </Link>
  );
};
