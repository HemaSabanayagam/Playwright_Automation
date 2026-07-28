import testdata from "../test-data/SauceDemoTestData.json"

// Convert JSON to a string, then parse it back into an object/array
// This creates a copy of testdata
// so that if a test modifies "dataset", the original testdata stays unchanged

export const dataset = JSON.parse(JSON.stringify(testdata));