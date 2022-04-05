# Aoede

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.1.2.

## Intro

### Why Aoede name

**Geeky stuff now**

Aoede, according to Greek mythology, she was the daughter of Zeus, the King of the Gods, and Mnemosyne, the goddess of memory.

She was the muse of voice and song. Since this is a blog(ish) demo, why not give it a codename that fits.

<small>[Aoede](https://en.wikipedia.org/wiki/Aoede_(mythology))</small>

***

## Table of Contents


- [Aoede](#aoede)
  - [Intro](#intro)
    - [Why Aoede name](#why-aoede-name)
  - [Table of Contents](#table-of-contents)
  - [Abstract](#abstract)
  - [Motivation](#motivation)
  - [Objective](#objective)
  - [The tech](#the-tech)
    - [Angular](#angular)
    - [Firebase](#firebase)
  - [Dev strategy](#dev-strategy)
  - [What would I do differently](#what-would-i-do-differently)
  - [If it was a real-world project](#if-it-was-a-real-world-project)
- [Local development](#local-development)
  - [Getting started](#getting-started)
  - [Development server](#development-server)
  - [Code scaffolding](#code-scaffolding)
  - [Build](#build)
  - [Running unit tests](#running-unit-tests)
  - [Running integration tests](#running-integration-tests)
  - [Further help](#further-help)

***

## Abstract

The objective of this document is to describe the choices I made during the development of this small POC/Challenge. I'll start describing the motivation that made me do it, passing through the tech chosen. I'll end with some thanks and things I would do differently if this was a real-world project.

## Motivation

This is a simple one. I miss Angular. I wanted to have a real objective by doing a small project/PoC/challenge that made me use the latest Angular Versions. I also like the BO field as well as the health industry. 

## Objective
The objective is also clear. It's described [here](https://github.com/LetsGetChecked/developer-challenge-api/) on your GitHub Project Page:
```
You are required to create a blog application that interfaces with the provided REST API. The application should have a home page that shows all blog posts, sorted by publish date. Users should be able to view individual posts on a separate page. Within that page, they should be able to read comments and add a new comment.
```

## The tech
### Angular

I find joy in using this framework. I've worked with other frameworks (React, EmberJS - Currently), but none gives me the thrill like Angular. I find Angular a solid framework. It has most if not all the things we need without the need of installing any extra 3rd party libraries. Because of this, it decreases the chances of issues and increases the ability to keep up with the latest versions.

As you can check in my `package.json` file, I've used what is available when scaffolding a new project with `ng-cli`.

### Firebase

I choose Firebase because of two things I enjoy:
The simplicity of setup and integration with GitHub
The possibility of having a HOST for each PR be checked

## Dev strategy

My strategy is always to keep it as simple as possible. This is applied when a new dev joins and wants to start developing a new project and to be easy to add new features.

I started by creating a project for it on GitHub. I could have forked the API Repo, but instead, I choose to use it as a submodule. 

Starting the development in our local machines is as easy as one command: `make install && make dev`

I'll point out my development strategy in an ordered list. Makes easy to understand the process.

The process was:
1. Identify the target feature
2. Check what needs to be done to create this new feature
3. Separate the Feature into small working User Stories
4. Start the development
5. Write Tests
6. Open a PR
7. This new PR has GitHub Actions doing a few automation (Build, Test and Deploy to PR Hosting)
8. Check if everything I wrote was fine and all tests were passing
9. Merge PR
10. GitHub Action to automatically deploy to production Hosting

Repeat the above for the next feature.

Each PR would create a self-contained deployment and URL to check the current feature. For example, this [PR](https://github.com/emanuelcoelho1986/aoede/pull/29).

Each feature would pass through the following states:
Identifications
Grooming
ToDo
In Progress
In Review
Done
## What would I do differently

After checking the current project, I'll probably name some components differently. I'm looking at the 

## If it was a real-world project

I would use a different strategy to load posts, check for new posts, load comments and check for new comments. We might need a real-time push for these ones. Reloading the browser all the time to get the new stuff is super annoying. We could use some badge to tell us there are new posts and the comments could just appear as they are posts by someone else. TBH I never had to deal with real-time updates, but I guess it's more of finding the right tool than implementing it. Eg: Firebase already has a RealTime Tech ready to be used. Installing the client to keep it updated should do the trick (mostly). OFC I still have to read about it.

***
# Local development
## Getting started

The project contains all submodules required to run in development mode (locally).

Run the following command

`make install && make dev`

***
*From Angular generated Readme.md*
***

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `npm run test:unit` to execute the unit tests via [jest](https://jestjs.io/). Thanks to [Jest Preset Angular](https://github.com/thymikee/jest-preset-angular) which allow us to setup jest easaly

## Running integration tests

Run `npm run test:e2e` to execute the integration tests. Integration tests will run with [Cypress](https://www.cypress.io/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
