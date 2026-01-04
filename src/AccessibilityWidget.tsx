"use client";

import React, { useState, useEffect } from "react";
import { useAccessibility } from "./useAccessibility";
import { translations, AccessibilityWidgetProps, WidgetPosition, WidgetCustomization, defaultCustomization } from "./types";
import { getStyles } from "./styles";
import {
  AccessibilityIcon,
  CloseIcon,
  FontSizeIcon,
  ContrastIcon,
  LinkIcon,
  PauseIcon,
  BookIcon,
  TextIcon,
  ResetIcon,
  MinusIcon,
  PlusIcon,
  SettingsIcon,
  CheckIcon,
} from "./icons";

const COLORS = [
  "#2dd4bf", // Teal
  "#3b82f6", // Blue
  "#8b5cf6", // Purple
  "#ec4899", // Pink
  "#f97316", // Orange
  "#22c55e", // Green
  "#eab308", // Yellow
  "#ef4444", // Red
];

const CUSTOMIZATION_STORAGE_KEY = "a11y-widget-customization";

export function AccessibilityWidget({
  position = "bottom-right",
  primaryColor = "#2dd4bf",
  language = "he",
  storageKey = "accessibility-settings",
  zIndex = 9999,
  branding,
}: AccessibilityWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [customization, setCustomization] = useState<WidgetCustomization>({
    ...defaultCustomization,
    color: primaryColor,
    positionDesktop: position,
    positionMobile: position,
  });
  const [tempCustomization, setTempCustomization] = useState<WidgetCustomization>(customization);
  const [isMobile, setIsMobile] = useState(false);
  const [stylesInjected, setStylesInjected] = useState(false);

  const {
    settings,
    isLoaded,
    resetSettings,
    increaseFontSize,
    decreaseFontSize,
    toggleSetting,
  } = useAccessibility(storageKey);

  const t = translations[language];
  const isRTL = language === "he";

  // Load customization from localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;

    const saved = localStorage.getItem(CUSTOMIZATION_STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setCustomization(parsed);
        setTempCustomization(parsed);
      } catch {
        // Use defaults
      }
    }
  }, []);

  // Detect mobile
  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Get current position based on device
  const currentPosition = isMobile ? customization.positionMobile : customization.positionDesktop;

  // Inject styles
  useEffect(() => {
    if (typeof document === "undefined") return;

    const styleId = "a11y-widget-styles";
    let styleEl = document.getElementById(styleId) as HTMLStyleElement | null;

    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.id = styleId;
      document.head.appendChild(styleEl);
    }

    styleEl.textContent = getStyles(customization.color, isRTL);
    document.documentElement.style.setProperty("--a11y-z-index", String(zIndex));
    setStylesInjected(true);
  }, [customization.color, isRTL, zIndex]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
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

  const positionOptions: { value: WidgetPosition; label: string }[] = [
    { value: "top-right", label: t.topRight },
    { value: "top-left", label: t.topLeft },
    { value: "bottom-right", label: t.bottomRight },
    { value: "bottom-left", label: t.bottomLeft },
  ];

  if (!isLoaded) return null;

  return (
    <>
      {/* Trigger Button */}
      <button
        className={`a11y-widget-trigger ${currentPosition}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={t.title}
        aria-expanded={isOpen}
        style={{ background: customization.color }}
      >
        {isOpen ? <CloseIcon size={24} /> : <AccessibilityIcon size={28} />}
      </button>

      {/* Panel */}
      {isOpen && (
        <div
          className={`a11y-widget-panel ${currentPosition}`}
          role="dialog"
          aria-label={t.title}
        >
          {/* Header */}
          <div className="a11y-widget-header" style={{ background: `linear-gradient(135deg, ${customization.color}, ${customization.color}dd)` }}>
            <button
              className="a11y-widget-settings-btn"
              onClick={() => {
                setTempCustomization(customization);
                setShowSettings(true);
              }}
              aria-label={t.settings}
            >
              <SettingsIcon size={18} />
            </button>
            {branding?.logoUrl ? (
              <div className="a11y-widget-header-brand">
                <img
                  src={branding.logoUrl}
                  alt={branding.companyName}
                  className="a11y-widget-header-logo"
                />
                <span className="a11y-widget-header-subtitle">Accessibility</span>
              </div>
            ) : (
              <h2 className="a11y-widget-title">{t.title}</h2>
            )}
            <button
              className="a11y-widget-close"
              onClick={() => setIsOpen(false)}
              aria-label={t.close}
            >
              <CloseIcon size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="a11y-widget-content">
            {/* Font Size */}
            <div className="a11y-widget-option">
              <span className="a11y-widget-option-label">
                <FontSizeIcon size={20} className="a11y-widget-option-icon" />
                {t.fontSize}
              </span>
              <div className="a11y-widget-font-controls">
                <button
                  className="a11y-widget-font-btn"
                  onClick={decreaseFontSize}
                  disabled={settings.fontSize === 0}
                  aria-label="Decrease font size"
                >
                  <MinusIcon size={16} />
                </button>
                <span className="a11y-widget-font-level">
                  {settings.fontSize}
                </span>
                <button
                  className="a11y-widget-font-btn"
                  onClick={increaseFontSize}
                  disabled={settings.fontSize === 3}
                  aria-label="Increase font size"
                >
                  <PlusIcon size={16} />
                </button>
              </div>
            </div>

            {/* High Contrast */}
            <div className="a11y-widget-option">
              <span className="a11y-widget-option-label">
                <ContrastIcon size={20} className="a11y-widget-option-icon" />
                {t.highContrast}
              </span>
              <button
                className={`a11y-widget-toggle ${settings.highContrast ? "active" : ""}`}
                onClick={() => toggleSetting("highContrast")}
                role="switch"
                aria-checked={settings.highContrast}
              />
            </div>

            {/* Highlight Links */}
            <div className="a11y-widget-option">
              <span className="a11y-widget-option-label">
                <LinkIcon size={20} className="a11y-widget-option-icon" />
                {t.highlightLinks}
              </span>
              <button
                className={`a11y-widget-toggle ${settings.highlightLinks ? "active" : ""}`}
                onClick={() => toggleSetting("highlightLinks")}
                role="switch"
                aria-checked={settings.highlightLinks}
              />
            </div>

            {/* Stop Animations */}
            <div className="a11y-widget-option">
              <span className="a11y-widget-option-label">
                <PauseIcon size={20} className="a11y-widget-option-icon" />
                {t.stopAnimations}
              </span>
              <button
                className={`a11y-widget-toggle ${settings.stopAnimations ? "active" : ""}`}
                onClick={() => toggleSetting("stopAnimations")}
                role="switch"
                aria-checked={settings.stopAnimations}
              />
            </div>

            {/* Reading Mode */}
            <div className="a11y-widget-option">
              <span className="a11y-widget-option-label">
                <BookIcon size={20} className="a11y-widget-option-icon" />
                {t.readingMode}
              </span>
              <button
                className={`a11y-widget-toggle ${settings.readingMode ? "active" : ""}`}
                onClick={() => toggleSetting("readingMode")}
                role="switch"
                aria-checked={settings.readingMode}
              />
            </div>

            {/* Dyslexia Font */}
            <div className="a11y-widget-option">
              <span className="a11y-widget-option-label">
                <TextIcon size={20} className="a11y-widget-option-icon" />
                {t.dyslexiaFont}
              </span>
              <button
                className={`a11y-widget-toggle ${settings.dyslexiaFont ? "active" : ""}`}
                onClick={() => toggleSetting("dyslexiaFont")}
                role="switch"
                aria-checked={settings.dyslexiaFont}
              />
            </div>

            {/* Reset Button */}
            <button className="a11y-widget-reset" onClick={resetSettings}>
              <ResetIcon size={18} />
              {t.reset}
            </button>

            {/* Legal Disclaimer */}
            <p className="a11y-widget-disclaimer">
              {t.disclaimer}
            </p>

            {/* Branding */}
            {branding && (
              <a
                href={branding.companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="a11y-widget-branding"
              >
                {language === "he" ? "מופעל על ידי" : "Powered by"} {branding.companyName}
              </a>
            )}
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {showSettings && (
        <div className="a11y-settings-overlay" onClick={handleCancelSettings}>
          <div className="a11y-settings-modal" onClick={(e) => e.stopPropagation()}>
            <div className="a11y-settings-header" style={{ background: `linear-gradient(135deg, ${tempCustomization.color}, ${tempCustomization.color}dd)` }}>
              <h3 className="a11y-settings-title">{t.widgetSettings}</h3>
              <button className="a11y-settings-close" onClick={handleCancelSettings}>
                <CloseIcon size={20} />
              </button>
            </div>

            <div className="a11y-settings-content">
              {/* Color Picker */}
              <div className="a11y-settings-section">
                <label className="a11y-settings-label">{t.buttonColor}</label>
                <div className="a11y-color-picker">
                  {COLORS.map((color) => (
                    <button
                      key={color}
                      className={`a11y-color-option ${tempCustomization.color === color ? "selected" : ""}`}
                      style={{ background: color }}
                      onClick={() => setTempCustomization({ ...tempCustomization, color })}
                      aria-label={color}
                    >
                      {tempCustomization.color === color && <CheckIcon size={16} />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Desktop Position */}
              <div className="a11y-settings-section">
                <label className="a11y-settings-label">{t.positionDesktop}</label>
                <div className="a11y-position-grid">
                  {positionOptions.map((opt) => (
                    <button
                      key={`desktop-${opt.value}`}
                      className={`a11y-position-option ${tempCustomization.positionDesktop === opt.value ? "selected" : ""}`}
                      onClick={() => setTempCustomization({ ...tempCustomization, positionDesktop: opt.value })}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Position */}
              <div className="a11y-settings-section">
                <label className="a11y-settings-label">{t.positionMobile}</label>
                <div className="a11y-position-grid">
                  {positionOptions.map((opt) => (
                    <button
                      key={`mobile-${opt.value}`}
                      className={`a11y-position-option ${tempCustomization.positionMobile === opt.value ? "selected" : ""}`}
                      onClick={() => setTempCustomization({ ...tempCustomization, positionMobile: opt.value })}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="a11y-settings-actions">
                <button className="a11y-settings-save" onClick={handleSaveSettings} style={{ background: tempCustomization.color }}>
                  {t.save}
                </button>
                <button className="a11y-settings-cancel" onClick={handleCancelSettings}>
                  {t.cancel}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
