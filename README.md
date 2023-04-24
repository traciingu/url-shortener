# url-shortener
Live URL: http://ec2-18-212-87-24.compute-1.amazonaws.com:32768/

# Requests
## GET
### Get all
Req: `/` \
Res: `[{
"_id": String,
"url": String,
"shortlink": String,
"id": String
}]`

Return all shortlinks

### Get shortlink
Req: `/:shortlink` 

This will redirect to the url mapped with the shortlink

## POST
### Create shortlink
Req: `/` \
Body: `{"url": String, "shortlink": String}`

## PUT
### Update shortlink
Req: `/:id` \
Body: `{"url": String (optional), "shortlink": String (optional)}`

## DELETE
### Delete shortlink
Req: `/:id` \
Res: `{"url": String, "shortlink": String}`

Returns the deleted shortlink
