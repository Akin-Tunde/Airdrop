// src/contracts/info.ts

// TODO: Replace with your deployed contract address
export const raindropContractAddress = '0x...YourRaindropContractAddress';

// TODO: Replace with your contract's ABI
// You can get this from your compiled contract artifacts (e.g., in a JSON file)
export const raindropContractABI = [
  // Paste the entire ABI array here
    // Example:
      {
          "inputs": [
                { "internalType": "string", "name": "raindropId", "type": "string" },
                      { "internalType": "address", "name": "token", "type": "address" },
                            { "internalType": "uint256", "name": "totalAmount", "type": "uint256" },
                                  { "internalType": "uint256", "name": "scheduledTime", "type": "uint256" }
                                      ],
                                          "name": "createRaindrop",
                                              "outputs": [],
                                                  "stateMutability": "nonpayable",
                                                      "type": "function"
                                                        },
                                                          // ... include all other functions, events, and errors from your ABI
                                                          ] as const; // The "as const" is important for type safety with Wagmi

                                                          // We also need a generic ABI for the ERC20 approve function
                                                          export const erc20ABI = [
                                                            {
                                                                "constant": false,
                                                                    "inputs": [
                                                                          { "name": "spender", "type": "address" },
                                                                                { "name": "value", "type": "uint256" }
                                                                                    ],
                                                                                        "name": "approve",
                                                                                            "outputs": [
                                                                                                  { "name": "", "type": "bool" }
                                                                                                      ],
                                                                                                          "payable": false,
                                                                                                              "stateMutability": "nonpayable",
                                                                                                                  "type": "function"
                                                                                                                    },
                                                                                                                      {
                                                                                                                          "constant": true,
                                                                                                                              "inputs": [
                                                                                                                                    { "name": "owner", "type": "address" }
                                                                                                                                        ],
                                                                                                                                            "name": "balanceOf",
                                                                                                                                                "outputs": [
                                                                                                                                                      { "name": "", "type": "uint256" }
                                                                                                                                                          ],
                                                                                                                                                              "payable": false,
                                                                                                                                                                  "stateMutability": "view",
                                                                                                                                                                      "type": "function"
                                                                                                                                                                        },
                                                                                                                                                                          {
                                                                                                                                                                              "constant": true,
                                                                                                                                                                                  "inputs": [],
                                                                                                                                                                                      "name": "decimals",
                                                                                                                                                                                          "outputs": [
                                                                                                                                                                                                { "name": "", "type": "uint8" }
                                                                                                                                                                                                    ],
                                                                                                                                                                                                        "payable": false,
                                                                                                                                                                                                            "stateMutability": "view",
                                                                                                                                                                                                                "type": "function"
                                                                                                                                                                                                                  }
                                                                                                                                                                                                                  ] as const;