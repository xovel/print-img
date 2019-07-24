# print-img

Just print an image.

## Install

```bash
npm install print-img
```

## Usage

### Modules

```js
import printImg from 'print-img'
...
printImg(src, options)
...
```

### Browser

```html
...
<script src="path/to/print-img.js"></script>
...

<script>
...
  printImg(src, options)
...
</script>
...
```


## Options

| name | type | note |
| ---- | ---- | ---- |
| id | string | id of iframe |
| imgStyle | string | style for image element |
| wrapStyle | string | style for wrap div element |
| style | string | style text for document |

## License

[MIT](LICENSE)
