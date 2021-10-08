const deployer = '0x8784279bdB1b634d5bEf86C92262D1775248aEE0';
const feeReward = '0x6A90b35784c716dB7B269f2Eda2fB7e7C164Bb06';

export const mofi = {
  strategyOwner: deployer,
  vaultOwner: deployer,
  keeper: deployer,
  rewarder: feeReward,
  treasurer: feeReward,
  devMultisig: deployer,
  mofiFeeRecipient: feeReward,
  multicall: '0x8ecf62Cb46Ba4913d6FbDd6E74da4A6A7c40582F',
} as const;
