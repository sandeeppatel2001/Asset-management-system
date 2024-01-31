//SPDX-License-Identifier:UNLICENSED

pragma solidity ^0.8.9;

contract IntegrityContract {
    struct Asset {
        string assetId;
        string assetName;
        string assetCategory;
        string assetHash;
        string assetTags;
    }

    mapping(string => address) public Orgaddress;
    Asset[] public allassets;

    function addAsset(
        string memory _assetId,
        string memory _assetName,
        string memory _assetCategory,
        string memory _assetHash,
        string memory _assetTags,
        string memory _orgHash,
        string memory _orgName
    ) public {
        require(bytes(_assetId).length <= 32, "Asset ID exceeds 32 characters");
        require(
            bytes(_assetName).length <= 64,
            "Asset name exceeds 64 characters"
        );
        require(
            bytes(_assetCategory).length <= 12,
            "Asset category exceeds 12 characters"
        );
        allassets.push(
            Asset(_assetId, _assetName, _assetCategory, _assetHash, _assetTags)
        );
        // assets[_assetId] = Asset(_assetId, _assetName, _assetCategory, _assetHash, _assetTags, _orgContractAddress);
        Orgaddress[_assetId] = createOrgContract(_orgHash, _orgName);
    }

    function createOrgContract(
        string memory _orgHash,
        string memory _orgName
    ) public returns (address) {
        address newOrgContract = address(new OrgContract(_orgHash, _orgName));
        return newOrgContract;
    }

    function getOrgContractData(
        address orgContractAddress
    ) public view returns (string memory, string memory) {
        OrgContract orgContract = OrgContract(orgContractAddress);
        return (orgContract.orgHash(), orgContract.orgName());
    }
}

contract OrgContract {
    string public orgHash;
    string public orgName;

    constructor(string memory _orgHash, string memory _orgName) {
        orgHash = _orgHash;
        orgName = _orgName;
    }
}
