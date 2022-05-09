const { EleventyServerless } = require("@11ty/eleventy");
const { transformQueryParams } = require("../11ty/transforms");
const { validateQueryParams } = require("../11ty/validators");

/**
 * Factory function that returns a serverless function.
 * @param {string} name The name of the serverless function/route.
 * @param {Record<string,string>} queryParamConfig A config describing the query parameters expected by this serverless route.
 */
const makeServerlessFunction = (name, queryParamConfig) =>
  async function handler(event) {
    const query = event.queryStringParameters;
    const isServerless = !!event.headers;

    try {
      if (isServerless) {
        // Validate the query params first before building the page. That way, templates/filters/etc. don't have to
        // worry about error handling.
        validateQueryParams(query, queryParamConfig);
      }

      // Unfortunately, this has to be done before validating query params.
      // If we don't do this, 11ty fails to build entirely. Grr.
      // Init the serverless builder
      let elev = new EleventyServerless(name, {
        path: new URL(event.rawUrl).pathname,
        query: transformQueryParams(query, queryParamConfig),
        functionsDir: "./netlify/functions/",
      });

      // Build the page
      let [page] = await elev.getOutput();

      // Return the page
      return {
        statusCode: 200,
        headers: {
          "Content-Type": "text/html; charset=UTF-8",
        },
        body: page.content,
      };
    } catch (error) {
      if (isServerless) {
        console.log("Serverless Error:", error);
      }
      return {
        statusCode: error.httpStatusCode || 500,
        body: JSON.stringify(
          {
            error: error.message,
          },
          null,
          2
        ),
      };
    }
  };

module.exports = makeServerlessFunction;
