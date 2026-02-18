# Docs for Digital Education & Safety Foundation Editor

This editor provides a set of blocks to learn programming through turtle and hare simulations.

## Turtle Blocks

The turtle can move forward and turn.

```blocks
loops.forever(() => {
    turtle.turn(Direction.Left, 10);
    turtle.forward(1);
});
```

## Hare Blocks

The hare can hop and react to land.

```blocks
hare.onLand((height, more, most) => {
    hare.hop(Hop.Short, 2)
})
```
