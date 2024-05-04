import axios from "axios";
import { useState } from "react";

const QrCode = () => {
  const [url, setUrl] = useState("");
  const [qrImage, setQrImage] = useState("")

  const generateQrcode = (e)=>{
    e.preventDefault()
    axios.post("http://localhost:8080/api/scanQrcode", {url:url})
    .then(res => {
      console.log(res)
      setQrImage(res.data)
      
    })

  }

  return (
  
      <div className=" justify-center  text-center w-full  my-2 h-[200px] mb-5  bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Generate and Download QR code{" "}
        </h5>
        <input
          type="text"
          className="font-normal text-gray-700 dark:text-gray-400"
          onChange={(e) => setUrl(e.target.value)}
          value={url}
          placeholder="enter text here.."
        >
      
        </input>
       
        <br></br>
        <div>
        <button className="bg-blue-800 my-2 border-gray-800 rounded-md" onClick={generateQrcode}>Generate QRCode</button>

        </div>

        <div  className="w-full h-full">

        {
          url.length > 0 && qrImage
          ?
          <>
          <a  href={qrImage} download > <img className="justify-center mb-6 ml-10 text-center" src={qrImage} alt="qr" /></a>
          <p>Scan the QR Code to access data</p>
            
          </>
          : null
        }
        </div>
      </div>
  );
};
export default QrCode;
