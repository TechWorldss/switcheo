## Consensus-Breaking Change

The change introduced in this commit breaks the consensus of the blockchain by modifying the structure of resources. Specifically, we have added a new `timestamp` field to the resource structure, which causes a mismatch in the stored data format between old and new nodes. As a result, old nodes will no longer be able to correctly read or write resources, leading to a divergence in state between old and new nodes.

### Why This Breaks Consensus:
Changing the structure of the data stored in the blockchain (like modifying fields or serialization formats) breaks the consensus, as all nodes need to agree on the structure and format of the data in order to process transactions and maintain the same state. Nodes running the old version of the software will not be able to decode or process data written by nodes running the new version, leading to an inconsistency in the network.
