### webrtc小记
webrtc的扫盲文档：https://webrtcforthecurious.com/zh/docs

#### webrtc的连接过程
建立连接的步骤是：
1. 先进行 STUN 服务来获取 NAT 后的公共地址，
2. 然后进行 SDP 协商以交换会话描述信息，
3. 最后进行 ICE 候选者收集和交换。
这些步骤帮助对等端克服 NAT 网络限制，选择适当的参数并建立对等连接。

#### 会话协议
webrtc使用的是SDP协议，SDP协议是一种文本协议，用于描述多媒体会话。  

SDP协议的格式如下：
```text
v - Version，版本，版本，应等于 0
o - Origin，源，包含一个唯一 ID，用于重新协商
s - Session Name，会话名称，应等于-
t - Timing，时间，应等于 0 0
m - Media Description(m=<media> <port> <proto> <fmt> ...)，媒体描述
a - Attribute，属性，一个自由文本字段，这是 WebRTC 中最常见的行
c - Connection Data，连接数据，应等于 IN IP4 0.0.0.0
```
我们建立连接的时候，需要交换SDP协议，SDP协议中包含了我们的媒体信息，比如音频编码格式，视频编码格式，视频分辨率等等。  

也就是说，如果要建立连接，就需要有sdp描述  

即首先需要生成sdp描述
```js
// 生成sdp描述
const offer = await pc.createOffer()
// 设置本地sdp描述
await pc.setLocalDescription(offer)
```
此时为了知道对方可否有与我们通信，我们需要将这个描述放给对方
```js
// 将本地sdp描述发送给对方
socket.emit('offer', offer)
```
对方收到我们的sdp描述之后，需要将这个描述设置为远端描述，我们的sdp描述就是对方的远端描述
```js
// 设置远端sdp描述
await pc.setRemoteDescription(offer)
```
那么对方需要回一个信息给我们，告诉我们他的sdp描述，这个描述就是我们的远端描述
```js
// 生成sdp描述
const answer = await pc.createAnswer()
// 设置本地sdp描述
await pc.setLocalDescription(answer)
// 将本地sdp描述发送给对方
socket.emit('answer', answer)
```
我们收到对方的sdp描述之后，需要将这个描述设置为远端描述，对方的sdp描述就是我们的远端描述
```js
// 设置远端sdp描述
await pc.setRemoteDescription(answer)
```
这样，我们就建立了连接。

建立连接在api层面就是这样，但是对于webrtc协议来说，在我们交换完信息之后，还需要进行ICE协议。

ICE的工作发生在WebRTC建立对等连接的过程中，**具体是在对等连接的候选地址收集和选择阶段**。

当两个对等方尝试建立连接时，它们会通过信令服务器交换各自的候选地址信息。候选地址是指能够用于建立对等连接的IP地址和端口组合。  

在ICE框架中，候选地址可以包括本地的主机地址、本地的私有IP地址、通过STUN服务器获取的公共IP地址等。每个对等方都会收集自己的候选地址，并将其发送给远程对等方。    

一旦对等方收到候选地址，ICE会评估这些地址，并选择最佳的连接路径。它会尝试建立直接连接，即使用对方提供的IP地址和端口直接通信。如果直接连接无法建立（例如由于NAT或防火墙的限制），ICE会尝试使用TURN服务器进行中继传输，以便在位于不同网络中的对等方之间进行通信。  

因此，在对等连接的候选地址收集和选择阶段，ICE起到了关键的作用，它通过STUN服务器获取地址信息，并选择最佳的连接方式，以确保对等连接能够成功建立。  

ICE协议结束之后，我们就可以进行媒体传输了。
