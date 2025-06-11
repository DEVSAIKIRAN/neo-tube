import { SearchIcon } from "lucide-react";

export const SearchInput = () => {
    return(
        <div className="flex w-full max-w-[600px]">
        <div className="relative w-full flex" >
         <input type="text" placeholder="Search" className="w-full pl-4 py-2 pr-12 rounded-l-full border focus:outline-none focus:border-blue-500 bg-black"/>
         <button type="submit" className="px-5 py-2.5 bg-black border border-l-0 rounded-r-full hover"><SearchIcon className="size-5"/></button>
        </div>
        
        </div>
    )
}
export default SearchInput;