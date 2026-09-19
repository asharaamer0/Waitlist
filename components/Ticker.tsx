"use client";

import { Asterisk } from "lucide-react";

const items = [
  "Voice notes",
  "PDF imports",
  "YouTube links",
  "Raw text",
  "Auto titles",
  "Flashcards",
  "Summaries",
  "Search",
];

export function Ticker() {
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-track">
        {[0, 1].map((half) => (
          <div key={half} style={{ display: "flex" }}>
            {items.map((item) => (
              <span className="ticker-item" key={`${half}-${item}`}>
                {item}
                <Asterisk aria-hidden="true" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
