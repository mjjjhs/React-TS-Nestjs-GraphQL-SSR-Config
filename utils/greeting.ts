const showGreeting = (apiEnv) => {
    apiEnv === 'production' &&
    console.log(
        "%c                                     \
        \n%c         $$\\       $$$$$$\ $$$$$$$$$\\ \
        \n%c         $$ |     $$  __$$\\\\__$$  __|\
        \n%c         $$ |     $$ /  $$ |  $$ |   \
        \n%c         $$ |     $$ |  $$ |  $$ |   \
        \n%c         $$ |     $$ $$\\$$ |  $$ |   \
        \n%c         $$$$$$$$\\\$$$$$$$ /   $$ |   \
        \n%c         \\________|\\____$$$\\  \\__|   \
        \n%c                        \\___|        \
        \n%c                                             \n",
        'color:#FFFFFF; background: #F73375; font-weight: 700;',
        'color:#FFFFFF; background: #F73375; font-weight: 700;',
        'color:#FFFFFF; background: #F73375; font-weight: 700;',
        'color:#FFFFFF; background: #F73375; font-weight: 700;',
        'color:#FFFFFF; background: #F73375; font-weight: 700;',
        'color:#FFFFFF; background: #F73375; font-weight: 700;',
        'color:#FFFFFF; background: #F73375; font-weight: 700;',
        'color:#FFFFFF; background: #F73375; font-weight: 700;',
        'color:#FFFFFF; background: #F73375; font-weight: 700;',
        'color:#FFFFFF; background: #F73375; font-weight: 700;',
    );
};

export default showGreeting;