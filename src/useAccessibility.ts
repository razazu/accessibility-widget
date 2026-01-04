import { useState, useEffect, useCallback } from "react";
import { AccessibilitySettings, defaultSettings } from "./types";

export function useAccessibility(storageKey: string = "accessibility-settings") {
  const [settings, setSettings] = useState<AccessibilitySettings>(defaultSettings);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load settings from localStorage on mount
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

  // Save settings to localStorage whenever they change
  useEffect(() => {
    if (!isLoaded || typeof window === "undefined") return;

    try {
      localStorage.setItem(storageKey, JSON.stringify(settings));
    } catch (e) {
      console.warn("Failed to save accessibility settings:", e);
    }
  }, [settings, storageKey, isLoaded]);

  // Apply settings to document
  useEffect(() => {
    if (!isLoaded || typeof document === "undefined") return;

    const root = document.documentElement;
    const body = document.body;

    // Font size - apply to html element for better scaling
    const fontSizePercents = [100, 115, 130, 150];
    const percent = fontSizePercents[settings.fontSize] || 100;
    root.style.fontSize = `${percent}%`;
    root.style.setProperty("--a11y-font-scale", String(percent / 100));

    // High contrast
    if (settings.highContrast) {
      body.classList.add("a11y-high-contrast");
    } else {
      body.classList.remove("a11y-high-contrast");
    }

    // Highlight links
    if (settings.highlightLinks) {
      body.classList.add("a11y-highlight-links");
    } else {
      body.classList.remove("a11y-highlight-links");
    }

    // Stop animations
    if (settings.stopAnimations) {
      body.classList.add("a11y-stop-animations");
    } else {
      body.classList.remove("a11y-stop-animations");
    }

    // Reading mode
    if (settings.readingMode) {
      body.classList.add("a11y-reading-mode");
    } else {
      body.classList.remove("a11y-reading-mode");
    }

    // Dyslexia font
    if (settings.dyslexiaFont) {
      body.classList.add("a11y-dyslexia-font");
    } else {
      body.classList.remove("a11y-dyslexia-font");
    }
  }, [settings, isLoaded]);

  const updateSetting = useCallback(
    <K extends keyof AccessibilitySettings>(
      key: K,
      value: AccessibilitySettings[K]
    ) => {
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
      fontSize: Math.min(prev.fontSize + 1, 3),
    }));
  }, []);

  const decreaseFontSize = useCallback(() => {
    setSettings((prev) => ({
      ...prev,
      fontSize: Math.max(prev.fontSize - 1, 0),
    }));
  }, []);

  const toggleSetting = useCallback(
    (key: keyof Omit<AccessibilitySettings, "fontSize">) => {
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
    toggleSetting,
  };
}
