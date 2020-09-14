const Adapter = require('enzyme-adapter-react-16');

require('enzyme').configure({adapter: new Adapter()});

import { setConfig } from 'next/config'

// Make sure you can use "publicRuntimeConfig" within tests.
setConfig({
    publicRuntimeConfig: {
        IMAGE_URL: 'url'
    }
});