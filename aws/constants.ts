import config from "../config.json";
import { aws_ssm as ssm } from "aws-cdk-lib";

////////////////////////////////////////////////////////////
// CONSTANTS
////////////////////////////////////////////////////////////

const PAGE_SIZE = 50;
const REGION = "us-east-1";
const PYTHON_VERSION = "3.13";
const VERSION = "latest";
const ARCH = "x86_64";

////////////////////////////////////////////////////////////
// CONFIGURATION
////////////////////////////////////////////////////////////
const APP_NAME = config.PROJECT_NAME.trim().replace(/ /g, "");

// TODO: Change the above to SSM resolution
const SSM_POWERTOOLS_LAYER = `/aws/service/powertools/python/${ARCH}/python${PYTHON_VERSION}/${VERSION}`;
// const ARN_POWERTOOLS_LAYER = `arn:aws:lambda:${REGION}:017000801446:layer:AWSLambdaPowertoolsPythonV3-${PYTHON_VERSION}-${ARCH}:${VERSION}`;

const LOG_LEVEL = "DEBUG";

export const CONSTANTS = {
    APP_NAME,
    PAGE_SIZE,
    SSM_POWERTOOLS_LAYER,
    LOG_LEVEL,
};

export type ConstantsType = typeof CONSTANTS;

export const PARAMS = {
    TABLE_NAME: `/${APP_NAME}/common/table-name`,
    COMMON_LAYER_ARN: `/${APP_NAME}/common/common-layer-arn`,
};

export type ParamsType = typeof PARAMS;
