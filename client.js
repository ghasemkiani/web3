import d from "decimal.js";
import { Web3 } from "web3";

import { cutil } from "@ghasemkiani/base";
import { Obj } from "@ghasemkiani/base";

d.config({ precision: 200 });
const ds = (bi) => d(String(bi));

class Client extends Obj {
  static {
    cutil.extend(this.prototype, {
      _web3: null,
    });
  }

  get web3() {
    if (cutil.na(this._web3)) {
      this._web3 = new Web3();
    }
    return this._web3;
  }
  set web3(web3) {
    this._web3 = web3;
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
}

export { Client };
