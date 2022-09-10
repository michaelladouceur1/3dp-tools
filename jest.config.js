/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
	roots: ["./src", "./test"],
	preset: "ts-jest",
	testEnvironment: "node",
	collectCoverage: true,
	coverageDirectory: "coverage",
	coverageThreshold: {
		global: {
			branches: 75,
			functions: 75,
			lines: 75,
			statements: 75,
		},
	},
	verbose: true,
	testPathIgnorePatterns: ["/node_modules"],
	transformIgnorePatterns: ["node_modules/(?!@ngrx|(?!deck.gl)|ng-dynamic)"],
};
