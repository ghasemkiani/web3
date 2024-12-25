import { Web3 } from "web3";

import { cutil } from "@ghasemkiani/base";
import { Obj } from "@ghasemkiani/base";
import { d } from "@ghasemkiani/decimal";

class Client extends Obj {
  static {
    cutil.extend(this, {
      Web3,
      create(provider) {
        return new Web3(...(cutil.a(provider) ? [provider] : []));
      },
    });
    cutil.extend(this.prototype, {
      Web3,
      provider: null,
      _web3: null,
    });
  }

  get web3() {
    if (cutil.na(this._web3)) {
      this._web3 = Client.create(this.provider);
    }
    return this._web3;
  }
  set web3(web3) {
    this._web3 = web3;
  }
  get Contract() {
    return this.web3.eth.Contract;
  }

  async toGetChainId$() {
    let client = this;
    let { web3 } = client;
    let id = await web3.eth.getChainId();
    return d(id);
  }
  async toGetChainId() {
    let client = this;
    return (await client.toGetChainId$()).toNumber();
  }
  async toGetGasPrice$() {
    let client = this;
    let { web3 } = client;
    let gasPrice = await web3.eth.getGasPrice();
    return d(gasPrice);
  }
  async toGetGasPrice() {
    let client = this;
    return (await client.toGetGasPrice$()).toNumber();
  }
  async toGetBlockNumber$() {
    let client = this;
    let { web3 } = client;
    let blockNumber = await web3.eth.getBlockNumber();
    return d(blockNumber);
  }
  async toGetBlockNumber() {
    let client = this;
    return (await client.toGetBlockNumber$()).toNumber();
  }
  async toGetBlock(blockNumber = "latest") {
    let client = this;
    let { web3 } = client;
    let block = await web3.eth.getBlock(blockNumber);
    return block;
  }
  async toGetGasLimit$() {
    let client = this;
    let { gasLimit } = await client.toGetBlock("latest");
    return d(gasLimit);
  }
  async toGetGasLimit() {
    let client = this;
    return (await client.toGetGasLimit$()).toNumber();
  }
  async toEstimateGas$(tx) {
    let client = this;
    let { web3 } = client;
    let gas = await web3.eth.estimateGas(tx);
    return d(gas);
  }
  async toEstimateGas(tx) {
    let client = this;
    return (await client.toEstimateGas$(tx)).toNumber();
  }
  fromWei$(value) {
    let client = this;
    let { web3 } = client;
    let amount = web3.utils.fromWei(cutil.asString(value), "ether");
    return d(amount);
  }
  fromWei(value) {
    let client = this;
    return client.fromWei$(value).toNumber();
  }
  toWei$(amount) {
    let client = this;
    let { web3 } = client;
    let value = web3.utils.toWei(cutil.asString(amount), "ether");
    return d(value);
  }
  toWei(amount) {
    let client = this;
    return client.toWei$(amount).toFixed(0);
  }
  async toGetTransactionCount$(address, defaultBlock = "latest") {
    let client = this;
    let { web3 } = client;
    let transactionCount = await web3.eth.getTransactionCount(
      address,
      defaultBlock,
    );
    return d(transactionCount);
  }
  async toGetTransactionCount(address, defaultBlock = "latest") {
    let client = this;
    return (
      await client.toGetTransactionCount$(address, defaultBlock)
    ).toNumber();
  }
  async toGetTransactionFromBlock(hashStringOrNumber, indexNumber) {
    let client = this;
    let { web3 } = client;
    let tx = await web3.eth.getTransactionFromBlock(
      hashStringOrNumber,
      indexNumber,
    );
    return tx;
  }
  async toGetTransactionReceipt(hash) {
    let client = this;
    let { web3 } = client;
    let receipt = await web3.eth.getTransactionReceipt(hash);
    return receipt;
  }
  async toSendSignedTransaction(rawTransaction) {
    let client = this;
    let { web3 } = client;
    let receipt = await web3.eth.sendSignedTransaction(rawTransaction);
    return receipt;
  }
  async toGetBlockTimeSec(n = 10000) {
    let client = this;
    let { web3 } = client;
    let currentBlock = await this.toGetBlockNumber();
    let { timestamp: timestamp1 } = await client.toGetBlock(currentBlock);
    let { timestamp: timestamp0 } = await client.toGetBlock(currentBlock - n);
    let blockTimeSec =
      (cutil.asNumber(timestamp1) - cutil.asNumber(timestamp0)) / n;
    return blockTimeSec;
  }
  async toGetTransaction(hash) {
    let client = this;
    let { web3 } = client;
    let tx = await web3.eth.getTransaction(hash);
    return tx;
  }
  async toGetPendingTransactions() {
    let client = this;
    let { web3 } = client;
    let txs = await web3.eth.getPendingTransactions();
    return txs;
  }
  encodeEventSignature(itemSignature) {
    let client = this;
    let { web3 } = client;
    return web3.eth.abi.encodeEventSignature(itemSignature);
  }
  encodeFunctionSignature(itemSignature) {
    let client = this;
    let { web3 } = client;
    return web3.eth.abi.encodeFunctionSignature(itemSignature);
  }
  functionData(func, ...rest) {
    let client = this;
    let { web3 } = client;
    let data = web3.eth.abi.encodeFunctionCall(func, rest);
    return data;
  }
  async toDecodeLog(scan, log, logError = false) {
    let client = this;
    let { web3 } = client;
    let { address, topics, data } = log;
    let abi = await scan.toGetContractAbi(address, logError);
    abi = chain.addSignatures(abi);
    let [signature, ...indexes] = topics;
    let event = contract.abi.find((item) => item.signature === signature);
    if (!event) {
      return null;
    }
    let inputs = event.inputs || [];
    let decoded = web3.eth.abi.decodeLog(
      inputs,
      data,
      event.anonymous ? topics : indexes,
    );
    return { event, address, decoded };
  }
  isAddress(address) {
    let client = this;
    let { web3 } = client;
    return web3.utils.isAddress(address);
  }
  asChecksumAddress(address) {
    let client = this;
    let { web3 } = client;
    return web3.utils.toChecksumAddress(address);
  }
  async toGetPastLogs({ fromBlock, toBlock, address, topics }) {
    let client = this;
    let { web3 } = client;
    return await web3.eth.getPastLogs({ fromBlock, toBlock, address, topics });
  }
  async toGetCode(...args) {
    let client = this;
    let { web3 } = client;
    // let [address, defaultBlock] = args;
    return await web3.eth.getCode(...args);
  }
  privateKeyToAddress(privateKey) {
    let client = this;
    let { web3 } = client;
    return web3.eth.accounts.privateKeyToAccount(privateKey).address;
  }
  async toGetBalance$(address) {
    let client = this;
    let { web3 } = client;
    let balance = await web3.eth.getBalance(address);
    return d(balance);
  }
  async toGetBalance_(address) {
    let client = this;
    return (await client.toGetBalance$(address)).toFixed(0);
  }
  async toSignTransaction(transactionObject, key) {
    let client = this;
    let { web3 } = client;
    let result = await web3.eth.accounts.signTransaction(
      transactionObject,
      key,
    );
    return result;
  }
  async toSign(dataToSign, address) {
    let client = this;
    let { web3 } = client;
    let signedData = await web3.eth.sign(dataToSign, address);
    return signedData;
  }
}

const iwclient = {
  provider: null,
  get client() {
    if (cutil.na(this._client)) {
      let { provider } = this;
      this._client = new Client({ provider });
    }
    return this._client;
  },
  set client(client) {
    this._client = client;
  },
};

export { Client, iwclient };
