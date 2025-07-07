import { BasePath, Fireblocks } from "@fireblocks/ts-sdk"
import { readFileSync } from "fs"
import { config } from "dotenv"

config()

const { FIREBLOCKS_API_KEY = "" } = process.env

const FIREBLOCKS_API_SECRET_PATH = "./fireblocks_secret.key"

// Initialize a Fireblocks API instance with local variables
const fireblocks = new Fireblocks({
  apiKey: FIREBLOCKS_API_KEY,
  basePath: BasePath.US, // or assign directly to "https://sandbox-api.fireblocks.io/v1";
  secretKey: readFileSync(FIREBLOCKS_API_SECRET_PATH, "utf8"),
})

//retrive vault accounts
async function getVaultPagedAccounts(limit: number) {
  try {
    const vaults = await fireblocks.vaults.getPagedVaultAccounts({
      limit,
    })
    return vaults
  } catch (e) {
    console.log(e)
  }
}

//create a transaction
const transaction = async () => {
  await fireblocks.transactions.createTransaction({
    transactionRequest: {
      source: {
        type: "VAULT_ACCOUNT",
        id: "vaultAccountId",
      },
      destination: {
        type: "VAULT_ACCOUNT",
        id: "vaultAccountId",
      },
      assetId: "ABC",
      amount: "0.1",
      note: "Test transaction",
      extraParameters: {
        type: {},
      },
    },
  })
}

getVaultPagedAccounts(10)
  .then((res) => {
    console.log(res?.data)
  })
  .catch((e) => {
    console.log(e)
  })
