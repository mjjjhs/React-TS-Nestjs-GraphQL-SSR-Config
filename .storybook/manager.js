import {addons} from '@storybook/addons';
import {create} from '@storybook/theming/create';
import {STORY_RENDERED} from '@storybook/core-events'

addons.setConfig({
    theme: create({
        base: 'light',
        brandTitle: 'nest-next template',
    })
});

addons.register('TitleAddon', api => {
    api.on(STORY_RENDERED, () => {
        document.title = `nest-next template`
    })
});
