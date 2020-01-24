# strapi-plugin-data-migration

This plugin allows you to migrate your content-types as well as their data between different strapi versions.

## **Create Migration**  |  **POST**   http://localhost:1337/migrations/actions/create

### Migrations.createMigration

Used to create the migration folder for the current version. Does not create any migration export data.

#### Headers

<table class="table table-hover">
    <thead>
        <tr>
            <th>Key</th>
            <th>Value</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Content-Type</td>
            <td>application/json</td>
            <td></td>
        </tr>
        <tr>
            <td>Accept</td>
            <td>application/json</td>
            <td>
                Needed for javascript implementation because fetch will throw an error otherwise.
            </td>
        </tr>
    </tbody>
</table>

##### Query

<table class="table table-hover">
    <thead>
        <tr>
            <th>Key</th>
            <th>Value</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>override</td>
            <td>true</td>
            <td>
                Allows a already existing migration folder to be overwritten.
            </td>
        </tr>
    </tbody>
</table>

##### Body

```json
{
  "exports": [
    "book"
   ]
}
```

##### Response

###### Migration already exists | Code: 500

```json
{
   "statusCode":500,
   "error":"Internal Server Error",
   "message":"Migration with version \"${version}\" already exists, call with \"?override=true\" to recreate folder."
}
```

###### No body provided | Code: 422

##### Response Headers

<table class="table table-hover">
    <thead>
        <tr>
            <th>Key</th>
            <th>Value</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Vary</td>
            <td>Origin</td>
        </tr>
        <tr>
            <td>Content-Security-Policy</td>
            <td>block-all-mixed-content</td>
        </tr>
        <tr>
            <td>Strict-Transport-Security</td>
            <td>max-age=31536000; includeSubDomains</td>
        </tr>
        <tr>
            <td>X-Frame-Options</td>
            <td>SAMEORIGIN</td>
        </tr>
        <tr>
            <td>X-XSS-Protection</td>
            <td>1; mode=block</td>
        </tr>
        <tr>
            <td>Content-Type</td>
            <td>application/json; charset=utf-8</td>
        </tr>
        <tr>
            <td>X-Powered-By</td>
            <td>Strapi
                <strapi.io></strapi.io>
            </td>
        </tr>
        <tr>
            <td>Content-Length</td>
            <td>94</td>
        </tr>
        <tr>
            <td>Date</td>
            <td>Fri, 24 Jan 2020 06:42:49 GMT</td>
        </tr>
        <tr>
            <td>Connection</td>
            <td>keep-alive</td>
        </tr>
    </tbody>
</table>

```json
{
   "statusCode":422,
   "error":"Unprocessable Entity",
   "message":"Please provide models to export."
}
```

###### Success | Code: 200

```json
{
   "info":{
      "version":"3.0.0-beta.18.6",
      "customization":false,
      "createdAt":"Fri Jan 24 2020 07:09:36 GMT+0100"
   },
   "types":{ 
      "count":2,
      "shapes":[
         "Books",
         "Examples"
      ]
   },
   "components":{
      "count":0,
      "shapes":[

      ]
   }
}
```

###### Could not find anything to export | Code: 404

```json
{
   "statusCode":404,
   "error":"Not Found",
   "message":"Could not find anything to export."
}
```

## **Get Migrations**  |  **GET**   http://localhost:1337/migrations

### Migrations.getMigrationVersions

List all migrations. Used for navigational UI.  

#### Headers

<table class="table table-hover">
   <thead>
      <tr>
         <th>Key</th>
         <th>Value</th>
         <th>Description</th>
      </tr>
   </thead>
   <tbody>
      <tr>
         <td>Content-Type</td>
         <td>application/json</td>
         <td></td>
      </tr>
      <tr>
         <td>Accept</td>
         <td>application/json</td>
         <td>
            Needed for javascript implementation because fetch will throw an error otherwise.
         </td>
      </tr>
   </tbody>
</table>

##### Query

<table class="table table-hover">
   <thead>
      <tr>
         <th>Key</th>
         <th>Value</th>
         <th>Description</th>
      </tr>
   </thead>
   <tbody>
      <tr>
         <td></td>
         <td></td>
         <td></td>
      </tr>
   </tbody>
</table>

##### Response

###### Populated | Code: 0

```json
[
   {
      "version":"3.0.0-beta.18.6",
      "shapes":[
         "book"
      ]
   },
   {
      "version":"3.0.0-beta.18.5",
      "shapes":[
         "book"
      ]
   }
]

```

###### Empty | Code: 200

```json
[]
```

## **Get Migration By Version**  |  **GET**   http://localhost:1337/migrations/:version

### Migration.getMigrationDetials

Get the details from “meta.json” for the specific version. 

#### Headers

<table class="table table-hover">
   <thead>
      <tr>
         <th>Key</th>
         <th>Value</th>
         <th>Description</th>
      </tr>
   </thead>
   <tbody>
      <tr>
         <td>Content-Type</td>
         <td>application/json</td>
         <td></td>
      </tr>
      <tr>
         <td>Accept</td>
         <td>application/json</td>
         <td>
            Needed for javascript implementation because fetch will throw an error otherwise.
         </td>
      </tr>
   </tbody>
</table>

##### URL Variables

<table class="table table-hover">
   <thead>
      <tr>
         <th>Key</th>
         <th>Value</th>
         <th>Description</th>
      </tr>
   </thead>
   <tbody>
      <tr>
         <td>version</td>
         <td>3.0.0-beta.18.6</td>
         <td>
            The version code of the migration that should be queried.
         </td>
      </tr>
   </tbody>
</table>

##### Response

###### Version not found | Code: 404

##### Response Headers

<table class="table table-hover">
   <thead>
      <tr>
         <th>Key</th>
         <th>Value</th>
      </tr>
   </thead>
   <tbody>
      <tr>
         <td>Vary</td>
         <td>Origin</td>
      </tr>
      <tr>
         <td>Content-Security-Policy</td>
         <td>block-all-mixed-content</td>
      </tr>
      <tr>
         <td>Strict-Transport-Security</td>
         <td>max-age=31536000; includeSubDomains</td>
      </tr>
      <tr>
         <td>X-Frame-Options</td>
         <td>SAMEORIGIN</td>
      </tr>
      <tr>
         <td>X-XSS-Protection</td>
         <td>1; mode=block</td>
      </tr>
      <tr>
         <td>Content-Type</td>
         <td>application/json; charset=utf-8</td>
      </tr>
      <tr>
         <td>X-Powered-By</td>
         <td>
            Strapi
            <strapi.io></strapi.io>
         </td>
      </tr>
      <tr>
         <td>Content-Length</td>
         <td>121</td>
      </tr>
      <tr>
         <td>Date</td>
         <td>Fri, 24 Jan 2020 06:23:57 GMT</td>
      </tr>
      <tr>
         <td>Connection</td>
         <td>keep-alive</td>
      </tr>
   </tbody>
</table>

```json
{
   "statusCode":404,
   "error":"Not Found",
   "message":"The migration with version code \"3.0.0-beta.18.5\" could not be found"
}
```

###### Success | Code: 200

##### Response Headers

<table class="table table-hover">
   <thead>
      <tr>
         <th>Key</th>
         <th>Value</th>
      </tr>
   </thead>
   <tbody>
      <tr>
         <td>Vary</td>
         <td>Origin</td>
      </tr>
      <tr>
         <td>Content-Security-Policy</td>
         <td>block-all-mixed-content</td>
      </tr>
      <tr>
         <td>Strict-Transport-Security</td>
         <td>max-age=31536000; includeSubDomains</td>
      </tr>
      <tr>
         <td>X-Frame-Options</td>
         <td>SAMEORIGIN</td>
      </tr>
      <tr>
         <td>X-XSS-Protection</td>
         <td>1; mode=block</td>
      </tr>
      <tr>
         <td>Content-Type</td>
         <td>application/json; charset=utf-8</td>
      </tr>
      <tr>
         <td>X-Powered-By</td>
         <td>
            Strapi
            <strapi.io></strapi.io>
         </td>
      </tr>
      <tr>
         <td>Content-Length</td>
         <td>174</td>
      </tr>
      <tr>
         <td>Date</td>
         <td>Fri, 24 Jan 2020 06:23:23 GMT</td>
      </tr>
      <tr>
         <td>Connection</td>
         <td>keep-alive</td>
      </tr>
   </tbody>
</table>

```json
{
   "info":{
      "version":"3.0.0-beta.18.6",
      "customization":false,
      "createdAt":"2020-01-23T15:42:54.764Z"
   },
   "types":{
      "count":1,
      "shapes":[
         "book"
      ]
   },
   "components":{
      "count":0,
      "shapes":[

      ]
   }
}
```

## **Delete Migration By Version**  |  **DELETE**   http://localhost:1337/migrations/:version

### Migration.deleteMigration

Delete the migration folder for the specific version. 

#### Headers

<table class="table table-hover">
   <thead>
      <tr>
         <th>Key</th>
         <th>Value</th>
         <th>Description</th>
      </tr>
   </thead>
   <tbody>
      <tr>
         <td>Content-Type</td>
         <td>application/json</td>
         <td></td>
      </tr>
      <tr>
         <td>Accept</td>
         <td>application/json</td>
         <td>
            Needed for javascript implementation because fetch will throw an error otherwise.
         </td>
      </tr>
   </tbody>
</table>

##### URL Variables

<table class="table table-hover">
   <thead>
      <tr>
         <th>Key</th>
         <th>Value</th>
         <th>Description</th>
      </tr>
   </thead>
   <tbody>
      <tr>
         <td>version</td>
         <td>3.0.0-beta.18.6</td>
         <td>
            The version code of the migration that should be queried.
         </td>
      </tr>
   </tbody>
</table>

##### Response

###### Version not found | Code: 404

##### Response Headers

<table class="table table-hover">
   <thead>
      <tr>
         <th>Key</th>
         <th>Value</th>
      </tr>
   </thead>
   <tbody>
      <tr>
         <td>Vary</td>
         <td>Origin</td>
      </tr>
      <tr>
         <td>Content-Security-Policy</td>
         <td>block-all-mixed-content</td>
      </tr>
      <tr>
         <td>Strict-Transport-Security</td>
         <td>max-age=31536000; includeSubDomains</td>
      </tr>
      <tr>
         <td>X-Frame-Options</td>
         <td>SAMEORIGIN</td>
      </tr>
      <tr>
         <td>X-XSS-Protection</td>
         <td>1; mode=block</td>
      </tr>
      <tr>
         <td>Content-Type</td>
         <td>application/json; charset=utf-8</td>
      </tr>
      <tr>
         <td>X-Powered-By</td>
         <td>
            Strapi
            <strapi.io></strapi.io>
         </td>
      </tr>
      <tr>
         <td>Content-Length</td>
         <td>121</td>
      </tr>
      <tr>
         <td>Date</td>
         <td>Fri, 24 Jan 2020 06:23:57 GMT</td>
      </tr>
      <tr>
         <td>Connection</td>
         <td>keep-alive</td>
      </tr>
   </tbody>
</table>

```json
{
   "statusCode":404,
   "error":"Not Found",
   "message":"The migration with version code \"3.0.0-beta.18.5\" could not be found"
}
```

###### Success | Code: 200

##### Response Headers

<table class="table table-hover">
   <thead>
      <tr>
         <th>Key</th>
         <th>Value</th>
         <th>Description</th>
      </tr>
   </thead>
   <tbody>
      <tr>
         <td>version</td>
         <td>3.0.0-beta.18.6</td>
         <td>
            The version code of the migration that should be queried.
         </td>
      </tr>
   </tbody>
</table>
##### Response
###### Version not found | Code: 404
##### Response Headers
<table class="table table-hover">
   <thead>
      <tr>
         <th>Key</th>
         <th>Value</th>
      </tr>
   </thead>
   <tbody>
      <tr>
         <td>Vary</td>
         <td>Origin</td>
      </tr>
      <tr>
         <td>Content-Security-Policy</td>
         <td>block-all-mixed-content</td>
      </tr>
      <tr>
         <td>Strict-Transport-Security</td>
         <td>max-age=31536000; includeSubDomains</td>
      </tr>
      <tr>
         <td>X-Frame-Options</td>
         <td>SAMEORIGIN</td>
      </tr>
      <tr>
         <td>X-XSS-Protection</td>
         <td>1; mode=block</td>
      </tr>
      <tr>
         <td>Content-Type</td>
         <td>application/json; charset=utf-8</td>
      </tr>
      <tr>
         <td>X-Powered-By</td>
         <td>
            Strapi
            <strapi.io></strapi.io>
         </td>
      </tr>
      <tr>
         <td>Content-Length</td>
         <td>121</td>
      </tr>
      <tr>
         <td>Date</td>
         <td>Fri, 24 Jan 2020 06:23:57 GMT</td>
      </tr>
      <tr>
         <td>Connection</td>
         <td>keep-alive</td>
      </tr>
   </tbody>
</table>

```json
{
   "statusCode":200,
   "error":"OK",
   "message":"The migration was successfully deleted."
}
```

## **Create Migration Data**  |  **POST**   http://localhost:1337/migrations/:version/actions/export

### Migrations.generateLocalData

Creates the “${type}.data.json” for each content-type. The file is stored without any spacing to save some additional bytes. The population of the file is paginated automatically in steps of 10 items per query.

#### Headers

<table class="table table-hover">
   <thead>
      <tr>
         <th>Key</th>
         <th>Value</th>
         <th>Description</th>
      </tr>
   </thead>
   <tbody>
      <tr>
         <td>Content-Type</td>
         <td>application/json</td>
         <td></td>
      </tr>
   </tbody>
</table>

##### Query

<table class="table table-hover">
   <thead>
      <tr>
         <th>Key</th>
         <th>Value</th>
         <th>Description</th>
      </tr>
   </thead>
   <tbody>
      <tr>
         <td>removeReference</td>
         <td>true</td>
         <td></td>
      </tr>
   </tbody>
</table>

##### URL Variables

<table class="table table-hover">
   <thead>
      <tr>
         <th>Key</th>
         <th>Value</th>
         <th>Description</th>
      </tr>
   </thead>
   <tbody>
      <tr>
         <td>version</td>
         <td>3.0.0-beta.18.6</td>
         <td>
            The version code of the migration that should be queried.
         </td>
      </tr>
   </tbody>
</table>

##### Body

You can use any of the provided filters by strapi.

```json
{
   "filters":{
      "book":{
         "title":"ednqdn"
      }
   }
}
```

##### Response

###### Version not found | Code: 404

##### Response Headers

<table class="table table-hover">
   <thead>
      <tr>
         <th>Key</th>
         <th>Value</th>
      </tr>
   </thead>
   <tbody>
      <tr>
         <td>Vary</td>
         <td>Origin</td>
      </tr>
      <tr>
         <td>Content-Security-Policy</td>
         <td>block-all-mixed-content</td>
      </tr>
      <tr>
         <td>Strict-Transport-Security</td>
         <td>max-age=31536000; includeSubDomains</td>
      </tr>
      <tr>
         <td>X-Frame-Options</td>
         <td>SAMEORIGIN</td>
      </tr>
      <tr>
         <td>X-XSS-Protection</td>
         <td>1; mode=block</td>
      </tr>
      <tr>
         <td>Content-Type</td>
         <td>application/json; charset=utf-8</td>
      </tr>
      <tr>
         <td>X-Powered-By</td>
         <td>
            Strapi
            <strapi.io></strapi.io>
         </td>
      </tr>
      <tr>
         <td>Content-Length</td>
         <td>121</td>
      </tr>
      <tr>
         <td>Date</td>
         <td>Fri, 24 Jan 2020 07:30:55 GMT</td>
      </tr>
      <tr>
         <td>Connection</td>
         <td>keep-alive</td>
      </tr>
   </tbody>
</table>

```json
{
   "statusCode":404,
   "error":"Not Found",
   "message":"The migration with version code \"3.0.0-beta.18.5\" could not be found"
}
```

###### Success | Code: 200

##### Response Headers

<table class="table table-hover">
   <thead>
      <tr>
         <th>Key</th>
         <th>Value</th>
      </tr>
   </thead>
   <tbody>
      <tr>
         <td>Vary</td>
         <td>Origin</td>
      </tr>
      <tr>
         <td>Content-Security-Policy</td>
         <td>block-all-mixed-content</td>
      </tr>
      <tr>
         <td>Strict-Transport-Security</td>
         <td>max-age=31536000; includeSubDomains</td>
      </tr>
      <tr>
         <td>X-Frame-Options</td>
         <td>SAMEORIGIN</td>
      </tr>
      <tr>
         <td>X-XSS-Protection</td>
         <td>1; mode=block</td>
      </tr>
      <tr>
         <td>Content-Type</td>
         <td>application/json; charset=utf-8</td>
      </tr>
      <tr>
         <td>X-Powered-By</td>
         <td>
            Strapi
            <strapi.io></strapi.io>
         </td>
      </tr>
      <tr>
         <td>Content-Length</td>
         <td>37</td>
      </tr>
      <tr>
         <td>Date</td>
         <td>Fri, 24 Jan 2020 07:29:57 GMT</td>
      </tr>
      <tr>
         <td>Connection</td>
         <td>keep-alive</td>
      </tr>
   </tbody>
</table>

```json
{ 
   "message":"Data migration complete"
}
```

## **Read Migration Data**  |  **GET**   http://localhost:1337/migrations/:version/actions/import

### Migrations.readLocalData

Reads the created “${type}.data.json” and populates the created content-types from /migrations/:version/read with their old data. The paramter “?removeReference=true” removes the created `id || _id` as well as the properies `created_at || createdAt`, `__v` and `updated_at || updatedAt`.</small>  

#### Query

<table class="table table-hover">
   <thead>
      <tr>
         <th>Key</th>
         <th>Value</th>
         <th>Description</th>
      </tr>
   </thead>
   <tbody>
      <tr>
         <td>removeReference</td>
         <td>true</td>
         <td>
            If provided the entity will lose the reference to the old database.
         </td>
      </tr>
   </tbody>
</table>

##### URL Variables

<table class="table table-hover">
   <thead>
      <tr>
         <th>Key</th>
         <th>Value</th>
         <th>Description</th>
      </tr>
   </thead>
   <tbody>
      <tr>
         <td>version</td>
         <td>3.0.0-beta.18.6</td>
         <td>
            The version code of the migration that should be queried.
         </td>
      </tr>
   </tbody>
</table>

##### Response

###### Success | Code: 200

##### Response Headers

<table class="table table-hover">
   <thead>
      <tr>
         <th>Key</th>
         <th>Value</th>
      </tr>
   </thead>
   <tbody>
      <tr>
         <td>Vary</td>
         <td>Origin</td>
      </tr>
      <tr>
         <td>Content-Security-Policy</td>
         <td>block-all-mixed-content</td>
      </tr>
      <tr>
         <td>Strict-Transport-Security</td>
         <td>max-age=31536000; includeSubDomains</td>
      </tr>
      <tr>
         <td>X-Frame-Options</td>
         <td>SAMEORIGIN</td>
      </tr>
      <tr>
         <td>X-XSS-Protection</td>
         <td>1; mode=block</td>
      </tr>
      <tr>
         <td>Content-Type</td>
         <td>application/json; charset=utf-8</td>
      </tr>
      <tr>
         <td>X-Powered-By</td>
         <td>
            Strapi
            <strapi.io></strapi.io>
         </td>
      </tr>
      <tr>
         <td>Content-Length</td>
         <td>37</td>
      </tr>
      <tr>
         <td>Date</td>
         <td>Fri, 24 Jan 2020 07:41:33 GMT</td>
      </tr>
      <tr>
         <td>Connection</td>
         <td>keep-alive</td>
      </tr>
   </tbody>
</table>

```json
{ 
   "message":"Data migration complete"
}
```

###### Migration not found | Code: 404

##### Response Headers

<table class="table table-hover">
   <thead>
      <tr>
         <th>Key</th>
         <th>Value</th>
      </tr>
   </thead>
   <tbody>
      <tr>
         <td>Vary</td>
         <td>Origin</td>
      </tr>
      <tr>
         <td>Content-Security-Policy</td>
         <td>block-all-mixed-content</td>
      </tr>
      <tr>
         <td>Strict-Transport-Security</td>
         <td>max-age=31536000; includeSubDomains</td>
      </tr>
      <tr>
         <td>X-Frame-Options</td>
         <td>SAMEORIGIN</td>
      </tr>
      <tr>
         <td>X-XSS-Protection</td>
         <td>1; mode=block</td>
      </tr>
      <tr>
         <td>Content-Type</td>
         <td>application/json; charset=utf-8</td>
      </tr>
      <tr>
         <td>X-Powered-By</td>
         <td>
            Strapi
            <strapi.io></strapi.io>
         </td>
      </tr>
      <tr>
         <td>Content-Length</td>
         <td>121</td>
      </tr>
      <tr>
         <td>Date</td>
         <td>Fri, 24 Jan 2020 07:40:03 GMT</td>
      </tr>
      <tr>
         <td>Connection</td>
         <td>keep-alive</td>
      </tr>
   </tbody>
</table>

```json
{
   "statusCode":404,
   "error":"Not Found",
   "message":"The migration with version code \"3.0.0-beta.18.5\" could not be found"
}
```

## **Edit Content Types**  |  **PATCH**   http://localhost:1337/migrations/:version

### Migration.editMigration

Edit the content-types as well as their names 

#### Headers

<table class="table table-hover">
   <thead>
      <tr>
         <th>Key</th>
         <th>Value</th>
         <th>Description</th>
      </tr>
   </thead>
   <tbody>
      <tr>
         <td>Content-Type</td>
         <td>application/json</td>
         <td></td>
      </tr>
      <tr>
         <td>Accept</td>
         <td>application/json</td>
         <td>
            Needed for javascript implementation because fetch will throw an error otherwise.
         </td>
      </tr>
   </tbody>
</table>

##### URL Variables

<table class="table table-hover">
   <thead>
      <tr>
         <th>Key</th>
         <th>Value</th>
         <th>Description</th>
      </tr>
   </thead>
   <tbody>
      <tr>
         <td>version</td>
         <td>3.0.0-beta.18.6</td>
         <td>
            The version code of the migration that should be queried.
         </td>
      </tr>
   </tbody>
</table>

##### Body

```json
{
   "shapes":[
      {
         "name":"lecture",
         "exportAs":"book",
         "shape":{
            "info":{
               "name":"Book"
            },
            "options":{
               "increments":true,
               "timestamps":true
            },
            "attributes":{
               "title":{
                  "type":"string"
               },
               "description":{
                  "type":"text"
               }
            },
            "connection":"default",
            "collectionName":"books"
         }
      }
   ]
}
```

##### Response

###### No models provided | Code: 422

##### Response Headers

<table class="table table-hover">
   <thead>
      <tr>
         <th>Key</th>
         <th>Value</th>
      </tr>
   </thead>
   <tbody>
      <tr>
         <td>Vary</td>
         <td>Origin</td>
      </tr>
      <tr>
         <td>Content-Security-Policy</td>
         <td>block-all-mixed-content</td>
      </tr>
      <tr>
         <td>Strict-Transport-Security</td>
         <td>max-age=31536000; includeSubDomains</td>
      </tr>
      <tr>
         <td>X-Frame-Options</td>
         <td>SAMEORIGIN</td>
      </tr>
      <tr>
         <td>X-XSS-Protection</td>
         <td>1; mode=block</td>
      </tr>
      <tr>
         <td>Content-Type</td>
         <td>application/json; charset=utf-8</td>
      </tr>
      <tr>
         <td>X-Powered-By</td>
         <td>
            Strapi
            <strapi.io></strapi.io>
         </td>
      </tr>
      <tr>
         <td>Content-Length</td>
         <td>92</td>
      </tr>
      <tr>
         <td>Date</td>
         <td>Fri, 24 Jan 2020 06:48:15 GMT</td>
      </tr>
      <tr>
         <td>Connection</td>
         <td>keep-alive</td>
      </tr>
   </tbody>
</table>

```json
{
"statusCode":422,
"error":"Unprocessable Entity",
"message":"Please provide models to edit."
}
```

###### Version not found | Code: 404

##### Response Headers

<table class="table table-hover">
   <thead>
      <tr>
         <th>Key</th>
         <th>Value</th>
      </tr>
   </thead>
   <tbody>
      <tr>
         <td>Vary</td>
         <td>Origin</td>
      </tr>
      <tr>
         <td>Content-Security-Policy</td>
         <td>block-all-mixed-content</td>
      </tr>
      <tr>
         <td>Strict-Transport-Security</td>
         <td>max-age=31536000; includeSubDomains</td>
      </tr>
      <tr>
         <td>X-Frame-Options</td>
         <td>SAMEORIGIN</td>
      </tr>
      <tr>
         <td>X-XSS-Protection</td>
         <td>1; mode=block</td>
      </tr>
      <tr>
         <td>Content-Type</td>
         <td>application/json; charset=utf-8</td>
      </tr>
      <tr>
         <td>X-Powered-By</td>
         <td>
            Strapi
            <strapi.io></strapi.io>
         </td>
      </tr>
      <tr>
         <td>Content-Length</td>
         <td>121</td>
      </tr>
      <tr>
         <td>Date</td>
         <td>Fri, 24 Jan 2020 06:23:57 GMT</td>
      </tr>
      <tr>
         <td>Connection</td>
         <td>keep-alive</td>
      </tr>
   </tbody>
</table>

```json
{
   "statusCode":404,
   "error":"Not Found",
   "message":"The migration with version code \"3.0.0-beta.18.5\" could not be found"
}
```

###### Success | Code: 200

##### Response Headers

<table class="table table-hover">
   <thead>
      <tr>
         <th>Key</th>
         <th>Value</th>
      </tr>
   </thead>
   <tbody>
      <tr>
         <td>Vary</td>
         <td>Origin</td>
      </tr>
      <tr>
         <td>Content-Security-Policy</td>
         <td>block-all-mixed-content</td>
      </tr>
      <tr>
         <td>Strict-Transport-Security</td>
         <td>max-age=31536000; includeSubDomains</td>
      </tr>
      <tr>
         <td>X-Frame-Options</td>
         <td>SAMEORIGIN</td>
      </tr>
      <tr>
         <td>X-XSS-Protection</td>
         <td>1; mode=block</td>
      </tr>
      <tr>
         <td>Content-Type</td>
         <td>application/json; charset=utf-8</td>
      </tr>
      <tr>
         <td>X-Powered-By</td>
         <td>
            Strapi
            <strapi.io></strapi.io>
         </td>
      </tr>
      <tr>
         <td>Content-Length</td>
         <td>255</td>
      </tr>
      <tr>
         <td>Date</td>
         <td>Fri, 24 Jan 2020 07:00:01 GMT</td>
      </tr>
      <tr>
         <td>Connection</td>
         <td>keep-alive</td>
      </tr>
   </tbody>
</table>

```json
{
   "shapes":[
      {
         "name":"book",
         "exportAs":"lecture",
         "shape":{
            "info":{
               "name":"Lecture"
            },
            "options":{
               "increments":true,
               "timestamps":true
            },
            "attributes":{
               "title":{
                  "type":"string"
               },
               "description":{
                  "type":"text"
               }
            },
            "connection":"default",
            "collectionName":"lectures"
         }
      }
   ]
}
```

## **Import Content-Types**  |  **GET**   http://localhost:1337/migrations/:version/read

### Migration.importMigration

Clones the created folders back into the root directory of the new project.

#### Headers

<table class="table table-hover">
<thead>
   <tr>
      <th>Key</th>
      <th>Value</th>
      <th>Description</th>
   </tr>
</thead>
<tbody>
   <tr>
      <td>Content-Type</td>
      <td>application/json</td>
      <td></td>
   </tr>
   <tr>
      <td>Accept</td>
      <td>application/json</td>
      <td>
         Needed for javascript implementation because fetch will throw an error otherwise.
      </td>
   </tr>
</tbody>
</table>

##### URL Variables

<table class="table table-hover">
   <thead>
      <tr>
         <th>Key</th>
         <th>Value</th>
         <th>Description</th>
      </tr>
   </thead>
   <tbody>
      <tr>
         <td>version</td>
         <td>3.0.0-beta.18.6</td>
         <td>
            The version code of the migration that should be queried.
         </td>
      </tr>
   </tbody>
</table>

##### Response

###### Success | Code: 200

##### Response Headers

<table class="table table-hover">
   <thead>
      <tr>
         <th>Key</th>
         <th>Value</th>
      </tr>
   </thead>
   <tbody>
      <tr>
         <td>Vary</td>
         <td>Origin</td>
      </tr>
      <tr>
         <td>Content-Security-Policy</td>
         <td>block-all-mixed-content</td>
      </tr>
      <tr>
         <td>Strict-Transport-Security</td>
         <td>max-age=31536000; includeSubDomains</td>
      </tr>
      <tr>
         <td>X-Frame-Options</td>
         <td>SAMEORIGIN</td>
      </tr>
      <tr>
         <td>X-XSS-Protection</td>
         <td>1; mode=block</td>
      </tr>
      <tr>
         <td>Content-Type</td>
         <td>application/json; charset=utf-8</td>
      </tr>
      <tr>
         <td>X-Powered-By</td>
         <td>
            Strapi
            <strapi.io></strapi.io>
         </td>
      </tr>
      <tr>
         <td>Content-Length</td>
         <td>174</td>
      </tr>
      <tr>
         <td>Date</td>
         <td>Fri, 24 Jan 2020 07:05:08 GMT</td>
      </tr>
      <tr>
         <td>Connection</td>
         <td>keep-alive</td>
      </tr>
   </tbody>
</table>

```json
{
   "info":{
      "version":"3.0.0-beta.18.6",
      "customization":false,
      "createdAt":"2020-01-24T06:45:58.810Z"
   },
   "types":{
      "count":1,
      "shapes":[
         "book"
      ]
   },
   "components":{
      "count":0,
      "shapes":[

      ]
   }
}
```

###### Version not found | Code: 404

##### Response Headers

<table class="table table-hover">
   <thead>
      <tr>
         <th>Key</th>
         <th>Value</th>
      </tr>
   </thead>
   <tbody>
      <tr>
         <td>Vary</td>
         <td>Origin</td>
      </tr>
      <tr>
         <td>Content-Security-Policy</td>
         <td>block-all-mixed-content</td>
      </tr>
      <tr>
         <td>Strict-Transport-Security</td>
         <td>max-age=31536000; includeSubDomains</td>
      </tr>
      <tr>
         <td>X-Frame-Options</td>
         <td>SAMEORIGIN</td>
      </tr>
      <tr>
         <td>X-XSS-Protection</td>
         <td>1; mode=block</td>
      </tr>
      <tr>
         <td>Content-Type</td>
         <td>application/json; charset=utf-8</td>
      </tr>
      <tr>
         <td>X-Powered-By</td>
         <td>
            Strapi
            <strapi.io></strapi.io>
         </td>
      </tr>
      <tr>
         <td>Content-Length</td>
         <td>121</td>
      </tr>
      <tr>
         <td>Date</td>
         <td>Fri, 24 Jan 2020 06:23:57 GMT</td>
      </tr>
      <tr>
         <td>Connection</td>
         <td>keep-alive</td>
      </tr>
   </tbody>
</table>

```json
{
   "statusCode":404,
   "error":"Not Found",
   "message":"The migration with version code \"3.0.0-beta.18.5\" could not be found"
}
```
