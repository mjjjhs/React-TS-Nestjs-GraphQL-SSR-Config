module.exports = {
    apps: [
        {
            // pm2로 실행한 프로세스 목록에서 이 애플리케이션의 이름으로 지정될 문자열
            name: "nest-next-template",
            // pm2로 실행될 파일 경로
            script: "./storybookServer.js",
            // 프로세스를 CPU 코어 갯수만큼 띄움
            instances: "max",
            // 개발환경시 적용될 설정 지정
            exec_mode: 'cluster_mode',
            env: {
                "PORT": 6006,
                "NODE_ENV": "dev",
                "NODE_ENV_TYPE" : "dev",
            },
            env_development : {
                "PORT": 8081,
                "NODE_ENV": "production",
                "API_ENV": "dev",
            },
            env_qa : {
                "PORT": 8081,
                "NODE_ENV": "production",
                "API_ENV": "qa",
            }
        }
    ]
};