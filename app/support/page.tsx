import type { Metadata } from "next";
import { LegalPage } from "../../components/LegalPage";
export const metadata: Metadata = { title: "Support", description: "Support for Quill, operated by Ashar Aamer. Contact helloasharaamer@gmail.com for help.", alternates: { canonical: "/support" } };
export default function Page() { return <LegalPage document="support" />; }
