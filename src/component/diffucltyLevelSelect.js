import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Card from "@material-ui/core/Card/Card";
import CloseICon from '@material-ui/icons/Close';
import '../styles/quiz.css';
import Avatar from "@material-ui/core/Avatar/Avatar";
import {LEVEL_JSON} from '../utils/catogreyJson';

export default function DiffucltyLevelSelect(data) {
    const [open, setOpen] = React.useState(false);



    const handleClose = () => {
        data.onDialougeClose();
    };

    const descriptionElementRef = React.useRef(null);

    React.useEffect(() => {
        setOpen(data.open)
    }, [data.open]);

    function  handleLevel(level){
        data.onSetLevel(level);
        data.onDialougeClose();
    };




    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                scroll={'paper'}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <div style={{display:'flex',justifyContent:'space-between',padding:20}}>
                    <div style={{fontSize:20,fontWeight:900}}>Select Diffcult Level</div>
                    <div onClick={handleClose} style={{cursor:'pointer'}}><CloseICon/></div>
                </div>

                <DialogContent dividers={'paper'}>
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    >
                       <div style={{display:'flex'}}>
                           {LEVEL_JSON.map((item)=>
                               <Card
                                   style={{padding:10,margin:'20px 10px 10px 10px',textAlign:'center',cursor:'pointer',width:120}}
                               onClick={()=>handleLevel(item.name)}
                               >

                                   <div style={{fontSize:22,fontWeight:600}}>
                                       <Avatar style={{margin:'auto',background:item.color,color:'#fff'}}>{item.level}</Avatar></div>
                                   <div style={{fontSize:16,fontWeight:600,marginTop:20}}>{item.name}</div>

                               </Card>
                           )}

                       </div>




                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </div>
    );
}
