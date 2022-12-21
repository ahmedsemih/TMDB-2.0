const delay =(delayTime:number,callback:any)=>{
    setTimeout(()=>{
        callback;
    },delayTime);
};

export default delay;