import { toChecksumAddress } from 'ethereumjs-util';
import { TokenList } from '../util/tokenList';
import fetch from 'node-fetch';
import type Token from '../types/token';

import transformTokenListToObject from '../util/transfomTokenListToObject';
import chainIdMap from '../util/chainIdMap';

const tokenLists = {
  moonriver: ['https://raw.githubusercontent.com/moonfarmin/tokenlist/master/tokens.json'],
};

const toChecksumTokenList = (tokens: Token[]): void => {
  for (const token of tokens) {
    token.address = toChecksumAddress(token.address);
  }
};

(async () => {
  const chainId = chainIdMap.moonriver;
  let tokens: Token[] = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let tokenListFinal: any;
  for (const tokenList of tokenLists.moonriver) {
    const response = await fetch(tokenList);
    const tokenListTmp = (await response.json()) as unknown as TokenList;
    tokenListFinal = tokenListTmp;
    tokens = [...tokens, ...tokenListTmp.tokens];
  }
  toChecksumTokenList(tokens);
  tokenListFinal.tokens = tokens;
  const toMap = transformTokenListToObject(tokenListFinal, chainId);
  console.log(JSON.stringify(toMap));
})();
