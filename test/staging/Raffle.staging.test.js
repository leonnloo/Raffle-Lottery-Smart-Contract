const { assert, expect } = require("chai")
const { getNamedAccounts, ethers, network } = require("hardhat")
const { developmentChains } = require("../../helper-hardhat-config")

developmentChains.includes(network.name)
    ? describe.skip
    : describe("Raffle Staging Tests", function () {
          let raffle, raffleEntranceFee, deployer

          beforeEach(async function () {
              deployer = (await getNamedAccounts()).deployer
              raffle = await ethers.getContract("Raffle", deployer)
              raffleEntranceFee = await raffle.getEntranceFee()
          })

          describe("fulfillRandomWords", function () {
              it("works with live Chainlink Keepers and Chainlink VRF, we get a random winner", async function () {
                  // enter the raffle
                  console.log("Setting up test...")
                  const startingTimeStamp = await raffle.getLastTimeStamp()
                  const accounts = await ethers.getSigners()

                  console.log("Setting up Listener...")
                  await new Promise(async (resolve, reject) => {
                      // setup listener before we enter the raffle
                      // Just in case the blockchain moves REALLY fast
                      raffle.once("WinnerPicked", async () => {
                          console.log("WinnerPicked event fired!")
                          try {
                              // add our asserts here
                              const recentWinner = await raffle.getRecentWinner()
                              const raffleState = await raffle.getRaffleState()
                              const winnerEndingBalance = await ethers.provider.getBalance(
                                  accounts[0].getAddress(),
                              )
                              const endingTimeStamp = await raffle.getLastTimeStamp()

                              await expect(raffle.getPlayer(0)).to.be.reverted
                              assert.equal(recentWinner.toString(), accounts[0].getAddress())
                              assert.equal(raffleState, 0)
                              assert.equal(
                                  Number(winnerEndingBalance),
                                  Number(winnerStartingBalance) + formatEther(raffleEntranceFee),
                              )
                              assert(endingTimeStamp > startingTimeStamp)
                              resolve()
                          } catch (error) {
                              console.log(error)
                              reject(error)
                          }
                      })
                      // Then entering the raffle
                      console.log("Entering Raffle...")
                      const tx = await raffle.enterRaffle({ value: raffleEntranceFee })
                      await tx.wait(1)
                      console.log("Ok, time to wait...")
                      const winnerStartingBalance = await ethers.provider.getBalance(
                          accounts[0].getAddress(),
                      )

                      // and this code WONT complete until our listener has finished listening!
                  })
              })
          })
      })

// process to test online with the testNet Sepolia and ChainLink
// 1. Get our SubId for chainlink:
//      https://vrf.chain.link/
//      Connect Wallet
//      https://faucets.chain.link/ to get Link and Sepolia ETH. wait for comfirmation
//      https://docs.chain.link/resources/link-token-contracts to import the sepolia ETH LINKs tokens
//      https://vrf.chain.link/sepolia/new to create a new Subscription Id
//      Add some lINKs to fund the subscription
//      Received Subscription ID is 8558 update/add it the helper file

// 2. Deploy our contract using SubId
//      deploy with yarn hardhat deploy --network sepolia
//      Take the contract address and add it as consumer in the created subscription Id
//      My contract address is: 0xDDAafad590F16026358d41ea92d6FFcDcdDadEb0
//      Contract should also be verified and we can look at it on Etherscan

// 3. Register the contract with ChainLink VRF & it's SubId
//      https://automation.chain.link/ to register a new UpKeep
//      Connect Wallet
//      Time based and add the contract address
//      Confirm registration with Wallet
//      back to keepers.chain.link to see My Upkeep...

// 4. Register the contract with ChainLink Keepers
//
// 5. Run Staging test
//      We may run it from Etherscan as it is verified.
//      We  would prefer running it in visual studio code
//      yarn hardhat test --network sepolia
