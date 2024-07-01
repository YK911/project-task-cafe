# MSC-3 Team project

# Advanced JavaScript and TypeScript: Tools and Best Practices

## Vite Vanilla JS Template

Initially built for team use, I created this template for starting a new project with Vite.js and Vanilla Javascript. It is already set up with standard development tools like ESLint and Prettier for easy code formatting and linting, with Vite for a robust, modern build process.

## Dependencies

This template uses the following dependencies:

- **[Vite](https://vitejs.dev/):** A next-generation frontend build tool that offers a fast dev server and optimized builds.
- **[ESLint](https://eslint.org/):** An open-source JavaScript linting utility that helps maintain a consistent code style.
- **[Prettier](https://prettier.io/):** An opinionated code formatter that enforces a consistent style across your project.
- **[eslint-config-airbnb-base](https://www.npmjs.com/package/eslint-config-airbnb-base) and [eslint-config-prettier](https://www.npmjs.com/package/eslint-config-prettier):** ESLint configurations adhering to Airbnb's base JS style guide and disabling stylistic rules that might conflict with Prettier.
- **[eslint-plugin-import](https://www.npmjs.com/package/eslint-plugin-import) and [eslint-plugin-prettier](https://www.npmjs.com/package/eslint-plugin-prettier):** ESLint plugins that enforce ES2015+ import/export syntax and integrate Prettier with ESLint.
- **[autoprefixer](https://www.npmjs.com/package/autoprefixer) and [postcss](https://postcss.org/):** Autoprefixer automatically adds vendor prefixes to CSS, while PostCSS provides a way to transform CSS with JavaScript.
- **[cssnano](https://cssnano.github.io/cssnano/):** A tool that helps to compress and optimize CSS files.
- **[postcss-nesting](https://www.npmjs.com/package/postcss-nesting):** A PostCSS plugin that allows you to use modern CSS Nesting in your stylesheets.
- **[vite-plugin-eslint](https://www.npmjs.com/package/vite-plugin-eslint):** Integrates ESLint into the Vite build process for on-the-fly linting.
- **[the-new-css-reset](https://elad2412.github.io/the-new-css-reset/):** A modern, CSS reset for your styles.

## Cloning

1. To start using this template, clone the repository with this command:

```bash
git clone https://github.com/YK911/project-task-cafe.git
```

2. Then proceed to the folder and install dependencies:

```bash
cd project-task-cafe
npm install
```

## Scripts

Use the following scripts for your development workflow:

```bash
# Start the development server
npm run dev

# Checks your code for any linting errors
npm run lint

# Tries to automatically fix any linting errors present in your code
npm run lint:fix

# Formats your code in a consistent, predefined style using Prettier
npm run format

# Build for production
npm run build

# Preview the build
npm run preview

# Build and preview the project
npm run buildpreview
```

## Folder Structure

```plaintext
/
├── .github                 # Github actions and workflows
├── node_modules            # Node.js dependencies for the project.
├── public                  # Public assets and resources
├── src                     # Source code
│   ├── assets              # General assets for your project
│   │   ├── images          # Store your images here
│   │   ├── icons           # Store your svg files here
│   ├── js                  # Javascript files of your project
│   ├── styles              # CSS styles for your project
│   ├── templates           # The HTML reusable blocks of the user interface
│   ├── favorites.html      # Favorites page for your project
│   ├── index.html          # Home page for your project
├── .editorconfig           # Configuration for the EditorConfig plugin
├── .eslintignore           # Files to be ignored by ESLint
├── .eslintrc.json          # Configuration for ESLint
├── .gitignore              # Files and folders to be ignored by Git
├── .prettierignore         # Files to be ignored by Prettier
├── .prettierrc             # Configuration for Prettier
├── LICENSE                 # The license for your project
├── package-lock.json       # Lockfile for your project's dependencies
├── package.json            # Defines your project and its dependencies
├── postcss.config.cjs      # Configuration for PostCSS
├── README.md               # This file
├── vite.config.js          # Configuration for Vite
```

## License

This template was created under the [MIT License](LICENSE.md).

**Happy coding!** 👨‍💻
