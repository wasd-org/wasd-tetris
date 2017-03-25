## Description

🎮 A tetris only with core data layer.

## Table of contents

- [Description](#description)
- [Features](#features)
- [Installation](#installation)
- [Demo](#demo)
- [Usage](#usage)
- [API](#api)
  - [Tetris](#tetris)
  - [Block](#block)
  - [Shape](#shape)
  - [Matrix](#matrix)
- [Development](#development)
- [License](#license)

## Features
- No dependences.
- Only provide data operation.
- Custom UI.

## Installation

```bash
yarn add wasd-tetris
```

## Demo
- [Vue.js Tetris](https://wasd-org.github.io/wasd-tetris/vue/)
- TODO Terminal
- TODO React
- TODO Angular

## Usage
```javascript
import Tetris from 'wasd-tetris'

const tetris = new Tetris()

tetris.on('repaint', graph => {
  // draw graph
})

tetris.start()
```

## API

### Tetris

#### Options
| Name | Description | Type | Accepted Values | Default |
|------|-------------|------|-----------------|---------|
| matrix | Matrix for tetris | Matrix | - | matrix |
| auto | Whether auto progress game | Boolean | - | true |
| speed | The speed (milliseconds) of falling block | Number | - | 500 |

#### Attributes
| Attribute | Description | Type | Accepted Values | Default |
|-----------|-------------|------|-----------------|---------|
| graph(getter) | The graph of current game | - | — | — |

#### Events
| Event Name | Description | Parameters |
|------------|-------------|----------- |
| repaint | triggers when game need reapint | graph |
| hit | triggers when block hit existed block or bottom of the matrix | - |
| overflow:left | triggers when block hit left of the matrix | - |
| overflow:right | triggers when block hit right of the matrix | - |
| hit:rotate | triggers if block hit after rotate | - |
| clear:lines | triggers when lines need to be cleard | lines |
| failed | triggers when game over | - |

#### Methods
| Method | Description | Parameters |
|--------|-------------|------------|
| start | start the game | - |
| reset | reset the game | - |
| pause | pause the game | - |
| resume | resume the game | - |
| fail | fail the game | - |
| save | save current state of the game | - |
| restore | restore the last saved state | - |
| addBlock | add new block | block |
| drop | move the block down until hit | - |
| down | move the block down | - |
| left | move the block left | - |
| right | move the block right | - |
| rotate | rotate the block | - |

### Block

#### Options
| Name | Description | Type | Accepted Values | Default |
|------|-------------|------|-----------------|---------|
| x | X coordinate | Number | - | 0 |
| y | Y coordinate | Number  | - | 0 |
| shape | Shape of the block | shape | - | random shape |

#### Attributes
| Attribute | Description | Type | Accepted Values | Default |
|-----------|-------------|------|-----------------|---------|
| coordinate(getter) | The coordinate of current game | Object | — | { x, y, array } |

#### Methods
| Method | Description | Parameters |
|--------|-------------|------------|
| moveBy | move the block to a relative position | x, y |
| moveTo | move the block to a absolute position | x, y |
| rotate | rotate the block clockwise or anti-clockwise | clockwise |

### Shape

#### Options
| Name | Description | Type | Accepted Values | Default |
|------|-------------|------|-----------------|---------|
| shape | Initial shape of the Shape | Array | - | [] |

#### Attributes
| Attribute | Description | Type | Accepted Values | Default |
|-----------|-------------|------|-----------------|---------|
| shape(getter) | Current shape | Array | — | - |
| index(getter) | Current index | Number | — | 0 |
| index(setter) | Set current index | Number | — | - |
| margin(getter) | Margin of current shape | Object | - | { row, col, top, left, bottom, right } |


#### Methods
| Method | Description | Parameters |
|--------|-------------|------------|
| clone | clone Shape | - |
| rotate | rotate current shape clockwise or anti-clockwise | clockwise |

### Matrix

#### Options
| Name | Description | Type | Accepted Values | Default |
|------|-------------|------|-----------------|---------|
| row | row of the matrix | Number | - | 20 |
| col | column of the matrix | Number | - | 10 |
| x | X coordinate | Number | - | 0 |
| y | Y coordinate | Number  | - | 0 |


#### Attributes
| Attribute | Description | Type | Accepted Values | Default |
|-----------|-------------|------|-----------------|---------|
| coordinate(getter) | The coordinate of matrix | Object | — | { x, y, array } |

#### Methods
| Method | Description | Parameters |
|--------|-------------|------------|
| reset | reset matrix to initial state | - |


## Development
```bash
yarn
yarn dev
```

## License
MIT
