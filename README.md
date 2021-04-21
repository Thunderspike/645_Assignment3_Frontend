# Survey

In order to have local access to the code of this frontend repo:

1. Install node js, and make sure you can run `node -v` and `npm -v`
2. Install angular cli on your machine globally with `npm install -g @angular/cli`
3. Make sure you have git installed on your machine
4. In a local folder of your choce run `git clone https://github.com/Thunderspike/645_Assignment3_Frontend.git`
5. Move into the cloned repo folder, which whill contain a folder with the name `645_Assignment3_Frontend`
6. Run `git install`
7. Run `ng serve -o`, this will open your default broser to `localhost:4200`

**Note**: The local frontend survey app is expecting to consume data at `localhost:8080/SurveyMiddleware/api` as explained in the previous section.

The front end code structure of this project was heavily inspired after the [tour of heroes angular tutorial](https://angular.io/tutorial/toh-pt0) and it uses most of the features explained there.

The front end has a `/Home` page, with a static welcome message, a `/dashboard` page that displays a list of the surveys that exist in the DB accessed through the `/surveys` middleware method, a `/survey` page that allows users to provide a new survey, and a `/survey/{id}` page, which shows a previoulsy populated form and allows anyone to edit it. Any other page that does not exist will redirect back to the home page, while any survey page that does not exist will redirect to the dashboard.

All survey form fields are required, and We have also implemented some minor fun features such as making the email and phone numbers of users unique.

---

The `Dockerfile` of the frontend app is also split into two, like the middleware's dockerfile. The difference is that for the first build part, we make use of the `node` js base image. After copying the contents of the current folder into the `/root/survey/` temporary directory inside of the image, we then compile the angular app with:

-   `npm install --silent`
-   `npm install -g @angular/cli`
-   `ng build --prod`

**Note**: the --prod flag in `ng build --prod` is important as it switches the `/environments/evironment.ts -> evironment.prod.ts` file. The `evironment.prod.ts` contains the location of the machine and port where the middleware will be consumed from in rancher.

The second part of the frontend's `Dockerfile` is to serve the static assets created with the `ng build --prod` through `nginx`. Thus, we perform some boiler plate of removing the default nginx configuraion file, passing in our custom one (which lives in the project's `nginx/nginx.conf` folder) and then serving the contents at port 80.

The structure of the git actions is the exact same as the middleware's

-   build image with Dockerfile from github repo on push
-   redeploy workload responsible for the frontend container

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.8.

---

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
