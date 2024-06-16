import { useEffect, useState } from "react";
import exerciseArmoryApi from "../api/api";

const useLocalStorageState = (key) => {
  const [value, setValue] = useState(() => {
    try{
      let val = JSON.parse(window.localStorage.getItem(key)) || {};
      exerciseArmoryApi.token = val.token
      return val;
    } catch (err){
      console.error(`issue with ${key}`, err)
    }
  });

  useEffect(() => {
    try{
      let val = JSON.stringify(value)
      window.localStorage.setItem(key, val)
    } catch (err){
      console.log(err)
    }
  }, [value]);

  return [value, setValue];
};

export default useLocalStorageState;