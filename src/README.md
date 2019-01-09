# Middleware

There is a side effect, when we take multiple actions and one is executed,
there are residual references to the executed 'resolve' function for all the
remaining actions.

## Wait for action

```.js
await take('USER_INTERACTION');
```

## Or

```.js
await Promise.race([take("ACTION_A"), take("ACTION_B")]);
```

## And

```.js
await Promise.all([take("ACTION_A"), take("ACTION_B")]);
```
