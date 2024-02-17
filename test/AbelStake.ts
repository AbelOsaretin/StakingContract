import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Staking Contract", function () {
  async function deployFixture() {
    // Contracts are deployed using the first signer/account by default
    const [addr1, addr2, addr3] = await ethers.getSigners();

    const abelContract = await ethers.getContractFactory("Abel");
    const ERC20Contract = await abelContract.deploy();

    const AbelStake = await ethers.getContractFactory("AbelStaking");
    const stakeContract = await AbelStake.deploy(
      await ERC20Contract.target,
      ERC20Contract.target
    );

    console.log(
      `ERC20 contract deployed to ${await ERC20Contract.getAddress()}`
    );

    console.log(
      `saveEtherERC20 contract deployed to ${await stakeContract.getAddress()}`
    );

    return { stakeContract, ERC20Contract, addr1, addr2, addr3 };
  }

  describe("Deployment", function () {
    it("Should deploy Token Abel First and Set Owner", async function () {
      const { ERC20Contract, stakeContract, addr1 } = await loadFixture(
        deployFixture
      );
      //console.log(owner);

      //expect(await stakeContract.ownerAddress()).to.equal(addr1.address);
      expect(await ERC20Contract.owner()).to.equal(addr1.address);
    });
  });

  // describe("Withdrawals", function () {
  //   describe("Validations", function () {
  //     it("Should revert with the right error if called too soon", async function () {
  //       const { lock } = await loadFixture(deployOneYearLockFixture);

  //       await expect(lock.withdraw()).to.be.revertedWith(
  //         "You can't withdraw yet"
  //       );
  //     });

  //   });

  // });
});
