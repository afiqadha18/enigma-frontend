export interface Peer {
  peerId: number;
  peerName: string,
  peerAddress: string,
  peerAsn: number,
  localAsn: number,
  nextHopIp: string,
  bgpCommunity: string,
  bgpPassword: string,
  dataCenter: string
}
