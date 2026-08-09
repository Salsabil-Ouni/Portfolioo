(function(){
  var st=document.createElement('style');
  st.textContent='html, * { cursor: url("data:image/png;base64,'+'iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAFV0lEQVR4nO3ZfUxWVRzA8e99EVBARHwEFHxBnRUyNXOQIvkyc7baaGmutrYstaJymktrZXeMtrQXcy2xImPl3MjMPxLXaqsWmikjpfIlmz2+IBq+TIdaBA/39se5V4NhSffRK/X7/PPsXO5znnPG73fO754LQgghhBBCCCGE6ATLsgosyyoIehxdlR70AIQQwgfLssotyyoPehxdlewBQoiuzLIsx7IsJ+hxdFWyBwghujLZA/yRPUAIESDNO8svLi6uAnW247Znu23HbWsdtVcsXeAAxNG8AaCJmBmXad8K0KCHHmnXf5vf/7+RPSBgmt8OPqt41wG4fdbDba431B0EYGPZqwsBikpKV/r9rf8iyYCAmdHu0Iv8LZvXrwSJ/H8iGRCwqGVAZ9f8tS8t0gGaIvYAANtuvQXAcdyHasexAXTd8ILEBgilpX8C0HL+rA1w76JldrTmEATJgID5roI+eOU5B6B7QuJKgJmPPbOwo/veKX7SBOiZlBwD0NjYOAcgc+iNMwGGZN+cp+502gWF5n1EAKo2VWxUTW01AHZLNUCPuLhmgPueXt6lMkIyIGC+M6B0adECuPya//7Lz2YBpKRnrAFoPH0qD2Bi4f0mQGrGYBNA068sFuzWCAC7q7dEAPZUVzUDxMUnvAVgaM4SgMK5iyP/Zj7XmmRAwHxXQQ16aGRH18uK55sAof4D1wCMm3Z3PsDvv10wAfr2HwiAfoWR7zHMbgDk5N7mZtAgE8C27fkAm9euOuz+/psAc603rus9QTIgYL4zwDvV9Hy0qsQEOH/uXD5ARtbwfIDE5BRVBfUOuXeq7cdp07q8i88HmrpT0w0AUjMHA2C3tpoAA4bdNAugoS5c6X413Nk5XUuSAQHzXQW1P88vX7a4ACAnb2I5wKjxU7MAftr5LQC9blDl/t4zKqInZ6o13dD/fiheBvx6QS3pu0+3AjBCr3cnov4en5gUAdj26cfbABJ6xE4FyC98sNnPPK8WyYCA+c4AT9mLT40DyJ1y1xcA2WMnxAGcbzwLwL6arQAkjZ4OwNf1KoIfGhELgOGOxLHbFS3emu9+HlBHQHxV1wLAnb2OA3D6+BEARoydgNcTwOfr39sKUB/e/wDAnOdXHPE51aiSDAiY7ypotfVEHsDIcZPXwaXI1w1VpZysPwxASloGAH3j1fUpmep/7y39+2u3A5CU3AeA8N5aALKyR6uBmjEApIUy3e+rvSM1UbV//u4bAGwV+JiGqQOMn35PPsCWyg/XuUP2UuS6IBkQMP/vAxwnAyC5T+oguBT5nvieSQCc2LlLtS+oyB2SriKdXmkADMsZC8D+2h0AjJl0BwAH934PwPBRuQAYEXXEk3i8DoDGHxoA6K6pqeiaG1PunpGQ1FsHMLrF5Pub6NUhGRAw3xlw8QnVK6jaPbGG+g0AYPcOdXp5ovbLCEB2bIE6K+rXx/xrP0NzxrTpx2u7L8iIRFT1s+/QjxGA8IE9qr9J09SpqqZ1OKeolXtRJhkQMN8ZUFRSugGgFLw3Ya+pDxXBZ0+dOARwNLxvNkBcbGwNQGXl2nkA2mYt1/2eDaDpunuO774Zu/iK2PEyxQYwDONtgPiE+BqAqsqKR93blwNomgquMycbjgH8smfXTL9zvRokAwIW9aWx9IXHZwAY7mklGkcBUtP7VwMUzltiA5QVz1fViaFeCLS41U1yz0QboNX21nx1vemPFh1Adx8cbLfg9877N5W/bgIcOxwuBLDdPcSx7aMARSWl26M912iQDBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEKITvoTWYeZliW4kvYAAAAASUVORK5CYII='+'") 4 4, auto !important; }';
  document.head.appendChild(st);
})();

var SP=['☁️','☁️','☁️','·','·','✦','☁️'];
document.addEventListener('mousemove',function(e){
  if(Math.random()>.82){
    var s=document.createElement('div');
    s.className='sparkle';
    s.textContent=SP[Math.floor(Math.random()*SP.length)];
    s.style.cssText='position:fixed;pointer-events:none;z-index:9999;font-size:14px;animation:sparkle-fade .8s ease-out forwards;left:'+e.clientX+'px;top:'+e.clientY+'px';
    document.body.appendChild(s);
    setTimeout(function(){s.remove();},900);
  }
});

var css=document.createElement('style');
css.textContent='@keyframes sparkle-fade{0%{opacity:1;transform:translateY(0) scale(1);}100%{opacity:0;transform:translateY(-30px) scale(0);}}';
document.head.appendChild(css);
