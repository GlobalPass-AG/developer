---
sidebar_position: 1
---

# Authentication

To access our portal, go to:

[https://portal-test.globalpass.ch](https://portal-test.globalpass.ch/) (development)

[https://portal.globalpass.ch](https://portal.globalpass.ch/) (production)

:::tip
For access rights to GlobalPass portal, **please contact GlobalPass support**.
:::

The Screenings API requires an access token. To get it, you must first make an HTTP POST request to one of our OAuth 2.0 endpoints:

[https://identity-test.globalpass.ch/connect/token](https://identity-test.globalpass.ch/connect/token) (development)

[https://identity.globalpass.ch/connect/token](https://identity.globalpass.ch/connect/token) (production)

Request headers:

**Authorization:** Basic EncodeBase64("your\_client\_id:your\_client\_secret")

**Content-Type:** application/x-www-form-urlencoded

Request body:

**grant_type : client_credentials**

```bash title="Example request"
curl --location --request POST 'https://identity-test.globalpass.ch/connect/token' --header 'Authorization: Basic NmY5YzY3ZGQtMzAxOC00OTlkLWFlZGUtMzg2NTlhNTQ2ODkwOktCb0lzcGplRks5bFhZU25ET1ZN' --header 'Content-Type: application/x-www-form-urlencoded' --data-urlencode 'grant\_type=client\_credentials'
```

```js title="Example response"
{
    "accesstoken": "eyJhbGciOiJSUzI1NiIsImtpZCI6IkJwNTI2N3ZGLVNsRENyV2ZDQ0NtYUEiLCJ0eXAiOiJhdCtqd3QifQ.eyJuYmYiOjE2NDk4MzU2NjcsImV4cCI6MTY0OTgzOTI2NywiaXNzIjoiaHR0cHM6Ly9pZGVudGl0eS10ZXN0Lmdsb2JhbHBhc3MuY2giLCJhdWQiOlsiSWRlbnRpdHlTZXJ2ZXJBcGkiLCJzY3JlZW5pbmdzIl0sImNsaWVudF9pZCI6IjZmOWM2N2RkLTMwMTgtNDk5ZC1hZWRlLTM4NjU5YTU0Njg5MCIsImNsaWVudF9uYW1lIjoiRGVtbyBDb21wYW55MzY4MjIyNzEtODYwMS00OWQwLTllZGQtZDgwNDFhOWVkY2NlIiwic2NvcGUiOlsiSWRlbnRpdHlTZXJ2ZXJBcGkiLCJJZGVudGl0eVNlcnZlckFwaS5yZWFkX2NsaWVudF9kZXRhaWxzIiwic2NyZWVuaW5ncyJdfQ.d3YiIcok2iuDNJHFmcT0hIqhhgvcQKBKQKZcWQALte6Fdct9u3iIYOFDeKHl9yIzrzcQ1dgdnPeugz58NhDO0ZatGLLFJSr7E7TiTJyzvaIyGtbqzRCPv87PPM4-NJuw1crjN0ziutTdy0ZMwHJORwt60SICoxyk0apqEiCgwMQwiL8K87LIHt8a1i-z-XCRTksCbxN8TqxmU8sik3y6R1kef80JveZ93W8mI1gUPYZ0hDPj5DbwrVxqod3VL6LyjDLOJMiCxOZZa4rKlTozER23lsadvqbeT1el7jWnCbPWbP5Lk6zKH2BMIsaNLpZUE\_PsV0n8ywQxewcAQORDJg",
    "expires_in": 3600,
    "token_type": "Bearer",
    "scope": "IdentityServerApi IdentityServerApi.read_client_details screenings"
}
```

When making subsequent requests to the screenings API, provide the access token in the Authorization header using the Bearer scheme.
