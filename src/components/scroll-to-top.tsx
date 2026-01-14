import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop Component
 *
 * Automatically scrolls the window to the top whenever the route changes.
 * This solves the common SPA issue where navigating between pages retains
 * the previous page's scroll position.
 *
 * Usage: Place this component inside your Router in App.tsx
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to the top of the page whenever the pathname changes
    window.scrollTo(0, 0);
  }, [pathname]);

  // This component doesn't render anything
  return null;
};

export default ScrollToTop;
