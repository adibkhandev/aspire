
import React,{useState,useRef, useEffect} from 'react'
import { Autocomplete } from '@mui/material';
import { TextField , Popper } from '@mui/material';
import {Chip} from '@mui/material';
import { StyledEngineProvider } from '@mui/material/styles';

export const BoxAddon = ({skills,num,setError,setSkills,defaultSkills}) => {
const list = ['Physics','Chemistry','Hoe','Music','Dance','Acting','Art','Finance']
let [open,setOpen] = useState(true)
const [outtaLimit,setOuttaLimit]=useState(()=>{ return false
});    
useEffect(()=>{
   console.log(outtaLimit,'limit')
},[outtaLimit])
let inputRef = useRef(null)
let muiInputRef = useRef(null)
return (
     <StyledEngineProvider injectFirst>
        <div className="textarea-container">
         <Autocomplete
           multiple
           id="multiple-limit-tags"
           options={list}
           value={skills}
           blurOnSelect={true}
           PopperComponent={(props) => (
             <Popper  style={{marginTop:'1000px'}} id='popper' {...props} />
           )}
           getOptionLabel={(option) => option}
           onChange={(e,value)=>{
             console.log(value,'value')
             if(value.length>6){
                 setOuttaLimit(true)
                 setError('Max number of interests reached')
             }
             if(value<1){
              setOuttaLimit(true)
              setError('Minimum number of interests reached')
             }
             if(6<value<1){
                 setSkills(value)
             }
           }}
           
           renderTags={(tagValue, getTagProps) =>
             tagValue.map((option, index) => (
               <Chip
                  label={option}
                  variant='outlined'
                  size='small'
                  style={{border:'0.3px solid #3E3E3E'}}
                  {...getTagProps({ index })}
               />
            ))}
            ref={muiInputRef}
            renderInput={(params) => (
              <TextField ref={inputRef} sx={{outline:'none',padding:'0'}} placeholder='Search for skills'{...params}  />
            )}
            sx={
              {
                width: '500px'
              }
            }
        />
       </div>
     </StyledEngineProvider>
       
    )
}
