import d from "decimal.js";
import { Web3 } from "web3";

import { cutil } from "@ghasemkiani/base";
import { Obj } from "@ghasemkiani/base";

d.config({ precision: 200 });
const ds = (bi) => d(String(bi));

class Client extends Obj {
  static {
    cutil.extend(this.prototype, {
      provider: null,
      _web3: null,
    });
  }

  get web3() {
    if (cutil.na(this._web3)) {
      this._web3 = new Web3(...cutil.a(this.provider) ? [this.provider] : []);
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
    return ds(id);
  }
  async toGetChainId() {
    let client = this;
    return (await client.toGetChainId$()).toNumber();
  }
  async toGetGasPrice$() {
    let client = this;
    let { web3 } = client;
    let gasPrice = await web3.eth.getGasPrice();
    return ds(gasPrice);
  }
  async toGetGasPrice() {
    let client = this;
    return (await client.toGetGasPrice$()).toNumber();
  }
  async toGetBlockNumber$() {
    let client = this;
    let { web3 } = client;
    let blockNumber = await web3.eth.getBlockNumber();
    return ds(blockNumber);
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
    return ds(gasLimit);
  }
  async toGetGasLimit() {
    let client = this;
    return (await client.toGetGasLimit$()).toNumber();
  }
  async toEstimateGas$(tx) {
    let client = this;
    let { web3 } = client;
    let gas = await web3.eth.estimateGas(tx);
    return ds(gas);
  }
  async toEstimateGas(tx) {
    let client = this;
    return (await client.toEstimateGas$(tx)).toNumber();
  }
  fromWei$(value) {
    let client = this;
    let { web3 } = client;
    let amount = web3.utils.fromWei(cutil.asString(value), "ether");
    return ds(amount);
  }
  fromWei(value) {
    let client = this;
    return client.fromWei$(value).toNumber();
  }
  toWei$(amount) {
    let client = this;
    let { web3 } = client;
    let value = web3.utils.toWei(cutil.asString(amount), "ether");
    return ds(value);
  }
  toWei(amount) {
    let client = this;
    return client.toWei$(amount).toFixed(0);
  }
  toWei(amount) {
    let value = Web3.utils.toWei(cutil.asString(amount), "ether");
    return value;
  }
  async toGetTransactionCount$(address, defaultBlock = "latest") {
    let client = this;
    let { web3 } = client;
    let transactionCount = await web3.eth.getTransactionCount(
      address,
      defaultBlock,
    );
    return ds(transactionCount);
  }
  async toGetTransactionCount(address, defaultBlock = "latest") {
    let client = this;
    return (await client.toGetTransactionCount$(address, defaultBlock)).toNumber();
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
  encodeEventSignature(itemSignature) {
    let client = this;
    let { web3 } = client;
    return web3.eth.abi.encodeEventSignature(itemSignature);;
  }
  encodeFunctionSignature(itemSignature) {
    let client = this;
    let { web3 } = client;
    return web3.eth.abi.encodeFunctionSignature(itemSignature);;
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
}

export { Client };
