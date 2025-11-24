export function setColors(data){
  data.color = {
    body: '#749dc8', puzzleInner:'#e5e4e2', puzzleMiddle:'#b0afae', 
    puzzleOutter:'#a09f9e', hex:'#0a61c9', displayColor:'#999999', 
    displayBorder:'#374458', dialogButton:'#315cf4', dialogHover:'#1434a4',
    message:'#0f1042', boxShadow:'rgba(0, 0, 0, 0.35)', axisFill:'#b8b8bf', 
    otherFill:'#d7d7db', centerBorder:'#0f1042', axisBorder:'#818181', 
    otherBorder:'#b2b2b2', cursor:'#657895', offWhite: '#fcf7f8', 
    fontLight:'#616170', fontDark:'#0f1042', fontGreen:'#0a8a64',
    fontBlue:'#0000ff', hint:'#d99351'};
  for (const key in data.color) {
    document.documentElement.style.setProperty(`--${key}`, data.color[key]);
  };
};