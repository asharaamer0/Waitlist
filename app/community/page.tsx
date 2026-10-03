import type { Metadata } from "next";
import { LegalPage } from "../../components/LegalPage";
export const metadata: Metadata = { title: "Community standards", description: "Community standards for Quill, operated by Ashar Aamer. Contact helloasharaamer@gmail.com for help.", alternates: { canonical: "/community" } };
export default function Page() { return <LegalPage document="community" />; }
