export interface Plugin{
    __help:Array<Array<string>[]>[];
    run(req,res,next);
}


export interface Common{}

export interface PluginOptions{
    permitted?:string[];
    forbidden?:string[];
}