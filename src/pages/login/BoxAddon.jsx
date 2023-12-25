import React from 'react'
import Autocomplete from '@mui/material/Autocomplete';
import { TextField } from '@mui/material';
import {Chip} from '@mui/material';
import './../../styles/custom.css'
export const BoxAddon = ({num}) => {
const list = ['Physics','Chemistry','Hoe','Music']
    return (
        <div className="textarea-container">
          
           <Autocomplete
            multiple
            limitTags={3}
            id="multiple-limit-tags attributes"
            options={list}
            getOptionLabel={(option) => option}
            // renderInput={(params) => (
            //     console.log(params)
            //     // <textarea list="cityname" className='attributes' name="" id="" cols="40" rows={num} placeholder='Search for skills'/>
            // )}
            renderTags={(tagValue, getTagProps) =>
                tagValue.map((option, index) => (
                  <Chip
                    label={option}
                    variant='outlined'
                    size='small'
                    style={{border:'0.3px solid #3E3E3E'}}
                    {...getTagProps({ index })}
                    // disabled={fixedOptions.indexOf(option) !== -1}
                  />
                ))
              }
              renderInput={(params) => (
                <TextField sx={{outline:'none',padding:'0'}} className='attributes' {...params}/>
              )}
            sx={{ width: '500px' }}
            />
        </div>
    )
}
