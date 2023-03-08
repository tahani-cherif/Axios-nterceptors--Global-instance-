
import {TextField,Grid,Typography,Card,Button} from '@mui/material';
import './App.css';
import {AiOutlineSend} from "react-icons/ai";
import { useForm, Controller,FormProvider } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import api from './config_axios';
import { useNavigate } from "react-router-dom";

const messageError = 'Vous devez remplir ce champ';
const schema=yup.object().shape({
  mail: yup
  .string()
  .email("Adresse mail n'est pas valide")  
  .required(messageError)
  .nullable(),
  mdp: yup
  .string()
  .required(messageError)
  .nullable()


})
export default function Login(){
  const navigate = useNavigate();
    const methods = useForm({
        resolver: yupResolver(schema),
        mode: 'onBlur',
      });
      const {
        handleSubmit,
        reset,
        control,
        formState: { errors },
      } = methods;
      const onSubmit = async(data) => {
        console.log('formulaire valide',data)
        const body={
          e_mail:data.mail,
          password:data.mdp
      }
        const res=api.post('/user/loginAgence',body).then(see=> {  
          localStorage.setItem('tocken',see?.tokens)
          console.log("res",see)
          navigate("/avion");})
       
     
      };
      console.log(errors.mail?.message);
    return(
        <div className='contenaire'>
           <Grid   style={{ padding: "80px 5px 0 5px" }}>
           <Card  elevation={8} style={{ maxWidth: 600, margin: "0 auto",padding:"32px" }} >
           <h1>Axios Interceptors (Global instance)</h1>
           <Typography variant="h4" color="primary" style={{marginTop: "19px",marginBottom: "21px",textAlign:"center"}} >
                 Login
          </Typography>
          <FormProvider {...methods}>
           <form className='form' style={{width:"408px",margin:"auto"}}>
           <Controller 
                name="mail"
                control={control}
                rules={{
                  required: messageError,
                }}
                render={({ field, fieldState }) => {
                  return (<div>
            {errors.mail?.message=="Adresse mail n'est pas valide" || errors.mail?.message=="Vous devez remplir ce champ" ? <TextField error {...field} label="Adresse mail" variant="outlined" style={{ width: "408px"}}/>:
            <TextField {...field} label="Adresse mail" variant="outlined" style={{ width: "408px"}}/>}
            <br/><span style={{float: "left",color:"red"}}> {errors.mail?.message}</span>
                    </div> 
                  )}}/>
                    <Controller 
                name="mdp"
                control={control}
                rules={{
                  required: messageError,
                }}
                render={({ field, fieldState }) => {
                  return (<div>
           {errors.mdp?.message=="Vous devez remplir ce champ" ?<TextField error {...field}  label="Mots de passe" variant="outlined"   type='password' style={{ width: "408px",marginTop: "11px"}}/>:
           <TextField {...field}  label="Mots de passe" variant="outlined"   type='password' style={{ width: "408px",marginTop: "11px"}}/>} 
           <br/> <span style={{float: "left",color:"red"}}> {errors.mdp?.message}</span> </div> )}}/>
           <Button   onClick={handleSubmit(onSubmit)} variant="contained" endIcon={<AiOutlineSend />} style={{width:"171px",height: "43px",margin:"29px auto auto auto"}}>Envoyer</Button>
           </form>
           </FormProvider>
           </Card>
        </Grid>
        </div>
    )
}
