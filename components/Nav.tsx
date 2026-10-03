import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export function Nav() {
  return <header className="site-header" id="top">
    <a className="skip-link" href="#main">Skip to content</a>
    <nav className="shell nav-inner" aria-label="Main navigation">
      <a className="brand" href="/" aria-label="Quill home">
        <Image src="/logo.png" width={36} height={36} alt="" />
        <span>Quill<span className="brand-dot">.</span></span>
      </a>
      <span className="nav-note">A quiet place for a busy mind.</span>
      <div className="nav-links">
        <a className="product-link" href="/#product">Meet Quill</a>
        <a className="nav-join" href="/#download">Get Quill <ArrowUpRight size={16} aria-hidden="true" /></a>
      </div>
    </nav>
  </header>;
}
