import { EMPTY_STRING } from './constants';

export default function() {
    let buildVersion = EMPTY_STRING;

    if (process.env.NODE_ENV === 'development') {
        buildVersion = 'DEVELOPMENT';
    } else if (process.env.NODE_ENV === 'production') {
        buildVersion = process.env.DEMO ? 'DEMO' : 'PRODUCTION';
    }

    console.log(`%cBuilify ${process.env.VERSION} - ${buildVersion} build.`, 'background: #222; color: #bada55');
}
