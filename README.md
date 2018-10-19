<div align="center">
<h1>Global Component Library</h1>

<img width="125" alt="Fozzie Bear" src="bear.png" />

<p>The Global Component Library stores the files used to generate the Fozzie documentation website.</p>
</div>

---

[![Build Status](https://travis-ci.org/justeat/global-component-library.svg)](https://travis-ci.org/justeat/global-component-library)

## Usage

To get up and running with the Fozzie Component Library, follow these steps:

1. Clone this repo to your local machine `git clone https://github.com/justeat/global-component-library.git`
2. In your command prompt, run `yarn` from the base of the project. This will install all of the necessary project dependencies.
3. Once installed, run `gulp docs` in your command prompt.  This will compile and run a local version of the site. This should look like the component library hosted at https://fozzie.just-eat.com/


## Deploying a new version

If you've added new documentation to the component library, it's important that it's deployed to the public site at https://fozzie.just-eat.com/.

To do this, run `gulp docs:deploy` from the root of the project in your command prompt.  This runs a gulp task that will compile and deploy the site to Github pages.

