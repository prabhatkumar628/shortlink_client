import { useEffect } from "react";
import { useParams } from "react-router-dom";

const RedirectToMainUrl = () => {
  const { shortId } = useParams();

  useEffect(() => {
    if (!shortId) return;

    window.location.replace(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/urls/${shortId}`
    );
  }, [shortId]);

  return null;
};

export { RedirectToMainUrl };
