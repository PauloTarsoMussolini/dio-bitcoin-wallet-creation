// import dependences
const bip32 = require('bip32')
const bip39 = require('bip39')
const bitcoin = require('bitcoinjs-lib')

// net define
const netWork = bitcoin.networks.testnet

// HD wallet derivation
const path = `m/49'/1'/0'/0`

// Creating mnemonic to seed's words
let mnemonic = bip39.generateMnemonic()
const seed = bip39.mnemonicToSeedSync(mnemonic)

// Root creation of HD Wallet
let root = bip32.fromSeed(seed, netWork)

// Create Account (pvt & pub keys)
let account = root.derivePath(path)
let node = account.derive(0).derive(0)

// Define Address Wallet
let btcAddress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: netWork
}).address

console.log("Wallet generated!");
console.log("Address......: ", btcAddress);
console.log("Private Key..: ", node.toWIF());
console.log("Seed.........: ", mnemonic);