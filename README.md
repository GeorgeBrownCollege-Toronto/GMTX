# GMTX - A protocol for generalized meta-transaction

## Introduction

### What is a meta-transaction?

From Metamask's [post](https://medium.com/metamask/announcing-a-generalized-metatransaction-contest-abd4f321470b):
> Today, our users have to hold ether in every account to pay transaction fees for even the smallest interaction, to prevent them from spamming the network. This is a lot of overhead, especially when in many cases, a third party may be willing to pay a user’s transaction fees. This pattern of third-party transaction fee payment is known as Meta-Transactions, as popularized by [Austin Thomas Griffith](https://medium.com/@austin_48503).
>
> There are two major ways that MetaTransactions can become available to users, and we are working towards both, but this bounty will focus on the latter.
>
> **The Contract Account Approach**
>
> We look forward to allowing every user to have a contract-based account, and these accounts could support MetaTransactions natively. We are currently facilitating this goal with our [Snaps plugin system](https://medium.com/metamask/introducing-the-next-evolution-of-the-web3-wallet-4abdf801a4ee), which will eventually support any number of different account types, such as the Gnosis Safe wallet, which already supports this type of MetaTransaction today.
>
> **The Contract Based Approach**
>
> The second major approach to allowing MetaTransactions is for contracts to expose a MetaTransaction processing method on themselves. We have seen some projects recently begin driving this forward, with [Bounties Network](https://medium.com/bounties-network/going-live-with-meta-transactions-a425ab6b6994) ([code](https://github.com/Bounties-Network/StandardBounties/blob/master/contracts/StandardBounties.sol)) and Dai Stablecoin‘s [permit method](https://medium.com/@Degens/betting-without-eth-dais-new-permit-feature-5517293f3246) each exposing methods to facilitate third-party gas payment.
>
> These approaches stand out because they do not require widespread adoption of a single type of account: Your dapp doesn’t need to handle each kind of contract account a user has, and it works out of the box today, and will continue to work for any key-authenticated method in the future.
>
> Even once we support contract accounts, we expect there will still be some normal, external-key-based accounts, either to reduce the cost of publishing a contract for the account, or because a key may be used to manage a very small quantity of funds or permissions.

### Why should I consider it for my dapp

Using the GMTX toolkit will simply had generalized meta-transaction to your smart contract, without the need to duplicate code between the "classic" methods and the "meta-transaction enabled" ones. All public and external methods are automatically accessible through ERC712 signed messages, opening gas-free options for your users.

### Whats difficult about it?

Account based meta-transaction are pretty well understood, and some actual products are currently making use of this design. [Argent](https://www.argent.xyz/) has been using meta-transaction for a long time, and it works great without users even knowing about it. [UniversalLogin](https://universallogin.io/) is proposing an amazing toolkit to deploy meta-transaction powered multisig and have web3 application interact with it. Many other projects (uport, gnosis, authereum, kitsune-wallet, ..., i'm sure i'm forgeting some) are also working in this space, and they all have one thing in common: each user has its own smart contract that relays metatransaction, and the address of this proxy is the "identity" of the user. This is the address apps see, its often associated with an ENS name, and its the address actually owning the user's assets. These user owned smart contracts can implement many security / recovery features but they are expensive to deploy, and are only worth it once the user as some assets that are really worth securing (here we could talk about counterfactual deployment and predictable addresses, but its not really today's topic).

Contract based meta-transaction, like the one used by Dai in the `permit` method are very different. As they are not relayed by a proxy, the `msg.sender` seen by the app is not the identity of the user. This is one of the main drawback of the [GSN](https://gsn.openzeppelin.com/) which needs proxy on top of it to accurately identify the users. If you don't want to deploy one proxy per user, but you still want an app to understand which user is interacting with you, regardless of who relays the transaction, then the app needs an additional mechanism to understand the true origin of a meta-transaction. Dai did it in the restricted context of their own smart contract, GMTX tries to provide a framework for any app to do so as easily as possible.

## Using GMTX in my dapp

### How to?

To enable GMTX on a smart contract follow the following steps:

- Inherit from the [GMTXReceiver contract](https://github.com/Amxx/GMTX/tree/master/core/contracts).
- Replace all references to `msg.sender` with call to the internal function `_msgSender()`.

That's it! You can see an example usecase [here](https://github.com/Amxx/GMTX/blob/master/core/contracts/utils/MessageHub.sol). Live frontend is [here](https://gmtx.app.hadriencroubois.com).

### Security concerns

GMTX has been designed with security in mind. Still, this is early work and we do not recommand to use it in production just yet. Review by the community is needed before to build trust on this design.

**Dangerous cases:**

- Your smart contracts allows user to perform arbitrary calls to any address (`address(...).call(...)`):
	- **DO NOT USE GMTX !** (users can impersonate someone else)
- Your smart contracts performs calls to itself (`this.functionName(...)`):
	- **ENABLE THE MIRROR MODE** (`_msgSender` would not be reliable unless you enable the mirror mode: pass `true` to the GMTXReceiver's constructor)


## How does it work?

### GMTXReceiver smart contract

### Direct vs Mirror Mode

### Writting and signing a gmtx meta-transaction

### Relaying a gmtx meta-transaction

## Authors & Contributors

- Hadrien Croubois <hadrien.croubois@gmail.com>
  - Protocole design
  - Solidity toolkit
  - Demo app
  - Documentation (this Readme)
