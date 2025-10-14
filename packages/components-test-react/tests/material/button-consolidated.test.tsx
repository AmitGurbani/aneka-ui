/**
 * Consolidated Test using Test Runner
 * This replaces the manual button.test.tsx with a declarative approach
 */

import buttonSpec from "@aneka-ui/test-specs/material/button.spec.json";

import { Button } from "../../src/material/button";
import { generateReactTests } from "../../test-runner/runner";

// Generate all tests from the specification
generateReactTests(buttonSpec, Button);
