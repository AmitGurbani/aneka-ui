/**
 * Consolidated Test using Test Runner
 * This replaces the manual button.test.ts with a declarative approach
 */

import { generateVueTests } from "@aneka-ui/test-runner-vue";
import buttonSpec from "@aneka-ui/test-specs/material/button.spec.json";

import Button from "../../src-vue/material/Button.vue";

// Generate all tests from the specification
generateVueTests(buttonSpec, Button);
