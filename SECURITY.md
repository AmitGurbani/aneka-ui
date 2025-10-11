# Security Policy

## Supported Versions

We release patches for security vulnerabilities for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 0.1.x   | :white_check_mark: |
| < 0.1   | :x:                |

## Reporting a Vulnerability

If you discover a security vulnerability within Aneka UI, please send an email to [INSERT SECURITY EMAIL]. All security vulnerabilities will be promptly addressed.

Please include the following information in your report:

- Type of vulnerability
- Full path of source file(s) related to the vulnerability
- Location of the affected source code (tag/branch/commit)
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact of the vulnerability

## Disclosure Policy

- Security reports will be acknowledged within 48 hours
- We will provide a detailed response within 7 days
- We will notify you when the vulnerability is fixed
- We will publicly disclose the vulnerability once a fix is available

## Security Best Practices

When using Aneka UI components:

1. **Keep Dependencies Updated**: Regularly update `@aneka-ui/cli` and component dependencies
2. **Validate User Input**: Always validate and sanitize user input in your components
3. **Use TypeScript**: Enable strict mode for better type safety
4. **Review Component Code**: Components are copied to your codebase - review them for your security requirements
5. **Report Issues**: If you find a security issue in a component, report it immediately

## Known Security Considerations

### Component Security

- Components are copied to your project, giving you full control
- Review component code before using in production
- Keep Radix UI and other dependencies updated
- Follow React/Vue/Angular security best practices

### CLI Security

- CLI requires Node.js and npm/pnpm access
- Only install from official sources
- Review CLI commands before execution
- Use `doctor` command to validate setup

Thank you for helping keep Aneka UI and its users safe!
