import { ArrowUpRight } from "lucide-react";

const configured = process.env.NEXT_PUBLIC_APP_STORE_URL?.trim();
const appStoreURL = configured && /^https:\/\/apps\.apple\.com\//.test(configured) ? configured : undefined;

export function DownloadLink() {
  return appStoreURL ? <a className="download-button" href={appStoreURL}>Download on the App Store <ArrowUpRight size={17} aria-hidden="true" /></a>
    : <div className="download-pending"><span className="download-button" aria-disabled="true">Quill for iPhone &amp; iPad</span><p>App Store download link will appear here when it’s available.</p></div>;
}
