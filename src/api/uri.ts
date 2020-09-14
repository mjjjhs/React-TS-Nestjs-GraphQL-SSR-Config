interface IUri {
    authority: string;
}

enum processEnvs {
    DEVELOP="develop",
    QA="qa",
    SAND_BOX="sandbox",
    STAGING="staging",
    PRODUCTION="production"
}

const devUrl:string = "https://lqt-b2b-ps.dev.yanolja.in/api";
const productionUrl:string = "https://ps.leisureq.com/api";

const uri:IUri = {
    authority: devUrl,
};

switch (process.env.API_ENV) {
    case processEnvs.DEVELOP:
    case processEnvs.QA:
    case processEnvs.SAND_BOX:
        uri.authority = devUrl;
        break;
    case processEnvs.STAGING :
    case processEnvs.PRODUCTION :
        uri.authority = productionUrl;
        break;
    default :
        uri.authority = devUrl;
}

export default  uri;
