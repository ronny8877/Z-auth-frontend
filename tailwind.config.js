/** @format */

const colors = require("tailwindcss/colors");

module.exports = {
	mode: "jit",
	purge: ["./public/**/*.html", "./src/**/*.{js,jsx,ts,tsx,vue}"],
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	darkMode: "class", // or 'media' or 'class'
	theme: {
		fontFamily: {
			sans: ["ui-sans-serif", "system-ui"],
			serif: ["ui-serif", "Georgia"],
			mono: ["ui-monospace", "SFMono-Regular"],
			ubuntu: ["Ubuntu", " sans-serif"],
			italianno: ["Italianno", "cursive"],
			montserrat: ["Montserrat", "sans-serif"],
			quickSand: ["QuickSand", "sans-serif"],
		},
		colors: {
			transparent: "transparent",
			current: "currentColor",
			black: colors.black,
			white: colors.white,
			gray: colors.trueGray,
			blue: colors.blue,
			purple: colors.purple,
			indigo: colors.indigo,
			red: colors.rose,
			yellow: colors.amber,
			green: colors.green,
			navy: {
				100: "#7510F7",
				200: "#9689B7",
			},
			custom: {
				red: "#FF5C58",
				pink: "#f85d80",
				yellow: "#FEDF22",
				lightYellow: "#FFD948",
				darkYellow: "#FED40F",
				blue: "#4831D4",
				yellowDark: "#FF9900",
				spotify: "#08C367",
			},
			dark: {
				800: "#121212 ",
				100: "#1F1F1F",
				500: "#212121",
			},
		},
		extend: {},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
