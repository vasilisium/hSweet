import { endpoint } from 'functions/apiCallFunctions';

export default endpoint({
  funcToCall: ()=>new Promise(resolve=>(resolve({message:'under construction'}))),
  isCallWithCors: true
});

