# FlowRaz Accessibility Widget

<div align="center">

**תוסף נגישות חכם לכל אתר**

[![npm version](https://img.shields.io/npm/v/@razazu/accessibility-widget.svg)](https://www.npmjs.com/package/@razazu/accessibility-widget)
[![Accessibility](https://img.shields.io/badge/accessibility-WCAG%202.1-green)](https://www.w3.org/WAI/WCAG21/quickref/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![RTL Support](https://img.shields.io/badge/RTL-Hebrew-orange)](https://github.com/razazu/accessibility-widget)

**Created by [Raz Azulay](https://razazulay.com) | Powered by [FlowRaz](https://flowraz.com)**

</div>

---

A powerful accessibility widget with full RTL (Hebrew) support. Works with **React/Next.js**, **WordPress**, **Elementor**, and **any HTML website**.

## ✨ Features

- **🔤 Font Size Control** - Increase/decrease text size (4 levels)
- **🎨 High Contrast Mode** - Enhanced contrast for better visibility
- **🔗 Highlight Links** - Make all links clearly visible
- **⏹️ Stop Animations** - Disable all animations and transitions
- **📖 Reading Mode** - Optimized layout for reading
- **🔠 Dyslexia Font** - OpenDyslexic font support
- **↔️ RTL Support** - Full Hebrew/RTL language support
- **💾 Persistent Settings** - Saves preferences to localStorage
- **⚙️ Widget Customization** - Color picker, position settings (desktop/mobile)
- **⌨️ Keyboard Accessible** - Full keyboard navigation support

---

## 🚀 Installation Options

Choose the installation method that fits your platform:

- [React / Next.js](#react--nextjs)
- [Vanilla JavaScript (Any Website)](#vanilla-javascript-any-website)
- [WordPress](#wordpress)
- [Elementor](#elementor)
- [CDN Script Tag](#cdn-script-tag)

---

## React / Next.js

### Installation

```bash
npm install @razazu/accessibility-widget
```

### Basic Usage

```tsx
import { AccessibilityWidget } from "@razazu/accessibility-widget";

function App() {
  return (
    <div>
      <h1>My Website</h1>
      <AccessibilityWidget />
    </div>
  );
}
```

### With Options

```tsx
import { AccessibilityWidget } from "@razazu/accessibility-widget";

function App() {
  return (
    <div>
      <AccessibilityWidget
        position="bottom-left"     // "bottom-right" | "bottom-left" | "top-right" | "top-left"
        primaryColor="#2dd4bf"     // Any valid CSS color
        language="he"              // "he" (Hebrew) | "en" (English)
        storageKey="my-a11y"       // localStorage key for settings
        zIndex={9999}              // z-index for the widget
        branding={{
          logoUrl: "/my-logo.png",
          companyName: "My Company",
          companyUrl: "https://mycompany.com"
        }}
      />
    </div>
  );
}
```

### Using the Hook

```tsx
import { useAccessibility } from "@razazu/accessibility-widget";

function MyComponent() {
  const {
    settings,
    toggleSetting,
    increaseFontSize,
    decreaseFontSize,
    resetSettings
  } = useAccessibility();

  return (
    <div>
      <p>Current font size level: {settings.fontSize}</p>
      <button onClick={() => toggleSetting("highContrast")}>
        Toggle High Contrast
      </button>
    </div>
  );
}
```

---

## Vanilla JavaScript (Any Website)

For non-React websites, use the Vanilla JS version.

### CDN Script Tag

Add this before the closing `</body>` tag:

```html
<!-- Hebrew (RTL) -->
<script
  src="https://cdn.jsdelivr.net/gh/razazu/accessibility-widget@latest/dist/accessibility-widget.min.js"
  data-language="he"
  data-color="#2dd4bf"
></script>

<!-- English (LTR) -->
<script
  src="https://cdn.jsdelivr.net/gh/razazu/accessibility-widget@latest/dist/accessibility-widget.min.js"
  data-language="en"
  data-color="#3b82f6"
></script>
```

### Data Attributes

| Attribute | Default | Description |
|-----------|---------|-------------|
| `data-language` | `"he"` | UI language: `"he"` (Hebrew) or `"en"` (English) |
| `data-color` | `"#2dd4bf"` | Primary accent color |
| `data-position` | `"bottom-right"` | Button position |
| `data-z-index` | `9999` | z-index for the widget |
| `data-storage-key` | `"accessibility-settings"` | localStorage key |
| `data-logo` | - | URL to your logo |
| `data-company` | - | Company name |
| `data-company-url` | - | Company website URL |

### Manual Initialization

```html
<script src="https://cdn.jsdelivr.net/gh/razazu/accessibility-widget@latest/dist/accessibility-widget.min.js"></script>
<script>
  AccessibilityWidget.init({
    language: 'he',
    primaryColor: '#2dd4bf',
    position: 'bottom-right',
    zIndex: 9999,
    branding: {
      logoUrl: '/my-logo.png',
      companyName: 'My Company',
      companyUrl: 'https://mycompany.com'
    }
  });
</script>
```

---

## WordPress

### Option 1: Theme Functions (Recommended)

Add this code to your theme's `functions.php` file or use a plugin like "Code Snippets":

```php
function add_accessibility_widget() {
    ?>
    <script
        src="https://cdn.jsdelivr.net/gh/razazu/accessibility-widget@latest/dist/accessibility-widget.min.js"
        data-language="he"
        data-color="#2dd4bf"
    ></script>
    <?php
}
add_action('wp_footer', 'add_accessibility_widget');
```

### Option 2: Header/Footer Plugin

1. Install a plugin like "Insert Headers and Footers" or "WPCode"
2. Add the script tag to the Footer section:

```html
<script
    src="https://cdn.jsdelivr.net/gh/razazu/accessibility-widget@latest/dist/accessibility-widget.min.js"
    data-language="he"
    data-color="#2dd4bf"
></script>
```

### Option 3: Theme Customizer

Some themes have a "Custom Scripts" section in the Customizer. Add the script there.

---

## Elementor

### Method 1: HTML Widget (Single Page)

1. Drag an **HTML** widget to your page
2. Paste this code:

```html
<script
    src="https://cdn.jsdelivr.net/gh/razazu/accessibility-widget@latest/dist/accessibility-widget.min.js"
    data-language="he"
    data-color="#2dd4bf"
></script>
```

### Method 2: Site-Wide (Recommended)

1. Go to **Elementor > Custom Code** (requires Elementor Pro)
2. Click **Add New**
3. Set location to **Before `</body>` End Tag**
4. Paste the script code
5. Set display conditions to "Entire Site"

### Method 3: Theme Builder

1. Go to **Templates > Theme Builder**
2. Edit your **Footer** template
3. Add an **HTML** widget at the end
4. Paste the script code

---

## Full Example with Branding

```html
<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Website</title>
</head>
<body>
    <h1>Welcome to My Website</h1>
    <p>Your content here...</p>

    <!-- Accessibility Widget with Branding -->
    <script
        src="https://cdn.jsdelivr.net/gh/razazu/accessibility-widget@latest/dist/accessibility-widget.min.js"
        data-language="he"
        data-color="#8b5cf6"
        data-logo="https://mysite.com/logo.png"
        data-company="FlowRaz"
        data-company-url="https://flowraz.com"
    ></script>
</body>
</html>
```

---

## Widget Settings

Users can click the settings icon (gear) in the widget header to customize:

- **Button Color** - Choose from 8 preset colors
- **Desktop Position** - Top-right, Top-left, Bottom-right, Bottom-left
- **Mobile Position** - Independent position for mobile devices

Settings are saved to localStorage and persist across sessions.

---

## Props Reference (React)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `position` | `WidgetPosition` | `"bottom-right"` | Initial button position |
| `primaryColor` | `string` | `"#2dd4bf"` | Primary accent color |
| `language` | `"he"` \| `"en"` | `"he"` | UI language |
| `storageKey` | `string` | `"accessibility-settings"` | localStorage key |
| `zIndex` | `number` | `9999` | z-index for the widget |
| `branding` | `BrandingOptions` | `undefined` | Branding configuration |

### BrandingOptions

```typescript
interface BrandingOptions {
  logoUrl: string;      // URL to logo image
  companyName: string;  // Company name (shown in footer)
  companyUrl: string;   // Link for the branding
}
```

---

## CSS Classes Applied

The widget adds these classes to the `<body>` element based on settings:

| Class | Description |
|-------|-------------|
| `.a11y-high-contrast` | High contrast mode enabled |
| `.a11y-highlight-links` | Link highlighting enabled |
| `.a11y-stop-animations` | Animations stopped |
| `.a11y-reading-mode` | Reading mode enabled |
| `.a11y-dyslexia-font` | Dyslexia-friendly font enabled |

Font size changes are applied via CSS custom property `--a11y-font-scale`.

---

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- iOS Safari 12+
- Android Chrome 60+

---

## 📄 License

MIT License - Free for personal and commercial use.

---

## 👨‍💻 Author

**Raz Azulay** - Full Stack Developer

- Website: [razazulay.com](https://razazulay.com)
- GitHub: [@razazu](https://github.com/razazu)
- Company: [FlowRaz](https://flowraz.io)

---

## 🤝 Support

- [GitHub Issues](https://github.com/razazu/accessibility-widget/issues)
- [Documentation](https://github.com/razazu/accessibility-widget#readme)
- Email: raz@flowraz.com

---

<div align="center">

**Built with ❤️ by [FlowRaz](https://flowraz.io)**

*Making the web accessible for everyone*

</div>
