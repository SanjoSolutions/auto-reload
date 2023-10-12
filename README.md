# Auto reload

This work is devoted to God.

Reloads the page when a file in the current working directory has changed.

## How to use

### Installation

```sh
npm install --save-dev @sanjo/auto-reload
```

### Running the file watch server

The file watch server will watch all files in the current working directory.

```sh
npx auto-reload
```

You can optionally pass a port as first argument.
By default the server will listen on port 8080.

### Including the reload script on the page(s)

Put this script before the closing body tag.

```html
<script src="node_modules/@sanjo/auto-reload/reload.js"></script>
```

For other ports than 8080, you need to specify the port via:

```html
<script>
  window.AUTO_RELOAD_PORT = 8081
</script>
```

before the reload.js script inclusion. E.g.

```html
<script>
  window.AUTO_RELOAD_PORT = 8081
</script>
<script src="node_modules/@sanjo/auto-reload/reload.js"></script>
```
