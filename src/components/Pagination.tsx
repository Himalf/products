
import { IPaginationProps as Props } from '../types/paginationProps';

export default function Pagination({ totalPages, currentPage,onpageChange }: Props) {
  
  return (
    <div className='flex justify-center items-center gap-3 p-2 my-2'>
        {Array.from({length:totalPages},(_,index)=>(
             <button key={index} className={`px-4 py-2 rounded-md ${currentPage=== index+1?"bg-blue-500 text-white": "bg-gray-200 text-blue-500"}`}
             onClick={()=>{
                onpageChange(index+1)
             }}
             >
                {index+1}
        
             </button>
        ))}
    </div>
  )
}