# Cowpea

```javascript
import cp from 'cowpea'

// copy `./from/foo.js` to directory `./dest` as `./dest/foo.js`
cp.from('./from').to('./dest').copy('foo.js')

// or copy the content and change the file name
cp.from('./from').to('./dest').copy('foo.js', { dest: 'bar.js' })

// you can also process the file content
cp.from('./from')
  .to('./dest')
  .copy('foo.js', {
    dest: 'bar.js',
    processor: (content) => 'new content\n' + content,
  })

// copy the whole directory to a new place
cp.from('./from')
  .to('./dest')
  .copyDirectory({
    /**
     * to filter files in the directory
     * return new file name
     * or return null to skip this file
     */
    filter: (fileName) => {
      if (/** some logic here */ fileName) return `newFileName`
      return null
    },
    /** return processed content to be wirtten in the new file */
    processor: (content) => 'new content\n' + content,
  })
```
