import React from 'react';
import { shortenAddress } from '../utils/web3';
import { CONTRACT_ADDRESS } from '../constants/contract';

const ContractInfo = () => {
  return (
    <div className="mt-6 bg-white/5 backdrop-blur-md rounded-lg p-4">
      <p className="text-sm text-gray-400 text-center">
        Contract: {shortenAddress(CONTRACT_ADDRESS)} | Network: Ethereum Mainnet
      </p>
    </div>
  );
};

export default ContractInfo;
