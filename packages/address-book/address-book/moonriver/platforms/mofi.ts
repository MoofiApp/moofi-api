const deployer = '0x8784279bdB1b634d5bEf86C92262D1775248aEE0';
const feeReward = '0x6A90b35784c716dB7B269f2Eda2fB7e7C164Bb06';
const devMultisig = '0x5DF70B08A3377AC0B9F5291Ad156Ab6e30622166';
const timelock = '0xe1F1eAFdD20f2135176A303A56AA8Ccbac4135d8';

export const mofi = {
  strategyOwner: devMultisig,
  vaultOwner: timelock,
  keeper: deployer,
  rewarder: feeReward,
  treasurer: feeReward,
  devMultisig,
  mofiFeeRecipient: feeReward,
  multicall: '0x8ecf62Cb46Ba4913d6FbDd6E74da4A6A7c40582F',
} as const;
