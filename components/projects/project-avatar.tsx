import {cn} from '@/lib/utils';
import { Avatar,AvatarFallback } from '@radix-ui/react-avatar';
 

export const ProjectAvatar=({
    name,
    className,
}:{
    name:string,
    className:string,
})=>{
    return (
        <Avatar className={cn("size-6 2xl:size-8 rounded-md items-center",className)}>
        <AvatarFallback className="w-6 2xl:w-8 h-6 2xl:h-8 bg-gray-200 text-gray-600 font-medium flex items-center justify-center rounded-md">
            { name.charAt(0)}
            </AvatarFallback>
        </Avatar>
    )
}