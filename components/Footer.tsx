import Image from "next/image";

export function Footer() {
  return <footer className="footer shell">
    <a className="brand" href="/" aria-label="Quill home"><Image src="/logo.png" width={28} height={28} alt="" /><span>Quill.</span></a>
    <span className="footer-copyright">© 2026 Quill</span>
    <div className="footer-links"><a href="mailto:helloasharaamer@gmail.com">Say hello</a><a href="/privacy">Privacy policy</a><a href="#top">Back to top ↑</a></div>
  </footer>;
}
