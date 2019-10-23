/***
 * 说一些编码知识
 *
 * ASCII编码：定义了0到127的字符，也就是2的7次方。少一位没有用。被各自用来实现不同的字符了。
 *
 * Unicode编码：为了解决ASCII编码全世界不统一的情况下出的标准。这就是一个字典，映射了一个数字到一个字符的关系。并不关心具体编码实现。
 *
 * UTF-8/UTF-16: 对Unicode编码具体落地的实施方案。
 */

var shuffle = require('knuth-shuffle').knuthShuffle;

//数字0-9和.的Unicode编码
var char = [46 , 48 , 49 , 50 , 51 , 52 , 53 , 54 , 55 , 56 , 57];

//基本汉字的编码范围4E00-9FA5
// var minChinaChar = 19968;

// var maxChinaChar = 40613;

var str = "的业区商中市为国品大公地有产发和城建成新场家目年心是高经务工设平以人体方化于面在司项等合生园广理全开位展服个路万物资集营时店米牌企南积主上力多了行东与及通北美现内式进总作规海西造创用流层际乐部技电金会管州计划分餐型最天交文能级购街学代将立投优名限重江筑特不三道活实动专元山尚政省自装科饮楼来外车济机团华性之配同口入提酒里出前加下其基质运休闲长已定术费要水制到环系达都精具百本客点可消连打信供小约色安标超号线京利态综食保过对民风各域县居亿所量引形住销二户统源办期并处售台月招模间院子站四完世娱由套港五先功共府度门十我日核阳河格程组影游第施健拥正求们后房领关界研速空网强贸整货更验景首湖得意念深好至者融社包步境锁持种星相势镇富饰独准着构联局汇快备近导占推无教周范两育明而员料类批接向带便事身传边童从宝置光材数儿铁端价调值津原观康香群足布易结息需圈知也女兴艺聚余单旅临责花直使情题宁味升气件这致法受承负字苏围"

//将字符串随机打乱然后取300个汉字出来
// str = '0123456789'+shuffle(str.split('')).join('').substr(5 , 300);

module.exports = str;