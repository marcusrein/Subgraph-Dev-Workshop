# Welcome to Monad Subgraph Development! 🚀

This guide will help you get started with creating your first subgraph with The Graph to index your Monad smart contract.

Key features of The Graph:
- Decentralized indexing
- No vendor lock in 
- Highly customizable APIs (subgraphs!) that are adaptable to your needs
- Competitive pricing for dapps that scale
- Competitive indexing marketplace that competes for your queries
- Highly performant 
- Free rate limited development environment

## [Video presentation of this workshop](https://www.youtube.com/watch?v=7J1lt2Ao3s0)

## [ Workshop Slides ](https://docs.google.com/presentation/d/1MMgXx_GrufU_o0JdFhEmqpxRKAFyMAxSdYyGO-9kfnU/edit?usp=sharing)

## What is a Subgraph?

A subgraph is like a custom API for your smart contract. It indexes blockchain data so you can query it easily and efficiently.

## Prerequisites

Before you begin development, you'll need to set up your subgraph in Subgraph Studio:

1. Visit [Subgraph Studio](https://thegraph.com/studio/) and connect your wallet
2. Click "Create a Subgraph" and give it a name
   - Choose a memorable name as this will be your subgraph's identifier
   - This name will be used in deployment commands later

After completing these steps, you can proceed with the local development setup below.

## Development Workflow

### Subgraph Studio (Development Environment)
Subgraph Studio is your development workspace where you can:
- Iterate and test your subgraph with rate-limited queries
- Use version control to track changes
- Test queries in the playground
- View detailed indexing status
- Debug and optimize your subgraph

## Getting Started

Follow these steps in Subgraph Studio to set up and deploy your subgraph:

![Subgraph Studio Setup Steps](Subgraph-Studio.png)

### 1. Select a Network
Choose `Monad TESTNET` from the network dropdown in Subgraph Studio, as shown in step 1 of the image above.

### 2. Install Graph CLI
Skip this step if you have done this before, as noted in step 2 of the interface.

```bash
# Using yarn (recommended)
yarn global add @graphprotocol/graph-cli

# Using npm
npm install -g @graphprotocol/graph-cli

# Using pnpm
pnpm add -g @graphprotocol/graph-cli
```

### 3. Initialize Your Subgraph
This step scaffolds the boilerplate subgraph code, as shown in step 3 of the interface.

```bash
graph init monad-subgraph
```

For the sake of this example subgraph, we will index Wrapped Monad. 

When prompted, enter:
- Contract Address: `0x760AfE86e5de5fa0Ee542fc7B7B713e1c5425701`
- Start Block: `9000000`

Note: If the Monad Testnet endpoint doesn't return data, you can find the ABI in `abi.json` at the root of this project. The CLI will return data properly when Mainnet is operational.

### 4. Authenticate & Deploy
Following step 4 in the interface above:

```bash
# Authenticate your local environment with Subgraph Studio
graph auth --studio <DEPLOY-KEY>

# Navigate to your subgraph directory
cd monad-subgraph

# Generate code and build
graph codegen && graph build

# Deploy to Subgraph Studio
graph deploy monad-subgraph
```

That's it! Your subgraph will start indexing data from the Wrapped Monad smart contract. 🎉

## Project Structure

Here's what each file in your project does:

```
monad-subgraph/
├── schema.graphql     # Define your data structure
├── subgraph.yaml     # Configure your subgraph
├── src/              # Your indexing logic lives here
└── abis/            # Your contract's ABI goes here
```

### Publishing This Example Subgraph
When your subgraph is ready for production:
1. Test thoroughly in Subgraph Studio
2. Click "Publish" in the Subgraph Studio UI
3. Your subgraph will be deployed to The Graph's decentralized network
4. Queries will no longer be rate-limited
5. Your subgraph will be available in the Graph Explorer

### Example Published Subgraph
You can view our demo published subgraph here:
[Monad Subgraph Example](https://thegraph.com/explorer/subgraphs/7VNB7aPTL7Rjc2zdAKkajcCKCu565wDjceDcvhVabVED?view=Query&chain=arbitrum-one)

## Now Build Your Own!

Go through this flow again but this time with your own smart contract!

## Need Help?

- Join [The Graph Discord](https://thegraph.com/discord)
- Check [The Graph Docs](https://thegraph.com/docs/)

## More Features & Best Practices

### Aggregations and Time-Series Data
Subgraphs support powerful aggregation features. Here's an example of daily volume tracking:

```graphql
{
  dayData(first: 7, orderBy: date, orderDirection: desc) {
    date
    volumeUSD
    txCount
    activeUsers
  }
}
```

### Advanced Features Guide - Useful for DEXs, NFTs, and more!
Learn how to implement these powerful features in your subgraph:

1. **Time-Series Data**
   - [Time-Series Guide](https://thegraph.com/docs/en/cookbook/timeseries/) - Track historical data and create charts
   - Example: Daily, hourly, or custom interval aggregations

2. **Derived Fields**
   - [Using Derived Fields](https://thegraph.com/docs/en/cookbook/derivedfrom/) - Calculate values from other entities
   - Perfect for price calculations and aggregations

3. **Performance Optimization**
   - [Avoiding ETH Calls](https://thegraph.com/docs/en/cookbook/avoid-eth-calls/) - Make your subgraph faster
   - [Pruning Strategies](https://thegraph.com/docs/en/cookbook/pruning/) - Optimize data storage

4. **Entity Relationships**
   - [Entity Relationships Guide](https://thegraph.com/docs/en/developing/creating-a-subgraph/#entity-relationships)
   - Create complex data models with one-to-many and many-to-many relationships

For more advanced patterns and examples, check out:
- [Example Subgraphs Repository](https://github.com/graphprotocol/graph-tooling/tree/main/examples)
- [The Graph Cookbook](https://thegraph.com/docs/en/cookbook/quick-start/)

Happy indexing! 🎈

## 📚 Learning Resources

### Quick Start Videos
- [How to Deploy a Subgraph](https://www.youtube.com/watch?v=nGIFuC69bSA) (12 min)
- [Quick Bootstrap a Fullstack Dapp Subgraph](https://www.youtube.com/watch?v=obOEMAZ-05s)

### In-Depth Tutorials
- [Build a Full Stack Dapp](https://www.youtube.com/live/Gspa3YL6Rqk?si=sS3xaxjoW8H73CJW) (1hr 37min)
  - [📂 Workshop Repository](https://github.com/kmjones1979/full-stack-dapp-workshop)
- [Build a dApp with The Graph and Scaffold-ETH-2](https://mirror.xyz/cryptomastery.eth/uGHEHnskoVwX-mWjAiidXfGt6QowCoKl_yX4okwZc0E) (≈20min project)

### Advanced Topics
- [How to Index Factory Pattern Smart Contracts](https://thegraph.com/blog/data-source-templates/)
- [Example Subgraphs Repository](https://github.com/graphprotocol/graph-tooling/tree/main/examples)

### Best Practices Guides
- [Pruning Strategies](https://thegraph.com/docs/en/cookbook/pruning/)
- [Using Derived Fields](https://thegraph.com/docs/en/cookbook/derivedfrom/)
- [Immutable Entities & Bytes as IDs](https://thegraph.com/docs/en/cookbook/immutable-entities-bytes-as-ids/)
- [Avoiding ETH Calls](https://thegraph.com/docs/en/cookbook/avoid-eth-calls/)
- [Time Series Data](https://thegraph.com/docs/en/subgraphs/cookbook/timeseries/)
- [Grafting & Hotfixes](https://thegraph.com/docs/en/subgraphs/cookbook/grafting-hotfix/)
