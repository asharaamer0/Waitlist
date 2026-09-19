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
            <p className="footer-copy">Capture at the speed of thought. AI note-taking for how you actually think.</p>
            <a className="footer-email" href="mailto:helloasharaamer@gmail.com">
              helloasharaamer@gmail.com
            </a>
          </div>
          <nav className="footer-nav" aria-label="Footer">
            <div className="footer-col">
              <strong>Product</strong>
              <a href="#features">Features</a>
              <a href="#process">Process</a>
              <a href="#preview">Preview</a>
            </div>
            <div className="footer-col">
              <strong>Access</strong>
              <a href="#waitlist">Join waitlist</a>
              <a href="#privacy">Privacy policy</a>
              <a href="mailto:helloasharaamer@gmail.com">Contact</a>
            </div>
            <div className="footer-col">
              <strong>Contact</strong>
              <a href="mailto:helloasharaamer@gmail.com">helloasharaamer@gmail.com</a>
              <span style={{ opacity: 0.6, fontSize: "12.5px" }}>We reply within a day.</span>
            </div>
          </nav>
        </div>
        <div className="footer-bottom">
          <p className="footer-copy">Voice · Text · PDFs · Flashcards — one quiet place.</p>
          <p className="footer-rights">© 2026 Quill · <a href="mailto:helloasharaamer@gmail.com">helloasharaamer@gmail.com</a> · All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
