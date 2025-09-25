"""
# --*-- coding: utf-8 --*--
# This module defines the REST API routes
"""

# ==================================================================================================
# Python imports

from os import getenv
from typing import Annotated, Optional

# ==================================================================================================
# AWS imports
from aws_lambda_powertools.event_handler import APIGatewayRestResolver, CORSConfig
from aws_lambda_powertools.event_handler.openapi.params import Body, Query
from aws_lambda_powertools.utilities.typing import LambdaContext

# ==================================================================================================
# Module imports
from lib.feed_handler import get_feed
from shared.lambda_response import RESPONSE
from shared.logger import logger

# ==================================================================================================
# Global declarations
PAGE_SIZE = int(getenv("PAGE_SIZE", "50"))

cors_config = CORSConfig(
    allow_origin="*",
    allow_headers=["*"],
)

app = APIGatewayRestResolver(enable_validation=True, cors=cors_config)


@app.get("/mosques/city")
def mosques_by_city() -> dict:
    """
    Get the mosques by city

    Args:
        city: City name (required)
        page_key: Pagination key for next page (optional)

    Returns:
        dict: Feed response with news items and pagination info
    """
    response = {"message": "Hello, World!"}

    return RESPONSE(response)


def main(event: dict, context: LambdaContext) -> dict:
    """
    The lambda handler method: It resolves the proxy route and invokes the appropriate method
    """

    logger.info(event)
    return app.resolve(event, context)
