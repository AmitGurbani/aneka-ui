/**
 * Consolidated Test using Test Runner
 * This replaces the manual badge.test.tsx with a declarative approach
 */

import badgeSpec from "@aneka-ui/test-specs/material/badge.spec.json";
import type { TestSpec } from "@aneka-ui/test-specs/types";

import { Badge } from "../../src/material/badge";
import { generateReactTests } from "../../test-runner/runner";

// Generate all tests from the specification
generateReactTests(badgeSpec as TestSpec, Badge);
