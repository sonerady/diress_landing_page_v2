import React from "react";
import LegalPageLayout from "./layouts/LegalPageLayout";

const TermsOfService = ({ translations, lang, setLang }) => {
  return (
    <LegalPageLayout translations={translations} lang={lang} setLang={setLang}>
      <div className="terms-of-service-container">
        <h1>Terms of Service – CoupleShot: AI Photo Generator</h1>
        <p>
          <strong>Last Updated:</strong> January 28, 2024
        </p>
        <div className="terms-content">
          <section>
            <p>
              These Terms of Service (“Terms”) govern your access to and use of
              the CoupleShot: AI Photo Generator mobile application (“App”)
              provided by CoupleShot (“CoupleShot,” “we,” “us,” or “our”). By
              using or accessing the App, you acknowledge that you have read,
              understood, and agree to be bound by these Terms.
            </p>
          </section>

          <section>
            <h2>1. Use of the App</h2>
            <ul>
              <li>
                <strong>Purpose of the App:</strong> CoupleShot enables users to
                upload photos of themselves or couples and enhance these images
                using artificial intelligence. The App offers features such as
                beautification, theming, and transformation of photos into various
                environments, providing visually appealing and personalized
                imagery for couples.
              </li>
              <li>
                <strong>Age Requirement:</strong> Our App is suitable for ages
                17+. However, we recommend that children under the age of 13 use
                the App under the supervision of a parent or legal guardian.
              </li>
              <li>
                <strong>Legal Use:</strong> You must use the App in compliance
                with all applicable laws, regulations, and standards.
              </li>
              <li>
                <strong>Content Rights:</strong> You must own or have the legal
                right to upload any images you submit. Uploading copyrighted or
                infringing content is strictly prohibited.
              </li>
            </ul>
          </section>

          <section>
            <h2>2. Intellectual Property Rights</h2>
            <ul>
              <li>
                <strong>CoupleShot’s Rights:</strong> All intellectual property
                rights in the App, including but not limited to the interface,
                graphics, software code, trademarks, and logos, are owned by us or
                our licensors. You may not reproduce, modify, distribute, or
                reverse engineer any part of the App.
              </li>
              <li>
                <strong>User Content:</strong> You retain all rights to the images
                you upload. CoupleShot uses these images solely to provide the
                core functionality of the App, such as enhancing and theming your
                photos.
              </li>
            </ul>
          </section>

          <section>
            <h2>3. Disclaimers and Warranties</h2>
            <ul>
              <li>
                <strong>No Guarantee of Service:</strong> We do not guarantee that
                the App will be error-free, uninterrupted, or always available.
              </li>
              <li>
                <strong>Data Loss:</strong> We are not responsible for the loss,
                deletion, or corruption of your uploaded content.
              </li>
              <li>
                <strong>Third-Party Links:</strong> The App may contain links to
                third-party content or websites. We are not responsible for such
                content or external services.
              </li>
            </ul>
          </section>

          <section>
            <h2>4. Limitation of Liability</h2>
            <p>
              In no event shall CoupleShot or its affiliates be liable for any
              indirect, incidental, special, or consequential damages arising out
              of or related to your use of the App.
            </p>
          </section>

          <section>
            <h2>5. Changes and Termination</h2>
            <ul>
              <li>
                <strong>Changes to Terms:</strong> We may update these Terms from
                time to time. If we make significant changes, we will notify you
                within the App. Continuing to use the App after such changes
                constitutes acceptance of the revised Terms.
              </li>
              <li>
                <strong>Termination:</strong> If you breach these Terms, we
                reserve the right to restrict or terminate your access to the App
                at any time.
              </li>
            </ul>
          </section>

          <section>
            <h2>6. Governing Law and Jurisdiction</h2>
            <p>
              These Terms and your use of the App are governed by the applicable
              laws of [your jurisdiction]. Any disputes arising shall be resolved
              by the competent courts of Türkiye.
            </p>
          </section>

          <section>
            <h2>7. Contact Information</h2>
            <p>
              If you have any questions about these Terms, please contact us at:
            </p>
            <p>
              <strong>Email:</strong>{" "}
              <a href="mailto:skozayy@gmail.com">skozayy@gmail.com</a>
            </p>
          </section>

          <section>
            <h2>8. Credits and In-App Purchases</h2>
            <ul>
              <li>
                <strong>Credit System Overview:</strong>
                <p>
                  <strong>Description:</strong> CoupleShot: AI Photo Generator
                  operates on a credit-based system. Users can purchase credits
                  through the App, which are then used to access premium features
                  such as advanced photo enhancements, exclusive themes, and
                  environmental transformations.
                </p>
              </li>
              <li>
                <strong>Purchasing Credits:</strong>
                <p>
                  <strong>Process:</strong> Credits can be purchased directly
                  within the App via secure payment methods, including
                  credit/debit cards, digital wallets, and other supported payment
                  platforms.
                </p>
                <p>
                  <strong>Pricing:</strong> The cost of credits varies based on
                  the package selected. Detailed pricing information is available
                  within the App’s purchase interface.
                </p>
              </li>
              <li>
                <strong>Usage of Credits:</strong>
                <p>
                  <strong>Allocation:</strong> Each premium feature or
                  transformation requires a specific number of credits. Users can
                  view the credit requirements for each feature within the App.
                </p>
                <p>
                  <strong>Expiration:</strong> Purchased credits do not expire and
                  can be used at any time unless stated otherwise in the App’s
                  terms.
                </p>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </LegalPageLayout>
  );
};

export default TermsOfService;
