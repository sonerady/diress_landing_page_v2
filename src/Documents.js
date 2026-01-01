import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "./logo.png";
import "./Documents.css";
import useImageLoader from "./ImageLoader";

function Documents() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [modalImage, setModalImage] = useState(null);

  // Use the image loader for both directories
  const {
    images: babyImages,
    loading: babyLoading,
    error: babyError,
  } = useImageLoader("baby-example");

  const {
    images: pregnantImages,
    loading: pregnantLoading,
    error: pregnantError,
  } = useImageLoader("pregnant-photo");

  // Check for saved login on component mount
  useEffect(() => {
    const loggedInStatus = localStorage.getItem("documentsLoggedIn");
    if (loggedInStatus === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    // Check credentials
    if (username === "minipi" && password === "minipi-123") {
      setIsLoggedIn(true);
      localStorage.setItem("documentsLoggedIn", "true");
      setError("");
    } else {
      setError("Invalid username or password");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("documentsLoggedIn");
    setUsername("");
    setPassword("");
  };

  // Function to open modal with image
  const openImageModal = (image) => {
    setModalImage(image);
    document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
  };

  // Function to close modal
  const closeImageModal = () => {
    setModalImage(null);
    document.body.style.overflow = ""; // Restore scrolling
  };

  // Function to handle individual download
  const downloadImage = (image) => {
    // Create a link to download the image
    const link = document.createElement("a");
    link.href = image.path;
    link.download = `${image.alt.replace(/\s+/g, "-").toLowerCase()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Function to handle bulk download (individual images)
  const handleBulkDownload = (galleryName, images) => {
    // Show progress notification
    const notification = document.createElement("div");
    notification.className = "download-notification";
    notification.innerHTML = `
      <div class="download-progress">
        <div class="download-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
        </div>
        <div class="download-text">
          <div>Downloading ${galleryName} Images</div>
          <div class="download-count">${images.length} files</div>
        </div>
      </div>
    `;
    document.body.appendChild(notification);

    // Download images one by one with a small delay between each
    let downloadedCount = 0;

    // Function to download images sequentially
    const downloadNext = (index) => {
      if (index >= images.length) {
        // All downloads complete
        notification.remove();

        // Show success message
        const successNotification = document.createElement("div");
        successNotification.className = "download-notification success";
        successNotification.innerHTML = `
          <div class="download-progress">
            <div class="download-icon success">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <div class="download-text">
              <div>Download Complete</div>
              <div class="download-count">${images.length} files from ${galleryName}</div>
            </div>
          </div>
        `;
        document.body.appendChild(successNotification);

        // Remove success notification after 3 seconds
        setTimeout(() => {
          successNotification.remove();
        }, 3000);

        return;
      }

      // Update notification with progress
      downloadedCount++;
      notification.querySelector(
        ".download-count"
      ).textContent = `${downloadedCount}/${images.length} files`;

      // Download current image
      const image = images[index];
      downloadImage(image);

      // Schedule next download
      setTimeout(() => downloadNext(index + 1), 500);
    };

    // Start downloading
    setTimeout(() => downloadNext(0), 500);
  };

  // Image gallery component
  const ImageGallery = ({ title, images, loading, error }) => (
    <div className="gallery-section">
      <div className="gallery-header">
        <h2>{title}</h2>
        {!loading && !error && images.length > 0 && (
          <button
            className="download-all-button"
            onClick={() => handleBulkDownload(title, images)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Download All
          </button>
        )}
      </div>
      {loading ? (
        <div className="loading-message">Loading images...</div>
      ) : error ? (
        <div className="error-display">{error}</div>
      ) : images.length === 0 ? (
        <div className="no-images-message">
          No images found in this category
        </div>
      ) : (
        <div className="image-gallery">
          {images.map((image) => (
            <div key={image.id} className="image-card">
              <img
                src={image.path}
                alt={image.alt}
                onClick={() => openImageModal(image)}
                onError={(e) => {
                  // On error, replace with a placeholder and show error message
                  e.target.src =
                    "https://via.placeholder.com/400x300?text=Image+Failed+to+Load";
                  e.target.style.border = "1px solid #ff5757";
                }}
              />
              <div className="image-caption">
                <span>{image.alt}</span>
                <button
                  className="image-download-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    downloadImage(image);
                  }}
                  title="Download Image"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // Login form
  if (!isLoggedIn) {
    return (
      <div className="documents-container">
        <video autoPlay muted loop playsInline className="background-video">
          <source src="https://un.ms//assets/pile/sky.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="login-container">
          <img src={logo} alt="Logo" className="login-logo" />
          <h1>Document Access</h1>

          <form onSubmit={handleLogin} className="login-form">
            {error && <div className="error-message">{error}</div>}
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="login-button">
              Login
            </button>
          </form>

          <div className="back-link">
            <Link to="/">Back to Home</Link>
          </div>
        </div>
      </div>
    );
  }

  // Documents page (shown after login)
  return (
    <div className="documents-container">
      <video autoPlay muted loop playsInline className="background-video">
        <source src="https://un.ms//assets/pile/sky.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="documents-content">
        <header className="documents-header">
          <img src={logo} alt="Logo" className="documents-logo" />
          <h1>Monailisa Documents</h1>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </header>

        <main className="galleries-container">
          <ImageGallery
            title="Baby Examples"
            images={babyImages}
            loading={babyLoading}
            error={babyError}
          />
          <ImageGallery
            title="Pregnancy Photos"
            images={pregnantImages}
            loading={pregnantLoading}
            error={pregnantError}
          />
        </main>
      </div>

      {/* Image Modal */}
      {modalImage && (
        <div className="image-modal" onClick={closeImageModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={modalImage.path} alt={modalImage.alt} />
            <div className="modal-caption">
              <span>{modalImage.alt}</span>
              <button
                className="modal-download-button"
                onClick={() => downloadImage(modalImage)}
                title="Download Image"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                Download
              </button>
            </div>
            <button className="modal-close" onClick={closeImageModal}>
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Documents;
