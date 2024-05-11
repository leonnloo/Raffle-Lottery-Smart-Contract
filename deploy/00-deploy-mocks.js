const { network } = require("hardhat")

const BASE_FEE = "250000000000000000" // 0.25 is the premium. 0.25 LINK per request
const GAS_PRICE_LINK = 1e9 // link per gas, is this the gas lane? // 0.000000001 LINK per gas

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    const chainId = network.config.chainId;

    console.log("Deployer Address:", deployer);
    console.log("Network Chain ID:", chainId);
    console.log("Base Fee:", BASE_FEE);
    console.log("Gas Price (Link):", GAS_PRICE_LINK);

    if (chainId == 31337) {
        log("Local network detected! Deploying mocks...");
        const deployResult = await deploy("VRFCoordinatorV2Mock", {
            from: deployer,
            log: true,
            args: [BASE_FEE, GAS_PRICE_LINK],
        });

        console.log("Deploy Result:", deployResult);

        log("Mocks Deployed!");
        log("----------------------------------------------------------");
        log("You are deploying to a local network, you'll need a local network running to interact");
        log(
            "Please run `yarn hardhat console --network localhost` to interact with the deployed smart contracts!"
        );
        log("----------------------------------------------------------");
    }
};

module.exports.tags = ["all", "mocks"]