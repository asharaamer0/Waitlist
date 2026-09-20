export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div>
            <div className="footer-brand">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.png"
                alt="Quill feather mark"
                width={34}
                height={34}
                className="footer-mark"
              />
              <span className="footer-wordmark">Quill</span>
            </div>
            <p className="footer-tagline">Capture at the speed of thought.</p>
          </div>
          <nav className="footer-nav" aria-label="Footer">
            <a href="#features">Features</a>
            <a href="#process">Process</a>
            <a href="#preview">Preview</a>
            <a href="#waitlist">Early access</a>
            <a href="#privacy">Privacy policy</a>
          </nav>
        </div>
        <div className="footer-bottom">
          <p className="footer-legal">© 2026 Quill. All rights reserved.</p>
          <a href="mailto:helloasharaamer@gmail.com">helloasharaamer@gmail.com</a>
        </div>
      </div>
    </footer>
  );
}
