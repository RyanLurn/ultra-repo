#!/usr/bin/env node

console.log("Hello from my monorepo CLI 👋");

// You can parse args:
const args = process.argv.slice(2);

if (args.includes("--help")) {
  console.log("Usage: mycli [options]");
}
