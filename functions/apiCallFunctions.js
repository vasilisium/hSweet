const Cors = require('cors');

const apiRootAddress = `http://192.168.1.138:3000/api/`;

const defaultGetter = param => param;

export const endpoint = ({
  funcToCall,
  requestQueryGetter = defaultGetter, 
  responseResultGetter = defaultGetter,
  isCallWithCors = false
}) =>{
  return async (req, res) => {
    if(isCallWithCors) await withCors(req, res);

    return new Promise( resolve => {
      const {
        query: { id },
      } = req;

      const p = funcToCall(requestQueryGetter ? requestQueryGetter(req.query) : undefined);
      p.then(funcResult=> {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify( responseResultGetter ? responseResultGetter(funcResult) : funcResult , null,2))
        resolve();
      })
      .catch(err=> {
        res.status(405).json(JSON.stringify(err, null, 2));
        resolve()
      })
    })
  }
}

export const sendJSON = (res, data, statusCode=200) => {
  return res
    .status(statusCode)
    .json(JSON.stringify(data, null, 4))
    .end();
};

export const fetchApi = (urlPart, cbSucces, cbError) => {
  fetch(apiRootAddress+urlPart)
    .then(res=>res.json())
    .then(j=>cbSucces(j))
    .catch(e=>cbError(e))
}

export const  postData = (urlPart, dataObj, cbSucces, cbError) => {
  const res_promise = fetch(apiRootAddress+urlPart, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dataObj)
  });
  res_promise.then(res=>{
    if(cbSucces) return res.json()
    else return res
  })
  .then(j=>{if(cbSucces) cbSucces(j);})
  .catch(e=>{if(cbError) cbError(e);})
  
  return res_promise;
}

const cors = Cors();

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

export const withCors = async (req, res) => {
  await runMiddleware(req, res, cors)
}