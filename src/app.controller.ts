import {Controller, Get, HttpCode, Render} from '@nestjs/common';

@Controller()
export class AppController {
    @Get('health')
    @HttpCode(200)
    health() { return 'OK'; }

    @Get()
    @Render('index')
    index() {}
}
