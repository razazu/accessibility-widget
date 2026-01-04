/**
 * Accessibility Widget - Vanilla JS Version
 * Works on any website without React
 */

type WidgetPosition = "bottom-right" | "bottom-left" | "top-right" | "top-left";

interface WidgetOptions {
  position?: WidgetPosition;
  primaryColor?: string;
  language?: "he" | "en";
  zIndex?: number;
  branding?: {
    logoUrl?: string;
    companyName?: string;
    companyUrl?: string;
  };
}

interface AccessibilitySettings {
  fontSize: number;
  highContrast: boolean;
  highlightLinks: boolean;
  stopAnimations: boolean;
  readingMode: boolean;
  dyslexiaFont: boolean;
}

interface WidgetCustomization {
  color: string;
  positionDesktop: WidgetPosition;
  positionMobile: WidgetPosition;
}

const translations = {
  he: {
    title: "נגישות",
    fontSize: "גודל טקסט",
    highContrast: "ניגודיות גבוהה",
    highlightLinks: "הדגשת קישורים",
    stopAnimations: "עצירת אנימציות",
    readingMode: "מצב קריאה",
    dyslexiaFont: "גופן דיסלקציה",
    reset: "איפוס",
    close: "סגור",
    disclaimer: "כלי זה נועד לסייע בנגישות האתר אך אינו מהווה תחליף לנגישות מלאה בהתאם לתקן.",
    settings: "הגדרות",
    widgetSettings: "הגדרות ווידג'ט",
    buttonColor: "צבע הכפתור",
    positionDesktop: "מיקום (דסקטופ)",
    positionMobile: "מיקום (מובייל)",
    bottomRight: "למטה ימין",
    bottomLeft: "למטה שמאל",
    topRight: "למעלה ימין",
    topLeft: "למעלה שמאל",
    save: "שמור",
    cancel: "ביטול",
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
    cancel: "Cancel",
  },
};

const ICONS = {
  accessibility: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="1"/><path d="m9 20 3-6 3 6"/><path d="m6 8 6 2 6-2"/><path d="M12 10v4"/></svg>`,
  close: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
  fontSize: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><text x="4" y="16" font-size="12" fill="currentColor" stroke="none">A</text><text x="14" y="18" font-size="16" fill="currentColor" stroke="none">A</text></svg>`,
  contrast: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2v20"/><path d="M12 2a10 10 0 0 1 0 20" fill="currentColor"/></svg>`,
  link: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`,
  pause: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>`,
  book: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/><line x1="8" y1="7" x2="16" y2="7"/><line x1="8" y1="11" x2="14" y2="11"/></svg>`,
  text: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></svg>`,
  reset: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>`,
  minus: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
  plus: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
  settings: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>`,
  check: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
};

const COLORS = ["#2dd4bf", "#3b82f6", "#8b5cf6", "#ec4899", "#f97316", "#22c55e", "#eab308", "#ef4444"];

class AccessibilityWidget {
  private options: Required<WidgetOptions>;
  private settings: AccessibilitySettings;
  private customization: WidgetCustomization;
  private isOpen = false;
  private showSettings = false;
  private container: HTMLElement | null = null;
  private t: typeof translations.he;

  constructor(options: WidgetOptions = {}) {
    this.options = {
      position: options.position || "bottom-right",
      primaryColor: options.primaryColor || "#2dd4bf",
      language: options.language || "he",
      zIndex: options.zIndex || 9999,
      branding: options.branding || {},
    };

    this.t = translations[this.options.language];

    this.settings = this.loadSettings();
    this.customization = this.loadCustomization();

    this.init();
  }

  private loadSettings(): AccessibilitySettings {
    const saved = localStorage.getItem("accessibility-settings");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // Use defaults
      }
    }
    return {
      fontSize: 0,
      highContrast: false,
      highlightLinks: false,
      stopAnimations: false,
      readingMode: false,
      dyslexiaFont: false,
    };
  }

  private saveSettings(): void {
    localStorage.setItem("accessibility-settings", JSON.stringify(this.settings));
  }

  private loadCustomization(): WidgetCustomization {
    const saved = localStorage.getItem("a11y-widget-customization");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // Use defaults
      }
    }
    return {
      color: this.options.primaryColor,
      positionDesktop: this.options.position,
      positionMobile: this.options.position,
    };
  }

  private saveCustomization(): void {
    localStorage.setItem("a11y-widget-customization", JSON.stringify(this.customization));
  }

  private get isRTL(): boolean {
    return this.options.language === "he";
  }

  private get isMobile(): boolean {
    return window.innerWidth < 768;
  }

  private get currentPosition(): WidgetPosition {
    return this.isMobile ? this.customization.positionMobile : this.customization.positionDesktop;
  }

  private init(): void {
    this.injectStyles();
    this.render();
    this.applySettings();
    this.setupEventListeners();
  }

  private injectStyles(): void {
    const styleId = "a11y-widget-styles";
    if (document.getElementById(styleId)) return;

    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = this.getStyles();
    document.head.appendChild(style);
    document.documentElement.style.setProperty("--a11y-z-index", String(this.options.zIndex));
  }

  private getStyles(): string {
    const color = this.customization.color;
    const isRTL = this.isRTL;

    return `
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
        outline: 3px solid ${color}80;
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
        animation: a11y-fade-in 0.2s ease-out;
      }
      .a11y-widget-header {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        padding: 16px 20px;
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
      .a11y-widget-close, .a11y-widget-settings-btn {
        position: absolute;
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
      .a11y-widget-close {
        ${isRTL ? "left" : "right"}: 12px;
      }
      .a11y-widget-settings-btn {
        ${isRTL ? "right" : "left"}: 12px;
      }
      .a11y-widget-close:hover, .a11y-widget-settings-btn:hover {
        background: rgba(255, 255, 255, 0.2);
      }
      .a11y-widget-content {
        padding: 16px;
        max-height: 60vh;
        overflow-y: auto;
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
        color: ${color};
      }
      .a11y-widget-toggle {
        position: relative;
        width: 48px;
        height: 26px;
        background: #3a3a5c;
        border-radius: 13px;
        border: none;
        cursor: pointer;
        transition: background 0.2s;
      }
      .a11y-widget-toggle.active {
        background: ${color};
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
      .a11y-widget-font-btn:hover:not(:disabled) {
        background: ${color};
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
        border-color: ${color};
        color: ${color};
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
        color: ${color};
      }
      .a11y-widget-trigger.bottom-right, .a11y-widget-panel.bottom-right { bottom: 20px; ${isRTL ? "left" : "right"}: 20px; }
      .a11y-widget-trigger.bottom-left, .a11y-widget-panel.bottom-left { bottom: 20px; ${isRTL ? "right" : "left"}: 20px; }
      .a11y-widget-trigger.top-right, .a11y-widget-panel.top-right { top: 20px; ${isRTL ? "left" : "right"}: 20px; }
      .a11y-widget-trigger.top-left, .a11y-widget-panel.top-left { top: 20px; ${isRTL ? "right" : "left"}: 20px; }
      .a11y-widget-panel.bottom-right, .a11y-widget-panel.bottom-left { bottom: 90px; }
      .a11y-widget-panel.top-right, .a11y-widget-panel.top-left { top: 90px; }
      @keyframes a11y-fade-in {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
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
      .a11y-settings-label {
        display: block;
        color: #e0e0e0;
        font-size: 14px;
        font-weight: 500;
        margin-bottom: 10px;
      }
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
        border-color: ${color};
        background: ${color}20;
      }
      .a11y-settings-actions {
        display: flex;
        gap: 10px;
        margin-top: 20px;
        padding-top: 16px;
        border-top: 1px solid #3a3a5c;
      }
      .a11y-settings-save, .a11y-settings-cancel {
        flex: 1;
        padding: 12px;
        border-radius: 8px;
        font-size: 14px;
        cursor: pointer;
        transition: opacity 0.2s, border-color 0.2s;
      }
      .a11y-settings-save {
        background: ${color};
        border: none;
        color: white;
        font-weight: 500;
      }
      .a11y-settings-save:hover {
        opacity: 0.9;
      }
      .a11y-settings-cancel {
        background: transparent;
        border: 2px solid #3a3a5c;
        color: #e0e0e0;
      }
      .a11y-settings-cancel:hover {
        border-color: #5a5a7c;
      }
      /* Accessibility Effects */
      .a11y-high-contrast {
        background-color: #000 !important;
      }
      .a11y-high-contrast *:not(.a11y-widget-trigger):not(.a11y-widget-panel):not(.a11y-widget-panel *):not([class*="a11y-widget"]):not([class*="a11y-settings"]) {
        color: #fff !important;
        border-color: #fff !important;
      }
      .a11y-high-contrast h1:not(.a11y-widget-title):not(.a11y-settings-title),
      .a11y-high-contrast h2:not(.a11y-widget-title):not(.a11y-settings-title),
      .a11y-high-contrast h3, .a11y-high-contrast h4, .a11y-high-contrast h5, .a11y-high-contrast h6 {
        color: #ffff00 !important;
      }
      .a11y-high-contrast a:not([class*="a11y-widget"]):not([class*="a11y-settings"]) {
        color: #00ffff !important;
      }
      .a11y-high-contrast button:not([class*="a11y-widget"]):not([class*="a11y-settings"]) {
        background-color: #333 !important;
        color: #fff !important;
        border: 2px solid #fff !important;
      }
      .a11y-widget-trigger, .a11y-widget-panel, .a11y-widget-panel *, .a11y-settings-overlay, .a11y-settings-modal, .a11y-settings-modal * {
        filter: none !important;
      }
      .a11y-highlight-links a {
        background-color: #ffff00 !important;
        color: #000000 !important;
        text-decoration: underline !important;
        padding: 2px 4px !important;
      }
      @media screen {
        .a11y-stop-animations, .a11y-stop-animations *, .a11y-stop-animations *::before, .a11y-stop-animations *::after {
          animation: none !important;
          animation-duration: 0s !important;
          animation-delay: 0s !important;
          transition: none !important;
          transition-duration: 0s !important;
          transition-delay: 0s !important;
          scroll-behavior: auto !important;
        }
      }
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
      .a11y-dyslexia-font, .a11y-dyslexia-font * {
        font-family: 'OpenDyslexic', 'Comic Sans MS', cursive, sans-serif !important;
        letter-spacing: 0.05em !important;
        word-spacing: 0.1em !important;
      }
    `;
  }

  private render(): void {
    // Remove existing container
    if (this.container) {
      this.container.remove();
    }

    this.container = document.createElement("div");
    this.container.id = "a11y-widget-container";
    this.updateUI();
    document.body.appendChild(this.container);
  }

  private updateUI(): void {
    if (!this.container) return;

    const pos = this.currentPosition;
    const color = this.customization.color;

    let html = `
      <button class="a11y-widget-trigger ${pos}" style="background: ${color}" aria-label="${this.t.title}" aria-expanded="${this.isOpen}">
        ${this.isOpen ? ICONS.close : ICONS.accessibility}
      </button>
    `;

    if (this.isOpen) {
      const { branding } = this.options;
      const headerContent = branding?.logoUrl
        ? `<div class="a11y-widget-header-brand">
            <img src="${branding.logoUrl}" alt="${branding.companyName || ''}" class="a11y-widget-header-logo" />
            <span class="a11y-widget-header-subtitle">Accessibility</span>
          </div>`
        : `<h2 class="a11y-widget-title">${this.t.title}</h2>`;

      html += `
        <div class="a11y-widget-panel ${pos}" role="dialog" aria-label="${this.t.title}">
          <div class="a11y-widget-header" style="background: linear-gradient(135deg, ${color}, ${color}dd)">
            <button class="a11y-widget-settings-btn" aria-label="${this.t.settings}">${ICONS.settings}</button>
            ${headerContent}
            <button class="a11y-widget-close" aria-label="${this.t.close}">${ICONS.close}</button>
          </div>
          <div class="a11y-widget-content">
            <!-- Font Size -->
            <div class="a11y-widget-option">
              <span class="a11y-widget-option-label">
                <span class="a11y-widget-option-icon">${ICONS.fontSize}</span>
                ${this.t.fontSize}
              </span>
              <div class="a11y-widget-font-controls">
                <button class="a11y-widget-font-btn" data-action="decrease-font" ${this.settings.fontSize === 0 ? 'disabled' : ''}>${ICONS.minus}</button>
                <span class="a11y-widget-font-level">${this.settings.fontSize}</span>
                <button class="a11y-widget-font-btn" data-action="increase-font" ${this.settings.fontSize === 3 ? 'disabled' : ''}>${ICONS.plus}</button>
              </div>
            </div>
            <!-- High Contrast -->
            <div class="a11y-widget-option">
              <span class="a11y-widget-option-label">
                <span class="a11y-widget-option-icon">${ICONS.contrast}</span>
                ${this.t.highContrast}
              </span>
              <button class="a11y-widget-toggle ${this.settings.highContrast ? 'active' : ''}" data-setting="highContrast" role="switch" aria-checked="${this.settings.highContrast}"></button>
            </div>
            <!-- Highlight Links -->
            <div class="a11y-widget-option">
              <span class="a11y-widget-option-label">
                <span class="a11y-widget-option-icon">${ICONS.link}</span>
                ${this.t.highlightLinks}
              </span>
              <button class="a11y-widget-toggle ${this.settings.highlightLinks ? 'active' : ''}" data-setting="highlightLinks" role="switch" aria-checked="${this.settings.highlightLinks}"></button>
            </div>
            <!-- Stop Animations -->
            <div class="a11y-widget-option">
              <span class="a11y-widget-option-label">
                <span class="a11y-widget-option-icon">${ICONS.pause}</span>
                ${this.t.stopAnimations}
              </span>
              <button class="a11y-widget-toggle ${this.settings.stopAnimations ? 'active' : ''}" data-setting="stopAnimations" role="switch" aria-checked="${this.settings.stopAnimations}"></button>
            </div>
            <!-- Reading Mode -->
            <div class="a11y-widget-option">
              <span class="a11y-widget-option-label">
                <span class="a11y-widget-option-icon">${ICONS.book}</span>
                ${this.t.readingMode}
              </span>
              <button class="a11y-widget-toggle ${this.settings.readingMode ? 'active' : ''}" data-setting="readingMode" role="switch" aria-checked="${this.settings.readingMode}"></button>
            </div>
            <!-- Dyslexia Font -->
            <div class="a11y-widget-option">
              <span class="a11y-widget-option-label">
                <span class="a11y-widget-option-icon">${ICONS.text}</span>
                ${this.t.dyslexiaFont}
              </span>
              <button class="a11y-widget-toggle ${this.settings.dyslexiaFont ? 'active' : ''}" data-setting="dyslexiaFont" role="switch" aria-checked="${this.settings.dyslexiaFont}"></button>
            </div>
            <!-- Reset -->
            <button class="a11y-widget-reset" data-action="reset">
              ${ICONS.reset}
              ${this.t.reset}
            </button>
            <!-- Disclaimer -->
            <p class="a11y-widget-disclaimer">${this.t.disclaimer}</p>
            ${branding?.companyUrl ? `<a href="${branding.companyUrl}" target="_blank" rel="noopener noreferrer" class="a11y-widget-branding">${this.isRTL ? 'מופעל על ידי' : 'Powered by'} ${branding.companyName || ''}</a>` : ''}
          </div>
        </div>
      `;
    }

    if (this.showSettings) {
      html += this.renderSettingsModal();
    }

    this.container.innerHTML = html;
    this.attachEventListeners();
  }

  private renderSettingsModal(): string {
    const color = this.customization.color;
    const positions = [
      { value: "top-right", label: this.t.topRight },
      { value: "top-left", label: this.t.topLeft },
      { value: "bottom-right", label: this.t.bottomRight },
      { value: "bottom-left", label: this.t.bottomLeft },
    ];

    return `
      <div class="a11y-settings-overlay">
        <div class="a11y-settings-modal">
          <div class="a11y-settings-header" style="background: linear-gradient(135deg, ${color}, ${color}dd)">
            <h3 class="a11y-settings-title">${this.t.widgetSettings}</h3>
            <button class="a11y-settings-close">${ICONS.close}</button>
          </div>
          <div class="a11y-settings-content">
            <div class="a11y-settings-section">
              <label class="a11y-settings-label">${this.t.buttonColor}</label>
              <div class="a11y-color-picker">
                ${COLORS.map(c => `
                  <button class="a11y-color-option ${this.customization.color === c ? 'selected' : ''}" style="background: ${c}" data-color="${c}">
                    ${this.customization.color === c ? ICONS.check : ''}
                  </button>
                `).join('')}
              </div>
            </div>
            <div class="a11y-settings-section">
              <label class="a11y-settings-label">${this.t.positionDesktop}</label>
              <div class="a11y-position-grid">
                ${positions.map(p => `
                  <button class="a11y-position-option ${this.customization.positionDesktop === p.value ? 'selected' : ''}" data-position-desktop="${p.value}">${p.label}</button>
                `).join('')}
              </div>
            </div>
            <div class="a11y-settings-section">
              <label class="a11y-settings-label">${this.t.positionMobile}</label>
              <div class="a11y-position-grid">
                ${positions.map(p => `
                  <button class="a11y-position-option ${this.customization.positionMobile === p.value ? 'selected' : ''}" data-position-mobile="${p.value}">${p.label}</button>
                `).join('')}
              </div>
            </div>
            <div class="a11y-settings-actions">
              <button class="a11y-settings-save" style="background: ${color}">${this.t.save}</button>
              <button class="a11y-settings-cancel">${this.t.cancel}</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  private attachEventListeners(): void {
    if (!this.container) return;

    // Trigger button
    const trigger = this.container.querySelector('.a11y-widget-trigger');
    trigger?.addEventListener('click', () => {
      this.isOpen = !this.isOpen;
      this.updateUI();
    });

    // Close button
    const closeBtn = this.container.querySelector('.a11y-widget-close');
    closeBtn?.addEventListener('click', () => {
      this.isOpen = false;
      this.updateUI();
    });

    // Settings button
    const settingsBtn = this.container.querySelector('.a11y-widget-settings-btn');
    settingsBtn?.addEventListener('click', () => {
      this.showSettings = true;
      this.updateUI();
    });

    // Toggle settings
    this.container.querySelectorAll('.a11y-widget-toggle').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const setting = (e.currentTarget as HTMLElement).dataset.setting as keyof AccessibilitySettings;
        if (setting && typeof this.settings[setting] === 'boolean') {
          (this.settings[setting] as boolean) = !this.settings[setting];
          this.saveSettings();
          this.applySettings();
          this.updateUI();
        }
      });
    });

    // Font size controls
    this.container.querySelector('[data-action="decrease-font"]')?.addEventListener('click', () => {
      if (this.settings.fontSize > 0) {
        this.settings.fontSize--;
        this.saveSettings();
        this.applySettings();
        this.updateUI();
      }
    });

    this.container.querySelector('[data-action="increase-font"]')?.addEventListener('click', () => {
      if (this.settings.fontSize < 3) {
        this.settings.fontSize++;
        this.saveSettings();
        this.applySettings();
        this.updateUI();
      }
    });

    // Reset button
    this.container.querySelector('[data-action="reset"]')?.addEventListener('click', () => {
      this.settings = {
        fontSize: 0,
        highContrast: false,
        highlightLinks: false,
        stopAnimations: false,
        readingMode: false,
        dyslexiaFont: false,
      };
      this.saveSettings();
      this.applySettings();
      this.updateUI();
    });

    // Settings modal
    const settingsOverlay = this.container.querySelector('.a11y-settings-overlay');
    settingsOverlay?.addEventListener('click', (e) => {
      if (e.target === settingsOverlay) {
        this.showSettings = false;
        this.updateUI();
      }
    });

    this.container.querySelector('.a11y-settings-close')?.addEventListener('click', () => {
      this.showSettings = false;
      this.updateUI();
    });

    this.container.querySelector('.a11y-settings-cancel')?.addEventListener('click', () => {
      this.showSettings = false;
      this.updateUI();
    });

    this.container.querySelector('.a11y-settings-save')?.addEventListener('click', () => {
      this.saveCustomization();
      this.showSettings = false;
      this.injectStyles();
      this.updateUI();
    });

    // Color options
    this.container.querySelectorAll('.a11y-color-option').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const color = (e.currentTarget as HTMLElement).dataset.color;
        if (color) {
          this.customization.color = color;
          this.updateUI();
        }
      });
    });

    // Position options
    this.container.querySelectorAll('[data-position-desktop]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const pos = (e.currentTarget as HTMLElement).dataset.positionDesktop as WidgetPosition;
        if (pos) {
          this.customization.positionDesktop = pos;
          this.updateUI();
        }
      });
    });

    this.container.querySelectorAll('[data-position-mobile]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const pos = (e.currentTarget as HTMLElement).dataset.positionMobile as WidgetPosition;
        if (pos) {
          this.customization.positionMobile = pos;
          this.updateUI();
        }
      });
    });
  }

  private setupEventListeners(): void {
    // Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (this.showSettings) {
          this.showSettings = false;
          this.updateUI();
        } else if (this.isOpen) {
          this.isOpen = false;
          this.updateUI();
        }
      }
    });

    // Resize handler
    window.addEventListener('resize', () => {
      if (this.isOpen) {
        this.updateUI();
      }
    });
  }

  private applySettings(): void {
    const root = document.documentElement;
    const body = document.body;

    // Font size
    const fontSizePercents = [100, 115, 130, 150];
    const percent = fontSizePercents[this.settings.fontSize] || 100;
    root.style.fontSize = `${percent}%`;

    // High contrast
    body.classList.toggle('a11y-high-contrast', this.settings.highContrast);

    // Highlight links
    body.classList.toggle('a11y-highlight-links', this.settings.highlightLinks);

    // Stop animations
    body.classList.toggle('a11y-stop-animations', this.settings.stopAnimations);

    // Reading mode
    body.classList.toggle('a11y-reading-mode', this.settings.readingMode);

    // Dyslexia font
    body.classList.toggle('a11y-dyslexia-font', this.settings.dyslexiaFont);
  }

  public destroy(): void {
    if (this.container) {
      this.container.remove();
      this.container = null;
    }
    const style = document.getElementById('a11y-widget-styles');
    if (style) {
      style.remove();
    }
  }
}

// Auto-init from script data attributes
function autoInit(): void {
  const script = document.currentScript as HTMLScriptElement;
  if (!script) return;

  const options: WidgetOptions = {};

  if (script.dataset.position) {
    options.position = script.dataset.position as WidgetPosition;
  }
  if (script.dataset.color) {
    options.primaryColor = script.dataset.color;
  }
  if (script.dataset.language) {
    options.language = script.dataset.language as "he" | "en";
  }
  if (script.dataset.zindex) {
    options.zIndex = parseInt(script.dataset.zindex, 10);
  }
  if (script.dataset.logoUrl || script.dataset.companyName || script.dataset.companyUrl) {
    options.branding = {
      logoUrl: script.dataset.logoUrl,
      companyName: script.dataset.companyName,
      companyUrl: script.dataset.companyUrl,
    };
  }

  new AccessibilityWidget(options);
}

// Export for manual initialization
(window as any).AccessibilityWidget = {
  init: (options?: WidgetOptions) => new AccessibilityWidget(options),
};

// Auto-init when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', autoInit);
} else {
  autoInit();
}

export { AccessibilityWidget };
