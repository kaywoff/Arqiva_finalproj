exports.handler = async (event) => {
  const response = event.Records[0].cf.response;
  const dynamicString = process.env.DYNAMIC_STRING || 'dynamic string';

  if (response.status === '200') {
    const headers = response.headers;
    headers['content-type'] = [{ key: 'Content-Type', value: 'text/html' }];

    const body = Buffer.from(response.body, 'base64').toString('utf8');
    const modifiedBody = body.replace(
      /<span id="dynamic-string">.*<\/span>/,
      `<span id="dynamic-string">${dynamicString}</span>`
    );

    response.body = Buffer.from(modifiedBody).toString('base64');
  }

  return response;
};
