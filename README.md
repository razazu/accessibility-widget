# @razazu/accessibility-widget

A React accessibility widget with full RTL (Hebrew) support. Easily add accessibility features to any React application.

## Features

- **Font Size Control** - Increase/decrease text size (4 levels)
- **High Contrast Mode** - Enhanced contrast for better visibility
- **Highlight Links** - Make all links clearly visible
- **Stop Animations** - Disable all animations and transitions
- **Reading Mode** - Optimized layout for reading
- **Dyslexia Font** - OpenDyslexic font support
- **RTL Support** - Full Hebrew/RTL language support
- **Persistent Settings** - Saves preferences to localStorage
- **Keyboard Accessible** - Full keyboard navigation support
- **Customizable** - Position, colors, and language options

## Installation

```bash
npm install @razazu/accessibility-widget
```

## Usage

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
      />
    </div>
  );
}
```

### Using the Hook

You can also use the accessibility settings programmatically:

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

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `position` | `"bottom-right"` \| `"bottom-left"` \| `"top-right"` \| `"top-left"` | `"bottom-right"` | Widget button position |
| `primaryColor` | `string` | `"#2dd4bf"` | Primary accent color |
| `language` | `"he"` \| `"en"` | `"he"` | UI language |
| `storageKey` | `string` | `"accessibility-settings"` | localStorage key |
| `zIndex` | `number` | `9999` | z-index for the widget |

## Settings Object

```typescript
interface AccessibilitySettings {
  fontSize: number;        // 0-3 (0 = normal, 1-3 = increased)
  highContrast: boolean;
  highlightLinks: boolean;
  stopAnimations: boolean;
  readingMode: boolean;
  dyslexiaFont: boolean;
}
```

## CSS Classes Applied

The widget adds these classes to the `<body>` element based on settings:

- `.a11y-high-contrast` - When high contrast is enabled
- `.a11y-highlight-links` - When link highlighting is enabled
- `.a11y-stop-animations` - When animations are stopped
- `.a11y-reading-mode` - When reading mode is enabled
- `.a11y-dyslexia-font` - When dyslexia font is enabled

## License

MIT
