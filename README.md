![Latest build](https://github.com/JelteMX/react-mustache-template-component/workflows/Latest%20build/badge.svg)
![Master Build](https://github.com/JelteMX/react-mustache-template-component/workflows/Master%20Build/badge.svg)

# react-mustache-template-component - React Mustache Template Component

The Template component that uses [Mustache.js](https://www.npmjs.com/package/mustache) to render the a component, sanitized by [dompurify](https://www.npmjs.com/package/dompurify).

## Demo

See [Storybook](https://jeltemx.github.io/react-mustache-template-component) for examples.

## Installation and Usage

```
$ npm install react-mustache-template-component
```

The use it in your app:

```js
import TemplateComponent from 'react-mustache-template-component'

...
const template = `<img class="img" src="{{url}}" />`;
const data = { url: 'http://example.com/img' };

<TemplateComponent template={template} data={data} />
```

This will be rendered as

```html
<div><img class="img" src="http://example.com/img" /></div>
```

## Notes

- Input is properly sanitized by [dompurify](https://www.npmjs.com/package/dompurify). This can be switched off (`... sanitize={false} ...`) but is highly discouraged, as this might introduce XSS issues

## Props

Props that are used:

|Name|Required|Type|Default|Comments|
|---|---|---|---|---|
|**template**|Yes|string|-|Mustache [template string](https://github.com/janl/mustache.js) that is used in your template component|
|**data**|No|object|`{}`|Data used by Mustache to replace placeholders (marked by `{{}}`)|
|**type**|No|string|`"div"`|Type of container. Can be `"div"` or `"span"`|
|**sanitize**|No|boolean|true|Sanitize the result using `dompurify`|
|**sanitizeOptions**|No|object|{}|Sanitation can be changed by [Dompurify.Config](https://www.npmjs.com/package/dompurify#can-i-configure-dompurify) options|
|**className**|No|string|""|Class name of container|
|**style**|No|object|{}|Extra style options for the container|
|**onClick**|No|function|void|OnClick handler, executed when clicking on the container|
|**onDblClick**|No|function|void|OnDoubleClick handler, executed when double clicking on the container|

## Development

To install dependencies
```
$ npm install
```

To build
```
$ npm run build
```

To run tests
```
$ npm run test
```

To run Storybook
```
$ npm run storybook
```

## License

MIT Licensed. Copyright (c) Jelte Lagendijk 2020.
