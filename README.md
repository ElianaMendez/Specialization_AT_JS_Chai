# Specialization_AT_JS_Chai

Focused demonstration of the [Chai](https://www.chaijs.com/) assertion library integrated into a WebdriverIO test automation framework. This repository explores all three Chai assertion interfaces — Assert, Should, and Expect — and documents the practical differences between them.

---

## What it demonstrates

- Chai setup and integration within a WDIO framework
- Practical usage of all three Chai interfaces in real test scenarios
- Understanding of when each interface is most appropriate

---

## Tech stack

`WebdriverIO` · `Chai` · `JavaScript` · `Node.js`

---

## Chai Interfaces

This repository contains examples for all three interfaces, applied to the same test scenarios so the differences are directly comparable.

### Assert

The classic TDD-style interface. Functions are called directly from `assert`, with no object chaining. Best suited when you want explicit, readable failure messages and prefer a procedural style.

```javascript
const { assert } = require('chai');

assert.equal(pageTitle, 'My Account', 'Page title should match after login');
assert.isTrue(cartBadge.isDisplayed(), 'Cart badge should be visible');
assert.include(errorMessage, 'Invalid email or password');
```

### Expect

Chainable BDD-style interface. Starts with `expect(value)` and chains human-readable assertions. Best suited for expressive, readable test output and BDD-aligned projects.

```javascript
const { expect } = require('chai');

expect(pageTitle).to.equal('My Account');
expect(cartBadge).to.be.true;
expect(errorMessage).to.include('Invalid email or password');
expect(productPrice).to.be.a('number').and.to.be.above(0);
```

### Should

Chainable BDD-style interface that extends every object with a `should` property. Most expressive but requires care with `null` and `undefined` values, since those can't have properties.

```javascript
require('chai').should();

pageTitle.should.equal('My Account');
cartCount.should.be.above(0);
errorMessage.should.include('Invalid email or password');
```

### Key differences at a glance

| | `assert` | `expect` | `should` |
|-|----------|----------|----------|
| Style | TDD | BDD | BDD |
| Chaining | No | Yes | Yes |
| Safe with `null`/`undefined` | Yes | Yes | No |
| Requires setup | No | No | `should()` call needed |
| Typical use | Unit tests | UI/BDD tests | BDD tests on guaranteed objects |

---

## Run tests

```bash
npm install

# Run all assertion interface examples
npm test

# Run a specific interface
npm run test:assert
npm run test:expect
npm run test:should
```

---

## Prerequisites

- Node.js 18+
- npm 9+
