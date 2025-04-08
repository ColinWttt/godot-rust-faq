---
title: Interacting with Classes
description: A guide in my new Starlight docs site.
---

## How should I Interact with Godot class (engine or custom) in Rust?

Use `Gd<T>`, where `T` is the Godot class (e.g., `Gd<Node>`, `Gd<Sprite2D>`) or your custom Rust class (e.g., `Gd<MyClass>`).

## How do I call methods or access properties on a Godot object referenced by `Gd<T>`?

Use [`Gd::bind()`](https://godot-rust.github.io/docs/gdext/master/godot/prelude/struct.Gd.html#method.bind) for immutable access or [`Gd::bind_mut()`](https://godot-rust.github.io/docs/gdext/master/godot/prelude/struct.Gd.html#method.bind_mut) for mutable access.

- Immutable access: `let ret = gd.bind().get_method();`
- Mutable access: `gd.bind_mut().set_method(...);`

## How do I call engine methods from the base class of my custom Rust struct?

Use the [base()](https://godot-rust.github.io/docs/gdext/master/godot/obj/trait.WithBaseField.html#method.base) for immutable access or [base_mut()](https://godot-rust.github.io/docs/gdext/master/godot/obj/trait.WithBaseField.html#method.base_mut) for mutable access. This requires the base: `Base<T>` field in your struct.

- Immutable: `let name = self.base().get_name()`
- Mutable: `self.base_mut().set_position(Vector2::ZERO)`

## How do I get reference (&T) from a `Gd<T>`?

- Immutable: `&*gd.bind()`
- Mutable: `&mut *gd.bind_mut()`

## How do I get a `Gd<T>` reference to the current instance from within one of its methods?

Inside a method (taking `&self` or `&mut self`), call `self.to_gd()`.

```rust
#[godot_api]
impl MyClass {
    fn get_self_reference(&self) -> Gd<MyClass> {
        self.to_gd()
    }
}
```
