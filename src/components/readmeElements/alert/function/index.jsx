import { useState } from "react";
import { Box, Typography, TextField } from "@mui/material";
import { SlInfo } from "react-icons/sl";
import { LuLightbulb } from "react-icons/lu";
import { BiMessageError } from "react-icons/bi";
import { IoWarningOutline } from "react-icons/io5";
import { MdOutlineReportGmailerrorred } from "react-icons/md";

const AlertCategories = ({ type, text, onTextChange, color, title, iconType }) => {

    const getIcon = (type) => {
        switch (type) {
            case 'info':
                return <SlInfo />;
            case 'lightbulb':
                return <LuLightbulb />;
            case 'error':
                return <BiMessageError />;
            case 'warning':
                return <IoWarningOutline />;
            case 'caution':
                return <MdOutlineReportGmailerrorred />;
            default:
                return <SlInfo />;
        }
    };
  
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          borderLeft: `5px solid ${color}`,
          padding: 2,
          borderRadius: "8px",
          backgroundColor: `${color}20`,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, color: color }}>
            {getIcon(iconType)}
            <span style={{ fontWeight: "bold", fontFamily: 'Acorn' }}>{title}</span>
        </Box>
        <TextField
          value={text || ''}
          onChange={(e) => onTextChange(e.target.value)}
          placeholder={`Enter ${title.toLowerCase()} message...`}
          fullWidth
          multiline
          rows={3}
          variant="outlined"
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor: '#ffffff',
              '&:hover fieldset': {
                borderColor: color,
              },
              '&.Mui-focused fieldset': {
                borderColor: color,
              },
            },
          }}
          inputProps={{
            style: {
                fontFamily: 'GT Planar', 
                letterSpacing: '-.3px'
            },
          }}
        />
      </Box>
    );
};

export default AlertCategories;