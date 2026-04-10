#!/usr/bin/env node

import z from "zod";

console.log("Hello from Ultra CLI 👋");

// You can parse args:
const args = process.argv.slice(2);
const validArgs = z.array(z.string()).parse(args);

if (validArgs.includes("--help")) {
  console.log("Usage: mycli [options]");
}
