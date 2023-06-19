# NFT Subgraph Workshop

## Slides

[![Top Slide](./slide1.png)](https://docs.google.com/presentation/d/1-jZd4Sp83YW6r2KhXYeU4sOlKdcmp0LVi3WF1VAkxzk/edit?usp=sharing)

## Cheatsheet

[![Cheatsheet](./cheatsheet.png)](./cheatsheet_Design_ETH_SF.pdf)

## Good subgraphs:

- [Messari Subgraphs](https://subgraphs.messari.io)
- [EIP-721 (NFTS on The Graph Network)](https://thegraph.com/explorer/subgraph?id=AVZ1dGwmRGKsbDAbwvxNmXzeEkD48voB3LfGqj5w7FUS&view=Overview)
- [Lens Protocol](https://thegraph.com/hosted-service/subgraph/anudit/lens-protocol)
- [Unlock Protocol on The Graph Network](https://thegraph.com/explorer/subgraph?id=8u7KcVRxjtTDRgEJup3UuPJk6YoRDTHNpSMk5BEpdw42&view=Overview)
- [Open Sea Subgraph](https://thegraph.com/hosted-service/subgraph/protofire/opensea-wyvern-exchange-subgraph)
- [LiNEAR](https://thegraph.com/hosted-service/subgraph/linear-protocol/linear)
- [Aave Gotchi](https://thegraph.com/hosted-service/subgraph/aavegotchi/aavegotchi-core-matic)
- [Tellor](https://thegraph.com/hosted-service/subgraph/tellor-io/tellorxoraclemainhgraph)
- [Live Peer](https://thegraph.com/hosted-service/subgraph/livepeer/arbitrum-one)
- [ENS](https://thegraph.com/hosted-service/subgraph/ensdomains/ens)
- [UMA on The Graph Network](https://thegraph.com/explorer/subgraph?id=41LCrgtCNBQyDiVVyZEuPxbvkBH9BxxLU3nEZst77V8o&view=Overview)

## Info

- [Contract to index](https://etherscan.io/address/0xc2c747e0f7004f9e8817db2ca4997657a7746928)
- [Google Slides for NFT Subgraph Development Workshop](https://docs.google.com/presentation/d/1-jZd4Sp83YW6r2KhXYeU4sOlKdcmp0LVi3WF1VAkxzk/edit?usp=sharing)
- Questions: **[twitter.com/schmid_si](https://twitter.com/schmid_si)**

## Prerequisites

- Install graph-cli: `yarn global add @graphprotocol/graph-cli`

## First Steps

- [Find the contract on Etherscan](https://etherscan.io/address/0xc2c747e0f7004f9e8817db2ca4997657a7746928)
- [Find the contract creation transaction for startBlock](https://etherscan.io/tx/0xe9e60dc12e1a7bc545aa497bc494f5f54ce81da06de4f6fef50459816218e66b)
- Download the ABI

- Run this command to initialise the subgraph with events:

```bash
graph init \
    --studio \
    --protocol ethereum \
    --from-contract 0xc2c747e0f7004f9e8817db2ca4997657a7746928 \
    --index-events \
    --contract-name Hashmasks \
    --network mainnet \
    hashmasks hashmasks-subgraph
```

- Inspect the source
- Change startblock:

```
source:
    address: "0xc2c747e0f7004f9e8817db2ca4997657a7746928"
    abi: Hashmasks
    startBlock: 11743743
```

– Create new subgraph on [Subgraph Studio](https://thegraph.com/studio/) named "Hashmasks"

- `graph auth --studio ...`
- `yarn deploy`

## Remove unused Entities and Events

```graphql
# schema.graphql
type Transfer @entity {
  id: ID!
  from: Bytes! # address
  to: Bytes! # address
  tokenId: BigInt! # uint256
}
```

### Extend events

Make them immutable for performance improvements

```graphql
type Transfer @entity(immutable: true) {
  id: ID!
  from: Bytes! # address
  to: Bytes! # address
  tokenId: BigInt! # uint256
  timestamp: BigInt!
  blockNumber: BigInt!
}
```

Use `event.transaction.hash.toHex() + "-" + event.logIndex.toString()` as the id for events

```typescript
export function handleTransfer(event: TransferEvent): void {
  let entity = new Transfer(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  );
  entity.blockNumber = event.block.number;
  entity.timestamp = event.block.timestamp;
  entity.from = event.params.from;
  entity.to = event.params.to;
  entity.tokenId = event.params.tokenId;
  entity.save();
}
```

### Store logical entities

- Identify the important entities: Token, Owner, Contract
- Link them

```graphql
type Transfer @entity(immutable: true) {
  id: ID!
  from: Owner!
  to: Owner!
  token: Token!
  timestamp: BigInt!
  blockNumber: BigInt!
}

type Token @entity {
  id: ID!
  owner: Owner
  uri: String
  transfers: [Transfer!]! @derivedFrom(field: "token")
  contract: Contract
}

type Owner @entity {
  id: Bytes! # Use bytes as ID
  ownedTokens: [Token!]! @derivedFrom(field: "owner")
  balance: BigInt
}

type Contract @entity {
  id: ID!
  name: String
  symbol: String
  totalSupply: BigInt
  mintedTokens: [Token!]! @derivedFrom(field: "contract")
}
```

## Other resources

- https://github.com/schmidsi/hackathon-starterkit
- https://github.com/scaffold-eth/scaffold-eth#-scaffold-eth
- https://soulbound.xyz
- https://github.com/Developer-DAO/resources
- https://dev.to/dabit3/the-complete-guide-to-full-stack-ethereum-development-3j13
- https://github.com/itsjerryokolo/CryptoPunks
- https://github.com/dabit3/building-a-subgraph-workshop
- https://thegraph.com/docs/developer/quick-start
- https://thegraph.com/discord
- https://protean-labs.github.io/subgrounds/
