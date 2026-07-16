import Link from "next/link";
import { APP_NAME, ROUTES } from "@/lib/constants";

const FOOTER_LINKS = [
  {
    title: "Khám phá",
    links: [
      { href: ROUTES.MOVIES, label: "Phim lẻ" },
      { href: ROUTES.TV_SERIES, label: "Phim bộ" },
      { href: ROUTES.GENRES, label: "Thể loại" },
    ],
  },
  {
    title: "Hỗ trợ",
    links: [
      { href: "#", label: "FAQ" },
      { href: "#", label: "Liên hệ" },
      { href: "#", label: "Điều khoản" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2">
            <Link href={ROUTES.HOME} className="text-xl font-bold text-white">
              {APP_NAME}
            </Link>
            <p className="mt-3 max-w-sm text-sm text-zinc-500">
              Xem phim trực tuyến chất lượng cao, cập nhật nhanh nhất.
            </p>
          </div>

          {FOOTER_LINKS.map((group) => (
            <div key={group.title}>
              <h3 className="text-sm font-semibold text-white">
                {group.title}
              </h3>
              <ul className="mt-3 space-y-2">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-zinc-500 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-zinc-600">
          © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
