# nest-next-config

## `with-graphql-config`

Based on Node.js `v12.16.1`

Project Directory & File Structure

```text
.storybook
		config.js
		main.js
		manager.js
__tests__
		index.spec.tsx -> test 파일
		JestProvider.tsx -> redux store provider wrapper
client
		apolloClient
				mutations
				queries
				client.ts
				withApollo.tsx -> ApolloProvider wrapper (for use apollo ssr)
		components
				...
		enums
				...
		interfaces
				...
		reducers
				index.ts -> reducer entry point (combineReducers)
				...
		store
				index.ts -> add middlewares, devtools & make redux store & export makeStore function
		styles
				...
		utils
				commonEnv.ts -> define environment state (DEV, NODE, BROWSER)
				errorHandler.ts -> custom error handler for client side
pages
		404.tsx
		_app.tsx
		_document.tsx
		_error.tsx
		index.tsx
src
		@types
				react.d.ts -> react type definition (for re-define NextFunctionComponent interface)
    api
    		ApiFetch.ts -> defined rest api http methods class (get, post, put, patch, delete)
    		setHeaders.ts -> set http header options
    		uri.ts -> uri list defined by envs
    filters
    		all-exceptions.filter.ts -> custom error handler for global exception 
    		graphql-exception.filter.ts -> custom error handler for graphql exception
    graphql
    		common
    				scalars
    						result.scalar.ts -> 리턴이 필요없는 API Result에 대한 Scalar
    				common.module.ts -> 그래프큐엘 공통 모듈 정의 (ResultScalar Provider)		
    		graphql.module.ts -> 그래프큐엘 모듈 entry point (combine domain graphql modules)
        root.graphql -> 기본 scalar, query, mutation 타입 지정
    interfaces
    		...
    logger -> kibana logger
    		...
    middlewares
    		logger.middleware.ts -> http요청에 대한 console logger middleware
    		...
    app.controller.ts -> nest application initial router
    app.module.ts -> nest application module entry point 
    generate-typings.ts
    graphql.schema.ts
    main.ts -> nest server entry point
    routes.ts -> define nest route
stories
		Button.stories.mdx -> 스토리 파일
		StorybookProvider.tsx -> redux store provider wrapper
utils
		errorHandler.ts -> custom error handler for server side
		greeting.ts -> custom console.log()
.gitignore
babel.config.js
ecosystem.config.js
enzyme.js
jest.config.js
jest.tsconfig.json
next.config.js
next-env.d.ts
nodemon.json
package.json
polyfills.js
		core-js/stable -> babel-polyfill 대체
		regenerator-runtime/runtime -> babel-polyfill 대체
		whatwg-fetch -> promise 기반 fetch() 폴리필
storybookEcosystem.config.js
storybookServer.js
tsconfig.json
tsconfig.server.json
```



