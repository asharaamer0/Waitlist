import type { Metadata } from "next";
import { LegalPage } from "../../components/LegalPage";
export const metadata: Metadata = { title: "Terms of use", description: "Terms of use for Quill, operated by Ashar Aamer. Contact helloasharaamer@gmail.com for help.", alternates: { canonical: "/terms" } };
export default function Page() { return <LegalPage document="terms" />; }
