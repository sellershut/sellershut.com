module.exports = {
	"*.{js,ts,svelte,css,scss,postcss,md,json,jsonc}": [
		"biome format --write .",
		"biome check .",
	],
	"*.{js,ts,svelte}": "biome check .",
};
