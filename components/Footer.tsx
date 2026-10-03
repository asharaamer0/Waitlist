import Image from "next/image";

export function Footer() {
  return <footer className="footer shell">
    <a className="brand" href="/" aria-label="Quill home"><Image src="/logo.png" width={28} height={28} alt="" /><span>Quill.</span></a>
    <span className="footer-copyright">© 2026 Ashar Aamer</span>
    <div className="footer-links"><a href="/support">Support</a><a href="/privacy">Privacy</a><a href="/terms">Terms</a><a href="/community">Community standards</a><a href="#top">Back to top ↑</a></div>
  </footer>;
}
