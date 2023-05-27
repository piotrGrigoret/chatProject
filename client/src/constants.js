const ENV = 'dev';
const urls = {
    prod: 'https://newsserver-vrh0.onrender.com',
    dev: 'http://localhost:3001',
};        
const url = urls[ENV];
export default url;
