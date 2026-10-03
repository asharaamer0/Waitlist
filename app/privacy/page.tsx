import type { Metadata } from "next";
import { LegalPage } from "../../components/LegalPage";
export const metadata: Metadata = { title: "Privacy policy", description: "Privacy policy for Quill, operated by Ashar Aamer. Contact helloasharaamer@gmail.com for help.", alternates: { canonical: "/privacy" } };
export default function Page() { return <LegalPage document="privacy" />; }
