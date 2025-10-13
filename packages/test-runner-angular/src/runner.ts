import { TestBed, type ComponentFixture } from "@angular/core/testing";

import { runActions } from "./actions";
import { runAssertions } from "./assertions";
import type { TestSpec, TestCase } from "./types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function generateAngularTests(spec: TestSpec, Component: any): void {
  describe(spec.description || `${spec.designSystem} ${spec.component}`, () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let fixture: ComponentFixture<any>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let component: any;
    let compiled: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [Component],
      }).compileComponents();

      fixture = TestBed.createComponent(Component);
      component = fixture.componentInstance;
      compiled = fixture.nativeElement;
      fixture.detectChanges();
    });

    Object.entries(spec.tests).forEach(([category, testCases]) => {
      // Skip non-array properties (safety check for spec validation)
      if (!Array.isArray(testCases)) {
        return;
      }

      describe(category, () => {
        testCases.forEach((testCase: TestCase) => {
          // Check if this test should be skipped for Angular
          if (testCase.skipFrameworks?.includes("angular")) {
            it.skip(testCase.name, () => {
              // Skipped: ${testCase.skipReason || "Framework-specific limitation"}
            });
            return;
          }

          it(testCase.name, async () => {
            // Create mock handlers for props
            const mockHandlers: Record<string, unknown> = {};

            // Apply props to component
            if (testCase.props) {
              Object.entries(testCase.props).forEach(([key, value]) => {
                if (typeof value === "string" && value === "mockHandler") {
                  const handler = jest.fn();
                  mockHandlers[value] = handler;
                  component[key] = handler;
                } else {
                  component[key] = value;
                }
              });
            }

            // Trigger change detection
            fixture.detectChanges();

            // Get the button element (or first element)
            const element =
              compiled.querySelector("button") ||
              (compiled.firstElementChild as HTMLElement);

            // Run actions if any
            if (testCase.actions && testCase.actions.length > 0) {
              await runActions(testCase.actions, element);
              fixture.detectChanges();
            }

            // Run assertions
            runAssertions(testCase.assertions, element, mockHandlers);
          });
        });
      });
    });
  });
}
