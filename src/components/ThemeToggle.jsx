import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const dark = theme === 'dark';
  return (
    <button
      className="themetoggle"
      onClick={toggleTheme}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={dark ? 'Light mode' : 'Dark mode'}
    >
      {dark ? '☀' : '☾'}
    </button>
  );
}
