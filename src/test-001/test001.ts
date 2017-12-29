import 'rxjs/add/operator/map';
import 'rxjs/operators/map';
import {setInterval} from 'timers';
import {Observable} from 'rxjs/Observable';

const source = Observable
  .create(observer => {
    const interval = setInterval(() => observer.next({value: Math.floor(Math.random() * 100) ,time: Date.now()}), 1000);
    setTimeout(() => {
      clearInterval(interval);
      observer.complete();
    }, 3000);
  })
  .map(chunk => Object.assign({}, chunk, {value: chunk.value + 10000}));

const subscription = source.subscribe(
  function (x) { console.log('Next: ', x); },
  function (err) { console.log('Error: ', err); },
  function () { console.log('Completed'); });
