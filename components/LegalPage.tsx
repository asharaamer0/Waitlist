import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { legalContent } from "../lib/legal";

export function LegalPage({ document }: { document: keyof typeof legalContent }) {
  return <><Nav /><main className="shell privacy-page" id="main">
    <article dangerouslySetInnerHTML={{ __html: legalContent[document] }} />
    <a className="text-link" href="/">← Back to Quill</a>
  </main><Footer /></>;
}
