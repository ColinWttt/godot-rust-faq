---
title: The trait bound `...ToGodot` is not satisfied
description: The trait bound `YourClass:godot::prelude::ToGodot` is not satisfied.
---

## Error

The trait bound `YourClass:godot::prelude::ToGodot` is not satisfied.

## Reason

you need to define how to pass it around in godot(e.g. `function with #[func]`).  
Otherwise godot have no idea how to reference your Class in functions that talk about it.

## Solutions

Choose one of the following solutions:

1. (Recommend) Change `YourClass` to `Gd<YourClass>`.
2. Implementing `GodotConvert`, `ToGodot`, and `FromGodot` to use some other type as an intermediate.