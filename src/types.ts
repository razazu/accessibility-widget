export interface AccessibilitySettings {
  fontSize: number; // 0 = normal, 1-3 = increased levels
  highContrast: boolean;
  highlightLinks: boolean;
  stopAnimations: boolean;
  readingMode: boolean;
  dyslexiaFont: boolean;
}

export type WidgetPosition = "bottom-right" | "bottom-left" | "top-right" | "top-left";

export interface WidgetCustomization {
  color: string;
  positionDesktop: WidgetPosition;
  positionMobile: WidgetPosition;
}

export const defaultCustomization: WidgetCustomization = {
  color: "#2dd4bf",
  positionDesktop: "bottom-right",
  positionMobile: "bottom-right",
};

export interface AccessibilityWidgetProps {
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  primaryColor?: string;
  language?: "he" | "en";
  storageKey?: string;
  zIndex?: number;
  branding?: {
    logoUrl: string;
    companyName: string;
    companyUrl: string;
  };
}

export const defaultSettings: AccessibilitySettings = {
  fontSize: 0,
  highContrast: false,
  highlightLinks: false,
  stopAnimations: false,
  readingMode: false,
  dyslexiaFont: false,
};

export const translations = {
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
