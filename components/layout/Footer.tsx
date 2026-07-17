import Link from "next/link";
import Image from "next/image";
import logoCinava from "@/assets/images/logo-cinava.png";
import { APP_NAME } from "@/lib/constants";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-white/5 bg-black/40">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
          {/* Logo & description */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <Link href="/">
              <Image src={logoCinava} alt={APP_NAME} className="h-8 w-auto" />
            </Link>
            <p className="text-sm text-zinc-500 text-center md:text-left max-w-xs">
              Xem phim trực tuyến chất lượng cao, cập nhật nhanh nhất.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-12 text-sm">
            <div className="flex flex-col gap-2">
              <span className="font-semibold text-zinc-300 mb-1">Danh mục</span>
              <Link href="/danh-sach/phim-le" className="text-zinc-500 hover:text-white transition-colors">Phim lẻ</Link>
              <Link href="/danh-sach/phim-bo" className="text-zinc-500 hover:text-white transition-colors">Phim bộ</Link>
              <Link href="/danh-sach/hoat-hinh" className="text-zinc-500 hover:text-white transition-colors">Hoạt hình</Link>
              <Link href="/danh-sach/tv-shows" className="text-zinc-500 hover:text-white transition-colors">TV Shows</Link>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-semibold text-zinc-300 mb-1">Hỗ trợ</span>
              <Link href="#" className="text-zinc-500 hover:text-white transition-colors">Liên hệ</Link>
              <Link href="#" className="text-zinc-500 hover:text-white transition-colors">Điều khoản</Link>
              <Link href="#" className="text-zinc-500 hover:text-white transition-colors">Chính sách</Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <p className="text-xs text-zinc-600">
            © {currentYear} {APP_NAME}. Tất cả nội dung được tổng hợp từ internet.
          </p>
        </div>
      </div>
    </footer>
  );
}
