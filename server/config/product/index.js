/**
 * 环境配置 生产环境
 */
module.exports.port = process.env.PORT = 8888;
module.exports.NODE_ENV = process.env.NODE_ENV = 'production';
module.exports.SERVER_URL = process.env.SERVER_URL = 'http://172.25.50.53:8128/';
module.exports.SERVER_URL_CF = process.env.SERVER_URL_CF = 'http://172.24.5.4:8128/';