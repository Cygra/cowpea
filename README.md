# Cowpea

```javascript
import cp from 'cowpea'

// copy `./from/foo.js` to directory `./dest` as `./dest/bar.js`
cp.from('./from').to('./dest').copy('foo.js', { dest: 'bar.js' })

// dest file has the same name with src by default
// copy `./from/foo.js` to directory `./dest` as `./dest/foo.js`
cp.from('./from').to('./dest').copy('foo.js')
```
