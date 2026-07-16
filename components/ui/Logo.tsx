import Link from "next/link";
import { APP_NAME } from "@/lib/constants";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-xl font-bold text-transparent">
        {APP_NAME}
      </span>
    </Link>
  );
}
