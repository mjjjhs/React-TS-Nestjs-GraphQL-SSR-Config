const DEV:boolean = process.env.NODE_ENV !== 'production';

const NODE:boolean =
    typeof 'process' !== 'undefined' &&
    !!process &&
    !!process.versions &&
    Boolean(process.versions.node);

const BROWSER:boolean = typeof window !== undefined;

const commonEnv = {
    DEV,
    NODE,
    BROWSER
};

export default commonEnv;
