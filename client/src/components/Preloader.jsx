import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import "./Preloader.css";

export default function NestedModal() {
  const [open, setOpen] = React.useState(true);
 

  return (
    <div>
      <Modal
        open={open}
        // onClose={handleClose}
      >
        {/* <Box sx={{ ...style, width: 400 }}> */}
        <div style={{ border: "none" }} className='imagesPreloaderBox'>
          <div className='preloaderImage'><img src='./wait.png'></img></div>   
          <div className='preloaderGifBox'>
            <div className='preloaderGif'><img src='./serveConnectionGif.gif'></img></div>   
            <div className='preloaderGif'><img src='./mouse.gif'></img></div>   
            <div className='preloaderGif'><img src='./NECD.gif'></img></div>   
            <div className='preloaderGif'><img src='./legs.gif'></img></div>   
          </div>
        </div>
        {/* </Box> */}
      </Modal>
    </div>
  );
}