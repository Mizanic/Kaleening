---
inclusion: fileMatch
fileMatchPattern: ['mobile/src/**/*.tsx']
---
### Rule: Background styling with NativeWind + StyleSheet (React Native)

- **Principle**: Use NativeWind (`className`) for layout, spacing, and typography. Use React Native `style`/`StyleSheet` for all backgrounds, pulling colors from the theme.
- **Do not** use Tailwind `bg-*` classes for backgrounds in React Native code.
- **Source of truth** for colors: `useTheme()` → `colors` (see `mobile/src/styles/buildTheme.ts`).

#### Standard mappings
- **App/root/screen surfaces**: `colors.surface.primary`
- **Cards/headers/tab bar**: `colors.surface.secondary`
- **Subtle backgrounds/inputs**: `colors.surface.tertiary`
- **Overlays**: `colors.surface.overlay`

#### Container example
```tsx
// Use className for flex/layout; use style for backgroundColor from theme
<View className="flex-1" style={{ backgroundColor: colors.surface.primary }} />
```

#### Reusable styles with StyleSheet
```tsx
const styles = StyleSheet.create({
  container: { flex: 1 },
  card: { borderRadius: 12, padding: 16 },
});

// Compose static StyleSheet with themed background via style array
<View
  style={[
    styles.card,
    { backgroundColor: colors.surface.secondary, borderColor: colors.border.secondary, borderWidth: 1 },
  ]}
/>
```

#### Interactive/pressed states
```tsx
<Pressable
  style={({ pressed }) => [
    { backgroundColor: pressed ? colors.interactive.neutral.pressed : colors.interactive.neutral.default },
  ]}
>
  {children}
</Pressable>
```

#### Navigation/header backgrounds
```tsx
<Stack.Screen
  options={{
    headerStyle: { backgroundColor: colors.surface.secondary },
    headerTintColor: colors.content.primary,
  }}
/>
```

#### Do / Don’t
- **Do**: `<View className="px-md py-sm" style={{ backgroundColor: colors.surface.secondary }} />`
- **Don’t**: `<View className="px-md py-sm bg-neutral-900" />` (no `bg-*` classes)

#### Scope
- Applies to React Native code under `mobile/src/**`.
- For brand or accent backgrounds, also source from theme tokens (e.g., `colors.palette.primary[500]`) via `style`.

#### Rationale
- Keeps all backgrounds theme-driven (light/dark, tokens in `buildTheme.ts`).
- Avoids divergence between NativeWind static classes and runtime theme tokens.

