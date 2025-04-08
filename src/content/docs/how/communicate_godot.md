---
title: Communication with Godot
description: A guide in my new Starlight docs site.
---

## How do I export a `Gd<T>` field to the Godot editor?

Use the `#[export]` attribute on a field of type `OnEditor<Gd<T>>`(recommend) or `Option<Gd<T>>`.

```rust
#[derive(GodotClass)]
#[class(init, base = Node)]
struct Exporter {
    #[export]
    my_node: OnEditor<Gd<Node>>,
}

```

## How do I call a GDScript method from Rust?

Use the [`Object::call()`](https://godot-rust.github.io/docs/gdext/master/godot/classes/struct.Object.html#method.call)method on the `Gd<T>` instance representing the object whose method you want to call.

```rust
self.base_mut().call("method", &[]);
node.call("free", &[]);
```

## How do I make a Rust method callable from GDScript?

Declare the method within an impl block annotated with `#[godot_api]`. Mark the specific function you want to expose with the `#[func]` attribute.

```rust
#[godot_api]
impl MyCallableClass {
    #[func] // makes a function available to the Godot engine.
    fn print_value() {
        godot_print!("Hello");
    }
}
```
