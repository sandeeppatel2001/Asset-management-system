// TestIntegrityContract.js
const IntegrityContract = artifacts.require("IntegrityContract");
const OrgContract = artifacts.require("OrgContract");

contract("IntegrityContract", (accounts) => {
  let integrityContract;

  before(async () => {
    integrityContract = await IntegrityContract.new();
  });

  it("should add asset and create OrgContract", async () => {
    const assetId = "123456";
    const assetName = "Test Asset";
    const assetCategory = "TestCategory";
    const assetHash = "0x123abc";
    const assetTags = "tag1,tag2";
    const orgHash = "0x456def";
    const orgName = "Test Org";

    const transaction = await integrityContract.addAsset(
      assetId,
      assetName,
      assetCategory,
      assetHash,
      assetTags,
      orgHash,
      orgName
    );

    const orgContractAddress = await integrityContract.Orgaddress(assetId);
    const orgContractInstance = await OrgContract.at(orgContractAddress);
    const retrievedOrgHash = await orgContractInstance.orgHash();
    const retrievedOrgName = await orgContractInstance.orgName();
    const set = await integrityContract.allassets(0);
    console.log(transaction);
    assert.equal(retrievedOrgHash, orgHash, "Organization hash does not match");
    assert.equal(retrievedOrgName, orgName, "Organization name does not match");
  });
});
