# Cerberus - Contribution Workflow

## IDE

This project was initially created using [Visual Studio Code](https://code.visualstudio.com/), a highly extendable IDE.

After opening the project in VSCode, you will be prompted to install a number of extensions; these are recommended to provide the best developer experience.
Many (if not all) of these recommendations come from the [RedwoodJS framework](https://redwoodjs.com/).

## TailwindCSS

### JIT

The application makes heavy use of Tailwind's [JIT compiler](https://tailwindcss.com/docs/just-in-time-mode). The configuration required for running Tailwind in this mode [can be found on the web-side of the application](web/tailwind.config.js).

Most files should be covered with its current `purge` setting, additional paths can be added as needed.

## UX Design

[Figma](https://www.figma.com/) is used for the brainstorming of Cerberus' UI. This is optional, but highly recommended.

[Here](https://www.figma.com/file/p2Yi4QBdc6RAaPvcq2ATrq/Cerberus) you may find the project.

## GDPR Compliancy

LockTech is an organization committed to protecting personal information. As such, Cerberus should **always** maintain compliancy with the [EU's GDPR](https://gdpr-info.eu/).

As a contributor, your primary responsibility is to ensure any changes you make are reflected with an appropriate addition or modification to the application's [logger](api/src/lib/logger.ts); specifically, maintaining an up-to-date [`redaction`](https://github.com/pinojs/pino/blob/master/docs/redaction.md#redaction) list. Redacted information should include everything which could be used to identify indavidual members within an organization.

If in doubt, feel free to [submit an issue](https://github.com/LockTech/cerberus/issues/new) to open the floor for further discussion and input.
