import Request from './Request';
import config from '../config/config';

const path = `${config.api_url}activities`;
const req = {};

req.retrieve = () => Request.get(path).then((data) => data);
req.list = () => Request.get(path).then((data) => data);
req.getPlainText = () => Request.getPlain(path).then((data) => data);

exports.req = req;
