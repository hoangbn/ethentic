pragma solidity ^0.5.0;

contract IPFS {
  string IPFSHash;

  function set(string memory _IPFSHash) public {
    IPFSHash = _IPFSHash;
  }

  function get() public view returns (string memory) {
    return IPFSHash;
  }
}
