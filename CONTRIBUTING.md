# Contributing

Contributions to this project are [released](https://help.github.com/articles/github-terms-of-service/#6-contributions-under-repository-license) to the public under the [project's open source license](LICENSE).

Everyone is welcome to contribute to this project. Contributing doesn't just mean submitting pull requests—there are many different ways for you to get involved, including answering questions, reporting issues, improving documentation, or suggesting new features.

## How to Contribute

### Reporting Issues

If you find a bug or have a feature request:
1. Check if the issue already exists in the [GitHub Issues](https://github.com/orassayag/starter-kits/issues)
2. If not, create a new issue with:
   - Clear title and description
   - Steps to reproduce (for bugs)
   - Expected vs actual behavior
   - Your environment details (OS, Node version, npm/pnpm version)
   - Which starter kit you're using

### Submitting Pull Requests

1. Fork the repository
2. Create a new branch for your feature/fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes following the code style guidelines below
4. Test your changes thoroughly
5. Commit with clear, descriptive messages
6. Push to your fork and submit a pull request

### Code Style Guidelines

This project uses:
- **JavaScript/JSX** for React components
- **ESLint** for code quality
- **SCSS** for styling
- **React best practices** from Create React App

Before submitting:
```bash
# Install dependencies
npm install

# Check for linting errors (if ESLint is configured)
npm run lint

# Build the project
npm run build

# Test the application
npm start
```

### Adding New Starter Kits

When adding a new starter kit:
1. Follow the existing naming convention:
   - Client-only: `client-[technology]-[feature]`
   - Server-only: `server-[technology]-[feature]`
   - Full-stack: `project-server-[source]---client-[technology]`
   - Examples: `example-[feature-name]`
2. Include all necessary files:
   - `README.md` - Specific documentation for the kit
   - `INSTRUCTIONS.md` - Quick setup guide
   - `package.json` - With proper metadata
   - `.gitignore`, `.eslintrc`, etc.
3. Ensure the kit works independently
4. Update the main README.md with the new kit description
5. Test thoroughly before submitting

### Coding Standards

1. **File Organization**: Keep components, services, and utilities in separate directories
2. **Component Structure**: Use functional components with hooks
3. **Naming Conventions**: Use clear, descriptive names for files and functions
4. **Comments**: Add comments for complex logic or non-obvious implementations
5. **Dependencies**: Keep dependencies up to date and minimal
6. **Configuration**: Use environment variables for API keys and sensitive data

### Testing New Kits

When creating or modifying a starter kit:
1. Install dependencies: `npm install`
2. Start the development server: `npm start`
3. Test all functionality
4. Build for production: `npm run build`
5. Verify no console errors or warnings
6. Check responsive design (for client applications)
7. Test API integrations (if applicable)

### Updating Dependencies

When updating dependencies:
1. Test each starter kit individually
2. Ensure backward compatibility
3. Update package.json files consistently
4. Document any breaking changes
5. Test production builds

### Documentation Standards

When adding or updating documentation:
1. Use clear, concise language
2. Include code examples where helpful
3. Keep formatting consistent with existing docs
4. Update the main README.md if adding new kits
5. Ensure all links are valid
6. Include setup instructions and prerequisites

## Questions or Need Help?

Please feel free to contact me with any question, comment, pull-request, issue, or any other thing you have in mind.

* Or Assayag <orassayag@gmail.com>
* GitHub: https://github.com/orassayag
* StackOverflow: https://stackoverflow.com/users/4442606/or-assayag?tab=profile
* LinkedIn: https://linkedin.com/in/orassayag

Thank you for contributing! 🙏
