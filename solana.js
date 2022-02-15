const web3 = require("@solana/web3.js");

const getWalletBalance = async (pubk) => {
    try{
        const connection = new web3.Connection(web3.clusterApiUrl('devnet'), 'confirmed');
        const balance = await connection.getBalance(new web3.PublicKey(pubk)) 
        return balance/web3.LAMPORTS_PER_SOL;
    }catch(err){
        console.log(err);
    }
}

const transferSOL = async(from, to, amount) =>{
    try{
        const connection =  new web3.Connection(web3.clusterApiUrl('devnet'),"confirmed");
        const transaction = new web3.Transaction().add(
            web3.SystemProgram.transfer({
                fromPubkey: new web3.PublicKey(from.publicKey.toString()),
                toPubkey:new web3.PublicKey(to.publicKey.toString()),
                lamports:amount*web3.LAMPORTS_PER_SOL
            })
        )
        const signature = web3.sendAndConfirmRawTransaction(
            connection,
            transaction,
            [from]
        )
        return signature;
    }catch(err){
        console.log(err);
    }
}

const airDropSOL = async(wallet, amount) => {
    try{
        const connection =  new web3.Connection(web3.clusterApiUrl('devnet'),"confirmed");
        const fromAirDropSignature = await connection.requestAirdrop(new web3.PublicKey(wallet.publicKey.toString()),amount);
        await connection.confirmTransaction(fromAirDropSignature);
    }catch(err){
        console.log(err)
    }
} 


module.exports = {
    getWalletBalance,
    transferSOL,
    airDropSOL
}