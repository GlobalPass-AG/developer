---
sidebar_position: 1
---
# Transaction Screening

To initiate a crypto transaction screening, make an HTTP POST request to:

_/api/v2/crypto/transactions_

```bash title="Example request"
curl -X 'POST' 'https://screenings-api-test.globalpass.ch/api/v2/crypto/transactions' -H 'accept: text/plain' -H 'Authorization: Bearer {your_access_token}' -H 'Content-Type: application/json' -d '{"blockchain": "string","ticker": "string","hash": "string","direction": "string","outputAddress": "string","outputIndices": [0]"logIndex": 0,"externalId": "string"}
```

Note that crypto transaction request parameters depend on the asset of the screened transaction, which is explained below.

| Property | Description |
| -------- | ----------- |
| blockchain | Full name of the blockchain of the screened transaction. _Required value_. |
| ticker | Ticker of the asset of the screened transaction. _Required value_. |
| hash | Transaction hash. _Required value_. |
| direction | Specification whether you will be running a source or destination of funds analysis. _Required value_: 

> Possible **direction** values:
- source_of_funds – gets details of the entities that have contributed funds to the transaction's source address and calculates a risk score based on this exposure
- destination_of_funds – gets details of the entities that funds have gone to from this transaction's destination address and calculate a risk score based on this exposure

Additional properties may be required in some cases:

| Property | Description |
| -------- | ----------- |
| outputAddress | Address of the output wallet of the transaction. _Required value only for Bitcoin and Tron blockchain transactions_, as these assets can have multiple outputs. For example, if you are analyzing a deposit into your service then you might want to specify the output address that belongs to your service. Or for a withdrawal, it might be the output address that your customer wants to send funds to. |
| outputIndices | Zero-indexed output indices, an alternative method of specifying the relevant output of the transaction if output address is unknown. When specifying the output(s) by indices, if the provided indices reference multiple distinct addresses, the API will respond with an error. |
| logIndex | [log_index](https://web3js.readthedocs.io/en/v1.2.9/web3-eth-contract.html?highlight=logindex#id37) is a necessary parameter for Ethereum blockchain transactions (except from Ether) that contain multiple ERC20 token transfers. If a screened transaction contains transfers of than more than one token, the API will respond with an error requesting to specify the log\_index value. _Optional value for all Ethereum blockchain assets except from Ether_. |
| externalId | Unique identifier of the user in your system. _Required value_. |

```js title="Example Bitcoin Destination of Funds request body"
{
    "blockchain": "bitcoin",
    "ticker": "BTC",
    "hash": "166e2010fd6141b65ac6659ed93b832787ae6241a4998dd0db61189869d1f32e",
    "direction": "destination_of_funds",
    "outputAddress": "3FjSB2Db9KiJi1KLRwvctwZ23an2yV8vwF",
    "externalId": "User123"
}
```

```js title="Example Ether Destination of Funds request body"
{
    "blockchain": "ethereum",
    "ticker": "ETH",
    "hash": "0x8f421010cb339e407a431712bb6f75921e80abc78a2f53e34dc51479ba87bb4d",
    "direction": "destination_of_funds",
    "externalId": "ABC001"}
```

```js title="Example USDT (Ethereum) Source of Funds request body"
{
    "blockchain": "ethereum",
    "ticker": "USDT",
    "hash": "0x8f421010cb339e407a431712bb6f75921e80abc78a2f53e34dc51479ba87bb4d",
    "direction": "source_of_funds",
    "logIndex": "125",
    "externalId": "A0001"
}
```

```js title="Example USDT (Tron) Source of Funds request body"
{
    "blockchain": "tron",
    "ticker": "USDT",
    "hash": "53a5ff1fc8c656deb96e51fe13efecb0770fe0ca0e911a25e75711a466079e6f",
    "direction": "source_of_funds",
    "outputAddress": "TVj43VT4UXej73FEcrPCs2Tcm6bcZfH92Q",
    "externalId": "DEF501"
}
```

Responses will be unified in all request types.

```js title="Example response"
{
    "id": "84a077e384697a97d69edd9i",
    "screeningToken": "b101d8d6-de0f-45e9-9509-0d43258a416f",
    "created": "2022-12-19T11:55:14.0377769+00:00",
    "riskScore": 10
}
```

Where:

| Property | Description |
| -------- | ----------- |
| id | Unique identifier of the specific screening of the transaction. If rescreening of the same transaction will be performed, the ID value will refer to the exact screening of the same transaction. |
| screeningToken | Unique identifier of the screened transaction in the GlobalPass system |
| created | Timestamp of when the specific screening of the transaction was performed |
| riskScore | Transaction's risk value based on exposure in the screened direction, between 0 (no risk rules triggered) and 10 (highest possible risk level) |

To get status of any given transaction screening, make an HTTP GET request to

_/api/v2/crypto/transactions/{screeningToken}_

```bash title="Example request"
curl -X 'GET' \'https://screenings-api-test.globalpass.ch/api/v2/crypto/transactions/b101d8d6-de0f-45e9-9509-0d43258a416f' \-H 'accept: text/plain' \-H 'Authorization: Bearer {your_access_token}'
```

```js title="Example response"
{
    "id": "84a077e384697a97d69edd9i",
    "screeningToken": "b101d8d6-de0f-45e9-9509-0d43258a416f",
    "created": "2022-12-19T11:55:14.0377769+00:00",
    "riskScore": 10
}
```

To access any given latest transaction screening report, you can navigate to:

* [https://portal-test.globalpass.ch/crypto-screenings/transaction/{screeningToken}](https://portal-test.globalpass.ch/crypto-screenings/transaction/%7BscreeningToken%7D) (*sandbox*)
* [https://portal.globalpass.ch/crypto-screenings/transaction/{screeningToken}](https://portal.globalpass.ch/crypto-screenings/transaction/%7BscreeningToken%7D) (*production*)

To access a specific historical transaction screening report, you can navigate to:

* [https://portal-test.globalpass.ch/crypto-screenings/transaction/{screeningToken}/{id}](https://portal-test.globalpass.ch/crypto-screenings/transaction/%7BscreeningToken%7D/%7Bid%7D) (*sandbox*)
* [https://portal.globalpass.ch/crypto-screenings/transaction/{screeningToken}/{id}](https://portal.globalpass.ch/crypto-screenings/transaction/%7BscreeningToken%7D/%7Bid%7D) (*production*)
