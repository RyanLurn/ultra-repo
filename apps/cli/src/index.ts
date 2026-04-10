#!/usr/bin/env node

import { Command } from "commander";

const program = new Command();

program
  .command("init")
  .description("initialize a monorepo with pnpm")
  .action(() => {
    // Placeholder operations
    console.log("Generating files...");
    console.log("Done!");
  });

program
  .command("grab")
  .description("grab all files committed to Git")
  .action(() => {
    // Placeholder operations
    console.log("Grabbing files...");
    console.log("Done!");
  });

program
  .command("create")
  .description("create a package inside the monorepo")
  .action(() => {
    // Placeholder operations
    console.log("Creating the package...");
    console.log("Done!");
  });
