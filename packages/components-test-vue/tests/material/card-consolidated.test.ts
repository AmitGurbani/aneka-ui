/**
 * Consolidated Test using Test Runner
 * This replaces the manual card.test.ts with a declarative approach
 */

import cardSpec from "@aneka-ui/test-specs/material/card.spec.json";
import type { TestSpec } from "@aneka-ui/test-specs/types";

import Card from "../../src/material/Card.vue";
import { generateVueTests } from "../../test-runner/runner";

// Generate all tests from the specification
generateVueTests(cardSpec as TestSpec, Card);
