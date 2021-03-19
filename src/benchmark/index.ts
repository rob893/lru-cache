import { Suite } from 'benchmark';
import { LRUCache } from '../LRUCache';

const suite = new Suite();

const lru1 = new LRUCache({
  maxSize: 1000
});
let lru1Counter = 0;

suite.add('set', () => {
  lru1.set(`key${lru1Counter++}`, 'value');
});

const lru2 = new LRUCache({
  maxSize: 1000
});
let lru2Counter = 0;

for (let i = 0; i < 1000; i++) lru2.set(`key${i}`, 'value');

suite.add('get', () => {
  lru2.get(`key${lru2Counter++ % 1000}`);
});

suite.add('peek', () => {
  lru2.peek(`key${lru2Counter++ % 1000}`);
});

const lru3 = new LRUCache({
  maxSize: 1000
});
let lru3Counter = 0;

suite.add('set with `maxAge`', function () {
  lru3.set(`key${lru3Counter++}`, 'value', { entryExpirationTimeInMS: 100000 });
});

const lru4 = new LRUCache({
  maxSize: 1000,
  clone: true
});
let lru4Counter = 0;

suite.add('setClone', () => {
  lru4.set(`key${lru4Counter++}`, { foo: 'bar' });
});

const lru5 = new LRUCache({
  maxSize: 1000,
  clone: true
});
let lru5Counter = 0;

for (let i = 0; i < 1000; i++) lru5.set(`key${i}`, { foo: 'bar' });

suite.add('getClone', () => {
  lru5.get(`key${lru5Counter++ % 1000}`);
});

suite
  .on('cycle', (event: any) => {
    console.log(String(event.target));
    if (event.target.error) {
      console.error(event.target.error);
    }
  })
  .run();
