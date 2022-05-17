import * as anchor from "@project-serum/anchor";

const CHAINLINK_FEED = "HgTtcbcmp5BeThax5AU8vg4VwK79qAvAKKFMs8txMLW6";
const CHAINLINK_PROGRAM = "HEvSKofvBgfaexv23kMabbYqxasxU3mQ4ibBMEmJWHny";

describe("chainlink_dapp", () => {
  const provider = anchor.Provider.env();
  anchor.setProvider(provider);
  const program = anchor.workspace.ChainlinkDapp;

  it('Query Sol Price', async() => {
    const resultAccount = anchor.web3.Keypair.generate();
    await program.rpc.execute({
      accounts: {
        resultAccount: resultAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
        chainlinkFeed: CHAINLINK_FEED,
        chainlinkProgram: CHAINLINK_PROGRAM, 
      },
      signers: [resultAccount]
    });

    const lastestPrice = await program.accounts.resultAccount.fetch(resultAccount.publicKey);
    console.log("Price is: " + lastestPrice.value);
  })
});
