function getEnvWithSentry(env) { return Object.assign(env, {SENTRY_DSN: "https://e9006ac4d23d4d9cade3b22557c69ccc@o113486.ingest.sentry.io/5237288"})}

module.exports = {
    apps: [
        {
            // pm2로 실행한 프로세스 목록에서 이 애플리케이션의 이름으로 지정될 문자열
            name: "nest-next-config-template",
            // pm2로 실행될 파일 경로
            script: ".next/production-server/src/main.js",
            // 프로세스를 CPU 코어 갯수만큼 띄움
            instances: "max",
            // 개발환경시 적용될 설정 지정
            exec_mode: 'cluster_mode',
            env: getEnvWithSentry({
                "PORT": 3000,
                "NODE_ENV": "dev",
                "NODE_ENV_TYPE" : "dev",
            }),
            env_development : getEnvWithSentry({
                "PORT": 8080,
                "NODE_ENV": "production",
                "API_ENV": "dev",
            }),
            env_qa : getEnvWithSentry({
                "PORT": 8080,
                "NODE_ENV": "production",
                "API_ENV": "qa",
            }),
            env_sandbox : getEnvWithSentry({
                "PORT": 8080,
                "NODE_ENV": "production",
                "API_ENV": "sandbox",
            }),
            env_staging : getEnvWithSentry({
                "PORT": 8080,
                "NODE_ENV": "production",
                "API_ENV": "staging",
            }),
            env_production: getEnvWithSentry({
                "PORT": 8080,
                "NODE_ENV": "production",
                "API_ENV": "production",
            })
        }
    ]
};
