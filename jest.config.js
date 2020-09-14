module.exports = {
    // roots: ["<rootDir>"],
    // modulePaths: ["<rootDir>"],
    // moduleDirectories: ["<rootDir>", "node_modules", "client", "src", "pages"],
    moduleFileExtensions: [
        "ts",
        "tsx",
        "js"
    ],
    transform: {
        "^.+\\.tsx?$": "ts-jest",
        "^.+\\.[t|j]sx?$": "babel-jest"
    },
    testMatch: [
        "**/*.(test|spec).(ts|tsx)"
    ],
    globals: {
        "ts-jest": {
            babelConfig: "babel.config.js",
            tsConfig: "jest.tsconfig.json",
            diagnostics: false
        }
    },
    coveragePathIgnorePatterns: [
        "/node_modules/",
        "enzyme.js"
    ],
    setupFilesAfterEnv: ["<rootDir>/enzyme.js"],
    coverageReporters: [
        "json",
        "lcov",
        "text",
        "text-summary"
    ],
    reporters: [
        "default",
        ["./node_modules/jest-html-reporter", {
            "outputPath": "./coverage/test-report.html",
            "pageTitle": "Test Report",
            "includeFailureMsg": true,
            "includeConsoleLog": true,
            "sort": "status"
        }]
    ],
    /* alternative usage of reporters */
    // testResultsProcessor: "./node_modules/jest-html-reporter",
    moduleNameMapper: {
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/mocks.js",
        "\\.(css|less|scss)$": "identity-obj-proxy"
    }
};

//ModuleNameMapper => jpg와 같은 static assets 설정과 관련된 내용은 https://jestjs.io/docs/en/webpack 이 링크를 참조해주세요.
