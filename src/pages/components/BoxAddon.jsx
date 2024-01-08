import React,{useState,useRef} from 'react'
import { Autocomplete } from '@mui/material';
import { TextField , Popper } from '@mui/material';
import {Chip} from '@mui/material';
import { StyledEngineProvider } from '@mui/material/styles';

export const BoxAddon = ({num,setError,setSkills}) => {
const list = ['Physics','Chemistry','Hoe','Music','Dance','Acting','Art','Finance']
let [open,setOpen] = useState(true)
const [inLimit,setInLimit]=useState(true);    
let inputRef = useRef(null)
return (
     <StyledEngineProvider injectFirst>
         <div className="textarea-container">
          
          <Autocomplete
           multiple
           id="multiple-limit-tags "
           options={list}
           PopperComponent={(props) => (
             <Popper style={{marginTop:'1000px'}} id='popper' {...props} />
           )}
           getOptionLabel={(option) => option}
           onChange={(e,value)=>{
             console.log(value,'value')
             if(value.length>6){
                 setInLimit(false)
                 setError('Max number of interests reached')
             }
             else{
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
               ))
             }
             renderInput={(params) => (
               <TextField ref={inputRef} sx={{outline:'none',padding:'0'}} placeholder='Search for skills'{...params} disabled={!inLimit} />
               )}
               
           sx={{ width: '500px' }}
           disabled={!inLimit}
           />
       </div>
     </StyledEngineProvider>
       
    )
}
