### webrtc小记
webrtc的扫盲文档：https://webrtcforthecurious.com/zh/docs

#### webrtc的连接过程
建立连接之前的步骤是：
1. 先进行 STUN 服务来获取 NAT 后的公共地址，
2. 然后进行 SDP 协商以交换会话描述信息，
3. 最后进行 ICE 候选者收集和交换。
这些步骤帮助对等端克服 NAT 网络限制，选择适当的参数并建立对等连接。




