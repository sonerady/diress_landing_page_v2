import React from "react";

function ResultsTips() {
  const lang = new URLSearchParams(window.location.search).get("lang") || "en";
  const modalKey = "results_tips";
  const canonical = `https://monailisa.com/modal/${modalKey}?lang=${lang}`;

  return (
    <div className="privacy-policy-container">
      <h1>Results Tips</h1>
      <p>
        This page provides tips to achieve the best results. You are viewing the
        content in language: <strong>{lang}</strong>.
      </p>

      <section className="privacy-content">
        <h2>General Tips</h2>
        <ul>
          <li>Use high-quality, well-lit photos for better AI outputs.</li>
          <li>Center the subject and avoid heavy filters or stickers.</li>
          <li>Upload multiple angles for improved consistency.</li>
          <li>Allow enough time for processing and avoid interruptions.</li>
        </ul>
      </section>

      <section className="privacy-content">
        <h2>Advanced Tips</h2>
        <ul>
          <li>Keep backgrounds simple to reduce noise.</li>
          <li>
            Ensure the subject is not obstructed (e.g., sunglasses, hats).
          </li>
          <li>Prefer neutral expressions for more flexible styling.</li>
          <li>Check the final output and iterate with improved inputs.</li>
        </ul>
      </section>

      <p>
        Canonical URL: <a href={canonical}>{canonical}</a>
      </p>
    </div>
  );
}

export default ResultsTips;
