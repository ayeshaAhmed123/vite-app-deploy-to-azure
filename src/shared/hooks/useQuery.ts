import React from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

export const useQuery = () => {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
}




/** usage example
 *  import {useQuery} from 'path'
 * 
 *  let query = useQuery();  //call the hook
 *  
 *  set the variable name as you want to call the get function on the query and pass the param name you want to read from the url
 *  let param_name = query.get('param_name')        
 * 
 */