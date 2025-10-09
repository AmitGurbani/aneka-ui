import { Command } from "commander";

import { add } from "./commands/add.js";
import { diff } from "./commands/diff.js";
import { doctor } from "./commands/doctor.js";
import { init } from "./commands/init.js";
import { list } from "./commands/list.js";
import { update } from "./commands/update.js";

/**
 * Package version (will be replaced during build)
 */
const version = "0.1.0";

/**
 * Main CLI program
 */
const program = new Command();

program
  .name("aneka-ui")
  .description(
    "Framework-agnostic component library providing authentic Material Design, Apple HIG, and Samsung One UI patterns"
  )
  .version(version, "-v, --version", "Display version number");

// Register commands
program.addCommand(init);
program.addCommand(add);
program.addCommand(list);
program.addCommand(diff);
program.addCommand(update);
program.addCommand(doctor);

// Parse arguments
program.parse();
