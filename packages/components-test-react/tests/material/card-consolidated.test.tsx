/**
 * Consolidated Test using Test Runner
 * This replaces the manual card.test.tsx with a declarative approach
 */

import cardSpec from "@aneka-ui/test-specs/material/card.spec.json";

import { Card } from "../../src/material/card";
import { generateReactTests } from "../../test-runner";

// Generate all tests from the specification
generateReactTests(cardSpec, Card);
