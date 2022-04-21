const assert = require('assert');
const anchor = require('@project-serum/anchor');
const { SystemProgram } = anchor.web3

describe("calculator-dapp", () => {
  const provider = anchor.Provider.local()
  // Configure the client to use the local cluster.
  anchor.setProvider(provider);

  const calculator = anchor.web3.Keypair.generate();
  const program = anchor.workspace.CalculatorDapp;

  it("Creates a calculator", async () => {
    // Add your test here.
    const tx = await program.rpc.create("Deploying", {
      accounts: {
        calculator: calculator.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [calculator]
    });
    const account = await program.account.calculator.fetch(calculator.publicKey);
    assert.ok(account.greeting == "Deploying");
  });

  it("Addition", async () => {
    await program.rpc.add(new anchor.BN(2), new anchor.BN(3), {
      accounts: {
        calculator: calculator.publicKey,
      }
    })
    const account = await program.account.calculator.fetch(calculator.publicKey);
    assert.ok(account.result.eq(new anchor.BN(5)));
  })

  it("Substraction", async () => {
    await program.rpc.sub(new anchor.BN(10), new anchor.BN(2), {
      accounts: {
        calculator: calculator.publicKey,
      }
    })
    const account = await program.account.calculator.fetch(calculator.publicKey);
    assert.ok(account.result.eq(new anchor.BN(8)));
  })

  it("Multiplication", async () => {
    await program.rpc.mul(new anchor.BN(3), new anchor.BN(7), {
      accounts: {
        calculator: calculator.publicKey,
      }
    })
    const account = await program.account.calculator.fetch(calculator.publicKey);
    assert.ok(account.result.eq(new anchor.BN(21)));
  })

  it("Division", async () => {
    await program.rpc.div(new anchor.BN(25), new anchor.BN(2), {
      accounts: {
        calculator: calculator.publicKey,
      }
    })
    const account = await program.account.calculator.fetch(calculator.publicKey);
    assert.ok(account.result.eq(new anchor.BN(12)));
    assert.ok(account.remainder.eq(new anchor.BN(1)));
  })
});
