const express = require('express');
const greetMiddleware = require('./greet');

const app = express();

// path değeri yani url değeri '/api/v1/' olduğunda greetMiddleware çağrılır.
// O tarafta ise buna ek olarak path değerinde '/greet' beklentisi vardır.
// Yani aşşağıdaki kod ancak ve ancak http://localhost:8080/api/v1/greet değeri ile çalışır
// => .use('/api/v1/', greetMiddleware({ greeting : 'Hello Node.js' }))

class GreetingService {
    constructor(greeting = 'Hello') {
        this.greeting = greeting;
    }
    createGreeting(name){
        return `${this.greeting}, ${name}!`;
    }
}




app
  .use('/api/v1/', greetMiddleware({ greeting : 'Hello Node.js' }))
  .use('/api/v1/service1', greetMiddleware({ service: new GreetingService('Hello from service-1') }))
  .use('/api/v1/service2', greetMiddleware({ service: new GreetingService('Hello from service-2') }))
  .listen(8080);