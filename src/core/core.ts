export interface Plugin{
    __help?:Array<Array<string>>;  // 帮助
    __name:string,                 // 插件名,用于控制
    run(req,res,next);             // 运行插件
}


export interface PluginOptions{permitted?: Array<string>, forbidden?: Array<string>, time?: number}