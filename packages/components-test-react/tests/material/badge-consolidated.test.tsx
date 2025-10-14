/**
 * Consolidated Test using Test Runner
 * This replaces the manual badge.test.tsx with a declarative approach
 */

import badgeSpec from "@aneka-ui/test-specs/material/badge.spec.json";

import { Badge } from "../../src/material/badge";
import { generateReactTests } from "../../test-runner/runner";

// Generate all tests from the specification
generateReactTests(badgeSpec, Badge);
