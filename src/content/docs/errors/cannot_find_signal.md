---
title: Cannot find attribute `signal` in this scope
description: Cannot find attribute `signal` in this scope
---

## Solutions:

1. Declare the `signal` in the class impl block.
2. Add `#[godot_api]` on the impl block that contains the signal.

```rust
#[godot_api]
impl MyClass {
    #[signal]
    fn custom_signal();
}
```