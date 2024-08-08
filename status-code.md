# HTTP status codes typically used for the various HTTP methods

## Create (POST)

        201 Created: The request has been fulfilled and resulted in a new resource being created. This is the most common status code for a successful POST request.

## Update (PUT)

        200 OK: The request has succeeded, and the resource is updated.
        204 No Content: The request has succeeded, but the response does not include any content (common for PUT requests when no response body is needed).

## Partial Update (PATCH)

        200 OK: The request has succeeded, and the resource is updated.
        204 No Content: The request has succeeded, but the response does not include any content (similar to PUT for successful operations without a response body).

## Delete (DELETE)

        200 OK: The request has succeeded, and the resource is deleted (used when the response includes a message body).
        204 No Content: The request has succeeded, and there is no additional content to send in the response payload body.
        202 Accepted: The request has been accepted for processing, but the processing has not been completed. This is often used for asynchronous deletions.

## Detailed Explanation

### Create (POST)

    201 Created: When a resource is successfully created, the server returns this status code along with a Location header pointing to the URL of the newly created resource. It may also return the representation of the new resource in the response body.

### Update (PUT)

    200 OK: Indicates that the resource has been successfully updated. The response body may contain the updated resource.
    204 No Content: Indicates that the resource has been successfully updated but the response body does not contain any additional information.

### Partial Update (PATCH)

    200 OK: Indicates that the resource has been successfully updated. The response body may contain the updated resource.
    204 No Content: Indicates that the resource has been successfully updated but the response body does not contain any additional information.

### Delete (DELETE)

    200 OK: Indicates that the resource has been successfully deleted, and the response body may contain a confirmation message or related information.
    204 No Content: Indicates that the resource has been successfully deleted and there is no additional content to send.
    202 Accepted: Indicates that the request has been accepted for processing, but the processing is not yet complete. This can be useful for long-running deletions where the client might need to check back later for the final result.
