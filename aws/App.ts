import { App, Tags } from "aws-cdk-lib";
import { CommonStack } from "./src/Common";
import { ApiStack } from "./src/Api";
import { PARAMS, CONSTANTS } from "./constants";

////////////////////////////////////////////////////////////
// STACKS
////////////////////////////////////////////////////////////

const app = new App();

const APP_NAME = CONSTANTS.APP_NAME;

const common = new CommonStack(app, `${APP_NAME}-CommonStack`, {
    constants: CONSTANTS,
    params: PARAMS,
});

const api = new ApiStack(app, `${APP_NAME}-ApiStack`, {
    constants: CONSTANTS,
    params: PARAMS,
});

api.addDependency(common);

// Add tags to all resources

Tags.of(app).add("Project", APP_NAME);

app.synth();
