/**
 * Consolidated Test using Test Runner
 * This replaces the manual badge.test.ts with a declarative approach
 */

import badgeSpec from "@aneka-ui/test-specs/material/badge.spec.json";

import Badge from "../../src-vue/material/Badge.vue";
import { generateVueTests } from "../../test-runner/runner";

// Generate all tests from the specification
generateVueTests(badgeSpec, Badge);
