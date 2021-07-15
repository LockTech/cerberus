# Cerberus - Contribution Workflow

## IDE

This project was initially created using [Visual Studio Code](https://code.visualstudio.com/), a highly extensible IDE.

After opening the project in VSCode, you will be prompted to install a number of extensions; these are recommended to provide the best developer experience.
Many (if not all) of these recommendations come from the [RedwoodJS framework](https://redwoodjs.com/).

## TailwindCSS

### Dark Mode

Tailwind is configured to respect a user's [prefered color scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme).

This preference is determined based on the above linked method, using a CSS media feature.

How the application goes about detecting a user's preference *could* be updated to use Tailwind's [`class`](https://tailwindcss.com/docs/dark-mode#toggling-dark-mode-manually) method, providing the application complete control over which preference is applied. This would also afford the application the ability to implement a feature which allows the user to explicitly choose their preference, or let their preference be known through what is set at the OS-level. However, it will remain set by `prefers-color-scheme` until the need to control it arises.

### JIT

The application makes heavy use of Tailwind's [JIT compiler](https://tailwindcss.com/docs/just-in-time-mode). The configuration required for running Tailwind in this mode [can be found on the web-side of the application](web/tailwind.config.js).

Most files should be covered with its current `purge` setting, additional paths can be added if the contribution calls for it.
