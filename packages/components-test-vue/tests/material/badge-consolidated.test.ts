/**
 * Consolidated Test using Test Runner
 * This replaces the manual badge.test.ts with a declarative approach
 */

import badgeSpec from "@aneka-ui/test-specs/material/badge.spec.json";
import type { TestSpec } from "@aneka-ui/test-specs/types";

import Badge from "../../src/material/Badge.vue";
import { generateVueTests } from "../../test-runner/runner";

// Generate all tests from the specification
generateVueTests(badgeSpec as TestSpec, Badge);
