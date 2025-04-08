---
title: Common Errors
description: A reference page in my new Starlight docs site.
---

## `Gd<T>::bind_mut()` failed, already bound

**Cause:** This error typically occurs when you attempt to get a mutable borrow (`bind_mut()`) of a Godot object that is already borrowed (either immutably or mutably). A common scenario is calling `self.to_gd().bind_mut()`.

**Solutions:**

1. **(Recommended)** Avoid `self.to_gd().bind_mut()`. Instead, use `self.base_mut().some_base_method()` to call methods on the base class mutably.

2. **Change Function Signature:** If you are passing the object to another function, consider passing a mutable reference to your _struct type_ (`&mut MyClass`) instead of `Gd<MyClass>`, if feasible. This allows direct field access in the receiving function without needing `bind_mut`.

3. **Use `base_mut()` Guard Carefully:** While explicitly calling `let _guard = self.base_mut();`

```rust
fn custom_method(&mut self) { 
 let gd = self.to_gd(); 
 // guard
 let _guard = self.base_mut(); 
 // now it's safe to call bind
 gd.bind()
}
```
