import { Address, BigInt } from "@graphprotocol/graph-ts";
import {
  Transfer as TransferEvent,
  Hashmasks,
} from "../generated/Hashmasks/Hashmasks";
import { Transfer, Owner, Contract, Token } from "../generated/schema";

export function handleTransfer(event: TransferEvent): void {
  let transfer = new Transfer(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  );
  transfer.blockNumber = event.block.number;
  transfer.timestamp = event.block.timestamp;

  let tokenId =
    event.address.toHexString() + "-" + event.params.tokenId.toString();
  let to = getOrCreateOwner(event.params.to);
  let from = getOrCreateOwner(event.params.from);
  let contract = Contract.load(event.address);
  let instance = Hashmasks.bind(event.address);
  let token = Token.load(tokenId);

  // Do not go to minus with null-address
  if (from.balance > BigInt.fromI32(0)) {
    from.balance = from.balance.minus(BigInt.fromI32(1));
  }

  to.balance = to.balance.plus(BigInt.fromI32(1));

  if (contract == null) {
    contract = new Contract(event.address);
    contract.totalSupply = BigInt.fromI32(0);
    let name = instance.try_name();
    if (!name.reverted) {
      contract.name = name.value;
    }
    let symbol = instance.try_symbol();
    if (!symbol.reverted) {
      contract.symbol = symbol.value;
    }
  }

  if (token == null) {
    token = new Token(tokenId);
    token.number = event.params.tokenId;
    token.contract = contract.id;
    // let uri = instance.try_tokenURI(event.params.tokenId);
    // if (!uri.reverted) {
    //   token.uri = uri.value;
    // }
    contract.totalSupply = contract.totalSupply.plus(BigInt.fromI32(1));
  }
  
  token.owner = to.id;
  transfer.from = from.id;
  transfer.to = to.id;
  transfer.transactionHash = event.transaction.hash;
  transfer.token = token.id;
  to.save();
  from.save();
  transfer.save();
  token.save();
}

export function getOrCreateOwner(id: Address): Owner {
  let owner = Owner.load(id.toHexString());
  if (owner == null) {
    owner = new Owner(id.toHexString());
    owner.balance = BigInt.fromI32(0);
    owner.save();
  }
  return owner;
}
