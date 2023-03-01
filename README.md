[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/j3lte/react-mustache-template-component/issues)
[![dependencies Status](https://david-dm.org/j3lte/react-mustache-template-component/status.svg)](https://david-dm.org/j3lte/react-mustache-template-component)
[![devDependencies Status](https://david-dm.org/j3lte/react-mustache-template-component/dev-status.svg)](https://david-dm.org/j3lte/react-mustache-template-component?type=dev)

# react-mustache-template-component - React Mustache Template Component

[![https://nodei.co/npm/react-mustache-template-component.png?downloads=true&downloadRank=true&stars=true](https://nodei.co/npm/react-mustache-template-component.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/react-mustache-template-component)

The Template component that uses [Mustache.js](https://www.npmjs.com/package/mustache) to render the a component, sanitized by [dompurify](https://www.npmjs.com/package/dompurify).

## Demo

TBD

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
|**type**|No|string|`"div"`|Type of container. Can be any HTMLElement, like `div`, `span`, `i` etc |
|**sanitize**|No|boolean|true|Sanitize the result using `dompurify`|
|**sanitizeOptions**|No|object|{}|Sanitation can be changed by [Dompurify.Config](https://www.npmjs.com/package/dompurify#can-i-configure-dompurify) options|

Besides these props, it can also use all basic HTML attributes, like `className`, `style`, `id`, etc.

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
