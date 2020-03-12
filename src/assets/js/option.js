const isPro = Object.is(process.env.NODE_ENV, 'production')

console.log(isPro);

export default {
  baseUrl: isPro ? 'http://localhost:10001/' : '/api/'
};
