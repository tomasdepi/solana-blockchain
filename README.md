# Solana

|                      | ETH 1.0        | ETH 2.0        | SOL                |
|----------------------|:--------------:|:--------------:|:------------------:|
| TPS                  | 15             | 100.000        | +50.000            |
| Confirmation         | 3 to 5 minutes | seconds        | 0.4 to 0.8 seconds |
| Cost                 | 10 to 30 USD   | ?              | 0.00025 USD        |
| Consensus Algorithm  | Proof of Work  | Proof of Stake | Proof of History   |
| Programming Language | Solidity       | Solidity       | Rust               |

## Rust Installation
```bash
curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh
```


## Install Solana

Since I'm in a M1 Mac I'm building from source, but for other platforms may be convinient download a pre-built version. A full guide depending on OS can be found here: https://github.com/LearnWithArjun/solana-env-setup

```bash
git clone https://github.com/solana-labs/solana.git/

cd solana
git checkout v1.10

./scripts/cargo-install-all.sh .
```

## Install Anchor
Anchor is the equivalent for Ethereum's Truffle or Hardhat. It's a Solana framework that help us to write, debug and deploy smart contracts

```bash
cargo install --git https://github.com/project-serum/anchor anchor-cli --locked
```

## Usuful Commands
### Solana
setup up new wallet: solana-keygen new
check balance: solana balance --url devnet
airdrop tokens: solana airdrop 2 {public_key} --url devnet


### Anchor
anchor init {project_name}
anchor build
anchor test