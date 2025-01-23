import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useState, useEffect, useContext, } from "react";
// Breakpoint values for reference
const breakpoints = {
    sm: 640, // Small screen (mobile)
    md: 768, // Medium screen (tablet)
    lg: 1024, // Large screen (laptop)
    xl: 1280, // Extra large screen (desktop)
    "2xl": 1536, // 2x extra large screen (big desktop)
};
// Create the context with a default value
const ScreenWidthContext = createContext(undefined);
// Provider component
export const ScreenWidthProvider = ({ children, }) => {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };
        // Listen for window resize events
        window.addEventListener("resize", handleResize);
        // Cleanup listener on component unmount
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    // Determine breakpoints based on the screen width
    const isMobile = screenWidth < breakpoints.sm;
    const isTablet = screenWidth >= breakpoints.sm && screenWidth < breakpoints.md;
    const isSmallLaptop = screenWidth >= breakpoints.md && screenWidth < breakpoints.lg;
    const isDesktop = screenWidth >= breakpoints.lg && screenWidth < breakpoints.xl;
    const isLargeDesktop = screenWidth >= breakpoints.xl;
    const isExtraLargeDesktop = screenWidth >= breakpoints["2xl"];
    return (_jsx(ScreenWidthContext.Provider, { value: {
            screenWidth,
            isMobile,
            isTablet,
            isSmallLaptop,
            isDesktop,
            isLargeDesktop,
            isExtraLargeDesktop,
        }, children: children }));
};
// Custom hook to use the ScreenWidthContext
export const useScreenWidth = () => {
    const context = useContext(ScreenWidthContext);
    if (!context) {
        throw new Error("useScreenWidth must be used within a ScreenWidthProvider");
    }
    return context;
};
