import React from 'react';


//计算时隔到当前的时间
export const setContent =(time) =>{
  if(typeof(time)==='undefined'){
    return
  }
  const nowTime = new Date();
  const oldTime = new Date(time);
  const s1 = nowTime.getTime();
  const s2 = oldTime.getTime();
  const total = (s1 - s2)/1000;
  let day = parseInt(total / (24*60*60));//计算整数天数
  const afterDay = total - day*24*60*60;//取得算出天数后剩余的秒数
  let hour = parseInt(afterDay/(60*60));//计算整数小时数
  const afterHour = total - day*24*60*60 - hour*60*60;//取得算出小时数后剩余的秒数
  let min = parseInt(afterHour/60);//计算整数分
  let content = `${day}天`
  if(day === 0){
    if(hour > 0){
      content = `${hour}小时`
    }
    if(hour === 0) content =`${min}分钟`
  }else{
    if(hour >= 12){
      day = day+1
    }
  }
  return(
    content
  )
}

//置顶等标签
export const setSpan = (data)=>{
  if(data.top===true){
    return(
      <span className="put_top">置顶</span>
    )
  }
  if(data.top===false){
    let title = ''
    title = '问答'
    switch (data.tab){
      case 'ask':
        title = '问答';
        break;
      case 'share':
        title = '分享';
        break;
      case 'good':
        title = '精华';
        break;
      default:
        break;
    }
    return(
      <span className="topiclist-tab">{title}</span>
    )
  }
}