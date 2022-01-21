import { useEffect, useState } from "react";

export default function usePlayerLoaded(
  videoRef: React.RefObject<HTMLVideoElement>
) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (videoRef.current && videoRef.current.readyState === 4) {
      setIsLoaded(true);
    }
  });

  return { isLoaded };
}