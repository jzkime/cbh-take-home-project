# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here
The choices I made were centered around, how the If statements are connected to each other. For example there were two if statements checking whether there was an "event", and the only last one contained an "else" case. I compacted the blocks, and created new functions so that it would be simpler to read when going through the code, instead of multiple long lines of functions doing, essentially, the same thing. I kept the curly braces on the first If statement out of choice, as it makes it easier to discern that the nested If statement is within that singular conditional. The statement that checked whether the event is not true, I wanted to have it in it's own conditional, as under such a large block was confusing. 