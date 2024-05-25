module.exports = {
	"*.{js,ts,svelte,css,scss,postcss,md,json,jsonc}": [
		"biome format --write .",
		"biome format .",
	],
	"*.{js,ts,svelte}": "biome check .",
};
