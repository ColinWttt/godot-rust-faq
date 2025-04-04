
# Godot-Rust (gdext) FAQ

## Custom Classes

**Q: How do I create a custom Rust class usable in Godot?**
**A:** Your struct needs to derive `GodotClass` and specify its base Godot class (e.g., `Node`) using the `#[class]` attribute.

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

Q: How do I inherit from another custom Rust class?

A: Currently, inheriting from another custom Rust class defined via `#[derive(GodotClass)]` is not  supported.

## Working with Classes

Q: How should I store references to Godot class (engine or custom) within my Rust struct?

A: Use `Gd<T>`, where `T` is the Godot class (e.g., `Gd<Node>`, `Gd<Sprite2D>`) or your custom Rust class (e.g., `Gd<MyClass>`).

Q: How do I call methods or access properties on a Godot object referenced by `Gd<T>`?

A: Use [`Gd::bind()`](https://godot-rust.github.io/docs/gdext/master/godot/prelude/struct.Gd.html#method.bind) for immutable access or [`Gd::bind_mut()`](https://godot-rust.github.io/docs/gdext/master/godot/prelude/struct.Gd.html#method.bind_mut) for mutable access.

- Immutable access: `let node_name = my_node.bind().get_name();`
- Mutable access: `my_node.bind_mut().set_name("NewName");`

Q: How do I call engine methods from the base class of my custom Rust struct?

A: Use the [base()](https://godot-rust.github.io/docs/gdext/master/godot/obj/trait.WithBaseField.html#method.base) for immutable access or [base_mut()](https://godot-rust.github.io/docs/gdext/master/godot/obj/trait.WithBaseField.html#method.base_mut) for mutable access. This requires the base: `Base<T>` field in your struct.

- Immutable: `self.base().get_name()`
- Mutable: `self.base_mut().set_position(Vector2::ZERO)`

Q: How do I get an immutable reference (&T) from a `Gd<T>`?

A: `&*my_gd`

Q: How do I get a `Gd<T>` reference to the current instance from within one of its methods?

A: Inside a method (taking `&self` or `&mut self`), call `self.to_gd()`.

```Rust
#[godot_api]
impl MyClass {
    fn get_self_reference(&self) -> Gd<MyClass> {
        self.to_gd()
    }
}
```

## Communication with Godot

Q: How do I export a `Gd<T>` field to the Godot editor?

A: Use the `#[export]` attribute on a field of type `OnEditor<Gd<T>>`(recommend) or `Option<Gd<T>>`.

```Rust
#[derive(GodotClass)]
#[class(init, base = Node)]
struct Exporter {
    #[export]
    my_node: OnEditor<Gd<Node>>,
}

```

Q: How do I call a GDScript method from Rust?

A: Use the [`Object::call()`](https://godot-rust.github.io/docs/gdext/master/godot/classes/struct.Object.html#method.call)method on the `Gd<T>` instance representing the object whose method you want to call.

```rust
self.base_mut().call("method", &[]);
node.call("free", &[]);
```

Q: How do I make a Rust method callable from GDScript?

A: Declare the method within an impl block annotated with `#[godot_api]`. Mark the specific function you want to expose with the `#[func]` attribute.

Rust

```rust
#[derive(GodotClass)]
#[class(init, base = Node)]
struct MyCallableClass {
    base: Base<Node>,
    value: i32,
}

#[godot_api]
impl MyCallableClass {
    #[func] // This makes the function callable from Godot
    fn print_value(&self) {
        godot_print!("My value is: {}", self.value);
    }
}
```

## Common Errors

### Error: `Gd<T>::bind_mut()` failed, already bound; T =

**Cause:** This error typically occurs when you attempt to get a mutable borrow (`bind_mut()`) of a Godot object that is already borrowed (either immutably or mutably). A common scenario is calling `self.to_gd().bind_mut()` inside a `&mut self` method.

**Solutions:**

1. **(Recommended)** Avoid `self.to_gd().bind_mut()`. Instead:
    - Use `self.base_mut().some_base_method()` to call methods on the base class mutably.
    - Access the Rust fields of your struct directly (e.g., `self.my_field = ...`).

2. **Change Function Signature:** If you are passing the object to another function, consider passing a mutable reference to your _struct type_ (`&mut MyClass`) instead of `Gd<MyClass>`, if feasible. This allows direct field access in the receiving function without needing `bind_mut`.

3. **Use `base_mut()` Guard Carefully:** While explicitly calling `let _guard = self.base_mut();`

```Rust
fn custom_method(&mut self) { 
 let gd = self.to_gd(); 
 // guard
 let _guard = self.base_mut(); 
 // now it's safe to call bind
 gd.bind()
}
```
