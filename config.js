/*
 *** Create and Export configaration variable ***
 */

// container for all environment
const environment = {};

// staging (default) environment
environment.development = {
    port: 3000,
    envName: "development",
};

// production environment
environment.production = {
    port: 5000,
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
