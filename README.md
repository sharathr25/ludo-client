# LudoClient
* **STEP 1:**  You need **nodejs** for this project.
    * If you already have nodejs in your machine skip this step.
    * So go here https://nodejs.org/en/download/ and install nodejs which is compatible for your OS. 
    * Run `node -v` to check nodejs version, If the version comes up then you have successfully installed nodejs
    * Nodejs comes with the package managing tool tool **npm** which we will use to run our appilcation
    * Run `npm -v` to check npm version, If the version comes up then your good to go
* **STEP 2:** You need **yarn** to install deps. 
    * If you already have yarn in your machine skip this step.
    * So run `npm install -g yarn` globally. 
      If you get permisssion error then you probably have to install this with super user previleges,
      So run `sudo npm install -g yarn` and then enter password to install `yarn` in your machine.
* **STEP 3:** In the project directory run `yarn` to get all the dependecies.
* **STEP 4:** run `npm start` to run the application in dev mode

Application will be running at http://localhost:1234 open this URL in your favourite browser. 

## Learn more
  * We are using **parcel** bundler to manage our application assets. https://parceljs.org/
  * **workbox** to make our application a PWA. https://developers.google.com/web/tools/workbox
