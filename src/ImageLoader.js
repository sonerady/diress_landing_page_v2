import { useState, useEffect } from "react";

// Import baby example images (2.png through 9.png)
import baby2 from "./assets/baby-example/2.png";
import baby3 from "./assets/baby-example/3.png";
import baby4 from "./assets/baby-example/4.png";
import baby5 from "./assets/baby-example/5.png";
import baby6 from "./assets/baby-example/6.png";
import baby7 from "./assets/baby-example/7.png";
import baby8 from "./assets/baby-example/8.png";
import baby9 from "./assets/baby-example/9.png";

// Import pregnant photos (1.webp through 11.webp)
import pregnant1 from "./assets/pregnant-photo/1.webp";
import pregnant2 from "./assets/pregnant-photo/2.webp";
import pregnant3 from "./assets/pregnant-photo/3.webp";
import pregnant4 from "./assets/pregnant-photo/4.webp";
import pregnant5 from "./assets/pregnant-photo/5.webp";
import pregnant6 from "./assets/pregnant-photo/6.webp";
import pregnant7 from "./assets/pregnant-photo/7.webp";
import pregnant8 from "./assets/pregnant-photo/8.webp";
import pregnant9 from "./assets/pregnant-photo/9.webp";
import pregnant10 from "./assets/pregnant-photo/10.webp";
import pregnant11 from "./assets/pregnant-photo/11.webp";

function useImageLoader(directory) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to load images from local assets
    const loadImages = async () => {
      try {
        setLoading(true);

        // Using locally imported images based on the directory
        const getLocalImages = () => {
          if (directory === "baby-example") {
            // Baby images from local assets (2.png through 9.png)
            return [
              {
                id: 2,
                path: baby2,
                alt: "Baby Example 2",
              },
              {
                id: 3,
                path: baby3,
                alt: "Baby Example 3",
              },
              {
                id: 4,
                path: baby4,
                alt: "Baby Example 4",
              },
              {
                id: 5,
                path: baby5,
                alt: "Baby Example 5",
              },
              {
                id: 6,
                path: baby6,
                alt: "Baby Example 6",
              },
              {
                id: 7,
                path: baby7,
                alt: "Baby Example 7",
              },
              {
                id: 8,
                path: baby8,
                alt: "Baby Example 8",
              },
              {
                id: 9,
                path: baby9,
                alt: "Baby Example 9",
              },
            ];
          } else if (directory === "pregnant-photo") {
            // Pregnancy photos from local assets (1.webp through 11.webp)
            return [
              {
                id: 1,
                path: pregnant1,
                alt: "Pregnancy Photo 1",
              },
              {
                id: 2,
                path: pregnant2,
                alt: "Pregnancy Photo 2",
              },
              {
                id: 3,
                path: pregnant3,
                alt: "Pregnancy Photo 3",
              },
              {
                id: 4,
                path: pregnant4,
                alt: "Pregnancy Photo 4",
              },
              {
                id: 5,
                path: pregnant5,
                alt: "Pregnancy Photo 5",
              },
              {
                id: 6,
                path: pregnant6,
                alt: "Pregnancy Photo 6",
              },
              {
                id: 7,
                path: pregnant7,
                alt: "Pregnancy Photo 7",
              },
              {
                id: 8,
                path: pregnant8,
                alt: "Pregnancy Photo 8",
              },
              {
                id: 9,
                path: pregnant9,
                alt: "Pregnancy Photo 9",
              },
              {
                id: 10,
                path: pregnant10,
                alt: "Pregnancy Photo 10",
              },
              {
                id: 11,
                path: pregnant11,
                alt: "Pregnancy Photo 11",
              },
            ];
          }
          return [];
        };

        // Get local images
        const fetchedImages = getLocalImages();

        // Update state with the images
        setImages(fetchedImages);
        setLoading(false);
      } catch (err) {
        console.error(`Error loading images from ${directory}:`, err);
        setError(`Failed to load images from ${directory}: ${err.message}`);
        setLoading(false);
      }
    };

    // Load images immediately
    loadImages();
  }, [directory]);

  return { images, loading, error };
}

export default useImageLoader;
