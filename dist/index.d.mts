import * as react_jsx_runtime from 'react/jsx-runtime';

interface AccessibilitySettings {
    fontSize: number;
    highContrast: boolean;
    highlightLinks: boolean;
    stopAnimations: boolean;
    readingMode: boolean;
    dyslexiaFont: boolean;
}
interface AccessibilityWidgetProps {
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
declare const defaultSettings: AccessibilitySettings;
declare const translations: {
    he: {
        title: string;
        fontSize: string;
        highContrast: string;
        highlightLinks: string;
        stopAnimations: string;
        readingMode: string;
        dyslexiaFont: string;
        reset: string;
        close: string;
        disclaimer: string;
        settings: string;
        widgetSettings: string;
        buttonColor: string;
        positionDesktop: string;
        positionMobile: string;
        bottomRight: string;
        bottomLeft: string;
        topRight: string;
        topLeft: string;
        save: string;
        cancel: string;
    };
    en: {
        title: string;
        fontSize: string;
        highContrast: string;
        highlightLinks: string;
        stopAnimations: string;
        readingMode: string;
        dyslexiaFont: string;
        reset: string;
        close: string;
        disclaimer: string;
        settings: string;
        widgetSettings: string;
        buttonColor: string;
        positionDesktop: string;
        positionMobile: string;
        bottomRight: string;
        bottomLeft: string;
        topRight: string;
        topLeft: string;
        save: string;
        cancel: string;
    };
};

declare function AccessibilityWidget({ position, primaryColor, language, storageKey, zIndex, branding, }: AccessibilityWidgetProps): react_jsx_runtime.JSX.Element | null;

declare function useAccessibility(storageKey?: string): {
    settings: AccessibilitySettings;
    isLoaded: boolean;
    updateSetting: <K extends keyof AccessibilitySettings>(key: K, value: AccessibilitySettings[K]) => void;
    resetSettings: () => void;
    increaseFontSize: () => void;
    decreaseFontSize: () => void;
    toggleSetting: (key: keyof Omit<AccessibilitySettings, "fontSize">) => void;
};

export { type AccessibilitySettings, AccessibilityWidget, type AccessibilityWidgetProps, defaultSettings, translations, useAccessibility };
