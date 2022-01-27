# Node CLI Temperature Converter - By Owen Evans

## Installation

Clone the repo and install the package globally like so:
```shell
$ npm install -g .
```

Run the tool like so:
```shell
$ tempconvert 40        # 104 (°F)
$ tempconvert --help    # available options
```

To uninstall:
```shell
$ npm uninstall -g .
```

## Local Development

Clone the repo and run `yarn install` or `npm install`

While developing these commands are available:

```shell
$ yarn run local <temperature arguments>  # Builds and runs the script 
$ yarn run local 40                       # 104 (°F)

$ yarn test                               # Builds the script and runs the tests

$ yarn build                              # Builds the script
```
