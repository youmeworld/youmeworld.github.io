import ApolloClient, { createNetworkInterface } from 'apollo-client';

const networkInterface = createNetworkInterface({
  uri: 'https://api.graphcms.com/simple/v1/YoumeFormBackend'
})

networkInterface.use([{
    applyMiddleware(req, next) {
      if(!req.options.headers) {
        req.options.headers = {};
      }
      req.options.headers.authorization = `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1MDk2MzEwNzIsImNsaWVudElkIjoiY2l2Z29zNmNqMDE5MjAxODRucDAxZGRkMiIsInByb2plY3RJZCI6ImNqOWkyZWY2eTNiaGEwMTI4ZjQ1YTI1ZXciLCJwZXJtYW5lbnRBdXRoVG9rZW5JZCI6ImNqOWlqZDJhZDF4MTAwMTI0dXM0cXkyem4ifQ.gEGYypvnjjZoYkgUhnKDtaq0dw0sk4XMFFRQF9sTYq4`;
      next();
    }
  }])

const client = new ApolloClient({
  networkInterface
});

export default client;