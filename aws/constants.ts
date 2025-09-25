import config from "../config.json";
import defaults from "./Defaults.json";

////////////////////////////////////////////////////////////
// CONFIGURATION
////////////////////////////////////////////////////////////
const APP_NAME = config.PROJECT_NAME.trim().replace(/ /g, "");
const PAGE_SIZE = defaults.PAGE_SIZE;
const ARN_POWERTOOLS_LAYER = "/aws/service/powertools/python/x86_64/python3.13/{version}";

const LOG_LEVEL = "DEBUG";

export const CONSTANTS = {
    APP_NAME,
    PAGE_SIZE,
    ARN_POWERTOOLS_LAYER,
    LOG_LEVEL,
};

export type ConstantsType = typeof CONSTANTS;

export const PARAMS = {
    TABLE_NAME: `/${APP_NAME}/common/table-name`,
    COMMON_LAYER_ARN: `/${APP_NAME}/common/common-layer-arn`,
};

export type ParamsType = typeof PARAMS;
