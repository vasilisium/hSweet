import { endpoint } from 'functions/apiCallFunctions';
import { getRandomFloat } from 'functions/functions';

export default endpoint({
  funcToCall: () => new Promise( 
    resolve => resolve({
      message: 'Hello API! You can get random float number here.',
      "The random number is": getRandomFloat({min:-5, max:90, precision:2}),
    })
  ),
  isCallWithCors:true
})