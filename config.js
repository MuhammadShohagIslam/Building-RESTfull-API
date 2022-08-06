/*
 *** Create and Export configaration variable ***
 */

// container for all environment
const environment = {};

// development (default) environment
environment.development = {
    httpPort: 3000,
    httpsPort: 3001,
    envName: "development",
};

// production environment
environment.production = {
    httpPort: 5000,
    httpsPort: 5001,
    envName: "production",
};

// determined which enviroment which is set on command line
const currentEnviroment =
    typeof process.env.NODE_ENV === "string"
        ? process.env.NODE_ENV.toLowerCase()
        : "";

// check the current environment which one has the above, if not set staging environment
const environmentToExport =
    typeof environment[currentEnviroment] === "object"
        ? environment[currentEnviroment]
        : environment.development;

// export the exportToEnvironment to the global use
module.exports = environmentToExport;
