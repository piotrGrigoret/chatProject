const ENV = 'prod';
const urls = {
    prod: 'https://chatappserver-bwn9.onrender.com',
    dev: 'http://localhost:3001',
};        
const url = urls[ENV];
export default url;
