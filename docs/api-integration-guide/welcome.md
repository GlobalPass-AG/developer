---
sidebar_position: 1
slug: /
hide_table_of_contents: true
---

# Welcome

Welcome to GlobalPass documentation. Our **KYC**, **AML** and **Crypto Compliance** solutions are designed to provide seamless integration with your system, enabling automation of your compliance processes in a quick and efficient manner.

In this documentation, you will find detailed information on how to integrate GlobalPass solutions into your system via Web API or Mobile SDK integration.

## Getting Started

Before you get started, you will need an **API key**, **API secret** and **access rights to GlobalPass portal**, which can be received by contacting GlobalPass support team at support@globalpass.ch.

To log in to **GlobalPass Portal**, navigate to:

- [https://portal-test.globalpass.ch](https://portal-test.globalpass.ch/) (_sandbox_)
- [https://portal.globalpass.ch](https://portal.globalpass.ch/) (_production_)

## Authentication

The Screenings API requires an access token. To get it, you must first make an HTTP POST request to one of our OAuth 2.0 endpoints:

- [https://identity-test.globalpass.ch/connect/token](https://identity-test.globalpass.ch/connect/token) (_sandbox_)
- [https://identity.globalpass.ch/connect/token](https://identity.globalpass.ch/connect/token) (_production_)

**Request headers:**

> Authorization: Basic EncodeBase64("your_client_id:your_client_secret")

> Content-Type: application/x-www-form-urlencoded

**Request data:**

> grant_type=client_credentials

```bash title="Example request"
curl --location --request POST 'https://identity-test.globalpass.ch/connect/token' --header 'Authorization: Basic NmY5YzY3ZGQtMzAxOC00OTlkLWFlZGUtMzg2NTlhNTQ2ODkwOktCb0lzcGplRks5bFhZU25ET1ZN' --header 'Content-Type: application/x-www-form-urlencoded' --data-urlencode 'grant_type=client_credentials'
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
