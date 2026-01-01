import React from "react";
import LegalPageLayout from "./layouts/LegalPageLayout";

const PrivacyPolicy = ({ translations, lang, setLang }) => {
  const today = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <LegalPageLayout translations={translations} lang={lang} setLang={setLang}>
      <div className="privacy-policy-container">
        <h1>Privacy Policy – Monailisa</h1>
        <p>
          <strong>Last Updated:</strong> {today}
        </p>
        <div className="privacy-content">
          <section>
            <p>
              Monailisa ("we," "our," or "us") values your privacy. This Privacy
              Policy explains how we collect, use, and share information when you
              use our services and applications (the "Services"). Our Services are
              suitable for ages 17+.
            </p>
          </section>

          <section>
            <h2>1. Information We Collect</h2>
            <ul>
              <li>
                <strong>User-Provided Images:</strong>
                <p>
                  Users may upload images of clothing items. These images are
                  temporarily stored on secure servers to generate AI-based
                  visuals of how the product would appear on a model. We do not
                  use these images for identification, marketing, or analytics
                  beyond providing the core functionality of the App.
                </p>
              </li>
              <li>
                <strong>User ID:</strong>
                <p>
                  We assign a non-personally identifiable user ID to each user.
                  This ID associates uploaded content with a specific session
                  without including personal information such as your real name or
                  email address.
                </p>
              </li>
            </ul>
          </section>

          <section>
            <h2>2. How We Use Your Information</h2>
            <ul>
              <li>
                <strong>App Functionality:</strong>
                <p>
                  Uploaded images are used solely to provide our services' core
                  features — delivering AI-generated visualizations and
                  transformations.
                </p>
              </li>
              <li>
                <strong>No Advertising or Tracking:</strong>
                <p>
                  We do not use your data for advertising or marketing, nor do we
                  track your activity across other services.
                </p>
              </li>
            </ul>
          </section>

          <section>
            <h2>3. Data Storage and Security</h2>
            <ul>
              <li>
                <strong>Secure Storage:</strong>
                <p>
                  Your images and user ID are stored securely with
                  industry-standard safeguards to prevent unauthorized access or
                  disclosure.
                </p>
              </li>
              <li>
                <strong>Limited Retention:</strong>
                <p>
                  We retain your images only as long as necessary to produce the
                  requested AI visualization. After that, we may delete the data
                  or anonymize it so it cannot be linked back to you.
                </p>
              </li>
              <li>
                <strong>Data Storage and Security:</strong>
                <p>
                  Face data is only stored in our databases and requires 1-hour
                  storage duration for AI model training. After the training is
                  complete, these facial data are completely deleted after 1 hour.
                  Access to facial data is strictly limited to authorized
                  personnel and regular security audits are conducted.
                </p>
              </li>
            </ul>
          </section>

          <section>
            <h2>4. Sharing of Information</h2>
            <ul>
              <li>
                <strong>No Unauthorized Sharing:</strong>
                <p>
                  We do not sell, rent, or share your images or user ID with third
                  parties, except as required by law or to maintain the App's
                  security and functionality. Any such parties are bound by
                  confidentiality obligations.
                </p>
              </li>
            </ul>
          </section>

          <section>
            <h2>5. Children's Privacy</h2>
            <ul>
              <li>
                <strong>Age Restriction:</strong>
                <p>
                  Monailisa services are suitable for ages 17+. We do not
                  knowingly collect personal information from children under 13.
                </p>
              </li>
              <li>
                <strong>Parental Control:</strong>
                <p>
                  If you are a parent or guardian and believe that your child has
                  provided us with personal information, please contact us so we
                  can promptly remove such data.
                </p>
              </li>
            </ul>
          </section>

          <section>
            <h2>6. Your Choices</h2>
            <ul>
              <li>
                <strong>Data Deletion Requests:</strong>
                <p>
                  You may request the deletion of your uploaded content or raise
                  any concerns regarding your data by contacting us.
                </p>
              </li>
            </ul>
          </section>

          <section>
            <h2>7. Changes to This Privacy Policy</h2>
            <ul>
              <li>
                <strong>Updates:</strong>
                <p>
                  We may update this Privacy Policy from time to time to reflect
                  changes in our practices or for other operational, legal, or
                  regulatory reasons.
                </p>
              </li>
              <li>
                <strong>Notification:</strong>
                <p>
                  If we make significant changes, we will notify you through our
                  services. Your continued use of our services after updates
                  signifies your acceptance of the revised terms.
                </p>
              </li>
            </ul>
          </section>

          <section>
            <h2>8. Contact Us</h2>
            <p>
              For questions or concerns about this Privacy Policy or our data
              practices, please reach out to us at:
            </p>
            <p>
              <strong>Email:</strong>{" "}
              <a href="mailto:info@monailisa.com">info@monailisa.com</a>
            </p>
          </section>

          <section>
            <h2>9. Credits and In-App Purchases</h2>
            <ul>
              <li>
                <strong>Credit System Overview:</strong>
                <p>
                  <strong>Description:</strong> Monailisa operates on a
                  credit-based system. Users can purchase credits through our
                  applications, which are then used to access premium features
                  such as advanced photo enhancements, exclusive themes, and
                  environmental transformations.
                </p>
              </li>
              <li>
                <strong>Purchasing Credits:</strong>
                <p>
                  <strong>Process:</strong> Credits can be purchased directly
                  within our applications via secure payment methods, including
                  credit/debit cards, digital wallets, and other supported payment
                  platforms.
                </p>
                <p>
                  <strong>Pricing:</strong> The cost of credits varies based on
                  the package selected. Detailed pricing information is available
                  within each application's purchase interface.
                </p>
              </li>
              <li>
                <strong>Usage of Credits:</strong>
                <p>
                  <strong>Allocation:</strong> Each premium feature or
                  transformation requires a specific number of credits. Users can
                  view the credit requirements for each feature within our
                  services.
                </p>
                <p>
                  <strong>Expiration:</strong> Purchased credits do not expire and
                  can be used at any time unless stated otherwise in our terms.
                </p>
              </li>
            </ul>
          </section>

          <section>
            <h2>10. Facial Data Collection and Usage</h2>
            <ul>
              <li>
                <strong>Collection of Facial Data:</strong>
                <p>
                  Our app processes user-provided photos for generating virtual
                  mannequins using AI models. We do not extract biometric data
                  such as facial recognition points, nor do we identify or track
                  users.
                </p>
              </li>
              <li>
                <strong>Use of Facial Data:</strong>
                <p>
                  Facial data is used strictly for the AI generation of fashion
                  visualizations. It is not used for identity verification,
                  tracking, or analytics.
                </p>
              </li>
              <li>
                <strong>Storage and Retention:</strong>
                <p>
                  All user photos are processed either on-device or via secure
                  Supabase servers. These images are stored temporarily only for
                  the duration of processing and are deleted immediately afterward
                  (typically within 1 hour). No long-term storage occurs.
                </p>
              </li>
              <li>
                <strong>Third-Party Sharing:</strong>
                <p>
                  We do not share any face data with third parties. AI processing
                  is handled internally or by strictly vetted partners under NDA
                  and with proper security protocols.
                </p>
              </li>
              <li>
                <strong>Privacy Policy Transparency:</strong>
                <p>
                  This data handling policy is reflected in our Privacy Policy
                  section titled "Facial Data Collection and Usage." We remain
                  fully compliant with Apple’s guideline 5.1.1 and related data
                  privacy regulations.
                </p>
              </li>
              <li>
                <strong>User Rights:</strong>
                <p>
                  Users have the right to request immediate deletion of their
                  facial data, opt-out of training, or withdraw consent at any
                  time by contacting us.
                </p>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </LegalPageLayout>
  );
};

export default PrivacyPolicy;
