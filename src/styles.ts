export const getStyles = (primaryColor: string, isRTL: boolean) => `
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
