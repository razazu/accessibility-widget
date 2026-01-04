// src/AccessibilityWidget.tsx
import { useState as useState2, useEffect as useEffect2 } from "react";

// src/useAccessibility.ts
import { useState, useEffect, useCallback } from "react";

// src/types.ts
var defaultCustomization = {
  color: "#2dd4bf",
  positionDesktop: "bottom-right",
  positionMobile: "bottom-right"
};
var defaultSettings = {
  fontSize: 0,
  highContrast: false,
  highlightLinks: false,
  stopAnimations: false,
  readingMode: false,
  dyslexiaFont: false
};
var translations = {
  he: {
    title: "\u05E0\u05D2\u05D9\u05E9\u05D5\u05EA",
    fontSize: "\u05D2\u05D5\u05D3\u05DC \u05D8\u05E7\u05E1\u05D8",
    highContrast: "\u05E0\u05D9\u05D2\u05D5\u05D3\u05D9\u05D5\u05EA \u05D2\u05D1\u05D5\u05D4\u05D4",
    highlightLinks: "\u05D4\u05D3\u05D2\u05E9\u05EA \u05E7\u05D9\u05E9\u05D5\u05E8\u05D9\u05DD",
    stopAnimations: "\u05E2\u05E6\u05D9\u05E8\u05EA \u05D0\u05E0\u05D9\u05DE\u05E6\u05D9\u05D5\u05EA",
    readingMode: "\u05DE\u05E6\u05D1 \u05E7\u05E8\u05D9\u05D0\u05D4",
    dyslexiaFont: "\u05D2\u05D5\u05E4\u05DF \u05D3\u05D9\u05E1\u05DC\u05E7\u05E6\u05D9\u05D4",
    reset: "\u05D0\u05D9\u05E4\u05D5\u05E1",
    close: "\u05E1\u05D2\u05D5\u05E8",
    disclaimer: "\u05DB\u05DC\u05D9 \u05D6\u05D4 \u05E0\u05D5\u05E2\u05D3 \u05DC\u05E1\u05D9\u05D9\u05E2 \u05D1\u05E0\u05D2\u05D9\u05E9\u05D5\u05EA \u05D4\u05D0\u05EA\u05E8 \u05D0\u05DA \u05D0\u05D9\u05E0\u05D5 \u05DE\u05D4\u05D5\u05D5\u05D4 \u05EA\u05D7\u05DC\u05D9\u05E3 \u05DC\u05E0\u05D2\u05D9\u05E9\u05D5\u05EA \u05DE\u05DC\u05D0\u05D4 \u05D1\u05D4\u05EA\u05D0\u05DD \u05DC\u05EA\u05E7\u05DF.",
    settings: "\u05D4\u05D2\u05D3\u05E8\u05D5\u05EA",
    widgetSettings: "\u05D4\u05D2\u05D3\u05E8\u05D5\u05EA \u05D5\u05D5\u05D9\u05D3\u05D2'\u05D8",
    buttonColor: "\u05E6\u05D1\u05E2 \u05D4\u05DB\u05E4\u05EA\u05D5\u05E8",
    positionDesktop: "\u05DE\u05D9\u05E7\u05D5\u05DD (\u05D3\u05E1\u05E7\u05D8\u05D5\u05E4)",
    positionMobile: "\u05DE\u05D9\u05E7\u05D5\u05DD (\u05DE\u05D5\u05D1\u05D9\u05D9\u05DC)",
    bottomRight: "\u05DC\u05DE\u05D8\u05D4 \u05D9\u05DE\u05D9\u05DF",
    bottomLeft: "\u05DC\u05DE\u05D8\u05D4 \u05E9\u05DE\u05D0\u05DC",
    topRight: "\u05DC\u05DE\u05E2\u05DC\u05D4 \u05D9\u05DE\u05D9\u05DF",
    topLeft: "\u05DC\u05DE\u05E2\u05DC\u05D4 \u05E9\u05DE\u05D0\u05DC",
    save: "\u05E9\u05DE\u05D5\u05E8",
    cancel: "\u05D1\u05D9\u05D8\u05D5\u05DC"
  },
  en: {
    title: "Accessibility",
    fontSize: "Font Size",
    highContrast: "High Contrast",
    highlightLinks: "Highlight Links",
    stopAnimations: "Stop Animations",
    readingMode: "Reading Mode",
    dyslexiaFont: "Dyslexia Font",
    reset: "Reset",
    close: "Close",
    disclaimer: "This tool is designed to assist with website accessibility but does not replace full compliance with accessibility standards.",
    settings: "Settings",
    widgetSettings: "Widget Settings",
    buttonColor: "Button Color",
    positionDesktop: "Position (Desktop)",
    positionMobile: "Position (Mobile)",
    bottomRight: "Bottom Right",
    bottomLeft: "Bottom Left",
    topRight: "Top Right",
    topLeft: "Top Left",
    save: "Save",
    cancel: "Cancel"
  }
};

// src/useAccessibility.ts
function useAccessibility(storageKey = "accessibility-settings") {
  const [settings, setSettings] = useState(defaultSettings);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        setSettings({ ...defaultSettings, ...parsed });
      }
    } catch (e) {
      console.warn("Failed to load accessibility settings:", e);
    }
    setIsLoaded(true);
  }, [storageKey]);
  useEffect(() => {
    if (!isLoaded || typeof window === "undefined") return;
    try {
      localStorage.setItem(storageKey, JSON.stringify(settings));
    } catch (e) {
      console.warn("Failed to save accessibility settings:", e);
    }
  }, [settings, storageKey, isLoaded]);
  useEffect(() => {
    if (!isLoaded || typeof document === "undefined") return;
    const root = document.documentElement;
    const body = document.body;
    const fontSizePercents = [100, 115, 130, 150];
    const percent = fontSizePercents[settings.fontSize] || 100;
    root.style.fontSize = `${percent}%`;
    root.style.setProperty("--a11y-font-scale", String(percent / 100));
    if (settings.highContrast) {
      body.classList.add("a11y-high-contrast");
    } else {
      body.classList.remove("a11y-high-contrast");
    }
    if (settings.highlightLinks) {
      body.classList.add("a11y-highlight-links");
    } else {
      body.classList.remove("a11y-highlight-links");
    }
    if (settings.stopAnimations) {
      body.classList.add("a11y-stop-animations");
    } else {
      body.classList.remove("a11y-stop-animations");
    }
    if (settings.readingMode) {
      body.classList.add("a11y-reading-mode");
    } else {
      body.classList.remove("a11y-reading-mode");
    }
    if (settings.dyslexiaFont) {
      body.classList.add("a11y-dyslexia-font");
    } else {
      body.classList.remove("a11y-dyslexia-font");
    }
  }, [settings, isLoaded]);
  const updateSetting = useCallback(
    (key, value) => {
      setSettings((prev) => ({ ...prev, [key]: value }));
    },
    []
  );
  const resetSettings = useCallback(() => {
    setSettings(defaultSettings);
  }, []);
  const increaseFontSize = useCallback(() => {
    setSettings((prev) => ({
      ...prev,
      fontSize: Math.min(prev.fontSize + 1, 3)
    }));
  }, []);
  const decreaseFontSize = useCallback(() => {
    setSettings((prev) => ({
      ...prev,
      fontSize: Math.max(prev.fontSize - 1, 0)
    }));
  }, []);
  const toggleSetting = useCallback(
    (key) => {
      setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
    },
    []
  );
  return {
    settings,
    isLoaded,
    updateSetting,
    resetSettings,
    increaseFontSize,
    decreaseFontSize,
    toggleSetting
  };
}

// src/styles.ts
var getStyles = (primaryColor, isRTL) => `
  /* Accessibility Widget Styles */
  .a11y-widget-trigger {
    position: fixed;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${primaryColor};
    color: white;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    z-index: var(--a11y-z-index, 9999);
  }

  .a11y-widget-trigger:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 25px rgba(0, 0, 0, 0.4);
  }

  .a11y-widget-trigger:focus {
    outline: 3px solid ${primaryColor}80;
    outline-offset: 3px;
  }

  .a11y-widget-panel {
    position: fixed;
    width: 320px;
    max-height: 80vh;
    background: #1a1a2e;
    border-radius: 16px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
    overflow: hidden;
    z-index: var(--a11y-z-index, 9999);
    direction: ${isRTL ? "rtl" : "ltr"};
    font-family: ${isRTL ? "'Heebo', 'Rubik', sans-serif" : "system-ui, sans-serif"};
  }

  .a11y-widget-header {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    padding: 16px 20px;
    background: linear-gradient(135deg, ${primaryColor}, ${primaryColor}dd);
    color: white;
  }

  .a11y-widget-title {
    font-size: 18px;
    font-weight: 600;
    margin: 0;
  }

  .a11y-widget-header-brand {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
  }

  .a11y-widget-header-logo {
    height: 32px;
    width: auto;
    object-fit: contain;
  }

  .a11y-widget-header-subtitle {
    font-size: 11px;
    font-weight: 500;
    opacity: 0.9;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .a11y-widget-close {
    position: absolute;
    ${isRTL ? "left" : "right"}: 12px;
    top: 50%;
    transform: translateY(-50%);
    background: transparent;
    border: none;
    color: white;
    cursor: pointer;
    padding: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    transition: background 0.2s;
  }

  .a11y-widget-close:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  .a11y-widget-content {
    padding: 16px;
    max-height: 60vh;
    overflow-y: auto;
  }

  .a11y-widget-section {
    margin-bottom: 16px;
  }

  .a11y-widget-section:last-child {
    margin-bottom: 0;
  }

  .a11y-widget-option {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;
    background: #252540;
    border-radius: 12px;
    margin-bottom: 8px;
    transition: background 0.2s;
  }

  .a11y-widget-option:hover {
    background: #2f2f50;
  }

  .a11y-widget-option-label {
    display: flex;
    align-items: center;
    gap: 12px;
    color: #e0e0e0;
    font-size: 14px;
  }

  .a11y-widget-option-icon {
    color: ${primaryColor};
  }

  .a11y-widget-toggle {
    position: relative;
    width: 48px;
    height: 26px;
    background: #3a3a5c;
    border-radius: 13px;
    cursor: pointer;
    transition: background 0.2s;
  }

  .a11y-widget-toggle.active {
    background: ${primaryColor};
  }

  .a11y-widget-toggle::after {
    content: '';
    position: absolute;
    top: 3px;
    ${isRTL ? "right" : "left"}: 3px;
    width: 20px;
    height: 20px;
    background: white;
    border-radius: 50%;
    transition: transform 0.2s;
  }

  .a11y-widget-toggle.active::after {
    transform: translateX(${isRTL ? "-22px" : "22px"});
  }

  .a11y-widget-font-controls {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .a11y-widget-font-btn {
    width: 32px;
    height: 32px;
    border: none;
    border-radius: 8px;
    background: #3a3a5c;
    color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s;
  }

  .a11y-widget-font-btn:hover {
    background: ${primaryColor};
  }

  .a11y-widget-font-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .a11y-widget-font-level {
    min-width: 24px;
    text-align: center;
    color: #e0e0e0;
    font-size: 14px;
    font-weight: 600;
  }

  .a11y-widget-reset {
    width: 100%;
    padding: 12px;
    background: transparent;
    border: 2px solid #3a3a5c;
    border-radius: 12px;
    color: #e0e0e0;
    font-size: 14px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: border-color 0.2s, color 0.2s;
    margin-top: 8px;
  }

  .a11y-widget-reset:hover {
    border-color: ${primaryColor};
    color: ${primaryColor};
  }

  .a11y-widget-disclaimer {
    margin-top: 12px;
    padding: 10px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    font-size: 11px;
    color: #888;
    text-align: center;
    line-height: 1.5;
  }

  .a11y-widget-branding {
    display: block;
    margin-top: 12px;
    padding: 8px;
    text-align: center;
    text-decoration: none;
    font-size: 11px;
    color: #666;
    transition: color 0.2s;
  }

  .a11y-widget-branding:hover {
    color: ${primaryColor};
  }

  /* Accessibility Effects Applied to Body */

  /* High contrast - invert colors for better visibility */
  .a11y-high-contrast {
    background-color: #000 !important;
  }

  .a11y-high-contrast *:not(.a11y-widget-trigger):not(.a11y-widget-panel):not(.a11y-widget-panel *):not([class*="a11y-widget"]) {
    color: #fff !important;
    border-color: #fff !important;
  }

  .a11y-high-contrast h1:not(.a11y-widget-title),
  .a11y-high-contrast h2:not(.a11y-widget-title),
  .a11y-high-contrast h3,
  .a11y-high-contrast h4,
  .a11y-high-contrast h5,
  .a11y-high-contrast h6 {
    color: #ffff00 !important;
  }

  .a11y-high-contrast a:not([class*="a11y-widget"]) {
    color: #00ffff !important;
  }

  .a11y-high-contrast button:not([class*="a11y-widget"]) {
    background-color: #333 !important;
    color: #fff !important;
    border: 2px solid #fff !important;
  }

  /* Keep widget visible and styled correctly */
  .a11y-widget-trigger,
  .a11y-widget-panel,
  .a11y-widget-panel * {
    filter: none !important;
  }

  .a11y-highlight-links a {
    background-color: #ffff00 !important;
    color: #000000 !important;
    text-decoration: underline !important;
    padding: 2px 4px !important;
  }

  /* Stop all animations - use media query approach */
  @media screen {
    .a11y-stop-animations,
    .a11y-stop-animations *,
    .a11y-stop-animations *::before,
    .a11y-stop-animations *::after {
      animation: none !important;
      animation-duration: 0s !important;
      animation-delay: 0s !important;
      transition: none !important;
      transition-duration: 0s !important;
      transition-delay: 0s !important;
      scroll-behavior: auto !important;
    }
  }

  /* Also set prefers-reduced-motion programmatically where possible */
  .a11y-stop-animations * {
    --framer-motion-reducedMotion: reduce;
  }

  .a11y-reading-mode {
    max-width: 800px !important;
    margin-left: auto !important;
    margin-right: auto !important;
    line-height: 1.8 !important;
  }

  .a11y-reading-mode * {
    line-height: inherit !important;
  }

  .a11y-dyslexia-font,
  .a11y-dyslexia-font * {
    font-family: 'OpenDyslexic', 'Comic Sans MS', cursive, sans-serif !important;
    letter-spacing: 0.05em !important;
    word-spacing: 0.1em !important;
  }

  /* Position variants - absolute positions regardless of RTL */
  .a11y-widget-trigger.bottom-right {
    bottom: 20px;
    right: 20px;
    left: auto;
  }

  .a11y-widget-trigger.bottom-left {
    bottom: 20px;
    left: 20px;
    right: auto;
  }

  .a11y-widget-trigger.top-right {
    top: 20px;
    right: 20px;
    left: auto;
  }

  .a11y-widget-trigger.top-left {
    top: 20px;
    left: 20px;
    right: auto;
  }

  .a11y-widget-panel.bottom-right {
    bottom: 90px;
    right: 20px;
    left: auto;
  }

  .a11y-widget-panel.bottom-left {
    bottom: 90px;
    left: 20px;
    right: auto;
  }

  .a11y-widget-panel.top-right {
    top: 90px;
    right: 20px;
    left: auto;
  }

  .a11y-widget-panel.top-left {
    top: 90px;
    left: 20px;
    right: auto;
  }

  /* Animation */
  @keyframes a11y-fade-in {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .a11y-widget-panel {
    animation: a11y-fade-in 0.2s ease-out;
  }

  /* Settings Button */
  .a11y-widget-settings-btn {
    position: absolute;
    ${isRTL ? "right" : "left"}: 12px;
    top: 50%;
    transform: translateY(-50%);
    background: transparent;
    border: none;
    color: white;
    cursor: pointer;
    padding: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    transition: background 0.2s;
  }

  .a11y-widget-settings-btn:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  /* Settings Modal */
  .a11y-settings-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.7);
    z-index: calc(var(--a11y-z-index, 9999) + 1);
    display: flex;
    align-items: center;
    justify-content: center;
    animation: a11y-fade-in 0.2s ease-out;
  }

  .a11y-settings-modal {
    background: #1a1a2e;
    border-radius: 16px;
    width: 90%;
    max-width: 400px;
    max-height: 80vh;
    overflow: hidden;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
    direction: ${isRTL ? "rtl" : "ltr"};
    font-family: ${isRTL ? "'Heebo', 'Rubik', sans-serif" : "system-ui, sans-serif"};
  }

  .a11y-settings-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 20px;
    background: linear-gradient(135deg, ${primaryColor}, ${primaryColor}dd);
    color: white;
  }

  .a11y-settings-title {
    font-size: 18px;
    font-weight: 600;
    margin: 0;
  }

  .a11y-settings-close {
    background: transparent;
    border: none;
    color: white;
    cursor: pointer;
    padding: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    transition: background 0.2s;
  }

  .a11y-settings-close:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  .a11y-settings-content {
    padding: 20px;
    overflow-y: auto;
  }

  .a11y-settings-section {
    margin-bottom: 20px;
  }

  .a11y-settings-section:last-child {
    margin-bottom: 0;
  }

  .a11y-settings-label {
    display: block;
    color: #e0e0e0;
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 10px;
  }

  /* Color Picker */
  .a11y-color-picker {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }

  .a11y-color-option {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 3px solid transparent;
    cursor: pointer;
    transition: transform 0.2s, border-color 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .a11y-color-option:hover {
    transform: scale(1.1);
  }

  .a11y-color-option.selected {
    border-color: white;
  }

  .a11y-color-option svg {
    color: white;
  }

  /* Position Selector */
  .a11y-position-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }

  .a11y-position-option {
    padding: 10px 12px;
    background: #252540;
    border: 2px solid transparent;
    border-radius: 8px;
    color: #e0e0e0;
    font-size: 13px;
    cursor: pointer;
    transition: background 0.2s, border-color 0.2s;
    text-align: center;
  }

  .a11y-position-option:hover {
    background: #2f2f50;
  }

  .a11y-position-option.selected {
    border-color: ${primaryColor};
    background: ${primaryColor}20;
  }

  /* Settings Actions */
  .a11y-settings-actions {
    display: flex;
    gap: 10px;
    margin-top: 20px;
    padding-top: 16px;
    border-top: 1px solid #3a3a5c;
  }

  .a11y-settings-save {
    flex: 1;
    padding: 12px;
    background: ${primaryColor};
    border: none;
    border-radius: 8px;
    color: white;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: opacity 0.2s;
  }

  .a11y-settings-save:hover {
    opacity: 0.9;
  }

  .a11y-settings-cancel {
    flex: 1;
    padding: 12px;
    background: transparent;
    border: 2px solid #3a3a5c;
    border-radius: 8px;
    color: #e0e0e0;
    font-size: 14px;
    cursor: pointer;
    transition: border-color 0.2s;
  }

  .a11y-settings-cancel:hover {
    border-color: #5a5a7c;
  }
`;

// src/icons.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var AccessibilityIcon = ({ size = 24, className }) => /* @__PURE__ */ jsxs(
  "svg",
  {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className,
    children: [
      /* @__PURE__ */ jsx("circle", { cx: "12", cy: "5", r: "1" }),
      /* @__PURE__ */ jsx("path", { d: "m9 20 3-6 3 6" }),
      /* @__PURE__ */ jsx("path", { d: "m6 8 6 2 6-2" }),
      /* @__PURE__ */ jsx("path", { d: "M12 10v4" })
    ]
  }
);
var CloseIcon = ({ size = 24, className }) => /* @__PURE__ */ jsxs(
  "svg",
  {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className,
    children: [
      /* @__PURE__ */ jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
      /* @__PURE__ */ jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
    ]
  }
);
var FontSizeIcon = ({ size = 24, className }) => /* @__PURE__ */ jsxs(
  "svg",
  {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className,
    children: [
      /* @__PURE__ */ jsx("text", { x: "4", y: "16", fontSize: "12", fill: "currentColor", stroke: "none", children: "A" }),
      /* @__PURE__ */ jsx("text", { x: "14", y: "18", fontSize: "16", fill: "currentColor", stroke: "none", children: "A" })
    ]
  }
);
var ContrastIcon = ({ size = 24, className }) => /* @__PURE__ */ jsxs(
  "svg",
  {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className,
    children: [
      /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "10" }),
      /* @__PURE__ */ jsx("path", { d: "M12 2v20" }),
      /* @__PURE__ */ jsx("path", { d: "M12 2a10 10 0 0 1 0 20", fill: "currentColor" })
    ]
  }
);
var LinkIcon = ({ size = 24, className }) => /* @__PURE__ */ jsxs(
  "svg",
  {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className,
    children: [
      /* @__PURE__ */ jsx("path", { d: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" }),
      /* @__PURE__ */ jsx("path", { d: "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" })
    ]
  }
);
var PauseIcon = ({ size = 24, className }) => /* @__PURE__ */ jsxs(
  "svg",
  {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className,
    children: [
      /* @__PURE__ */ jsx("rect", { x: "6", y: "4", width: "4", height: "16" }),
      /* @__PURE__ */ jsx("rect", { x: "14", y: "4", width: "4", height: "16" })
    ]
  }
);
var BookIcon = ({ size = 24, className }) => /* @__PURE__ */ jsxs(
  "svg",
  {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className,
    children: [
      /* @__PURE__ */ jsx("path", { d: "M4 19.5A2.5 2.5 0 0 1 6.5 17H20" }),
      /* @__PURE__ */ jsx("path", { d: "M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" }),
      /* @__PURE__ */ jsx("line", { x1: "8", y1: "7", x2: "16", y2: "7" }),
      /* @__PURE__ */ jsx("line", { x1: "8", y1: "11", x2: "14", y2: "11" })
    ]
  }
);
var TextIcon = ({ size = 24, className }) => /* @__PURE__ */ jsxs(
  "svg",
  {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className,
    children: [
      /* @__PURE__ */ jsx("polyline", { points: "4 7 4 4 20 4 20 7" }),
      /* @__PURE__ */ jsx("line", { x1: "9", y1: "20", x2: "15", y2: "20" }),
      /* @__PURE__ */ jsx("line", { x1: "12", y1: "4", x2: "12", y2: "20" })
    ]
  }
);
var ResetIcon = ({ size = 24, className }) => /* @__PURE__ */ jsxs(
  "svg",
  {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className,
    children: [
      /* @__PURE__ */ jsx("path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" }),
      /* @__PURE__ */ jsx("path", { d: "M3 3v5h5" })
    ]
  }
);
var MinusIcon = ({ size = 24, className }) => /* @__PURE__ */ jsx(
  "svg",
  {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className,
    children: /* @__PURE__ */ jsx("line", { x1: "5", y1: "12", x2: "19", y2: "12" })
  }
);
var PlusIcon = ({ size = 24, className }) => /* @__PURE__ */ jsxs(
  "svg",
  {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className,
    children: [
      /* @__PURE__ */ jsx("line", { x1: "12", y1: "5", x2: "12", y2: "19" }),
      /* @__PURE__ */ jsx("line", { x1: "5", y1: "12", x2: "19", y2: "12" })
    ]
  }
);
var SettingsIcon = ({ size = 24, className }) => /* @__PURE__ */ jsxs(
  "svg",
  {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className,
    children: [
      /* @__PURE__ */ jsx("path", { d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" }),
      /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "3" })
    ]
  }
);
var CheckIcon = ({ size = 24, className }) => /* @__PURE__ */ jsx(
  "svg",
  {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className,
    children: /* @__PURE__ */ jsx("polyline", { points: "20 6 9 17 4 12" })
  }
);

// src/AccessibilityWidget.tsx
import { Fragment, jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var COLORS = [
  "#2dd4bf",
  // Teal
  "#3b82f6",
  // Blue
  "#8b5cf6",
  // Purple
  "#ec4899",
  // Pink
  "#f97316",
  // Orange
  "#22c55e",
  // Green
  "#eab308",
  // Yellow
  "#ef4444"
  // Red
];
var CUSTOMIZATION_STORAGE_KEY = "a11y-widget-customization";
function AccessibilityWidget({
  position = "bottom-right",
  primaryColor = "#2dd4bf",
  language = "he",
  storageKey = "accessibility-settings",
  zIndex = 9999,
  branding
}) {
  const [isOpen, setIsOpen] = useState2(false);
  const [showSettings, setShowSettings] = useState2(false);
  const [customization, setCustomization] = useState2({
    ...defaultCustomization,
    color: primaryColor,
    positionDesktop: position,
    positionMobile: position
  });
  const [tempCustomization, setTempCustomization] = useState2(customization);
  const [isMobile, setIsMobile] = useState2(false);
  const [stylesInjected, setStylesInjected] = useState2(false);
  const {
    settings,
    isLoaded,
    resetSettings,
    increaseFontSize,
    decreaseFontSize,
    toggleSetting
  } = useAccessibility(storageKey);
  const t = translations[language];
  const isRTL = language === "he";
  useEffect2(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem(CUSTOMIZATION_STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setCustomization(parsed);
        setTempCustomization(parsed);
      } catch {
      }
    }
  }, []);
  useEffect2(() => {
    if (typeof window === "undefined") return;
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  const currentPosition = isMobile ? customization.positionMobile : customization.positionDesktop;
  useEffect2(() => {
    if (typeof document === "undefined") return;
    const styleId = "a11y-widget-styles";
    let styleEl = document.getElementById(styleId);
    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.id = styleId;
      document.head.appendChild(styleEl);
    }
    styleEl.textContent = getStyles(customization.color, isRTL);
    document.documentElement.style.setProperty("--a11y-z-index", String(zIndex));
    setStylesInjected(true);
  }, [customization.color, isRTL, zIndex]);
  useEffect2(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        if (showSettings) {
          setShowSettings(false);
          setTempCustomization(customization);
        } else if (isOpen) {
          setIsOpen(false);
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, showSettings, customization]);
  const handleSaveSettings = () => {
    setCustomization(tempCustomization);
    localStorage.setItem(CUSTOMIZATION_STORAGE_KEY, JSON.stringify(tempCustomization));
    setShowSettings(false);
  };
  const handleCancelSettings = () => {
    setTempCustomization(customization);
    setShowSettings(false);
  };
  const positionOptions = [
    { value: "top-right", label: t.topRight },
    { value: "top-left", label: t.topLeft },
    { value: "bottom-right", label: t.bottomRight },
    { value: "bottom-left", label: t.bottomLeft }
  ];
  if (!isLoaded) return null;
  return /* @__PURE__ */ jsxs2(Fragment, { children: [
    /* @__PURE__ */ jsx2(
      "button",
      {
        className: `a11y-widget-trigger ${currentPosition}`,
        onClick: () => setIsOpen(!isOpen),
        "aria-label": t.title,
        "aria-expanded": isOpen,
        style: { background: customization.color },
        children: isOpen ? /* @__PURE__ */ jsx2(CloseIcon, { size: 24 }) : /* @__PURE__ */ jsx2(AccessibilityIcon, { size: 28 })
      }
    ),
    isOpen && /* @__PURE__ */ jsxs2(
      "div",
      {
        className: `a11y-widget-panel ${currentPosition}`,
        role: "dialog",
        "aria-label": t.title,
        children: [
          /* @__PURE__ */ jsxs2("div", { className: "a11y-widget-header", style: { background: `linear-gradient(135deg, ${customization.color}, ${customization.color}dd)` }, children: [
            /* @__PURE__ */ jsx2(
              "button",
              {
                className: "a11y-widget-settings-btn",
                onClick: () => {
                  setTempCustomization(customization);
                  setShowSettings(true);
                },
                "aria-label": t.settings,
                children: /* @__PURE__ */ jsx2(SettingsIcon, { size: 18 })
              }
            ),
            branding?.logoUrl ? /* @__PURE__ */ jsxs2("div", { className: "a11y-widget-header-brand", children: [
              /* @__PURE__ */ jsx2(
                "img",
                {
                  src: branding.logoUrl,
                  alt: branding.companyName,
                  className: "a11y-widget-header-logo"
                }
              ),
              /* @__PURE__ */ jsx2("span", { className: "a11y-widget-header-subtitle", children: "Accessibility" })
            ] }) : /* @__PURE__ */ jsx2("h2", { className: "a11y-widget-title", children: t.title }),
            /* @__PURE__ */ jsx2(
              "button",
              {
                className: "a11y-widget-close",
                onClick: () => setIsOpen(false),
                "aria-label": t.close,
                children: /* @__PURE__ */ jsx2(CloseIcon, { size: 20 })
              }
            )
          ] }),
          /* @__PURE__ */ jsxs2("div", { className: "a11y-widget-content", children: [
            /* @__PURE__ */ jsxs2("div", { className: "a11y-widget-option", children: [
              /* @__PURE__ */ jsxs2("span", { className: "a11y-widget-option-label", children: [
                /* @__PURE__ */ jsx2(FontSizeIcon, { size: 20, className: "a11y-widget-option-icon" }),
                t.fontSize
              ] }),
              /* @__PURE__ */ jsxs2("div", { className: "a11y-widget-font-controls", children: [
                /* @__PURE__ */ jsx2(
                  "button",
                  {
                    className: "a11y-widget-font-btn",
                    onClick: decreaseFontSize,
                    disabled: settings.fontSize === 0,
                    "aria-label": "Decrease font size",
                    children: /* @__PURE__ */ jsx2(MinusIcon, { size: 16 })
                  }
                ),
                /* @__PURE__ */ jsx2("span", { className: "a11y-widget-font-level", children: settings.fontSize }),
                /* @__PURE__ */ jsx2(
                  "button",
                  {
                    className: "a11y-widget-font-btn",
                    onClick: increaseFontSize,
                    disabled: settings.fontSize === 3,
                    "aria-label": "Increase font size",
                    children: /* @__PURE__ */ jsx2(PlusIcon, { size: 16 })
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxs2("div", { className: "a11y-widget-option", children: [
              /* @__PURE__ */ jsxs2("span", { className: "a11y-widget-option-label", children: [
                /* @__PURE__ */ jsx2(ContrastIcon, { size: 20, className: "a11y-widget-option-icon" }),
                t.highContrast
              ] }),
              /* @__PURE__ */ jsx2(
                "button",
                {
                  className: `a11y-widget-toggle ${settings.highContrast ? "active" : ""}`,
                  onClick: () => toggleSetting("highContrast"),
                  role: "switch",
                  "aria-checked": settings.highContrast
                }
              )
            ] }),
            /* @__PURE__ */ jsxs2("div", { className: "a11y-widget-option", children: [
              /* @__PURE__ */ jsxs2("span", { className: "a11y-widget-option-label", children: [
                /* @__PURE__ */ jsx2(LinkIcon, { size: 20, className: "a11y-widget-option-icon" }),
                t.highlightLinks
              ] }),
              /* @__PURE__ */ jsx2(
                "button",
                {
                  className: `a11y-widget-toggle ${settings.highlightLinks ? "active" : ""}`,
                  onClick: () => toggleSetting("highlightLinks"),
                  role: "switch",
                  "aria-checked": settings.highlightLinks
                }
              )
            ] }),
            /* @__PURE__ */ jsxs2("div", { className: "a11y-widget-option", children: [
              /* @__PURE__ */ jsxs2("span", { className: "a11y-widget-option-label", children: [
                /* @__PURE__ */ jsx2(PauseIcon, { size: 20, className: "a11y-widget-option-icon" }),
                t.stopAnimations
              ] }),
              /* @__PURE__ */ jsx2(
                "button",
                {
                  className: `a11y-widget-toggle ${settings.stopAnimations ? "active" : ""}`,
                  onClick: () => toggleSetting("stopAnimations"),
                  role: "switch",
                  "aria-checked": settings.stopAnimations
                }
              )
            ] }),
            /* @__PURE__ */ jsxs2("div", { className: "a11y-widget-option", children: [
              /* @__PURE__ */ jsxs2("span", { className: "a11y-widget-option-label", children: [
                /* @__PURE__ */ jsx2(BookIcon, { size: 20, className: "a11y-widget-option-icon" }),
                t.readingMode
              ] }),
              /* @__PURE__ */ jsx2(
                "button",
                {
                  className: `a11y-widget-toggle ${settings.readingMode ? "active" : ""}`,
                  onClick: () => toggleSetting("readingMode"),
                  role: "switch",
                  "aria-checked": settings.readingMode
                }
              )
            ] }),
            /* @__PURE__ */ jsxs2("div", { className: "a11y-widget-option", children: [
              /* @__PURE__ */ jsxs2("span", { className: "a11y-widget-option-label", children: [
                /* @__PURE__ */ jsx2(TextIcon, { size: 20, className: "a11y-widget-option-icon" }),
                t.dyslexiaFont
              ] }),
              /* @__PURE__ */ jsx2(
                "button",
                {
                  className: `a11y-widget-toggle ${settings.dyslexiaFont ? "active" : ""}`,
                  onClick: () => toggleSetting("dyslexiaFont"),
                  role: "switch",
                  "aria-checked": settings.dyslexiaFont
                }
              )
            ] }),
            /* @__PURE__ */ jsxs2("button", { className: "a11y-widget-reset", onClick: resetSettings, children: [
              /* @__PURE__ */ jsx2(ResetIcon, { size: 18 }),
              t.reset
            ] }),
            /* @__PURE__ */ jsx2("p", { className: "a11y-widget-disclaimer", children: t.disclaimer }),
            branding && /* @__PURE__ */ jsxs2(
              "a",
              {
                href: branding.companyUrl,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "a11y-widget-branding",
                children: [
                  language === "he" ? "\u05DE\u05D5\u05E4\u05E2\u05DC \u05E2\u05DC \u05D9\u05D3\u05D9" : "Powered by",
                  " ",
                  branding.companyName
                ]
              }
            )
          ] })
        ]
      }
    ),
    showSettings && /* @__PURE__ */ jsx2("div", { className: "a11y-settings-overlay", onClick: handleCancelSettings, children: /* @__PURE__ */ jsxs2("div", { className: "a11y-settings-modal", onClick: (e) => e.stopPropagation(), children: [
      /* @__PURE__ */ jsxs2("div", { className: "a11y-settings-header", style: { background: `linear-gradient(135deg, ${tempCustomization.color}, ${tempCustomization.color}dd)` }, children: [
        /* @__PURE__ */ jsx2("h3", { className: "a11y-settings-title", children: t.widgetSettings }),
        /* @__PURE__ */ jsx2("button", { className: "a11y-settings-close", onClick: handleCancelSettings, children: /* @__PURE__ */ jsx2(CloseIcon, { size: 20 }) })
      ] }),
      /* @__PURE__ */ jsxs2("div", { className: "a11y-settings-content", children: [
        /* @__PURE__ */ jsxs2("div", { className: "a11y-settings-section", children: [
          /* @__PURE__ */ jsx2("label", { className: "a11y-settings-label", children: t.buttonColor }),
          /* @__PURE__ */ jsx2("div", { className: "a11y-color-picker", children: COLORS.map((color) => /* @__PURE__ */ jsx2(
            "button",
            {
              className: `a11y-color-option ${tempCustomization.color === color ? "selected" : ""}`,
              style: { background: color },
              onClick: () => setTempCustomization({ ...tempCustomization, color }),
              "aria-label": color,
              children: tempCustomization.color === color && /* @__PURE__ */ jsx2(CheckIcon, { size: 16 })
            },
            color
          )) })
        ] }),
        /* @__PURE__ */ jsxs2("div", { className: "a11y-settings-section", children: [
          /* @__PURE__ */ jsx2("label", { className: "a11y-settings-label", children: t.positionDesktop }),
          /* @__PURE__ */ jsx2("div", { className: "a11y-position-grid", children: positionOptions.map((opt) => /* @__PURE__ */ jsx2(
            "button",
            {
              className: `a11y-position-option ${tempCustomization.positionDesktop === opt.value ? "selected" : ""}`,
              onClick: () => setTempCustomization({ ...tempCustomization, positionDesktop: opt.value }),
              children: opt.label
            },
            `desktop-${opt.value}`
          )) })
        ] }),
        /* @__PURE__ */ jsxs2("div", { className: "a11y-settings-section", children: [
          /* @__PURE__ */ jsx2("label", { className: "a11y-settings-label", children: t.positionMobile }),
          /* @__PURE__ */ jsx2("div", { className: "a11y-position-grid", children: positionOptions.map((opt) => /* @__PURE__ */ jsx2(
            "button",
            {
              className: `a11y-position-option ${tempCustomization.positionMobile === opt.value ? "selected" : ""}`,
              onClick: () => setTempCustomization({ ...tempCustomization, positionMobile: opt.value }),
              children: opt.label
            },
            `mobile-${opt.value}`
          )) })
        ] }),
        /* @__PURE__ */ jsxs2("div", { className: "a11y-settings-actions", children: [
          /* @__PURE__ */ jsx2("button", { className: "a11y-settings-save", onClick: handleSaveSettings, style: { background: tempCustomization.color }, children: t.save }),
          /* @__PURE__ */ jsx2("button", { className: "a11y-settings-cancel", onClick: handleCancelSettings, children: t.cancel })
        ] })
      ] })
    ] }) })
  ] });
}
export {
  AccessibilityWidget,
  defaultSettings,
  translations,
  useAccessibility
};
//# sourceMappingURL=index.mjs.map