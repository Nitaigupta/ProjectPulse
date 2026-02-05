/** @type {import('tailwindcss').Config} */
import { withUt } from "uploadthing/tw";
export default withUt({
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: { extend: {} },
  plugins: [],
});
