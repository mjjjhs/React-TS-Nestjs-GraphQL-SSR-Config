import {configure, addDecorator, addParameters} from "@storybook/react";
import {withKnobs} from "@storybook/addon-knobs";
import {withInfo} from "@storybook/addon-info";
import {setConfig} from 'next/config';

// Set the NextJS publicRuntimeConfig property
setConfig({
    publicRuntimeConfig: {
        IMAGE_URL: 'https://lqt-images-dev.yanolja.com/ps-admin'
    },
});

addDecorator(withInfo);
addDecorator(withKnobs);

addParameters({
    docs: {
        inlineStories: false,
    },
});
configure(require.context('../stories', true, /\.stories\.(mdx|tsx)$/), module);
