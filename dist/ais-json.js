module.exports=function(e){var t={};function n(r){if(t[r])return t[r].exports;var a=t[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,n),a.l=!0,a.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(r,a,function(t){return e[t]}.bind(null,a));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){(function(t){const r=n(2),a=n(3).decodeMessage;function i(e){if(console.log("Hello, ais.js!"),!function(e){return!(e.toString().split(",").length<7)}(e))return!1;let t=function(e){let t=e.toString().split(",");return{type:t[0],total:t[1],order:t[2],series:t[3],channel:t[4],message:t[5],fill:t[6]}}(e),n=function(e){let t="";for(let n=0;n<e.length;n++)t+=r[e[n]];return t}(t.message);"!AIVDM"===t.type||t.type;let i=a(n);return i.text=e,i}e.exports=i;let o=t.argv.splice(2)[0];o&&console.log(i(o))}).call(this,n(1))},function(e,t){var n,r,a=e.exports={};function i(){throw new Error("setTimeout has not been defined")}function o(){throw new Error("clearTimeout has not been defined")}function c(e){if(n===setTimeout)return setTimeout(e,0);if((n===i||!n)&&setTimeout)return n=setTimeout,setTimeout(e,0);try{return n(e,0)}catch(t){try{return n.call(null,e,0)}catch(t){return n.call(this,e,0)}}}!function(){try{n="function"==typeof setTimeout?setTimeout:i}catch(e){n=i}try{r="function"==typeof clearTimeout?clearTimeout:o}catch(e){r=o}}();var s,u=[],l=!1,f=-1;function d(){l&&s&&(l=!1,s.length?u=s.concat(u):f=-1,u.length&&p())}function p(){if(!l){var e=c(d);l=!0;for(var t=u.length;t;){for(s=u,u=[];++f<t;)s&&s[f].run();f=-1,t=u.length}s=null,l=!1,function(e){if(r===clearTimeout)return clearTimeout(e);if((r===o||!r)&&clearTimeout)return r=clearTimeout,clearTimeout(e);try{r(e)}catch(t){try{return r.call(null,e)}catch(t){return r.call(this,e)}}}(e)}}function m(e,t){this.fun=e,this.array=t}function I(){}a.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];u.push(new m(e,t)),1!==u.length||l||c(p)},m.prototype.run=function(){this.fun.apply(null,this.array)},a.title="browser",a.browser=!0,a.env={},a.argv=[],a.version="",a.versions={},a.on=I,a.addListener=I,a.once=I,a.off=I,a.removeListener=I,a.removeAllListeners=I,a.emit=I,a.prependListener=I,a.prependOnceListener=I,a.listeners=function(e){return[]},a.binding=function(e){throw new Error("process.binding is not supported")},a.cwd=function(){return"/"},a.chdir=function(e){throw new Error("process.chdir is not supported")},a.umask=function(){return 0}},function(e){e.exports={0:"000000",1:"000001",2:"000010",3:"000011",4:"000100",5:"000101",6:"000110",7:"000111",8:"001000",9:"001001",":":"001010",";":"001011","<":"001100","=":"001101",">":"001110","?":"001111","@":"010000",A:"010001",B:"010010",C:"010011",D:"010100",E:"010101",F:"010110",G:"010111",H:"011000",I:"011001",J:"011010",K:"011011",L:"011100",M:"011101",N:"011110",O:"011111",P:"100000",Q:"100001",R:"100010",S:"100011",T:"100100",U:"100101",V:"100110",W:"100111","`":"101000",a:"101001",b:"101010",c:"101011",d:"101100",e:"101101",f:"101110",g:"101111",h:"110000",i:"110001",j:"110010",k:"110011",l:"110100",m:"110101",n:"110110",o:"110111",p:"111000",q:"111001",r:"111010",s:"111011",t:"111100",u:"111101",v:"111110",w:"111111"}},function(e,t,n){const r=n(4);function a(e,t){let n=parseInt(e,2),r="";if("coordinate"===t){n/=1e4,r=parseInt(n/60)+"°"+(n%60).toFixed(4)+"′"}else"cog"===t?r=n/10+"°":"heading"===t&&(r=n+"°");return r}function i(e,t){let n="";switch(e){case 1:case 2:case 3:n=function(e){let t={},n=parseInt(e.slice(0,6),2),r=parseInt(e.slice(6,8),2),i=o(r),s=parseInt(e.slice(8,38),2),u=parseInt(e.slice(38,42),2),l=function(e){let t="";switch(e){case 0:t="发动机使用中";break;case 1:t="锚泊";break;case 2:t="未操纵";break;case 3:t="有限适航性";break;case 4:t="受船舶吃水限制";break;case 5:t="系泊";break;case 6:t="搁浅";break;case 7:t="从事捕捞";break;case 8:t="航行中";break;case 9:t="留做将来修正导航状态，用于载运危险品（DG）、有害物质（HS）或海洋污染物（MP）的船舶，或载运 IMO 的C类危险品或污染物、高速船（HSC）";break;case 10:t="留做将来修正导航状态，用于载运DG、HS或MP，或载运IMO的A类危险品或污染物的船舶，WIG";break;case 11:case 12:case 13:t="留做将来用";break;case 14:t="AIS-SART（Search and Rescue Radar Transponder）（现行的）";break;case 15:t="未规定/默认值";break;default:t="无该分类信息"}return t}(u),f=4.733*Math.sqrt(parseInt(e.slice(42,50),2))+"°/min",d=parseInt(e.slice(50,60),2)/10+"节",p=parseInt(e.slice(60,61),2),m=function(e){let t="";t="0"===e?"低(>10m)":"高(<10m)";return t}(p),I=function(e,t){let n=a(e.slice(1),"coordinate"),r=a(t.slice(1),"coordinate");return"0"===e.slice(0,1)?n="E "+n:"1"===e.slice(0,1)&&(n="W "+n),"0"===t.slice(0,1)?r="N "+r:"1"===t.slice(0,1)&&(r="S "+r),{longitude:n,latitude:r}}(e.slice(61,89),e.slice(89,116)),h=function(e,t){let n=parseInt(e,2),r=parseInt(t,2);return"0"===e.slice(0,1)?n=n/1e4/60:"1"===e.slice(0,1)&&(n=-n/1e4/60),"0"===t.slice(0,1)?r=+r/1e4/60:"1"===t.slice(0,1)&&(r=-r/1e4/60),[n,r]}(e.slice(61,89),e.slice(89,116)),b=I.longitude+" , "+I.latitude,g=a(e.slice(116,128),"cog"),T=a(e.slice(128,137),"heading"),y=parseInt(e.slice(137,143),2),S=function(e){let t="";e<60?t=e+" seconds past the minute":60===e?t="不可用":61===e?t="定位系统在人工输入模式下":62===e?t="电子定位系统工作在估计（航迹推算）模式下":63===e&&(t="定位系统不起作用");return t}(y),M=parseInt(e.slice(143,145),2),k=function(e){let t="";0===e?t="不可用":1===e?t="未进行特定操纵":2===e&&(t="进行特定操纵");return t}(M),v=parseInt(e.slice(145,148),2),D=c(v),w=parseInt(e.slice(148,149),2),A=function(e){let t="";0===e?t="RAIM未使用":1===e&&(t="RAIM正在使用");return t}(w),O=e.slice(149,168),x=function(e,t){let n="",r="",a="";1===e?n="SOTDMA":2===e?n="SOTDMA":3===e&&(n="ITDMA");if("00"===t.slice(0,2)){r="UTC";let e=new Date;e.setHours(parseInt(t.slice(5,10),2)),e.setMinutes(parseInt(t.slice(10,17),2)),a=e.getHours()+":"+e.getMinutes()}t.slice(2,5);return n=n+" "+a+" "+r}(n,O);return t={MessageID:{name:"消息ID",data:n,info:"船位报告"},DataIndicator:{name:"转发指示符",data:r,info:i},UserID:{name:"用户ID(MMSI)",data:s,info:s},NaviStatus:{name:"导航状态",data:u,info:l},ROT:{name:"旋转速率",data:f,info:f},SOG:{name:"地面航速",data:d,info:d},Accuracy:{name:"地面航速",data:p,info:m},Location:{name:"坐标",data:h,info:b},COG:{name:"地面航线",data:g,info:g},Heading:{name:"实际航向",data:T,info:T},Second:{name:"时戳",data:y,info:S},RegionalApplication:{name:"特定操纵指示符",data:M,info:k},Spare:{name:"备用",data:v,info:D},RAIM:{name:"RAIM",data:w,info:A},CommunicationState:{name:"通信状态",data:O,info:x}}}(t);break;case 4:n="基站报告";break;case 5:n="静态、航行相关数据";break;case 10:n="UTC/日期响应";break;case 11:n="申请安全相关信息";break;case 12:n=function(e){let t={},n=parseInt(e.slice(0,6),2),a=parseInt(e.slice(6,8),2),i=o(a),s=parseInt(e.slice(8,38),2),u=parseInt(e.slice(38,40),2),l=parseInt(e.slice(40,70),2),f=parseInt(e.slice(70,71),2),d=function(e){let t="";0===e?t="无重复发送":1===e&&(t="重发");return t}(f),p=parseInt(e.slice(71,72),2),m=c(p),I=e.slice(72),h=function(e){let t="";for(let n=0;n<e.length;n+=6)t+=r[parseInt(e.substr(n,6),2)];return t}(I);return t={MessageID:{name:"消息ID",data:n,info:"安全相关确认"},DataIndicator:{name:"转发指示符",data:a,info:i},SourceID:{name:"信源ID",data:s,info:s},SerialID:{name:"序列编号",data:u,info:u},DestinationID:{name:"目的地ID",data:l,info:l},RepeatFlag:{name:"重发标志",data:f,info:d},Spare:{name:"备用",data:p,info:m},SecureText:{name:"安全相关文本",data:I,info:h}}}(t);break;case 13:n="安全广播信息";break;default:n="无该分类信息"}return n}function o(e){let t="";return t=0===e?"默认":3===e?"不再转发":"转发了"+e+"次"}function c(e){let t="";return 0===e&&(t="未使用"),t}e.exports.decodeMessage=function(e){let t={};return t=i(parseInt(e.slice(0,6),2),e)}},function(e){e.exports={0:"@",1:"A",2:"B",3:"C",4:"D",5:"E",6:"F",7:"G",8:"H",9:"I",10:"J",11:"K",12:"L",13:"M",14:"N",15:"O",16:"P",17:"Q",18:"R",19:"S",20:"T",21:"U",22:"V",23:"W",24:"X",25:"Y",26:"Z",27:"[",28:"\\",29:"]",30:"^",31:"_",32:" ",33:"!",34:'"',35:"#",36:"$",37:"%",38:"&",39:"'",40:"(",41:")",42:"*",43:"+",44:",",45:"-",46:".",47:"/",48:"0",49:"1",50:"2",51:"3",52:"4",53:"5",54:"6",55:"7",56:"8",57:"9",58:":",59:";",60:"<",61:"=",62:">",63:"?"}}]);