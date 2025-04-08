---
title: Custom Classes
description: A guide in my new Starlight docs site.
---

## How do I create a custom Rust class usable in Godot?

Your struct needs to derive `GodotClass` and specify its base Godot class (e.g., `Node`) using the `#[class]` attribute.

```rust
use godot::prelude::*;
use godot::classes::Node;

#[derive(GodotClass)]
#[class(init, base = Node)]
struct MyClass {
    //This lets you access the `Node` API through 
    // provided methods `self.base()` and `self.base_mut()`.
    base: Base<Node>,
    // Add other fields here
}

#[godot_api]
impl MyClass {
    // Optional: Add methods exposed to Godot here
}
```

## How do I inherit from another custom Rust class?

Currently, not supported.