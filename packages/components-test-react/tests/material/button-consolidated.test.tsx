/**
 * Consolidated Test using Test Runner
 * This replaces the manual button.test.tsx with a declarative approach
 */

import { generateReactTests } from "@aneka-ui/test-runner-react";
import buttonSpec from "@aneka-ui/test-specs/material/button.spec.json";

import { Button } from "../../src/material/button";

// Generate all tests from the specification
generateReactTests(buttonSpec, Button);
