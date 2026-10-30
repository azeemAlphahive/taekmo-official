export type LegalSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type LegalDocument = {
  slug: "privacy" | "terms" | "disclaimer";
  title: string;
  eyebrow: string;
  description: string;
  lastUpdated: string;
  sections: LegalSection[];
};

export const legalDocuments: Record<LegalDocument["slug"], LegalDocument> = {
  privacy: {
    slug: "privacy",
    title: "Privacy Policy",
    eyebrow: "LEGAL",
    description:
      "How TAEKMO collects, uses, and protects information when you use our website, mobile app, and related services.",
    lastUpdated: "31 October 2026",
    sections: [
      {
        heading: "1. Who we are",
        paragraphs: [
          "This Privacy Policy applies to the official TAEKMO website (taekmo-official.com), the TAEKMO Solar mobile app, and related contact or verification tools operated for TAEKMO / Talesun channel communications.",
          "For privacy questions, contact us at Nibrass.zaman@talesun.com or +92 323 3336633.",
        ],
      },
      {
        heading: "2. Information we collect",
        paragraphs: [
          "We may collect information you provide directly and limited technical data needed to operate the site and app.",
        ],
        bullets: [
          "Contact details you submit (name, email, phone, company, message content).",
          "Newsletter email addresses when you subscribe.",
          "Product numbers or scan data you enter for authenticity verification.",
          "Basic device and usage data (app version, device type, crash/diagnostic signals where enabled).",
          "Approximate technical logs such as IP address, browser type, and pages viewed on the website.",
        ],
      },
      {
        heading: "3. How we use information",
        paragraphs: [
          "We use personal and technical information only for legitimate business purposes related to TAEKMO products and support.",
        ],
        bullets: [
          "Respond to inquiries and sales or support requests.",
          "Send newsletter updates you opted into.",
          "Operate product authenticity verification.",
          "Improve website/app performance, security, and content.",
          "Comply with legal or regulatory obligations where required.",
        ],
      },
      {
        heading: "4. Sharing of information",
        paragraphs: [
          "We do not sell your personal information. We may share data with trusted service providers who help us host email, analytics, hosting, or verification systems, and only as needed to perform those services. We may also disclose information if required by law or to protect rights, safety, and integrity of TAEKMO, users, or the public.",
        ],
      },
      {
        heading: "5. Cookies and similar technologies",
        paragraphs: [
          "Our website may use cookies or similar technologies for essential functionality, preferences, and aggregated analytics. You can control cookies through your browser settings. Disabling cookies may affect some site features.",
        ],
      },
      {
        heading: "6. Data retention and security",
        paragraphs: [
          "We retain information only as long as needed for the purposes described above, or as required by law. We apply reasonable administrative and technical safeguards; however, no method of transmission or storage is completely secure.",
        ],
      },
      {
        heading: "7. Your choices",
        paragraphs: [
          "You may request access, correction, or deletion of personal information we hold about you, subject to applicable law and legitimate business retention needs. You can unsubscribe from marketing emails using the link in those messages or by contacting us.",
        ],
      },
      {
        heading: "8. Children",
        paragraphs: [
          "Our services are intended for business and adult users. We do not knowingly collect personal information from children under 16.",
        ],
      },
      {
        heading: "9. Changes",
        paragraphs: [
          "We may update this Privacy Policy from time to time. The “Last updated” date at the top of this page will reflect the latest revision. Continued use of the website or app after changes means you accept the updated policy.",
        ],
      },
    ],
  },
  terms: {
    slug: "terms",
    title: "Terms & Conditions",
    eyebrow: "LEGAL",
    description:
      "Terms that govern your use of the TAEKMO website, mobile app, and online product information.",
    lastUpdated: "31 October 2026",
    sections: [
      {
        heading: "1. Agreement",
        paragraphs: [
          "By accessing taekmo-official.com or using the TAEKMO Solar mobile app, you agree to these Terms & Conditions. If you do not agree, please do not use the site or app.",
        ],
      },
      {
        heading: "2. About TAEKMO",
        paragraphs: [
          "TAEKMO is presented as an international solar brand associated with Talesun Solar. Product availability, specifications, pricing, and commercial terms are handled through authorized distributors and sales channels and may vary by market.",
        ],
      },
      {
        heading: "3. Use of the website and app",
        paragraphs: [
          "You agree to use the website and app only for lawful purposes and in a way that does not disrupt services, attempt unauthorized access, scrape content abusively, or misuse verification tools.",
        ],
        bullets: [
          "Do not submit false or misleading contact or verification information.",
          "Do not reverse engineer or interfere with app or site security.",
          "Do not use branding, logos, or content without permission except as allowed by law.",
        ],
      },
      {
        heading: "4. Product information",
        paragraphs: [
          "Datasheets, wattage classes, imagery, and feature descriptions are provided for general information. Specifications may change. Always confirm current technical and commercial details with an authorized TAEKMO / Talesun partner before purchasing or installing.",
        ],
      },
      {
        heading: "5. Verification tool",
        paragraphs: [
          "The product authenticity checker is a convenience tool. Results depend on the accuracy of the Product No. entered and available records. A verification result does not by itself create a warranty claim or purchase contract.",
        ],
      },
      {
        heading: "6. Intellectual property",
        paragraphs: [
          "Site and app content — including text, graphics, logos, product imagery, and software — is owned by or licensed to TAEKMO / related rights holders and protected by applicable intellectual property laws.",
        ],
      },
      {
        heading: "7. Third-party links",
        paragraphs: [
          "Links to distributor sites, partner pages, app stores, or other third parties are provided for convenience. We are not responsible for their content, privacy practices, or availability.",
        ],
      },
      {
        heading: "8. Limitation of liability",
        paragraphs: [
          "To the maximum extent permitted by law, TAEKMO and its affiliates are not liable for indirect, incidental, special, consequential, or punitive damages arising from use of the website or app, including reliance on published product information. Total liability for claims relating to the website or app is limited to the greater of fees you paid (if any) for digital access or a nominal amount where required by local law.",
        ],
      },
      {
        heading: "9. Governing law",
        paragraphs: [
          "These terms are governed by applicable laws of the jurisdictions in which TAEKMO / Talesun operate for the relevant channel, without prejudice to mandatory consumer protections that apply to you.",
        ],
      },
      {
        heading: "10. Contact",
        paragraphs: [
          "Questions about these Terms: Nibrass.zaman@talesun.com · +92 323 3336633.",
        ],
      },
    ],
  },
  disclaimer: {
    slug: "disclaimer",
    title: "Disclaimer",
    eyebrow: "LEGAL",
    description:
      "Important notices about product information, warranties, and reliance on content published by TAEKMO online.",
    lastUpdated: "31 October 2026",
    sections: [
      {
        heading: "1. General information only",
        paragraphs: [
          "Content on the TAEKMO website and mobile app is provided for general informational and marketing purposes. It does not constitute engineering advice, installation instructions, a binding offer, or a guarantee of product performance under every site condition.",
        ],
      },
      {
        heading: "2. Product specifications",
        paragraphs: [
          "Module ratings, efficiency figures, dimensions, certificates, and imagery may be updated as product lines evolve. Always request the latest official datasheet and commercial quotation from an authorized distributor before design, procurement, or installation.",
        ],
      },
      {
        heading: "3. Warranties",
        paragraphs: [
          "Any warranty periods or coverage summaries shown online are illustrative unless expressly confirmed in an official warranty document issued for your purchase. Warranty claims follow the terms of the applicable warranty certificate and local channel policy.",
        ],
      },
      {
        heading: "4. Performance and results",
        paragraphs: [
          "Energy yield depends on location, orientation, shading, system design, inverter pairing, maintenance, and environmental conditions. Past or example performance figures do not guarantee future results.",
        ],
      },
      {
        heading: "5. Third parties and distributors",
        paragraphs: [
          "Independent distributors, EPCs, and retailers are responsible for their own sales contracts, delivery, installation quality, and local after-sales service, except where TAEKMO / Talesun expressly assumes an obligation in writing.",
        ],
      },
      {
        heading: "6. No professional advice",
        paragraphs: [
          "Nothing on this site or in the app replaces advice from a licensed electrician, engineer, or other qualified professional for your project and jurisdiction.",
        ],
      },
      {
        heading: "7. Availability",
        paragraphs: [
          "We aim to keep online services available but do not warrant uninterrupted or error-free access. Features may be modified, suspended, or discontinued without notice.",
        ],
      },
      {
        heading: "8. Contact",
        paragraphs: [
          "For clarification on any disclaimer point, contact Nibrass.zaman@talesun.com or +92 323 3336633.",
        ],
      },
    ],
  },
};

export const legalNav = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Disclaimer", href: "/disclaimer" },
] as const;
