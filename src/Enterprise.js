import React from "react";
import "./Enterprise.css";
import logo from "./logo.png";
import diress from "./diress.png";

const Enterprise = () => {
  return (
    <div className="document-container">
      {/* Background Logo */}
      <div className="document-background-logo"></div>

      {/* Document Header */}
      <div className="document-header">
        <div className="header-content">
          <img src={diress} alt="DIRESS" className="document-logo" />
          <div className="document-title">
            <h1>Enterprise Web-Based Version of DIRESS</h1>
            <div className="document-subtitle">
              One-Time Purchase Option - Enterprise License
            </div>
            <div className="document-meta">
              <div className="meta-item">
                <strong>Date:</strong>{" "}
                {new Date().toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              <div className="meta-item">
                <strong>Prepared by:</strong> Soner, Founder - DIRESS
              </div>
              <div className="meta-item">
                <strong>Website:</strong> www.monailisa.com
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Document Content */}
      <div className="document-body">
        {/* Section 1: License Overview */}
        <section className="document-section">
          <h2>1. License Overview</h2>
          <p>
            For corporate clients, we offer a web-based enterprise version of
            DIRESS with a one-time licensing fee of <strong>$30,000</strong>.
            This license grants you unlimited usage access to the DIRESS
            platform.
          </p>
          <p>
            <strong>Please note:</strong> Although the platform access is
            unlimited, you are still responsible for covering the actual usage
            cost of each image generation (i.e., infrastructure/AI processing
            fees).
          </p>
        </section>

        {/* Section 2: Cost Reduction */}
        <section className="document-section">
          <h2>2. Drastic Cost Reduction on Image Generation</h2>
          <p>Normally, DIRESS users purchase 5,000 credits for around $100.</p>
          <p>
            <strong>With the enterprise license:</strong>
          </p>
          <ul>
            <li>
              Your image generation cost is reduced to{" "}
              <strong>$15-20 per 5,000 credits</strong>
            </li>
            <li>
              This results in up to <strong>80-85% savings</strong> on your
              operational costs
            </li>
          </ul>

          <div className="comparison-table">
            <table>
              <thead>
                <tr>
                  <th>Pricing Model</th>
                  <th>Cost per 5,000 Credits</th>
                  <th>Savings</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Standard Retail Pricing</td>
                  <td>$100</td>
                  <td>-</td>
                </tr>
                <tr className="highlight-row">
                  <td>Enterprise Raw Cost</td>
                  <td>$15-20</td>
                  <td>80-85%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 3: Key Benefits */}
        <section className="document-section">
          <h2>3. Key Benefits</h2>
          <ul className="benefits-list">
            <li>
              <strong>Web-Based Access:</strong> No device restrictions; works
              across desktop environments
            </li>
            <li>
              <strong>One-Time Fee:</strong> No recurring license payments
            </li>
            <li>
              <strong>Commercial Use Freedom:</strong> You may offer virtual
              try-on services to other brands or clients
            </li>
            <li>
              <strong>Same Features as Mobile App:</strong> All features from
              the mobile app (AI model try-ons, styling control, pose
              adjustments, etc.) are included in the web version
            </li>
            <li>
              <strong>Multi-user support:</strong> Perfect for marketing teams,
              studios, or agencies
            </li>
            <li>
              <strong>Custom Branding Support:</strong> White-label solutions
              available
            </li>
          </ul>
        </section>

        {/* Section 4: Feature Comparison */}
        <section className="document-section">
          <h2>4. Mobile App vs Web Platform - Key Differences</h2>
          <p>
            <strong>Feature Comparison:</strong>
          </p>

          <div className="feature-table">
            <table>
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>Mobile App</th>
                  <th>Web Platform</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Access</td>
                  <td>iOS Only</td>
                  <td className="advantage">Cross-platform (browser-based)</td>
                </tr>
                <tr>
                  <td>Image Generation Cost</td>
                  <td>Retail pricing</td>
                  <td className="advantage">Deeply discounted raw cost</td>
                </tr>
                <tr>
                  <td>Custom Branding Support</td>
                  <td>No</td>
                  <td className="advantage">Yes</td>
                </tr>
                <tr>
                  <td>User Management</td>
                  <td>Single-user</td>
                  <td className="advantage">Multi-user</td>
                </tr>
                <tr>
                  <td>Commercial Resale Capability</td>
                  <td>Limited</td>
                  <td className="advantage">Full access</td>
                </tr>
                <tr>
                  <td>API Integration</td>
                  <td>Not available</td>
                  <td className="advantage">Available upon request</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 5: Contact */}
        <section className="document-section">
          <h2>5. Contact</h2>
          <p>
            If this sounds aligned with your business needs, we'd be happy to
            schedule a demo or provide a tailored onboarding package.
          </p>

          <div className="contact-info">
            <p>
              <strong>Best regards,</strong>
            </p>
            <p>
              <strong>Soner</strong>
              <br />
              Founder, DIRESS
              <br />
              <a
                href="https://www.monailisa.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                www.monailisa.com
              </a>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Enterprise;
