import React from "react";
import "./SonerAdiyaman.css";

function SonerAdiyaman() {
  return (
    <div className="cv-container">
      <div className="cv-header">
        <div className="cv-initials">
          <div className="initials-circle">SA</div>
        </div>
        <div className="cv-name-section">
          <h1 className="cv-name">Soner Adıyaman</h1>
          <div className="cv-title">Software Developer</div>
        </div>
      </div>

      <div className="cv-content">
        <div className="cv-left-column">
          <section className="cv-section">
            <h2 className="cv-section-title">CONTACT</h2>
            <div className="contact-item">
              <div className="contact-icon">📞</div>
              <div className="contact-text">+90 553 677 8682</div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">✉️</div>
              <div className="contact-text">skozayy@gmail.com</div>
            </div>
          </section>

          <section className="cv-section">
            <h2 className="cv-section-title">EDUCATION</h2>
            <div className="education-item">
              <h3 className="education-degree">Bilgisayar Programcılığı</h3>
              <div className="education-details">Atatürk Üniversitesi</div>
            </div>
          </section>

          <section className="cv-section">
            <h2 className="cv-section-title">SKILLS</h2>
            <div className="skills-category">
              <h3 className="skills-category-title">Web Development</h3>
              <ul className="skills-list">
                <li>React.js</li>
                <li>Node.js</li>
                <li>JavaScript (ES6+)</li>
                <li>HTML5 & CSS3</li>
                <li>Express.js</li>
                <li>MongoDB</li>
              </ul>
            </div>
            <div className="skills-category">
              <h3 className="skills-category-title">Mobile Development</h3>
              <ul className="skills-list">
                <li>React Native</li>
                <li>iOS Development</li>
                <li>Android Development</li>
              </ul>
            </div>
            <div className="skills-category">
              <h3 className="skills-category-title">Other Technologies</h3>
              <ul className="skills-list">
                <li>Git & GitHub</li>
                <li>TypeScript</li>
                <li>Redux</li>
                <li>REST APIs</li>
              </ul>
            </div>
          </section>
        </div>

        <div className="cv-right-column">
          <section className="cv-section">
            <h2 className="cv-section-title">SUMMARY</h2>
            <p className="summary-text">
              Passionate software developer whose journey with programming began
              at age 9, transforming a childhood curiosity into a thriving
              career. My programming journey preceded formal education, starting
              as a hobby that naturally evolved into my profession. This unique
              foundation has instilled in me a genuine love for technology and
              continuous learning that drives my work every day. With over 5
              years of professional experience spanning mobile development, web
              technologies, and blockchain solutions, I have successfully
              published multiple applications on the App Store, including my
              most successful project, Diress. My expertise encompasses React
              Native, React.js, Node.js, and Web3 technologies, allowing me to
              deliver end-to-end solutions from concept to deployment. As an
              independent developer, I combine technical excellence with
              entrepreneurial spirit, creating applications that solve
              real-world problems while maintaining the same passion for coding
              that sparked my interest decades ago.
            </p>
          </section>

          <section className="cv-section">
            <h2 className="cv-section-title">WORK EXPERIENCE</h2>

            <div className="work-item">
              <div className="work-header">
                <div className="work-dates">
                  Jan, 2024
                  <br />
                  Present
                </div>
                <div className="work-details">
                  <h3 className="work-title">
                    Independent Mobile App Developer
                  </h3>
                  <div className="work-location">Self-Employed</div>
                </div>
              </div>
              <div className="work-description">
                Developing and publishing my own mobile applications on App
                Store using React Native and native iOS technologies.
                <ul>
                  <li>
                    Published multiple successful apps: Diress, Wearup, Minipi,
                    and Facer
                  </li>
                  <li>
                    Diress - my most downloaded application with highest user
                    engagement
                  </li>
                  <li>
                    Full-cycle development from concept to App Store release
                  </li>
                  <li>
                    Managing app analytics, user feedback, and continuous
                    updates
                  </li>
                </ul>
              </div>
            </div>

            <div className="work-item">
              <div className="work-header">
                <div className="work-dates">
                  Jan, 2022
                  <br />
                  Dec, 2024
                </div>
                <div className="work-details">
                  <h3 className="work-title">
                    Full Stack Developer - React.js & Node.js
                  </h3>
                  <div className="work-location">Datasoft Software</div>
                </div>
              </div>
              <div className="work-description">
                Full stack developer focusing on modern web applications using
                React.js and Node.js for enterprise solutions.
                <ul>
                  <li>Developed responsive web applications with React.js</li>
                  <li>
                    Built backend services and APIs using Node.js/Express.js
                  </li>
                  <li>Database integration with MongoDB and SQL</li>
                  <li>Code reviews, testing, and deployment processes</li>
                </ul>
              </div>
            </div>

            <div className="work-item">
              <div className="work-header">
                <div className="work-dates">
                  Jan, 2020
                  <br />
                  Dec, 2021
                </div>
                <div className="work-details">
                  <h3 className="work-title">
                    Web Developer - Web3 & Blockchain
                  </h3>
                  <div className="work-location">ContractChecker</div>
                </div>
              </div>
              <div className="work-description">
                Web3 and blockchain projects using React.js and Node.js.
                <ul>
                  <li>Developed DApps with React.js and Web3 technologies</li>
                  <li>
                    Backend services for blockchain and smart contract
                    integration
                  </li>
                  <li>
                    Cryptocurrency wallet integrations and transaction handling
                  </li>
                  <li>
                    Contract auditing tools and security analysis platforms
                  </li>
                </ul>
              </div>
            </div>

            <div className="work-item">
              <div className="work-header">
                <div className="work-dates">
                  Mar, 2019
                  <br />
                  Dec, 2019
                </div>
                <div className="work-details">
                  <h3 className="work-title">
                    Mobile Developer - React Native
                  </h3>
                  <div className="work-location">
                    Mobulos Bilişim Teknolojileri, Muğla
                  </div>
                </div>
              </div>
              <div className="work-description">
                React Native developer for cross-platform mobile applications.
                <ul>
                  <li>
                    Developed mobile apps using React Native for iOS and Android
                  </li>
                  <li>
                    Team collaboration on new features and app improvements
                  </li>
                  <li>Code reviews and scalable architecture maintenance</li>
                  <li>Backend services and API integrations</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default SonerAdiyaman;
