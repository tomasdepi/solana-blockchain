const { Connection,
        PublicKey,
        Keypair,
        LAMPORTS_PER_SOL,
        clusterApiUrl
    } = require('@solana/web3.js')

const wallet = Keypair.generate()

const publicKey = wallet.publicKey
const secretKey = wallet.secretKey

const getBalance = async () => {
    try{
        const connection = new Connection(clusterApiUrl('devnet'), 'confirmed')
        const balance = await connection.getBalance(publicKey)
        console.log(balance)
    }catch(err){
        console.error(err)
    }
}

const airDropSol = async () => {
    try{
        const connection = new Connection(clusterApiUrl('devnet'), 'confirmed')
        const fromAirDropSignature = await connection.requestAirdrop(publicKey, 2e9)
        console.log('transaction hash', fromAirDropSignature)
        await connection.confirmTransaction(fromAirDropSignature)
    }catch(err){
        console.error(err)
    }
}

const main = async () => {
    console.log('public key: ', publicKey.toBase58())
    await getBalance()
    await airDropSol()
    await getBalance()
}
main()