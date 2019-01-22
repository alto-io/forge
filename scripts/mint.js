const HDWalletProvider = require("truffle-hdwallet-provider")
var contract_json = require("../build/contracts/Cryptoitem.json");
const web3 = require('web3')
require('dotenv').config()

const NETWORK = process.argv[2];
const MINT_OPTION = process.argv[3];

const SEED_PHRASE = process.env.SEED_PHRASE
const INFURA_KEY = "3616d3ebf2d1490f93b3ac08eeb907d7" // replace with your own if you want stats via infura.io

if (!SEED_PHRASE) {
    console.error("Please set a seed phrase.")
    return
}

const NFT_ABI = [{
    "constant": false,
    "inputs": [
      {
        "name": "_to",
        "type": "address"
      }
    ],
    "name": "mintTo",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}]

var network_id;
var opensea_link = "opensea.io/get-listed";

switch (NETWORK)
{
    case "rinkeby":
        network_id = 4;
        opensea_link = "rinkeby." + opensea_link;
        break;
    case "mainnet":
        network_id = 1;
        break;
}


const NFT_CONTRACT_ADDRESS = contract_json.networks[network_id].address;


    async function main() {
        const provider = new HDWalletProvider(SEED_PHRASE, `https://${NETWORK}.infura.io/${INFURA_KEY}`)
        const web3Instance = new web3(
            provider
        )
        
        const OWNER_ADDRESS = provider.addresses[0];

        console.log("=======================")
        console.log("Minting items...")
        console.log("Please be patient -- this may take a while.")
        console.log("Try pressing the arrow keys if the terminal seems to have paused.")
        console.log("=======================")

        switch (MINT_OPTION) {

            case "all":
                var quantity = require("../cryptoitem-metadata-server/local.db.json").item.length;

                const nftContract = new web3Instance.eth.Contract(NFT_ABI, NFT_CONTRACT_ADDRESS, { gasLimit: "1000000" })

                for (var i = 0; i < quantity; i++) {
                    const result = await nftContract.methods.mintTo(OWNER_ADDRESS).send({ from: OWNER_ADDRESS });
                    console.log("Minted " + (i + 1) + " of " + quantity + ". Transaction: " + result.transactionHash)
                }


                console.log("\nDone. \n\nCryptoitem Contract Address: \n" + NFT_CONTRACT_ADDRESS);
                console.log("\nInput the address in a marketplace to view (ex: " + opensea_link + ")");
                provider.engine.stop();
            break;
        }
    }


main()
